---
"@instantphoto/react": minor
---

Add an optional `transform` prop to `InstantPhotoFrame` (renders the source image with a specific pan/zoom instead of the default auto center-fill crop) and to `InstantPhotoImageEditor`/`InstantPhotoEditor` (opens the editor seeded from a previously-saved transform instead of always starting fresh).

Together these let a consumer store just the original source image plus a small `ImageTransform` (`{panX, panY, scale}`, already returned by `onTransformChange`/`onSettingsChange`) and reconstruct the exact same framed rendering anywhere — no need to bake the crop, film effects, or frame into an exported raster image to preserve it.

Also fixes `InstantPhotoImageEditor`'s `onSettingsChange` to fire when `src` changes, not just when frame/film/effect props change — previously, switching to a new image (which resets or reseeds the transform) didn't emit a fresh settings snapshot, so a consumer persisting `onSettingsChange`'s `transform` field could be left with the previous image's stale value.
