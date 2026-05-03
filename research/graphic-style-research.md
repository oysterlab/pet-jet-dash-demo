# Graphic Style Research: Playable Pet Sticker Game

Date: 2026-05-03

## Goal

Find an asset style that works in both places:

1. In-game character and collectible capsule rewards.
2. Downloadable PNG stickers for SNS and messengers.

The style must be readable at small sizes, emotionally appealing to pet owners, and robust for AI generation from one uploaded pet photo.

## Key Constraints

- Stickers should be transparent PNG.
- Character must remain recognizable as the user's pet.
- Pet face and markings matter more than detailed body anatomy.
- The in-game character should read clearly at roughly 128-256px.
- Messenger stickers need strong silhouette, high contrast, and clear expression.
- Text should be short. LINE guidance recommends easily understandable expressions and warns against poor visibility or full-length/tall characters. LINE custom sticker guidance recommends short text and outlines for readability.

## Market and Design Signals

### Sticker trends

Common 2025 sticker trend reports converge on:

- Retro revival / nostalgic pop.
- Bold typography.
- Hand-drawn illustration.
- Minimalism.
- Holographic / shiny / collectible effects.
- Cottagecore / nature / cozy aesthetics.
- Clear or transparent sticker formats.

Implication:

For our product, the strongest parts are not general retro or typography. The strongest parts are collectible sticker treatment, hand-drawn charm, transparent PNG, bold outline, and cozy/cute pet identity.

### Game style trends

Casual mobile game art remains friendly to:

- Cute cartoon.
- Cozy aesthetics.
- Character customization.
- Toy-like / clay-like characters.
- Simple, readable mascots.

Relevant references:

- Bongo Cat: simple meme character, hats/skins, item drops, broad appeal.
- Little Kitty, Big City: pet customization and hats; users respond strongly to making the game cat resemble their real cat.
- Usagi Shima / Neko Atsume: low-pressure cute pet collection and soft cozy art.

Implication:

The product should feel like a cute collectible toy/sticker system, not a polished fantasy illustration generator.

### AI pet/sticker competition

Competitor styles commonly include:

- Cartoon.
- Chibi / kawaii.
- 3D cartoon.
- Claymation / clay style.
- Storybook.
- Comic.
- Royal / costume portrait.
- Anime.

Implication:

These styles are already understood by users. Differentiation should come from playable collection and consistent sticker set quality, not from inventing a strange new art style.

## Candidate Style Directions

### 1. Kawaii Sticker Mascot

Description:

- 2D cute sticker style.
- Big head, small rounded body.
- Thick white outer sticker border and darker inner outline.
- Simple paws, expressive face, big eyes if compatible with the pet.
- Bright but soft colors.
- Transparent PNG.

Strengths:

- Best messenger readability.
- Best for LINE/Kakao/WhatsApp-style stickers.
- Low generation risk.
- Works well at small sizes.
- Easy to create multiple expressions.
- Strong fit for the "sticker book" reward loop.

Weaknesses:

- Can look generic if the pet's markings are oversimplified.
- Needs strong prompt/control to preserve unique fur patterns.

Best use:

- Default style.
- First paid product.
- First sticker set.

Verdict:

Highest confidence first style.

### 2. 3D Toy Figure / Clay Toy

Description:

- Miniature toy/figurine look.
- Soft 3D lighting, smooth rounded forms.
- Clay or vinyl toy material.
- Pet face and markings stylized onto a toy body.
- Can include small accessories like jetpack, helmet, scarf, crown.

Strengths:

- Feels premium and giftable.
- Strong "I want to save this" appeal.
- Works well for capsule/reward presentation.
- Good for screenshots and store visuals.

Weaknesses:

- Harder to keep identity consistent across six stickers.
- More likely to become uncanny or too generic.
- Transparent edges and small-size readability need post-processing.

Best use:

- Premium style pack.
- Golden sticker / rare reward.
- Landing page hero examples.

Verdict:

Best second style, not default.

### 3. Cozy Storybook Pet

Description:

- Soft hand-drawn illustration.
- Warm colors, gentle texture.
- Cottagecore / wholesome game mood.
- Pet in small narrative poses: sleeping, flying, snack hunting, surprised.

Strengths:

- Emotionally warm.
- Strong for pet owners who dislike overly synthetic AI images.
- Good seasonal packs.

Weaknesses:

- Softer edges can reduce messenger readability.
- More detail may be lost in gameplay.
- Needs careful contrast and outline.

Best use:

- Seasonal packs.
- gift/memory-oriented expansion.

Verdict:

Good later pack, not first gameplay style.

### 4. Retro Pixel Pet

Description:

- Pixel art pet avatar.
- Arcade runner feel.
- Simple sprite animation.

Strengths:

- Fits games.
- Cheap to animate.
- Nostalgic.

Weaknesses:

- Weakest for mainstream pet-owner willingness to pay.
- Pet identity/markings are harder to preserve.
- Better for gamer audience than pet sharers.

Best use:

- Niche retro game pack.

Verdict:

Not first.

### 5. Comic Reaction Pet

Description:

- Bold comic ink lines.
- Exaggerated expressions.
- Action words, bursts, speed lines.

Strengths:

- Great for "Dramatic Oops" and failure stickers.
- Strong high-energy game fit.
- Readable if done simply.

Weaknesses:

- Less universally cute.
- Can become noisy.

Best use:

- Subset of the default set, especially fail/boost/near-miss stickers.

Verdict:

Use as an accent inside Kawaii Sticker Mascot, not as the whole brand style.

## Recommended First Style System

Primary style:

Kawaii Sticker Mascot.

Premium variant:

3D Toy Figure / Clay Toy.

Accent language:

Comic reaction effects for speed, fail, boost, and near-miss stickers.

## First Sticker Set Art Direction

Set name:

Pet Jet Sticker Book: Starter Set

Visual rules:

- Square transparent PNG, 1024x1024 master, export-friendly to 512x512.
- Character occupies 70-85% of canvas.
- Thick white sticker border.
- Dark inner outline for readability.
- Avoid long text. Use 1-3 words.
- Text must have outline or high-contrast bubble.
- Keep one clear pose per sticker.
- Use the same pet markings and accessory language across the set.

Starter 6 stickers:

1. Happy Pet
   - Pet smiling / sparkling.
   - Text: "Yay!"

2. Snack Master
   - Pet holding snack or surrounded by treats.
   - Text: "Snack!"

3. Tiny Pilot
   - Pet with mini jetpack/goggles.
   - Text: "Zoom!"

4. Brave Baby
   - Pet narrowly dodging obstacle, confident face.
   - Text: "Close!"

5. Dramatic Oops
   - Pet surprised/tumbling but cute.
   - Text: "Oops"

6. Golden Pet
   - Rare shiny/foil-like treatment, trophy pose.
   - Text: "Win!"

## Game Asset Style

In-game assets should be simpler than the downloadable stickers.

Player:

- Same pet head/body silhouette as sticker.
- Limited animation: bob, squash/stretch, jet flame, blink, hit reaction.
- Do not depend on many frame-by-frame sprites initially.

Capsules:

- Rounded capsule/egg/gift box with paw emblem.
- Golden capsule uses shine/glint, not gambling language.

Snacks:

- Simple bone, fish, cookie, or treat icon depending on pet type.

Obstacles:

- Cute household hazards: vacuum, bath bubble, cardboard box, slipper, cucumber, mail package.
- Avoid scary or violent hazards.

Background:

- Bright, simple, low-detail.
- Avoid visual noise behind the pet.
- Cozy room, park, or dreamy sky work better than city clutter.

## Prompting/Generation Requirements

For each user pet, generate:

- Base character reference.
- 6 sticker poses.
- 1 in-game neutral character.
- Optional hit/fly expression variants.

Prompt priorities:

1. Preserve breed/type, fur pattern, eye color, and distinctive markings.
2. Simplify body into rounded mascot shape.
3. Use transparent background.
4. Use thick white sticker outline.
5. Keep expression clear.
6. Avoid extra limbs, extra accessories, or busy backgrounds.

## Recommendation

Start with Kawaii Sticker Mascot as the default and test 3D Toy Figure as the premium pack.

Why:

- Kawaii Sticker Mascot is the safest for messenger usability, game readability, and AI consistency.
- 3D Toy Figure is more premium and shareable but riskier as the default.
- Cozy Storybook is attractive but less readable in-game.
- Pixel should wait until there is a gamer-oriented pack.

## Key Sources

- LINE Creators Market sticker guidelines: https://creator.line.me/en/guideline/sticker/
- LINE custom sticker text readability guidance: https://creator.line.me/ja/guideline/customsticker/detail/
- Sticker design trend summaries: https://blog.stickerchimp.com/2025/04/top-selling-sticker-design-ideas-15-trends-for-2025/
- Sticker Mule 2025 trends: https://www.stickermule.com/jp/blog/sticker-trends-for-2025
- Bongo Cat Steam listing: https://store.steampowered.com/app/3419430/Bongo_Cat
- Little Kitty, Big City 2025 customization update coverage: https://noisypixel.net/little-kitty-big-city-august-2025-update/
- Usagi Shima review: https://www.pocketgamer.com/usagi-shima/review/
- PawFav AI: https://www.pawfav.ai/
- PawScene style list: https://pawscene.com/
- PetToArt style list: https://petto.art/
