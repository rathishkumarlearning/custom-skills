---
name: infographic
description: Convert complex technical concepts into stunning visual infographics (PNG). Use when someone wants to learn or explain a big concept visually — OAuth2, Kubernetes, Docker networking, IAM, microservices, etc. Produces mobile-readable, print-quality infographic images.
---

# Infographic — Concept → Visual Learning Poster

Transform any complex concept into a stunning, scrollable infographic PNG.

## When to Use
- Explaining a complex concept visually (OAuth2, K8s, Docker, IAM, etc.)
- Creating learning aids / study posters
- Summarizing a technology or framework in one image
- "How X works" or "X explained" visual content
- Comparison infographics (X vs Y)

## Quick Start

1. **Analyze the concept** — Break into 5-8 key sections
2. **Pick a layout** — See `references/layouts.md` for patterns
3. **Build HTML** — Use `references/template.html` as base
4. **Render** — `scripts/render.py input.html output.png`

```bash
cd ~/.claude/skills/infographic/scripts
uv run python render.py /tmp/my-infographic.html /path/to/output.png
```

## Design System

### Canvas
- Width: **1080px** (Instagram/mobile optimized)
- Height: **2400-4000px** (scrollable, varies by content)
- Background: `#0b1120` dark navy
- Subtle dot pattern: `radial-gradient(circle, rgba(99,102,241,0.08) 1px, transparent 1px)` at 24px

### Typography Scale
| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Main title | Inter | 42-48px | 900 | Gradient text |
| Section number | JetBrains Mono | 64-80px | 900 | 8% opacity accent |
| Section title | Inter | 22-26px | 800 | White |
| Body text | Inter | 14-16px | 400 | #94a3b8 |
| Key term | Inter | 14-16px | 700 | Accent color |
| Code/technical | JetBrains Mono | 13px | 500 | Accent color |
| Stat number | Inter | 48-64px | 900 | Accent color |
| Stat label | Inter | 11px | 600 | #64748b |

### Color System
Each infographic gets a **primary accent** based on topic:
- Security/Auth: `#ef4444` red + `#f97316` orange
- Cloud/Infra: `#3b82f6` blue + `#06b6d4` cyan  
- DevOps/CI: `#10b981` green + `#14b8a6` teal
- AI/ML: `#8b5cf6` purple + `#ec4899` pink
- Data/DB: `#f59e0b` amber + `#eab308` yellow
- General: `#6366f1` indigo + `#8b5cf6` purple

Use accent at 8% opacity for card backgrounds, 20% for borders, 100% for key text.

### Visual Elements

**Big Numbers** — Giant faded numbers behind section titles:
```css
.big-num { font-size: 80px; font-weight: 900; opacity: 0.06; position: absolute; right: 20px; top: -10px; }
```

**Icon Cards** — Each concept gets an emoji icon in a rounded square:
```css
.icon-box { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 28px; }
```

**Flow Arrows** — Labeled connections between concepts:
```css
.flow-arrow { text-align: center; padding: 8px 0; }
.flow-arrow::before { content: ''; display: block; width: 2px; height: 24px; margin: 0 auto; background: accent-20%; }
.flow-arrow span { font-size: 10px; letter-spacing: 2px; color: accent; }
```

**Comparison Cards** — Side-by-side with VS divider:
```css
.vs-grid { display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; }
.vs-badge { font-size: 14px; font-weight: 800; color: #64748b; }
```

**Stat Callouts** — Big number + label:
```css
.stat { text-align: center; padding: 20px; }
.stat-num { font-size: 48px; font-weight: 900; color: accent; }
.stat-label { font-size: 11px; color: #64748b; letter-spacing: 2px; text-transform: uppercase; }
```

**Code Blocks** — Styled terminal/code snippets:
```css
.code-block { background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 16px; font-family: 'JetBrains Mono'; font-size: 13px; color: #e2e8f0; }
```

**Key Takeaway Box** — Highlighted insight:
```css
.takeaway { background: linear-gradient(135deg, accent-8%, accent2-5%); border-left: 3px solid accent; border-radius: 0 12px 12px 0; padding: 16px 20px; }
```

### Section Pattern (repeat for each concept)
```
┌─────────────────────────────────────────┐
│  08                          [big num]  │
│  ───────────────────────────            │
│  🔧  Section Title                      │
│      Subtitle / one-liner               │
│                                         │
│  ┌──────┐  ┌──────┐  ┌──────┐          │
│  │Card 1│  │Card 2│  │Card 3│          │
│  └──────┘  └──────┘  └──────┘          │
│                                         │
│  💡 Key Takeaway: ...                   │
└─────────────────────────────────────────┘
```

### Required Structure
1. **Header** — Topic badge + main title + subtitle + "what you'll learn" list
2. **Sections** (5-8) — Each with big number, icon, title, visual content, takeaway
3. **Summary** — Key stats row or comparison
4. **Footer** — Source attribution + branding

### Content Principles
- **One idea per section** — don't combine concepts
- **Visual > Text** — if you can show it with a diagram, icon grid, or comparison, do that
- **Concrete examples** — don't just define, show real usage
- **Progressive complexity** — start simple, build up
- **Key terms bold** — highlight vocabulary in accent color
- **Max 3 sentences per paragraph** — infographics are scannable, not readable

## Rendering
```bash
cd ~/.claude/skills/infographic/scripts
uv run python render.py /tmp/concept.html /path/to/output.png [--width 1080] [--height 3200]
```
