/**
 * GSAP + ScrollTrigger animations.
 * Hero heading reveal on load + section fade-up on scroll.
 * Respects prefers-reduced-motion.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  // Hero heading reveal
  const heroHeading = document.getElementById('hero-heading');
  if (heroHeading) {
    gsap.fromTo(
      heroHeading,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }

  // Section fade-up on scroll
  const animateElements = document.querySelectorAll('[data-animate="fade-up"]');
  animateElements.forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  });
} else {
  // Immediately show all animated elements
  document.querySelectorAll('[data-animate]').forEach((el) => {
    (el as HTMLElement).style.opacity = '1';
    (el as HTMLElement).style.transform = 'none';
  });

  const heroHeading = document.getElementById('hero-heading');
  if (heroHeading) {
    heroHeading.style.opacity = '1';
    heroHeading.style.transform = 'none';
  }
}
