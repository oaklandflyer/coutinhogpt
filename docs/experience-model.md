# 3D Experience Blueprint

## Interaction model
- The site is a **single immersive 3D world** with a fixed `Canvas` and a scroll-synchronized camera path.
- User scroll progression (`0 -> 1`) drives scene progression across six narrative chapters.
- Mouse position adds subtle camera parallax and scene drift to keep the world alive even when not scrolling.
- On mobile, motion intensity is reduced and overlays are simplified for readability/performance.

## Scene structure
1. **Arrival Chamber (Hero)**
   - Floating monolith ring and title beacon.
   - Large 3D text for “Andrew Coutinho”.
2. **Positioning Axis**
   - Orbital lines + anchored statement slab.
3. **Experience Constellation**
   - Interactive depth panels mapped in 3D space for core roles.
4. **Impact Field**
   - Four outcome nodes connected by light trails.
5. **Capabilities Rail**
   - Rotating capability shards representing domain strengths.
6. **Final Signal (Contact)**
   - Bright focal object + final CTA layer.

## Camera behavior
- Perspective camera starts near the hero beacon and travels on a gentle spline-like path built with progressive target vectors.
- Every chapter has a target camera position and look-at point.
- Frame loop smoothly lerps toward the chapter target plus mouse-driven offsets.

## Scroll and mouse choreography
- Scroll progression is read from page scroll (`window.scrollY / (documentHeight - innerHeight)`).
- A chapter index is derived from progress bands and used to drive active UI overlays.
- Framer Motion powers overlay fade/slide transitions and chapter text timing.
- 3D objects use subtle per-frame animation + chapter-dependent emphasis (scale/glow/rotation).

## UI integration strategy
- Keep a lightweight overlay UI for chapter labels and CTA, but primary storytelling stays inside the 3D scene.
- Avoid stacked resume sections; use concise chapter cards tied to scene progression.
