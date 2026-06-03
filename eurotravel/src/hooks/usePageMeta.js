import { useEffect } from 'react';

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | Euro Travel` : 'Euro Travel – Kombi prevoz putnika';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (description) meta.content = description;
  }, [title, description]);
}
