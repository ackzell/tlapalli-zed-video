# Tlapalli for Zed — Scene Breakdown for Motion Canvas

## YouTube / 16:9 / Voiceover only / Sequel to Tlapalli

---

### Visual language

Same as the first video — Obsidian dark background, gem palette, monospace font,
slow deliberate motion. New element: a **Zed accent color** (`#053794` — the
orange from the assistant dot in scene08) used for anything Zed-specific, so the
viewer always knows which world they're in.

Reused components: `GemSwatch`, `PillLabel`, `EditorWindow`, `CropTemplate`
New components: `JsonBlock`, `CommentBubble`

---

## SCENE 01 — Cold open / callback

**Narration beat**: none — ~3 seconds

**What's on screen:**

- The Tlapalli logo from the first video fades in — all 8 gems lit
- Holds for a moment
- Then a single new element appears beside it: the Zed logo mark (a simple
  geometric shape, drawn as an SVG outline in `#053794`)
- They sit next to each other — equal weight
- No text yet

**Motion Canvas notes:**

- Reuse the logo assembly from scene01 of the first video but abbreviated —
  gems fade in together, not staggered, since the audience already knows them
- Zed mark draws in with a single `Line` `end` tween — outline only, no fill
- Hold ~1.5s before scene transitions

---

## SCENE 02 — The comment

**Narration beat**: "Someone left a comment. They were waiting for Tlapalli to come to Zed. That was enough."

**What's on screen:**

- Dark screen
- A single comment bubble appears — styled like a minimal chat message,
  not tied to any specific platform UI
- Text inside: _"Any plans for a Zed theme?"_
- A cursor blinks at the end as if it was just typed
- Below the bubble, after a pause: a small gem dot appears (obsidian color) —
  representing the reply that never came in words, just in code

**Motion Canvas notes:**

- `CommentBubble` component: a `Rect` with rounded corners, `BASE.surfaceHi` fill,
  subtle `#053794` left border (3px) to signal "this is from outside your world"
- Text streams in with the same `streamText` pattern from scene08
- Cursor blink: `loop` on a `Rect` opacity
- Gem dot: `scaleIn` from 0, `shadowBlur` glow in obsidian mid color
- No label on the dot — let it breathe

---

## SCENE 03 — Situation: two editors, two worlds

**Narration beat**: "Zed is a different editor. Fast, focused, written in Rust. And it has its own way of doing themes."

**What's on screen:**

- Two editor windows side by side — left is VSCode-style (from `EditorWindow`
  component), right is a Zed-style window (slightly different tab bar shape,
  `#053794` accent on the title bar)
- Labels below: `VSCode` and `Zed`
- A small speed indicator appears under the Zed window — a simple horizontal
  bar that fills almost instantly, versus a slightly slower fill under VSCode
- Not a benchmark — just a visual impression of the speed difference

**Motion Canvas notes:**

- Reuse `EditorWindow` for VSCode side
- Zed window: a new variant with a thinner title bar and the orange accent
- Speed bars: `Rect` nodes that tween `width` from 0 to full — Zed fills in
  `0.2s`, VSCode in `0.5s`
- Keep it subtle — this isn't a competition scene, just context

---

## SCENE 04 — Conflict: different formats

**Narration beat**: "VSCode and Zed think about themes differently. In VSCode, each variant is its own file. In Zed, the whole family lives in one."

**What's on screen:**

- Left side: 16 small file icons appear, stacked in a loose grid — each labeled
  with a gem name (`obsidian-dark.json`, `gold-light.json`, etc.)
- Right side: a single file icon — `tlapalli.json`
- An arrow points from the 16 files to the 1
- Label: _"16 files → 1"_

**Motion Canvas notes:**

- File icons: small `Rect` nodes with a dog-ear corner (a `Line` across the
  top-right corner), gem color accent on the left border
- They appear with a `sequence` stagger, then the arrow draws, then the single
  file appears with a subtle scale pulse
- The 16 files dim slightly after the arrow draws — focus shifts right

---

## SCENE 05 — Conflict: the translation

**Narration beat**: "The keys don't map directly. VSCode thinks in components. Zed thinks in semantics. It's not a rename — it's a reinterpretation."

**What's on screen:**

- Two JSON blocks face each other, left and right
- Left block (VSCode): a few representative keys visible —
  `"sideBar.background"`, `"editorWidget.background"`, `"tab.activeBackground"`
- A transform arrow in the center — animated, pulsing gently
- Right block (Zed): the equivalent keys appear on the right —
  `"panel.background"`, `"elevated_surface.background"`, `"tab.active_background"`
- The keys on both sides highlight in their gem color as the mapping is shown
- Not all keys — just 3-4 pairs, enough to show the pattern

**Motion Canvas notes:**

- `JsonBlock` component: a `Rect` with `BASE.surface` fill, monospace text,
  a small header bar showing the filename
- VSCode block uses `BASE.border` header, Zed block uses `#053794` header
- Transform arrow: a `Line` with an arrowhead, animated `lineDash` offset
  to create a "flowing" effect — `loop` on `lineDashOffset`
- Key pairs highlight sequentially — `sequence` with 0.4s between each pair
- Highlighted keys get a brief `fill` change to their gem accent color

---

## SCENE 06 — The pipeline

**Narration beat**: "The pipeline ended up being three commands. Generate. Install locally. Copy to the extension repo."

**What's on screen:**

- Three terminal lines appear one by one, each growing from height 0 like scene06
  of the first video:
  ```
  $ npm run zed:generate-theme
  $ npm run zed:install-locally
  $ npm run zed:update-zed-repo
  ```
- After each line appears, a small label fades in to its right:
  `generate` → `test locally` → `publish`
- The install line gets a special beat: a Zed editor window appears briefly
  above it, a new theme entry flickers into its theme picker — no restart,
  no reload

**Motion Canvas notes:**

- Same `height: 0 → 100%` container pattern from scene06 of the first video
- Labels use `PillLabel` component in `#053794` accent
- The Zed editor window appearance: a small `EditorWindow`-variant that scales
  in above the second terminal line, a `Txt` node inside showing a theme name
  appearing — represents the auto-detection
- Hold on all three lines + labels for ~1s before transitioning

---

## SCENE 07 — Conflict: the color problem

**Narration beat**: "Then came the hard part. Colors. I tried deriving them automatically — green for added, yellow for modified, red for deleted. It worked, mostly. But maintaining it across 16 variants became exactly what I was trying to avoid."

**What's on screen:**

- Three colored indicators appear — green dot, yellow dot, red dot — labeled
  `added`, `modified`, `deleted`
- Below them: 16 small gem swatches appear
- Lines connect each swatch to the three indicators — each line a slightly
  different color, showing the "derived" calculation
- The lines multiply and tangle — visual complexity building
- Then: all lines disappear at once
- The three dots change to a single neutral color — the same across all swatches
- Label: _"One color. Works everywhere."_

**Motion Canvas notes:**

- Green/yellow/red dots: `Circle` nodes with their respective colors
- Connecting lines: `Line` nodes drawn with `end` tween, then removed with
  `opacity` fade simultaneously
- Single color replacement: tween all three dots to the fixed neutral color
  simultaneously
- The "tangle" effect: lines have slight random `y` offsets so they cross —
  `useRandom` seeded for consistency

---

## SCENE 08 — Change: uncertainty

**Narration beat**: "I'm not a Zed user. I didn't know if I was getting it right. So I iterated. Back and forth. Until I felt ready enough to ship."

**What's on screen:**

- A Zed-style editor window with a Tlapalli theme applied — one of the gem
  screenshots
- A hand-cursor icon moves around the screen, pausing on different UI elements
  — tab bar, sidebar, editor area — as if inspecting
- Small question marks appear briefly near each area, then fade
- After a few passes: the question marks stop appearing
- The cursor settles
- Label: _"Ready enough."_

**Motion Canvas notes:**

- Zed screenshot: `Img` node with one of the actual Zed screenshots
- Hand cursor: a simple SVG arrow, animated with `position` tweens
- Question marks: `Txt` nodes with `opacity` fade in/out, staggered
- "Ready enough" label: `PillLabel` in `BASE.textMid` — deliberately understated,
  not a celebration

---

## SCENE 09 — Result: the PR and the merge

**Narration beat**: "Zed requires a separate repo for extensions. So I created one, set up the same automation I already had, and opened the PR. I'd seen extensions wait weeks. Mine merged fast. No comments from the maintainers."

**What's on screen:**

- A minimal PR card appears — title: _"Add Tlapalli theme"_, status: `open`
- A clock or timer animates briefly — then
- Status flips to `merged` — in the Zed orange `#053794`
- A single notification dot appears — small, quiet
- Then fades
- Silence

**Motion Canvas notes:**

- PR card: a `Rect` with `BASE.surface` fill, title `Txt`, status pill
- Status pill color tweens from `BASE.text` to `#053794` on merge
- Notification dot: a `Circle` that scales in then fades — `easeOutBack` scale,
  slow `opacity` fade
- No celebration animation — the quietness is intentional

---

## SCENE 10 — Result: the Zed showcase

**Narration beat**: "Tlapalli is now available for Zed. All 16 themes. Dark and light."

**What's on screen:**

- The 8 gem swatches appear — same orbital reveal from scene10 of the first video,
  but abbreviated: they don't orbit, they simply scale in with a stagger
- Below each swatch, a small Zed screenshot thumbnail fades in — showing that
  gem's theme applied in Zed
- The Tlapalli logo assembles in the center — callback to the first video
- The Zed mark appears beside it

**Motion Canvas notes:**

- Reuse `GemSwatch` component
- Thumbnails: `Img` nodes with the Zed screenshots, `radius={4}`, small size
- Logo: abbreviated version of the scene01 assembly from the first video
- Zed mark beside logo: same outline draw as scene01 of this video

---

## SCENE 11 — Closing reflection

**Narration beat**: "One comment started this. I didn't want to say no. And somewhere in the process of building something for a community that isn't mine — I got a little bit won over."

**What's on screen:**

- The comment bubble from scene02 reappears — same styling
- Below it, the obsidian gem dot from scene02 reappears
- Then slowly, a new dot appears beside it — in `#053794` Zed orange
- The two dots sit together
- Label fades in: _"Tlapalli. Now for Zed too."_

**Motion Canvas notes:**

- Exact visual callback to scene02 — same positions, same timing
- The new orange dot `scaleIn` with the same animation as the obsidian one
- Label: `PillLabel` with `#053794` accent
- Hold for ~2s before fade

---

## SCENE 12 — Outro

**Narration beat**: "You can find Tlapalli for Zed in the Zed extension store. And if you're on VSCode, it's still on the Marketplace and Open VSX. tlapalli.ackzell.dev"

**What's on screen:**

- Both logos side by side — Tlapalli gems + Zed mark
- Three pill buttons appear: `Zed Extensions`, `VSCode Marketplace`, `Open VSX Registry`
- URL: `tlapalli.ackzell.dev`
- Slow fade to black — gems fade last, center gem (obsidian) very last

**Motion Canvas notes:**

- Mirror the outro from the first video but with the Zed mark added
- Pills: three `PillLabel` nodes — first one in `#053794`, other two in
  `BASE.textMid`
- Same fade sequence as the first video's scene14

---

## Pacing reference

| Scene                | Est. duration |
| -------------------- | ------------- |
| 01 Cold open         | 4s            |
| 02 The comment       | 20s           |
| 03 Two editors       | 25s           |
| 04 Different formats | 20s           |
| 05 The translation   | 30s           |
| 06 The pipeline      | 25s           |
| 07 Color problem     | 35s           |
| 08 Uncertainty       | 25s           |
| 09 The PR            | 20s           |
| 10 Zed showcase      | 25s           |
| 11 Reflection        | 20s           |
| 12 Outro             | 15s           |
| **Total**            | **~4:30 min** |

---

## Reusable from the first video

`GemSwatch`, `PillLabel`, `EditorWindow`, `CropTemplate`, `TimelineDot`,
`TlapalliLogo`, palette, `floating` utility

## New components needed

- `JsonBlock` — a JSON panel with filename header and highlighted keys
- `CommentBubble` — a minimal chat bubble with streaming text support
