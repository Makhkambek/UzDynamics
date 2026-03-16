# UZDynamics Design System Update — Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the UZDynamics site to match the new design spec: JetBrains Mono + Inter fonts, updated green `#00ff41`, `#e5e5e5` body text, and new CSS utilities.

**Architecture:** The existing codebase already has the terminal aesthetic. We update design tokens (globals.css, tailwind.config.ts), swap fonts (layout.tsx), then update component text/color references. No structural rewrites — surgical updates only.

**Tech Stack:** Next.js 14 App Router, Tailwind CSS v3, Framer Motion, `next/font/google`

---

## Chunk 1: Design Tokens & Fonts

### Task 1: Update `globals.css`

**Files:**
- Modify: `app/globals.css`

- [ ] Replace `:root` color variables with new palette:

```css
:root {
  --bg-primary:   #0a0a0a;
  --bg-card:      #111111;
  --bg-hover:     #1a1a1a;
  --text-primary: #e5e5e5;
  --text-muted:   #666666;
  --text-dim:     #404040;
  --accent:       #00ff41;
  --accent-dim:   #00aa33;
  --amber:        #ffb000;
  --danger:       #ff3333;
  --border:       #222222;
}
```

- [ ] Update `body` rule — background, color, font:

```css
body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-inter), -apple-system, sans-serif;
  overflow-x: hidden;
}
```

- [ ] Update scrollbar to use new accent:

```css
::-webkit-scrollbar-thumb { background: #00ff4140; }
::-webkit-scrollbar-thumb:hover { background: #00ff41; }
```

- [ ] Update `::selection`:

```css
::selection { background: #00ff4120; color: #00ff41; }
```

- [ ] Update `.glow`, `.glow-sm`, `.glow-red` to `#00ff41`:

```css
.glow     { text-shadow: 0 0 8px #00ff41, 0 0 20px #00ff4170, 0 0 40px #00ff4130; }
.glow-sm  { text-shadow: 0 0 6px #00ff4180; }
.glow-red { text-shadow: 0 0 8px #ff3333, 0 0 20px #ff333380; }
```

- [ ] Update `.term-card`, `.bracket-card`, `.dot-grid`, `.section-rule`, `.glitch-wrap` — replace all `#00ff88` occurrences with `#00ff41`

- [ ] Add scanlines utility class:

```css
/* Scanlines overlay */
.scanlines::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 65, 0.02) 2px,
    rgba(0, 255, 65, 0.02) 4px
  );
  pointer-events: none;
}
```

- [ ] Add `.font-terminal` utility (for inline code/terminal elements):

```css
.font-terminal { font-family: var(--font-jetbrains), "Fira Code", monospace; }
```

- [ ] Verify: `npx tsc --noEmit` — no errors

- [ ] Commit: `git commit -m "feat: update design tokens — new accent #00ff41, body text #e5e5e5"`

---

### Task 2: Update fonts in `layout.tsx`

**Files:**
- Modify: `app/layout.tsx`

- [ ] Replace `VT323` + `Share_Tech_Mono` imports with `JetBrains_Mono`, `Space_Grotesk`, `Inter`:

```tsx
import { JetBrains_Mono, Space_Grotesk, Inter } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
```

- [ ] Update `<html>` className to include new font variables:

```tsx
<html lang="en" className={`${jetbrainsMono.variable} ${spaceGrotesk.variable} ${inter.variable}`}>
```

- [ ] Update `<body>` className — remove `font-mono flicker`, use antialiased:

```tsx
<body className="antialiased bg-[#0a0a0a] text-[#e5e5e5]">
```

- [ ] Keep CRT scanlines + vignette overlays — no change

- [ ] Verify: `npm run build` — compiles without error

- [ ] Commit: `git commit -m "feat: swap fonts to JetBrains Mono + Space Grotesk + Inter"`

---

### Task 3: Update `tailwind.config.ts`

**Files:**
- Modify: `tailwind.config.ts`

- [ ] Update colors and fontFamily:

```ts
theme: {
  extend: {
    colors: {
      bg:      "#0a0a0a",
      card:    "#111111",
      hover:   "#1a1a1a",
      accent:  "#00ff41",
      muted:   "#666666",
      dim:     "#404040",
      danger:  "#ff3333",
      amber:   "#ffb000",
      border:  "#222222",
    },
    fontFamily: {
      sans:     ["var(--font-inter)", "-apple-system", "sans-serif"],
      mono:     ["var(--font-jetbrains)", "'Fira Code'", "monospace"],
      display:  ["var(--font-space)", "sans-serif"],
    },
  },
},
```

- [ ] Verify: `npx tsc --noEmit`

- [ ] Commit: `git commit -m "chore: update tailwind color + font tokens"`

---

## Chunk 2: Component Color Updates

> For every component below, the change is the same pattern:
> - Headings/terminal text: `#00ff88` → `#00ff41`
> - Body description text: `text-[#00ff88]/XX` → `text-[#e5e5e5]/XX` or `text-muted`
> - Card backgrounds: `#0d0d0d` → `#111111`
> - `font-mono` class stays on terminal elements; body paragraphs get `font-sans`

### Task 4: Update `Hero.tsx`

**Files:**
- Modify: `app/components/Hero.tsx`

- [ ] Replace all `#00ff88` with `#00ff41`
- [ ] Body paragraph (`Engineering next-generation...`) — add `font-sans text-[#e5e5e5]/70`
- [ ] Boot log lines — keep monospace, update to `#00ff41`
- [ ] Remove `GlitchText` import if VT323 display class no longer exists — or keep if `font-display` still resolves (Space Grotesk now)
- [ ] Verify no missing font class refs after rename

- [ ] Commit: `git commit -m "feat: update Hero colors and typography"`

---

### Task 5: Update `Navbar.tsx`

**Files:**
- Modify: `app/components/Navbar.tsx`

- [ ] Replace all `#00ff88` with `#00ff41`
- [ ] Logo: `font-display` stays (now Space Grotesk)
- [ ] Nav links: keep `font-mono` for terminal number format

- [ ] Commit: `git commit -m "feat: update Navbar to new accent color"`

---

### Task 6: Update `Projects.tsx`

**Files:**
- Modify: `app/components/Projects.tsx`

- [ ] Replace all `#00ff88` with `#00ff41`
- [ ] Card background: replace `#060606` placeholder area → `#0d0d0d` (fine as-is, `.term-card` handles bg via CSS)
- [ ] `statusColor.OPERATIONAL` → `text-[#00ff41] glow-sm`
- [ ] `statusColor.TESTING` → keep amber `#ffb000` (update from `#ffaa00`)
- [ ] `statusColor.CLASSIFIED` → `text-[#ff3333] glow-red`
- [ ] Description text → `text-[#e5e5e5]/50 font-sans text-xs leading-5`

- [ ] Commit: `git commit -m "feat: update Projects colors and card text"`

---

### Task 7: Update `Team.tsx`, `About.tsx`, `Contact.tsx`, `Footer.tsx`

**Files:**
- Modify: each file one at a time

- [ ] `Team.tsx` — `#00ff88` → `#00ff41`, body text → `text-[#e5e5e5]/70 font-sans`
- [ ] `About.tsx` — same pattern
- [ ] `Contact.tsx` — same pattern; form labels → `text-[#e5e5e5]/60`; input borders → `border-[#00ff41]/20`
- [ ] `Footer.tsx` — same pattern

- [ ] Commit after each: `git commit -m "feat: update [ComponentName] colors"`

---

### Task 8: Update remaining components

**Files:**
- `app/components/Careers.tsx`, `Technologies.tsx`, `Timeline.tsx`, `Partners.tsx`
- `app/components/PageLoader.tsx`, `CLIEasterEgg.tsx`, `Shell.tsx`
- `app/not-found.tsx`

- [ ] Same pattern: `#00ff88` → `#00ff41` throughout
- [ ] Body text paragraphs → `font-sans text-[#e5e5e5]/70`
- [ ] Terminal prompts and code labels stay `font-mono text-[#00ff41]`

- [ ] Run `npx tsc --noEmit` after all changes

- [ ] Commit: `git commit -m "feat: update remaining components to new design system"`

---

## Chunk 3: Final QA

### Task 9: Build & verify

- [ ] Run `npm run build` — must pass with 0 errors
- [ ] Check: accent is `#00ff41` everywhere (search `#00ff88` — should be 0 hits)
- [ ] Check: body paragraphs use `font-sans` + `#e5e5e5` tones
- [ ] Check: headings/terminal elements use `font-mono` or `font-display`
- [ ] Check: `.glow`, `.blink`, `.term-card`, `.bracket-card` still work

- [ ] Commit: `git commit -m "chore: final design system cleanup"`
- [ ] Push: `git push && git push origin main:dev`
