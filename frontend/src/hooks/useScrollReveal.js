import { useEffect } from 'react';

export default function useScrollReveal(dependencies = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
      }
    );

    const elements = document.querySelectorAll('.reveal:not(.visible)');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, dependencies);
}
