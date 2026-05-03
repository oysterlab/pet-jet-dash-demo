# Mobile Asset Guide

Date: 2026-05-04

## Purpose

Mobile is the primary surface for Pet Jet Dash. Users should be able to open the game in a mobile browser, add it to the home screen, play in portrait mode, and download collected stickers.

## Required Mobile Assets

Use the generated pet mascot as the source for app icons.

Files:

- `assets/pwa/icon-192.png`
- `assets/pwa/icon-512.png`
- `assets/pwa/maskable-192.png`
- `assets/pwa/maskable-512.png`

Icon rules:

- Pet face should remain large and readable.
- Avoid text inside the icon.
- Use a solid brand-color background.
- Keep safe padding for maskable icons.

## Mobile Gameplay Requirements

- Portrait layout should be first-class.
- Canvas should use a taller logical playfield on phones.
- Primary control: press and hold anywhere on the game canvas to fly.
- Secondary control: sticky Boost button below the canvas.
- Avoid tiny UI controls inside the canvas.
- Sticker downloads should remain normal links so mobile browsers can handle save/share flows.

## Optional Future Assets

If the game becomes packaged as a store app or richer PWA, generate:

- 1290x2796 mobile launch/splash image.
- 1170x2532 store screenshot frame.
- 1080x1920 short-video share background.
- 1200x630 Open Graph share image.
- 1024x500 Play Store feature graphic.

Prompt base:

```text
Create a mobile promotional asset for Pet Jet Dash using the original cute 2D sticker mascot style. Show the silver tabby pet mascot with green crocheted hat and tiny jetpack, bright friendly colors, clean dark outline, cozy pastel arcade mood. No copyrighted character references, no logos except the product name if requested, no watermark.
```
