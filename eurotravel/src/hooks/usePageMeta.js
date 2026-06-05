import { useEffect } from 'react';

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

export function usePageMeta(title, description) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | Euro Travel`
      : 'Euro Travel – Kombi prevoz putnika';

    document.title = fullTitle;

    if (description) {
      setMetaByName('description', description);
      setMetaByProperty('og:description', description);
      setMetaByName('twitter:description', description);
    }

    setMetaByProperty('og:title', fullTitle);
    setMetaByName('twitter:title', fullTitle);
  }, [title, description]);
}
