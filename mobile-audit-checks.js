const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VIEWPORT = { width: 390, height: 844 };
const BASE_URL = 'http://localhost:5199';
const OUT_DIR = path.join(__dirname, 'mobile-audit');

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

  // ---- Check 1: Navbar logo overlaps hamburger ----
  console.log('\n=== Check: Logo vs Hamburger collision ===');
  await page.goto(BASE_URL + '/', { waitUntil: 'networkidle', timeout: 20000 });
  await sleep(1000);
  const navCheck = await page.evaluate(() => {
    const navbar = document.querySelector('nav');
    const logo = navbar?.querySelector('img');
    const hamburger = navbar?.querySelector('button');
    if (!logo || !hamburger) return { error: 'elements not found' };
    const logoRect = logo.getBoundingClientRect();
    const hamRect = hamburger.getBoundingClientRect();
    const navRect = navbar.getBoundingClientRect();
    return {
      navHeight: Math.round(navRect.height),
      logoRect: { top: Math.round(logoRect.top), bottom: Math.round(logoRect.bottom), left: Math.round(logoRect.left), right: Math.round(logoRect.right), height: Math.round(logoRect.height), width: Math.round(logoRect.width) },
      hamburgerRect: { top: Math.round(hamRect.top), bottom: Math.round(hamRect.bottom), left: Math.round(hamRect.left), right: Math.round(hamRect.right), height: Math.round(hamRect.height), width: Math.round(hamRect.width) },
      overlap: !(logoRect.right < hamRect.left || logoRect.left > hamRect.right || logoRect.bottom < hamRect.top || logoRect.top > hamRect.bottom),
      logoExtendsOutsideNav: logoRect.bottom > navRect.bottom || logoRect.top < navRect.top,
    };
  });
  console.log(JSON.stringify(navCheck, null, 2));

  // ---- Check 2: Hero section on mobile ----
  console.log('\n=== Check: Hero section layout ===');
  const heroCheck = await page.evaluate(() => {
    const hero = document.querySelector('section');
    if (!hero) return {};
    const rect = hero.getBoundingClientRect();
    const h1 = hero.querySelector('h1');
    const h1Rect = h1?.getBoundingClientRect();
    const buttons = hero.querySelectorAll('a[href], button');
    return {
      heroHeight: Math.round(rect.height),
      h1FontSize: h1 ? window.getComputedStyle(h1).fontSize : null,
      h1Rect: h1Rect ? { height: Math.round(h1Rect.height), width: Math.round(h1Rect.width) } : null,
      buttonCount: buttons.length,
      ctaButtons: Array.from(buttons).filter(b => !b.closest('.fixed')).map(b => {
        const br = b.getBoundingClientRect();
        return { text: b.textContent.trim().slice(0, 30), height: Math.round(br.height), width: Math.round(br.width) };
      }).slice(0, 5),
    };
  });
  console.log(JSON.stringify(heroCheck, null, 2));

  // ---- Check 3: Floating buttons overflow detection ----
  console.log('\n=== Check: Floating buttons position on scroll ===');
  await page.evaluate(() => window.scrollTo(0, 500));
  await sleep(200);
  const floatingCheck = await page.evaluate(() => {
    const btns = document.querySelectorAll('.fixed.bottom-6.right-6 a');
    const viewportH = window.innerHeight;
    const viewportW = window.innerWidth;
    return Array.from(btns).map(btn => {
      const rect = btn.getBoundingClientRect();
      return {
        href: btn.getAttribute('href')?.slice(0, 30),
        bottom: Math.round(rect.bottom),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        offscreen: rect.bottom > viewportH || rect.right > viewportW,
        viewportH,
        viewportW,
      };
    });
  });
  console.log(JSON.stringify(floatingCheck, null, 2));

  // ---- Check 4: Footer link tap targets ----
  console.log('\n=== Check: Footer link tap targets ===');
  await page.goto(BASE_URL + '/', { waitUntil: 'networkidle', timeout: 20000 });
  await sleep(500);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(300);
  await page.screenshot({ path: path.join(OUT_DIR, 'footer-mobile.png'), fullPage: false });
  const footerCheck = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    const links = footer?.querySelectorAll('a') || [];
    return Array.from(links).map(a => {
      const rect = a.getBoundingClientRect();
      return {
        text: a.textContent.trim().slice(0, 30),
        height: Math.round(rect.height),
        width: Math.round(rect.width),
        paddingTop: window.getComputedStyle(a).paddingTop,
        paddingBottom: window.getComputedStyle(a).paddingBottom,
      };
    });
  });
  console.log(JSON.stringify(footerCheck, null, 2));

  // ---- Check 5: Pricing page card widths ----
  console.log('\n=== Check: Pricing page card layout ===');
  await page.goto(BASE_URL + '/cene', { waitUntil: 'networkidle', timeout: 20000 });
  await sleep(500);
  const pricingCheck = await page.evaluate(() => {
    const cards = document.querySelectorAll('.grid > div');
    return Array.from(cards).slice(0, 3).map(card => {
      const rect = card.getBoundingClientRect();
      return { width: Math.round(rect.width), left: Math.round(rect.left), right: Math.round(rect.right) };
    });
  });
  console.log(JSON.stringify(pricingCheck, null, 2));

  // ---- Check 6: Destination detail - hero banner text wrapping ----
  console.log('\n=== Check: DestinationDetail hero text layout ===');
  await page.goto(BASE_URL + '/destinacije/hrvatska', { waitUntil: 'networkidle', timeout: 20000 });
  await sleep(500);
  const detailHeroCheck = await page.evaluate(() => {
    const h1 = document.querySelector('main section h1');
    const priceEl = document.querySelector('[style*="2.5rem"]');
    const heroSection = document.querySelector('main > section');
    return {
      h1Text: h1?.textContent.trim(),
      h1FontSize: h1 ? window.getComputedStyle(h1).fontSize : null,
      h1Rect: h1 ? (() => { const r = h1.getBoundingClientRect(); return { width: Math.round(r.width), height: Math.round(r.height) }; })() : null,
      heroHeight: heroSection ? Math.round(heroSection.getBoundingClientRect().height) : null,
    };
  });
  console.log(JSON.stringify(detailHeroCheck, null, 2));

  // ---- Check 7: Testimonial arrows overlap content ----
  console.log('\n=== Check: Testimonial arrow buttons ===');
  await page.goto(BASE_URL + '/', { waitUntil: 'networkidle', timeout: 20000 });
  await sleep(500);
  await page.evaluate(() => window.scrollTo(0, 2500));
  await sleep(300);
  await page.screenshot({ path: path.join(OUT_DIR, 'testimonials-section.png'), fullPage: false });
  const testimonialCheck = await page.evaluate(() => {
    const prevBtn = document.querySelector('button[aria-label="Prethodna recenzija"]');
    const nextBtn = document.querySelector('button[aria-label="Sledeća recenzija"]');
    const card = document.querySelector('.bg-white\\/5');
    return {
      prevBtn: prevBtn ? (() => { const r = prevBtn.getBoundingClientRect(); return { left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) }; })() : null,
      nextBtn: nextBtn ? (() => { const r = nextBtn.getBoundingClientRect(); return { right: Math.round(r.right), width: Math.round(r.width), height: Math.round(r.height) }; })() : null,
      cardRect: card ? (() => { const r = card.getBoundingClientRect(); return { left: Math.round(r.left), right: Math.round(r.right) }; })() : null,
      viewportW: window.innerWidth,
    };
  });
  console.log(JSON.stringify(testimonialCheck, null, 2));

  // ---- Check 8: Contact social buttons on mobile ----
  console.log('\n=== Check: Contact social buttons ===');
  await page.goto(BASE_URL + '/kontakt', { waitUntil: 'networkidle', timeout: 20000 });
  await sleep(500);
  await page.screenshot({ path: path.join(OUT_DIR, 'contact-top.png'), fullPage: false });
  const contactBtnCheck = await page.evaluate(() => {
    const socialBtns = document.querySelectorAll('.flex.flex-wrap.gap-3 a');
    return Array.from(socialBtns).map(a => {
      const rect = a.getBoundingClientRect();
      return {
        text: a.textContent.trim(),
        height: Math.round(rect.height),
        width: Math.round(rect.width),
      };
    });
  });
  console.log(JSON.stringify(contactBtnCheck, null, 2));

  // ---- Check 9: Does the WhatsApp/Viber button cover actual content? ----
  console.log('\n=== Check: Floating buttons vs content at bottom of page ===');
  await page.goto(BASE_URL + '/kontakt', { waitUntil: 'networkidle', timeout: 20000 });
  await sleep(500);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 844));
  await sleep(300);
  await page.screenshot({ path: path.join(OUT_DIR, 'floating-buttons-vs-content.png'), fullPage: false });

  // Check if floating button group is rendered in FloatingButtons on this page
  const hasFloatingOnKontakt = await page.evaluate(() => {
    return !!document.querySelector('.fixed.bottom-6.right-6');
  });
  console.log('  FloatingButtons present on /kontakt:', hasFloatingOnKontakt);

  // ---- Check 10: Home page has FloatingButtons from Hero - check position ----
  console.log('\n=== Check: FloatingButtons at bottom of viewport ===');
  await page.goto(BASE_URL + '/', { waitUntil: 'networkidle', timeout: 20000 });
  await sleep(500);
  const floatPos = await page.evaluate(() => {
    const container = document.querySelector('.fixed.bottom-6.right-6');
    if (!container) return null;
    const rect = container.getBoundingClientRect();
    const allBtns = container.querySelectorAll('a');
    const lastBtn = allBtns[allBtns.length - 1];
    const lastBtnRect = lastBtn?.getBoundingClientRect();
    return {
      containerBottom: Math.round(rect.bottom),
      containerRight: Math.round(rect.right),
      lastBtnBottom: lastBtnRect ? Math.round(lastBtnRect.bottom) : null,
      viewportH: window.innerHeight,
      viewportW: window.innerWidth,
      isClipped: lastBtnRect ? lastBtnRect.bottom > window.innerHeight : null,
    };
  });
  console.log(JSON.stringify(floatPos, null, 2));

  console.log('\n=== Additional checks complete ===');
  await browser.close();
})().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
