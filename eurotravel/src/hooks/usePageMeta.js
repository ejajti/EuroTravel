import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://eurotravel.rs';

function setMetaByName(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

function setMetaByProperty(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

export function usePageMeta(title, description) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title
      ? `${title} | Euro Travel`
      : 'Euro Travel – Kombi prevoz iz Beograda u Evropu';

    document.title = fullTitle;

    if (description) {
      setMetaByName('description', description);
      setMetaByProperty('og:description', description);
      setMetaByName('twitter:description', description);
    }

    setMetaByProperty('og:title', fullTitle);
    setMetaByName('twitter:title', fullTitle);

    const canonicalUrl = `${BASE_URL}${pathname}`;
    setCanonical(canonicalUrl);
    setMetaByProperty('og:url', canonicalUrl);
  }, [title, description, pathname]);
}
