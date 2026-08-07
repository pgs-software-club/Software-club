/**
 * Site-wide animated background.
 *
 * Three slow-drifting aurora fields sit over a masked grid, blurred behind a
 * veil so page text always lands on a calm surface. It is pure CSS (see
 * globals.css) — no JS, no canvas — so it renders from the server, costs
 * nothing on hydration, and stops moving under prefers-reduced-motion.
 */
export function AnimatedBackground() {
  return (
    <div className="site-bg" aria-hidden="true">
      <div className="site-bg__aurora site-bg__aurora--1" />
      <div className="site-bg__aurora site-bg__aurora--2" />
      <div className="site-bg__aurora site-bg__aurora--3" />
      <div className="site-bg__veil" />
      <div className="site-bg__grid" />
    </div>
  );
}
