# UzDynamics — Project Instructions

## Rules

### Code style
- Change one file at a time
- Explain your plan before writing code
- Use TypeScript strictly — no `any`, use `unknown` and narrow safely
- Use `interface` for props/object shapes, `type` for unions
- Prefer `const` over `let`, never `var`
- No `console.log` in production code
- Use spread for immutable updates, never mutate directly

### Task management
**MANDATORY — no exceptions:**
- ANY task touching 2+ files OR taking 3+ steps MUST start with TaskCreate
- Create ALL tasks upfront, then work through them one by one: pending → in_progress → completed
- NEVER write a single line of code before the task list is visible
- If you skip the task list, stop immediately and create it before continuing

### Workflow — follow this order every time
1. **TaskCreate** — list every step before starting
2. **`/plan`** — explain approach, wait for approval
3. **`/tdd`** — write tests first (if adding new feature)
4. **Implement** — one file at a time
5. **`/code-review`** — after every meaningful change
6. **`npm test`** — run tests, fix if failing

### Git
- Never run `git commit`, `git push`, or any destructive git command unless explicitly asked
- Do not suggest or offer to commit/push — wait for the user to say so

### Agents — use automatically, no need to be asked
- **planner** agent — for any feature that touches architecture
- **code-reviewer** agent — after writing or changing components
- **security-reviewer** agent — before any form/API additions
- **frontend-design** plugin — for UI/UX decisions

### Skills — use automatically
- `/plan` — before every non-trivial task
- `/tdd` — before adding new features
- `/code-review` — after changes
- `/checkpoint` — before large refactors

---

## Architecture

### Overview
UzDynamics — static company website. No backend, no database.
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion v12
- **Deployment**: (TBD — Vercel recommended)

### Design System
- **Background**: `#0a0a0a`
- **Cards**: `#111111`
- **Accent**: `#00ff88` (green glow)
- **Theme**: dark, tech/military aesthetic
- **Font**: system default (antialiased)

---

## Folder Structure

```
/
├── app/
│   ├── components/         # All section components
│   │   ├── Navbar.tsx      # Sticky navbar with blur backdrop
│   │   ├── Hero.tsx        # Landing hero section
│   │   ├── Projects.tsx    # 6 project cards (drones, vehicles, military)
│   │   ├── Team.tsx        # 2 team members
│   │   ├── About.tsx       # Company description + mission
│   │   ├── Contact.tsx     # Contact form + social links
│   │   └── Footer.tsx      # Footer with links + copyright
│   ├── layout.tsx          # Root layout, metadata, global styles
│   ├── page.tsx            # Main page — assembles all sections
│   ├── globals.css         # Global CSS + Tailwind directives
│   └── fonts/              # Local fonts (if any)
├── public/                 # Static assets (images, icons)
├── tailwind.config.ts      # Tailwind config
├── next.config.mjs         # Next.js config
└── tsconfig.json
```

---

## Components

### Projects.tsx
6 placeholder projects in 3 categories:
- **Drones**: Recon Drone X1, Combat Drone V2
- **Vehicles**: Urban Rover, Desert Crawler
- **Military**: Shield System, Tactical Unit

Each card: title, category badge, short description, placeholder image.

### Team.tsx
2 team members — placeholder name, role, photo.

### Contact.tsx
Form fields: name, email, message. No backend yet — static only.

---

## Conventions

- **Animations**: Framer Motion `motion.div` with `initial/whileInView/viewport` for scroll animations
- **Responsive**: mobile-first, Tailwind `sm:` / `md:` / `lg:` breakpoints
- **Images**: use `next/image` for all images, always add `alt`
- **Props**: every component has explicit typed props interface
- **Section IDs**: `id="projects"`, `id="team"`, `id="about"`, `id="contact"` for navbar anchor links

---

## Commands

```bash
npm run dev      # Dev server → http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint
npx tsc --noEmit # Type-check only
```

---

## Future Features (not yet implemented)
- Backend API for contact form (Go or Next.js API routes)
- CMS for managing projects dynamically
- i18n (English + Russian + Uzbek)
- Blog / news section
