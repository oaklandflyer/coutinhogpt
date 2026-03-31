# 3D Experience Blueprint (Refined Art Direction)

## 1) Cinematic camera choreography
- Camera is shot-driven, not linear.
- Six chapters each define a unique:
  - camera position
  - lookAt target
  - field of view
  - easing curve
- Scroll only selects and blends between shots; transitions include slight overshoot for a directed, cinematic feel.
- Mouse adds damped inertia/lag so movement feels weighted and premium.

## 2) Dominant visual anchor
- One central **Hero Core** object anchors the entire world.
- The core evolves chapter-by-chapter via emissive intensity, distortion, and pulse.
- All supporting elements are secondary and positioned to reinforce this focal hierarchy.

## 3) Lighting and depth strategy
- Studio HDR environment for controlled reflective response.
- Lighting rig:
  - key directional (shadow casting)
  - rim directional (edge separation)
  - low fill/point accent
- Intentional fog falloff for depth layers.
- Subtle bloom + vignette for cinematic highlight handling.

## 4) Composition simplification
- Visual system intentionally reduced: no crowded decorative objects.
- Retained only elements that guide attention and support chapter storytelling:
  - Hero Core
  - Experience monoliths
  - Sparse spatial typography
  - stage geometry

## 5) Experience content integration
- Experience items are environmental monoliths (not floating UI cards).
- Content appears as engraved/spatial labels around scene objects.
- Overlay UI uses short, high-impact chapter copy with large typography.

## 6) Signature moment
- In the first seconds, Hero Core reacts to cursor proximity (pulse + distortion + lighting response),
  immediately signaling an interactive 3D experience.
