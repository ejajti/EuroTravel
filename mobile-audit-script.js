const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VIEWPORT = { width: 390, height: 844 };
const BASE_URL = 'http://localhost:5199';
const OUT_DIR = path.join(__dirname, 'mobile-audit');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const PAGES = [
  { name: 'home', url: '/' },
  { name: 'destinacije', url: '/destinacije' },
  { name: 'destination-detail-hrvatska', url: '/destinacije/hrvatska' },
  { name: 'destination-detail-grcka', url: '/destinacije/grcka' },
  { name: 'cene', url: '/cene' },
  { name: 'najam', url: '/najam' },
  { name: 'kontakt', url: '/kontakt' },
];

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  });

  const page = await context.newPage();
  const results = [];

  for (const p of PAGES) {
    console.log(`\n=== Auditing: ${p.name} (${p.url}) ===`);
    await page.goto(BASE_URL + p.url, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(1500); // let animations settle

    // Full page screenshot
    await page.screenshot({
      path: path.join(OUT_DIR, `${p.name}-full.png`),
      fullPage: true,
    });
    console.log(`  Screenshot saved: ${p.name}-full.png`);

    // Screenshot at top (viewport only)
    await page.screenshot({
      path: path.join(OUT_DIR, `${p.name}-top.png`),
      fullPage: false,
    });

    // --- Measurements & checks ---
    const pageData = await page.evaluate(() => {
      const results = {};

      // Check floating buttons position and size
      const floatingBtns = document.querySelectorAll('.fixed.bottom-6.right-6 a');
      results.floatingButtons = Array.from(floatingBtns).map(el => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          href: el.getAttribute('href'),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          right: Math.round(rect.right),
          bottom: Math.round(rect.bottom),
        };
      });

      // Check navbar hamburger button
      const hamburger = document.querySelector('button[aria-label]');
      if (hamburger) {
        const rect = hamburger.getBoundingClientRect();
        results.hamburger = {
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          ariaLabel: hamburger.getAttribute('aria-label'),
        };
      }

      // Check all interactive elements tap target sizes
      const interactiveEls = document.querySelectorAll('button, a[href], input, textarea, select');
      const tooSmall = [];
      interactiveEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
          tooSmall.push({
            tag: el.tagName,
            text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            href: el.getAttribute('href'),
          });
        }
      });
      results.smallTapTargets = tooSmall;

      // Check for horizontal overflow
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      results.horizontalOverflow = docWidth > winWidth;
      results.docScrollWidth = docWidth;
      results.windowWidth = winWidth;

      // Check navbar logo size
      const navLogo = document.querySelector('nav img');
      if (navLogo) {
        const rect = navLogo.getBoundingClientRect();
        results.navLogoHeight = Math.round(rect.height);
        results.navLogoWidth = Math.round(rect.width);
      }

      // Check if footer links are large enough
      const footerLinks = document.querySelectorAll('footer a');
      const smallFooterLinks = [];
      footerLinks.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.height < 44) {
          smallFooterLinks.push({
            text: el.textContent.trim().slice(0, 30),
            height: Math.round(rect.height),
            width: Math.round(rect.width),
          });
        }
      });
      results.smallFooterLinks = smallFooterLinks;

      // Check form inputs height
      const inputs = document.querySelectorAll('input, textarea');
      results.formInputs = Array.from(inputs).map(el => {
        const rect = el.getBoundingClientRect();
        return {
          type: el.getAttribute('type') || el.tagName,
          height: Math.round(rect.height),
          width: Math.round(rect.width),
        };
      });

      // Check contact info links (tel/mailto)
      const contactLinks = document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]');
      results.contactLinks = Array.from(contactLinks).map(el => {
        const rect = el.getBoundingClientRect();
        return {
          href: el.getAttribute('href'),
          height: Math.round(rect.height),
          width: Math.round(rect.width),
        };
      });

      // Check if images have width/height set or aspect-ratio
      const imgs = document.querySelectorAll('img');
      results.images = Array.from(imgs).map(img => ({
        src: img.getAttribute('src')?.slice(0, 40),
        hasWidth: !!img.getAttribute('width'),
        hasHeight: !!img.getAttribute('height'),
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        displayWidth: Math.round(img.getBoundingClientRect().width),
        displayHeight: Math.round(img.getBoundingClientRect().height),
        loading: img.getAttribute('loading'),
      }));

      return results;
    });

    results.push({ page: p.name, url: p.url, ...pageData });

    // Log findings immediately
    console.log('  Horizontal overflow:', pageData.horizontalOverflow, `(doc: ${pageData.docScrollWidth}px, win: ${pageData.windowWidth}px)`);
    console.log('  Nav logo height:', pageData.navLogoHeight, 'width:', pageData.navLogoWidth);
    if (pageData.hamburger) {
      console.log('  Hamburger:', pageData.hamburger.width + 'x' + pageData.hamburger.height + 'px');
    }
    if (pageData.floatingButtons?.length) {
      console.log('  Floating buttons:');
      pageData.floatingButtons.forEach(b => console.log(`    ${b.href} → ${b.width}x${b.height}px, right:${b.right}, bottom:${b.bottom}`));
    }
    if (pageData.smallTapTargets?.length) {
      console.log(`  Small tap targets (${pageData.smallTapTargets.length}):`);
      pageData.smallTapTargets.slice(0, 10).forEach(t => {
        console.log(`    <${t.tag}> "${t.text}" ${t.width}x${t.height}px`);
      });
    }
    if (pageData.formInputs?.length) {
      console.log('  Form inputs:', pageData.formInputs.map(i => `${i.type}:${i.height}px`).join(', '));
    }
    if (pageData.contactLinks?.length) {
      console.log('  Contact links:', pageData.contactLinks.map(l => `${l.href} ${l.height}x${l.width}px`).join(', '));
    }
  }

  // --- Test mobile menu open ---
  console.log('\n=== Testing mobile hamburger menu ===');
  await page.goto(BASE_URL + '/', { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(1000);

  const hamburgerBtn = await page.$('button[aria-label="Otvori meni"]');
  if (hamburgerBtn) {
    await hamburgerBtn.click();
    await sleep(500);
    await page.screenshot({
      path: path.join(OUT_DIR, 'mobile-menu-open.png'),
      fullPage: false,
    });
    console.log('  Mobile menu screenshot saved');

    // Check menu items are visible
    const menuItems = await page.$$eval('.fixed.inset-0 a', els =>
      els.map(el => {
        const rect = el.getBoundingClientRect();
        return { text: el.textContent.trim().slice(0, 30), height: Math.round(rect.height) };
      })
    );
    console.log('  Mobile menu items:');
    menuItems.slice(0, 15).forEach(i => console.log(`    "${i.text}" h:${i.height}px`));
  } else {
    console.log('  ERROR: Could not find hamburger button!');
  }

  // --- Test scroll on hero ---
  console.log('\n=== Testing hero scroll ===');
  await page.goto(BASE_URL + '/', { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(1000);
  await page.evaluate(() => window.scrollBy(0, 400));
  await sleep(300);
  await page.screenshot({
    path: path.join(OUT_DIR, 'home-scrolled-hero.png'),
    fullPage: false,
  });

  // --- Test contact page form ---
  console.log('\n=== Testing contact form ===');
  await page.goto(BASE_URL + '/kontakt', { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(1000);

  // Try filling form
  const nameInput = await page.$('input[name="name"]');
  if (nameInput) {
    await nameInput.tap();
    await sleep(300);
    await page.screenshot({
      path: path.join(OUT_DIR, 'contact-form-input-focus.png'),
      fullPage: false,
    });
    console.log('  Contact form input screenshot saved');
  }

  // Screenshot bottom of contact page (floating buttons)
  await page.goto(BASE_URL + '/kontakt', { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(1000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(300);
  await page.screenshot({
    path: path.join(OUT_DIR, 'contact-page-bottom.png'),
    fullPage: false,
  });

  // --- Test destination detail ---
  console.log('\n=== Testing destination detail scroll ===');
  await page.goto(BASE_URL + '/destinacije/hrvatska', { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(1500);
  await page.evaluate(() => window.scrollTo(0, 300));
  await sleep(300);
  await page.screenshot({
    path: path.join(OUT_DIR, 'destination-scroll-mid.png'),
    fullPage: false,
  });

  // Save full results JSON
  fs.writeFileSync(
    path.join(OUT_DIR, 'audit-results.json'),
    JSON.stringify(results, null, 2)
  );
  console.log('\n=== Audit complete. Results saved to mobile-audit/ ===');

  await browser.close();
})().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
