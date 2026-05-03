# Asset Generation Guide

Date: 2026-05-03

Project: Pet Jet Dash

## Purpose

Use this document to generate a consistent set of game and sticker assets from:

1. One pet photo.
2. One to three style reference images.

The target style is an original cute 2D sticker mascot style suitable for:

- A small mobile/web arcade game.
- Transparent PNG messenger stickers.
- A collectible sticker book reward loop.

## Important IP Rule

Do not ask the image model to copy any known character, brand, mascot, anime, game franchise, studio, or sticker IP.

Avoid prompts like:

- "Sanrio style"
- "LINE Friends style"
- "Pokemon style"
- "Disney style"
- "Ghibli style"
- "Like [specific character]"

Use the style reference images only for broad visual direction:

- Line weight.
- Simplicity.
- Color mood.
- Readability.
- Sticker-like presentation.

Do not copy characters, compositions, logos, text, facial features, or distinctive designs from the reference images.

## Input Images

Prepare:

- `pet_reference.png` or `.jpg`: clear front/three-quarter photo of the pet.
- `style_reference_01.png`: target sticker/game style reference.
- Optional `style_reference_02.png`, `style_reference_03.png`: additional references for color, UI, or effects.

Pet photo requirements:

- Pet face visible.
- Good lighting.
- Minimal obstruction.
- Distinctive markings visible.
- Avoid multiple pets in one image for the first pass.

## Recommended Generation Order

Generate assets in this order:

1. Base pet mascot.
2. Six pet stickers.
3. In-game pet player.
4. Collectible items.
5. Obstacles.
6. Effects.
7. UI icons.
8. Backgrounds.
9. Ground strip.

Reason:

The base pet mascot establishes the identity. Use the base pet mascot output as an additional reference when generating the six stickers and in-game pet player.

## Common Prompt Prefix

Use this prefix for all generations with a style reference image:

```text
Use the provided style reference image only as a high-level art direction reference for color mood, line weight, simplicity, and sticker-like readability. Do not copy any character, composition, logo, text, mascot, or distinctive design from the reference image.

Create original game assets for a cute 2D pet sticker arcade game. All assets must be visually consistent: thick white sticker border where appropriate, clean dark inner outline, soft rounded shapes, bright friendly colors, transparent background for item/sticker assets, and strong readability at small mobile game sizes.

Avoid copyrighted characters, brand marks, logos, realistic rendering, horror, violence, cluttered details, and complex backgrounds.
```

## Common Negative Prompt Block

Add this block when needed:

```text
Do not copy the reference image. Do not create anything resembling a known character, mascot, game franchise, anime character, Sanrio-style character, LINE Friends-style character, Pokemon-style creature, Disney-style character, or any branded IP. No logos, no trademarks, no watermark, no readable brand text.
```

## Output Settings

For stickers/items/UI/effects:

- Format: PNG.
- Background: transparent.
- Canvas: square.
- Master size: 1024x1024 if available.
- Keep the subject centered.

For game backgrounds:

- Format: PNG or WebP.
- Background: opaque.
- Aspect ratio: 16:9.
- Recommended size: 1536x864 or 1920x1080.

For ground strip:

- Format: PNG.
- Transparent background if only the strip is needed.
- Wide horizontal strip.
- Should tile horizontally.

## Pet Asset Prompts

### 01. Base Pet Mascot

File name:

`assets/generated/pet/base_pet_mascot.png`

Inputs:

- Pet photo.
- Style reference image.

Prompt:

```text
Using the uploaded pet photo as the identity reference, create an original playable pet mascot for a cute arcade game called Pet Jet Dash.

Make the pet into a charming 2D sticker mascot with a big expressive head, small rounded body, tiny paws, and a small jetpack accessory. Preserve the pet's real species, breed impression, fur colors, facial markings, ear shape, eye color, muzzle shape, and overall personality from the photo.

The mascot should look like a downloadable chat sticker and also work as an in-game character. Use a thick white sticker outline, a clean dark inner outline, simple readable shapes, and a transparent background.

Pose: floating slightly upward as if flying with a tiny jetpack, cheerful and energetic expression.

Avoid: realistic rendering, detailed background, extra pets, human clothing except small game accessories, copyrighted character styles, brand logos, text, watermark.
```

### 02. Happy Pet Sticker

File name:

`assets/generated/stickers/01_happy_pet.png`

Inputs:

- Pet photo.
- Base pet mascot output.
- Style reference image.

Prompt:

```text
Create a transparent PNG chat sticker of the uploaded pet as the same original 2D cute sticker mascot.

Pose: happy celebration, sparkling eyes, tiny paws raised.
Text: "Yay!"

Keep the pet's real fur colors, facial markings, ear shape, eye color, and face shape recognizable. Match the base pet mascot design, including the same accessory language and outline treatment.

Use a thick white sticker border, dark inner outline, clean simple shapes, centered square composition.

No background, no extra characters, no copyrighted styles, no logos, no watermark.
```

### 03. Snack Master Sticker

File name:

`assets/generated/stickers/02_snack_master.png`

Prompt:

```text
Create a transparent PNG chat sticker of the uploaded pet as the same original 2D cute sticker mascot.

Pose: excitedly holding or reaching for a cute pet snack.
Text: "Snack!"

Preserve the pet's identity, fur pattern, face shape, ears, eyes, and distinctive markings from the photo. Match the base pet mascot design.

Use a thick white sticker border, dark inner outline, bright friendly colors, simple readable silhouette, centered square composition.

No background, no logos, no extra animals, no watermark.
```

### 04. Tiny Pilot Sticker

File name:

`assets/generated/stickers/03_tiny_pilot.png`

Prompt:

```text
Create a transparent PNG chat sticker of the uploaded pet as the same original 2D cute sticker mascot.

Pose: flying with a tiny jetpack and small goggles, energetic expression.
Text: "Zoom!"

Preserve the pet's real identity and distinctive markings. Match the base pet mascot design.

Use a thick white sticker border, dark inner outline, clean 2D sticker style, square centered composition.

No background, no brand references, no copyrighted character look, no watermark.
```

### 05. Brave Baby Sticker

File name:

`assets/generated/stickers/04_brave_baby.png`

Prompt:

```text
Create a transparent PNG chat sticker of the uploaded pet as the same original 2D cute sticker mascot.

Pose: brave and proud after narrowly dodging an obstacle, confident cute face, tiny action lines.
Text: "Close!"

Preserve the pet's fur colors, facial markings, ear shape, eye color, and face shape. Match the base pet mascot design.

Use a thick white sticker border, dark inner outline, simple readable silhouette, playful but clean comic accent.

No background, no extra characters, no injury, no violence, no logos, no watermark.
```

### 06. Dramatic Oops Sticker

File name:

`assets/generated/stickers/05_dramatic_oops.png`

Prompt:

```text
Create a transparent PNG chat sticker of the uploaded pet as the same original 2D cute sticker mascot.

Pose: cute surprised tumble, harmless dramatic fail expression.
Text: "Oops"

Preserve the pet's fur colors, markings, ears, eyes, and face shape. Match the base pet mascot design.

Use a thick white sticker outline, dark inner line, simple readable shapes, playful comic reaction effect.

No background, no injury, no violence, no extra characters, no logos, no watermark.
```

### 07. Golden Pet Sticker

File name:

`assets/generated/stickers/06_golden_pet.png`

Prompt:

```text
Create a transparent PNG chat sticker of the uploaded pet as the same original 2D cute sticker mascot.

Pose: victory trophy pose, proud and adorable, subtle golden sparkle treatment.
Text: "Win!"

Preserve the pet's real fur colors, distinctive markings, ears, eyes, and face shape. Match the base pet mascot design.

Use a thick white sticker outline, dark inner outline, gold sparkle accents, clean square composition.

No background, no logos, no brand references, no watermark.
```

### 08. In-Game Pet Player

File name:

`assets/generated/pet/ingame_pet_player.png`

Prompt:

```text
Create a simplified in-game version of the uploaded pet mascot for a casual 2D arcade game.

The character must be readable at 128px. Use the same pet identity, fur colors, markings, ear shape, and eye color, but simplify details into bold shapes.

Style: cute 2D sticker mascot, thick outline, small rounded body, tiny jetpack, transparent background.

Pose: neutral flying pose, facing right, centered.

No text, no background, no shadows outside the character, no extra props except the jetpack, no logos, no watermark.
```

## Collectible Item Prompts

These do not need the pet photo. Use style reference only.

### 09. Sticker Capsule

File name:

`assets/generated/items/sticker_capsule.png`

Prompt:

```text
Create a collectible sticker capsule item for a cute 2D pet arcade game.

Asset: a rounded capsule or gift pod with a small paw emblem, designed as an in-game collectible. It should feel exciting and friendly, not like gambling.

Style: original cute sticker game asset, thick white sticker border, dark inner outline, soft rounded forms, bright colors, transparent background.

Design details:
- Capsule shape should be instantly readable at 64px.
- Use teal, coral, cream, and gold accents.
- Add a small shine or glint.
- No text.
- No logo.
- Centered square composition.
```

### 10. Golden Capsule

File name:

`assets/generated/items/golden_capsule.png`

Prompt:

```text
Create a special golden sticker capsule item for a cute 2D pet arcade game.

Asset: a rare-looking capsule that guarantees progress in a sticker book. It should feel celebratory and collectible, not like a casino loot box.

Style: original cute sticker game asset, thick white sticker border, dark inner outline, soft rounded shape, transparent background.

Design details:
- Warm gold body with small sparkle highlights.
- Small paw emblem on the front.
- Clear silhouette readable at 64px.
- No text.
- No brand marks.
- Centered square composition.
```

### 11. Snack Item

File name:

`assets/generated/items/snack_item.png`

Prompt:

```text
Create a cute snack collectible item for a 2D pet arcade game.

Asset: a simple treat icon that can be collected during gameplay.

Style: original cute sticker game asset, thick white sticker border, dark inner outline, transparent background, readable at 48px.

Design details:
- Make it look like a cute pet treat or cookie.
- Rounded shape, warm color, small paw print detail.
- Friendly and appetizing, not realistic.
- No text.
- No background.
- Centered square composition.
```

### 12. Boost Battery

File name:

`assets/generated/items/boost_battery.png`

Prompt:

```text
Create a boost battery collectible item for a cute 2D pet jetpack arcade game.

Asset: a small energy battery or fuel cell that charges the player's boost.

Style: original cute sticker game asset, thick white sticker border, dark inner outline, transparent background, bright friendly colors.

Design details:
- Rounded battery shape.
- Teal body with yellow energy core.
- Small lightning or paw-energy symbol.
- Readable at 48-64px.
- No text.
- No logo.
- Centered composition.
```

### 13. Lucky Charm

File name:

`assets/generated/items/lucky_charm.png`

Prompt:

```text
Create a lucky charm collectible item for a cute 2D pet sticker game.

Asset: a small charm that increases sticker capsule progress.

Style: original cute sticker game asset, thick white sticker border, dark inner outline, transparent background, soft rounded forms.

Design details:
- Use a simple charm shape, such as a small star, paw charm, or ribbon charm.
- It should feel lucky, cute, and collectible.
- Use gold and mint accents.
- Readable at 48px.
- No text.
- No background.
```

## Obstacle Prompts

Use style reference only.

### 14. Vacuum Obstacle

File name:

`assets/generated/obstacles/vacuum_obstacle.png`

Prompt:

```text
Create a cute household obstacle for a 2D pet arcade game.

Asset: a stylized vacuum cleaner that pets would want to avoid. It should be playful, not scary.

Style: original cute sticker game asset, thick white sticker border, dark inner outline, transparent background, simple rounded shapes.

Design details:
- Side-view obstacle facing left.
- Compact silhouette readable at 96px.
- Use soft teal and gray colors with coral accent.
- Add tiny motion marks or dust puff, but keep it clean.
- No brand marks.
- No text.
```

### 15. Bath Bubble Obstacle

File name:

`assets/generated/obstacles/bath_bubble_obstacle.png`

Prompt:

```text
Create a cute bath bubble obstacle for a 2D pet arcade game.

Asset: a floating cluster of bath bubbles or suds that the pet avoids.

Style: original cute sticker game asset, thick white sticker border, dark inner outline, transparent background, soft rounded forms.

Design details:
- Cluster of 3-5 bubbles.
- Light blue and white with shiny highlights.
- Playful, harmless, readable at 96px.
- No text.
- No background.
```

### 16. Cardboard Box Obstacle

File name:

`assets/generated/obstacles/cardboard_box_obstacle.png`

Prompt:

```text
Create a cute cardboard box obstacle for a 2D pet arcade game.

Asset: a small open cardboard box that appears as an obstacle.

Style: original cute sticker game asset, thick white sticker border, dark inner outline, transparent background, simple rounded shapes.

Design details:
- Warm cardboard color.
- Slightly open flaps.
- Small paw sticker mark on one side.
- Readable silhouette at 96px.
- No shipping logos.
- No text.
```

### 17. Slipper Obstacle

File name:

`assets/generated/obstacles/slipper_obstacle.png`

Prompt:

```text
Create a cute slipper obstacle for a 2D pet arcade game.

Asset: a soft household slipper lying on the ground.

Style: original cute sticker game asset, thick white sticker border, dark inner outline, transparent background.

Design details:
- Rounded slipper shape.
- Cozy fabric texture simplified into flat shapes.
- Coral or mint color.
- Readable at 96px.
- No brand marks.
- No text.
```

### 18. Cucumber Obstacle

File name:

`assets/generated/obstacles/cucumber_obstacle.png`

Prompt:

```text
Create a funny cucumber obstacle for a cute pet arcade game.

Asset: a stylized cucumber lying on the ground as a harmless surprise obstacle.

Style: original cute sticker game asset, thick white sticker border, dark inner outline, transparent background, simple rounded shapes.

Design details:
- Green cucumber with tiny bumps.
- Slight comic surprise marks around it.
- Cute and silly, not scary.
- Readable at 96px.
- No text.
```

### 19. Mail Package Obstacle

File name:

`assets/generated/obstacles/mail_package_obstacle.png`

Prompt:

```text
Create a cute mail package obstacle for a 2D pet arcade game.

Asset: a small parcel box that the pet must dodge.

Style: original cute sticker game asset, thick white sticker border, dark inner outline, transparent background.

Design details:
- Rounded rectangular package.
- Tape strip and small paw stamp.
- Warm neutral color with teal accent.
- No real logos, no readable address, no brand marks.
- Readable at 96px.
```

## Effect Prompts

Use style reference only.

### 20. Jet Flame Effect

File name:

`assets/generated/effects/jet_flame.png`

Prompt:

```text
Create a small jetpack flame effect for a cute 2D pet arcade game.

Asset: a flame burst that appears behind a tiny jetpack.

Style: original cute game effect, clean simple shapes, transparent background.

Design details:
- Teardrop flame shape.
- Yellow center, coral outer flame.
- Slight white outline.
- Readable at 48-64px.
- No smoke-heavy realism.
- No background.
```

### 21. Speed Lines

File name:

`assets/generated/effects/speed_lines.png`

Prompt:

```text
Create a cute speed-line effect asset for a 2D pet jetpack arcade game.

Asset: simple motion streaks used when the pet boosts forward.

Style: clean cartoon game effect, transparent background, friendly colors.

Design details:
- 4-6 short rounded streaks.
- Teal, cream, and white.
- Horizontal direction.
- No character, no text.
- Should layer cleanly behind the pet.
```

### 22. Sparkle Reward Effect

File name:

`assets/generated/effects/sparkle_reward.png`

Prompt:

```text
Create a sparkle reward effect for a cute pet sticker game.

Asset: small star sparkles used when collecting a sticker capsule or completing a sticker.

Style: original cute game effect, transparent background, simple flat shapes.

Design details:
- 5-8 small sparkles.
- Gold and white.
- Rounded star shapes.
- No text.
- No background.
- Should work as a particle burst overlay.
```

## UI Prompts

Use style reference only.

### 23. Sticker Book Icon

File name:

`assets/generated/ui/sticker_book_icon.png`

Prompt:

```text
Create a sticker book icon for a cute pet sticker collection game.

Asset: a small closed sticker album with a paw emblem.

Style: original cute sticker game UI icon, thick white sticker border, dark inner outline, transparent background.

Design details:
- Rounded square book shape.
- Cream cover with teal spine and gold paw emblem.
- Readable at 64px.
- No text.
- No logos.
```

### 24. Locked Sticker Slot

File name:

`assets/generated/ui/locked_sticker_slot.png`

Prompt:

```text
Create a locked sticker slot icon for a cute pet sticker book UI.

Asset: an empty sticker silhouette with a tiny lock, showing that a sticker is not collected yet.

Style: original cute UI asset, transparent background, soft rounded shapes, clean dark outline.

Design details:
- Pale cream sticker silhouette.
- Small friendly lock icon.
- Low contrast enough to feel inactive, but still readable.
- No text.
- No background.
```

### 25. Collected Sticker Slot

File name:

`assets/generated/ui/collected_sticker_slot.png`

Prompt:

```text
Create a collected sticker slot frame for a cute pet sticker book UI.

Asset: a decorative frame that holds a collected pet sticker.

Style: original cute UI asset, transparent background, soft rounded forms, thick white border, dark inner outline.

Design details:
- Rounded square frame.
- Small paw corners.
- Gold accent for collected state.
- Empty center area for placing the sticker.
- No text.
- No character.
```

## Background Prompts

Use style reference only. Backgrounds should be less detailed than stickers so gameplay remains readable.

### 26. Cozy Room Background

File name:

`assets/generated/backgrounds/cozy_room_background.png`

Prompt:

```text
Create a side-scrolling game background for a cute 2D pet jetpack arcade game.

Style: original cozy cartoon background, soft colors, simple shapes, low detail, mobile game readable.

Scene:
- Cozy room interior.
- Soft floor line, wall, small shelves, pet toys, window, cushion.
- No specific brands, no posters, no readable text.
- Keep center gameplay area clean and uncluttered.
- Background should not compete with the pet character or items.

Output:
- 16:9 game background.
- Opaque background.
- No characters.
```

### 27. Dreamy Sky Background

File name:

`assets/generated/backgrounds/dreamy_sky_background.png`

Prompt:

```text
Create a side-scrolling game background for a cute 2D pet jetpack arcade game.

Style: original cozy cartoon background, soft colors, simple shapes, low detail.

Scene:
- Dreamy pastel sky with soft clouds.
- Gentle hills or park shapes near the bottom.
- Clear open middle area for gameplay.
- No characters, no text, no logos.
- Avoid busy detail.

Output:
- 16:9 game background.
- Opaque background.
```

### 28. Ground Strip

File name:

`assets/generated/backgrounds/ground_strip.png`

Prompt:

```text
Create a seamless horizontal ground strip for a cute 2D pet arcade game.

Style: original cute cartoon game asset, simple rounded shapes, clean outline.

Design:
- Cozy floor or soft grass strip.
- Subtle paw pattern.
- Designed to repeat horizontally.
- No text, no logos, no characters.
- Transparent background if only the strip is needed, otherwise simple opaque base.
```

## QA Checklist

Review every generated asset before using it.

### Identity QA for Pet Assets

- Does it still look like the uploaded pet?
- Are fur color and markings preserved?
- Are ears, muzzle, and eye color reasonably preserved?
- Does it avoid looking like a generic pet?
- Does it avoid resemblance to known characters?

### Sticker QA

- Transparent background.
- Thick white outer border.
- Dark inner outline.
- Works at 128px.
- Text is readable.
- Text is short and useful in conversation.
- No brand names or logos.
- No crowded detail.

### Game Asset QA

- Readable at intended size:
  - Items: 48-64px.
  - Obstacles: 96px.
  - Player: 128px.
- Strong silhouette.
- No small important details.
- Consistent palette and outline.
- Does not blend into background.

### Background QA

- Gameplay lane is clear.
- No text/logos.
- Low detail in the center.
- Character and collectibles remain readable on top.
- Not too dark, not too saturated.

## Suggested Folder Structure

```text
assets/
  input/
    pet_reference.png
    style_reference_01.png
    style_reference_02.png
  generated/
    pet/
      base_pet_mascot.png
      ingame_pet_player.png
    stickers/
      01_happy_pet.png
      02_snack_master.png
      03_tiny_pilot.png
      04_brave_baby.png
      05_dramatic_oops.png
      06_golden_pet.png
    items/
      sticker_capsule.png
      golden_capsule.png
      snack_item.png
      boost_battery.png
      lucky_charm.png
    obstacles/
      vacuum_obstacle.png
      bath_bubble_obstacle.png
      cardboard_box_obstacle.png
      slipper_obstacle.png
      cucumber_obstacle.png
      mail_package_obstacle.png
    effects/
      jet_flame.png
      speed_lines.png
      sparkle_reward.png
    ui/
      sticker_book_icon.png
      locked_sticker_slot.png
      collected_sticker_slot.png
    backgrounds/
      cozy_room_background.png
      dreamy_sky_background.png
      ground_strip.png
```

## Practical Notes

- Generate the base pet mascot first.
- Use the base pet mascot as an additional reference for all pet stickers.
- Generate stickers one by one, not as a six-panel sheet, for better quality.
- Generate common game assets without the pet photo, using only style references.
- If a result is too detailed, regenerate with "simpler silhouette, readable at 64px."
- If a result loses pet identity, regenerate with stronger preservation instructions for fur pattern, ears, eyes, and face shape.
