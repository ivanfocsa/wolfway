/**
 * Lenis smooth scrolling — desktop only.
 * Disabled on touch devices and when prefers-reduced-motion is set.
 * Synced with GSAP ticker to prevent jitter with ScrollTrigger.
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const isTouchDevice =
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  window.matchMedia('(pointer: coarse)').matches;

if (!prefersReducedMotion && !isTouchDevice) {
  const lenis = new Lenis({
    autoRaf: false,
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  (window as any).lenis = lenis;

  // Sync with GSAP ticker for ScrollTrigger compatibility
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}
