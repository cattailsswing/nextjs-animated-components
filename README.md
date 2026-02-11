# Next.js Animated Components — 110+ Free React Animation Components

### The free, open-source alternative to Aceternity UI, Magic UI, 21st.dev, and Shadcn Motion

<div align="center">

![Stars](https://img.shields.io/github/stars/itsjwill/nextjs-animated-components?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Components](https://img.shields.io/badge/Components-110+-purple?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge)

</div>

> **110+ copy-paste animated components for React & Next.js.** Framer Motion, GSAP, Three.js, Tailwind CSS. Dock, Spotlight Cards, Glassmorphism, Scroll Animations, 3D effects, and more. Just clone and run.

---

## Quick Start

```bash
git clone https://github.com/itsjwill/nextjs-animated-components.git
cd nextjs-animated-components
npm install
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** to see every component in action. Use the direction picker to switch between 4 design systems in real time.

---

## What's Inside

### Interactive Components (16)

| Component | What It Does |
|-----------|-------------|
| **Dock** | macOS-style magnification dock with spring physics |
| **Marquee** | Infinite scroll marquee, horizontal/vertical, pause on hover |
| **Lamp** | Dramatic light cone effect (Aceternity-style) |
| **NumberTicker** | Animated number counter triggered on scroll |
| **MorphingText** | Smooth text morphing, typewriter, flip, word rotate |
| **SpotlightCard** | Card with cursor-tracking radial spotlight |
| **Magnetic** | Elements that attract toward cursor on hover |
| **AnimatedBeam** | SVG beam animations connecting elements |
| **RippleButton** | Material-design click ripple effect |
| **AnimatedTabs** | Tabs with spring layout animations (3 variants) |
| **LiquidGlass** | iOS-style glassmorphism with 3D tilt |
| **BorderBeam** | Light beam traveling around element borders |
| **Confetti** | Particle celebration on click or full-screen |
| **ScrollReveal** | 10 reveal variants (fade, zoom, flip, blur, slide) |
| **OrbitingCircles** | Elements orbiting a center point |
| **WavyBackground** | Animated grid patterns and dot patterns |

### Backgrounds (9)

Aurora, Spotlight, Meteors, Grid, Gradient Mesh, Particles, Sparkles, Infinite Grid, Shader Backgrounds (Noise Gradient, Liquid Metal, Wave Distortion, Plasma)

### Scroll Animations (6)

Infinite Scroll, Parallax, Text Parallax, Sticky Reveal, Horizontal Scroll, GSAP ScrollTrigger suite, Fade/Scale/Rotate on Scroll

### Text Animations (4)

Text Generate Effect, Character/Word/Line Reveal, Gradient Text, Split Screen Text

### Cards (7)

Tilt Card, Glow Card, Bento Grid, Feature Showcase, Hover Card, Stack Cards, Living System

### Effects (11)

Magnetic Button, Magnetic Gallery, Custom Cursor (6 variants), Fluid Cursor, Mouse Parallax, Audio Reactive, Animated Input, Media Reveal (7 modes), Text Distortion, Reveal on Hover

### Premium Buttons (10)

Shader Distortion, Ink Bleed, Cloth, Portal, Swarm, Liquid Metal, Reactive Shadow, Sticker Peel, Thermal, Momentum

### 3D Components (5)

Floating Shapes, Interactive Globe, Neural Network, Particle Morph, Scroll Progress 3D

### Layout & Navigation (5)

Animated Masonry, Hero Sections, Premium Layouts, Morphing Nav, Section Reveal

### Transitions (3)

Noise Transition (Perlin dissolve), Page Transition, Preloader (4 variants per direction)

### Templates (3)

Landing Page, About Page, Pricing Page — all direction-aware

### SEO Toolkit (11)

Auto SEO, 15 JSON-LD schemas, Analytics (GA, Plausible, Fathom, Umami, PostHog), Social Share (9 platforms), Web Vitals, Breadcrumbs, RSS/Atom/JSON feeds, SEO Analyzer

---

## How to Use a Component

Every component is self-contained. Copy the file you need, or import directly:

```tsx
import { SpotlightCard } from "@/components/interactive/spotlight-card";
import { ScrollReveal } from "@/components/interactive/scroll-reveal";
import { Dock, DockItem } from "@/components/interactive/dock";
import { TiltCard } from "@/components/cards/tilt-card";
import { MagneticButton } from "@/components/effects/magnetic-button";
```

### Example: Add a Spotlight Card

```tsx
<SpotlightCard>
  <h3>Feature Title</h3>
  <p>Feature description goes here.</p>
</SpotlightCard>
```

### Example: Scroll Reveal Any Section

```tsx
<ScrollReveal variant="fade-up" delay={0.2}>
  <div>This fades up when scrolled into view</div>
</ScrollReveal>
```

### Example: macOS Dock

```tsx
<Dock magnification={60} distance={140}>
  <DockItem label="Home"><HomeIcon /></DockItem>
  <DockItem label="Search"><SearchIcon /></DockItem>
  <DockItem label="Settings"><GearIcon /></DockItem>
</Dock>
```

---

## 4 Design Directions (Runtime Switchable)

One codebase, four completely different aesthetics. Switch with a single variable — colors, fonts, motion curves, and component styles all change instantly.

| Direction | Vibe | Fonts | Motion |
|-----------|------|-------|--------|
| **Luxury** | Pagani, Richard Mille | Space Grotesk + Inter | Slow, deliberate easing |
| **Cyberpunk** | Neon, Glitch, Terminal | JetBrains Mono + IBM Plex | Snappy, glitchy |
| **Kinetic** | Stripe, Vercel, Linear | Outfit + DM Sans | Spring physics |
| **Freestyle** | Bold, Unexpected | Syne + Manrope | Varied, unpredictable |

---

## Tech Stack

| Library | Purpose |
|---------|---------|
| **Next.js 14** | App Router, React Server Components |
| **Framer Motion** | Declarative animations, gestures, layout |
| **GSAP** | Complex timelines, ScrollTrigger |
| **Three.js / R3F** | 3D scenes and effects |
| **Lenis** | Smooth scrolling |
| **Tailwind CSS** | Styling with direction-aware CSS variables |
| **TypeScript** | Full type safety, prop interfaces for everything |

---

## Comparison

| Feature | Aceternity UI | Magic UI | Shadcn Motion | **This Repo** |
|---------|--------------|----------|---------------|---------------|
| Price | $49-149/yr | $49/yr | Free | **Free (MIT)** |
| Components | ~50 | ~40 | ~20 | **110+** |
| Design Systems | 1 | 1 | 1 | **4 (runtime)** |
| 3D Components | Few | None | None | **5 (Three.js)** |
| Scroll Video | No | No | No | **Yes** |
| GSAP Integration | No | No | No | **Yes** |
| SEO Toolkit | None | None | None | **15 JSON-LD schemas** |
| Preloader | None | None | None | **4 variants** |

---

## Performance

- First load JS: < 200KB
- All 3D/canvas/shader components: `next/dynamic` with `ssr: false`
- Fonts: `next/font` with display swap
- `prefers-reduced-motion` respected throughout
- Lighthouse 90+

---

## FAQ

**Can I use individual components without the whole project?**
Yes. Every component is self-contained. Copy the file you need into your own project.

**Does it work with existing Tailwind sites?**
Yes. The direction system uses CSS variables and `data-direction` attributes. Won't conflict with your setup.

**What if I only want one design direction?**
Pick one and use it. The multi-direction system is opt-in.

**Will it slow my site down?**
No. Heavy components (Three.js, shaders, canvas) load async. Static fallbacks for everything.

---

## Project Structure

```
src/
├── components/
│   ├── backgrounds/      # 9 animated backgrounds
│   ├── buttons/          # 10 premium button effects
│   ├── cards/            # 7 card components
│   ├── core/             # Direction picker, preloader, nav
│   ├── effects/          # 11 cursor/interaction effects
│   ├── interactive/      # 16 interactive components (NEW)
│   ├── layout/           # Hero sections, masonry, layouts
│   ├── navigation/       # Morphing nav
│   ├── scroll/           # 6 scroll animation systems
│   ├── seo/              # 11 SEO utilities
│   ├── templates/        # 3 page templates
│   ├── text/             # 4 text animation effects
│   ├── three/            # 5 3D components
│   └── transitions/      # 3 page transitions
└── app/
    ├── page.tsx          # Homepage showcasing all components
    └── _sections/        # 9 demo sections
```

---

## Contributing

PRs welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Credits

Inspired by [Aceternity UI](https://ui.aceternity.com), [Magic UI](https://magicui.design), [21st.dev](https://21st.dev), [Hover.dev](https://hover.dev)

Built with [GSAP](https://greensock.com/gsap/), [Framer Motion](https://framer.com/motion/), [Lenis](https://lenis.studiofreight.com/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

## License

MIT — use however you want.

---

## More Open Source

| Repo | Description |
|------|-------------|
| [vanta](https://github.com/itsjwill/vanta) | Open source AI video engine |
| [ai-agents-that-ship](https://github.com/itsjwill/ai-agents-that-ship) | Production-ready AI agent frameworks |
| [generative-ai-uncensored](https://github.com/itsjwill/generative-ai-uncensored) | The real guide to generative AI tools |

---

<div align="center">

### Want to build alongside people who ship?

**[Join the community](https://www.skool.com/ai-elite-9507/about?ref=67521860944147018da6145e3db6e51c)** — we build AI products and premium sites weekly.

[![Join](https://img.shields.io/badge/JOIN-000000?style=for-the-badge)](https://www.skool.com/ai-elite-9507/about?ref=67521860944147018da6145e3db6e51c)

</div>
