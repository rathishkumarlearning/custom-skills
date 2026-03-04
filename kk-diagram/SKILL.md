---
name: kk-diagram
description: Generate stunning KodeKloud-style architecture diagrams as PNG images. Use for tech docs, system architecture, workflow visualization, infrastructure diagrams, or any technical concept that needs a professional visual. Renders HTML/CSS to PNG via Playwright.
---

# KK-Diagram — KodeKloud-Style Architecture Diagrams

Generate professional, mobile-readable architecture diagrams rendered as PNG from HTML/CSS via Playwright.

## When to Use
- Architecture overviews (system, infra, app)
- Workflow/pipeline visualizations
- Technology stack diagrams
- Comparison diagrams (before/after, option A vs B)
- Any tech doc that needs a visual

## Quick Start

1. **Plan sections** — Break the topic into 3-7 labeled sections (layers, steps, components)
2. **Build HTML** — Use the template in `references/template.html` as base. Customize sections, nodes, colors.
3. **Render PNG** — Run `scripts/render.py`:
   ```bash
   cd ~/.claude/skills/kk-diagram/scripts
   uv run python render.py /tmp/my-diagram.html /path/to/output.png [--width 1080] [--height 3200]
   ```
4. **Embed** — Use the PNG in tech docs, send via Telegram, etc.

## Design System (MUST FOLLOW)

### Background
- Base: `#0b1120` (dark navy, NOT pure black)
- Subtle grid: `rgba(99,102,241,0.03)` lines at 32px
- 2-3 radial gradient orbs at 5-6% opacity for depth

### Typography
- **Inter** — All UI text (weights 300-900)
- **JetBrains Mono** — Code, commands, technical labels
- Section titles: 15px, 700 weight, UPPERCASE, letter-spacing 1-4px
- Node titles: 16px, 700 weight
- Body text: 12px, color `#94a3b8`
- Code: 14px JetBrains Mono

### Color Palette (role-based)
| Role | Color | Background | Border |
|------|-------|-----------|--------|
| Access/User | `#fbbf24` gold | `rgba(251,191,36,0.08)` | `rgba(251,191,36,0.2)` |
| Orchestrator | `#10b981` green | `rgba(16,185,129,0.08)` | `rgba(16,185,129,0.2)` |
| Architect | `#059669` emerald | `rgba(5,150,105,0.08)` | `rgba(5,150,105,0.2)` |
| Builder/Coder | `#d97706` amber | `rgba(217,119,6,0.08)` | `rgba(217,119,6,0.2)` |
| Analysis/IDE | `#3b82f6` blue | `rgba(59,130,246,0.08)` | `rgba(59,130,246,0.2)` |
| AI/ML | `#8b5cf6` purple | `rgba(139,92,246,0.08)` | `rgba(139,92,246,0.2)` |
| Private/Security | `#64748b` gray | `rgba(100,116,139,0.08)` | `rgba(100,116,139,0.2)` |
| Memory/State | `#ec4899` pink | `rgba(236,72,153,0.08)` | `rgba(236,72,153,0.2)` |
| Automation | `#06b6d4` cyan | `rgba(6,182,212,0.08)` | `rgba(6,182,212,0.2)` |
| Infrastructure | `#7c3aed` violet | `rgba(124,58,237,0.08)` | `rgba(124,58,237,0.2)` |

### Node Anatomy (every node MUST have)
- Icon: 44x44px rounded square, emoji or SVG
- Title: 16px bold, colored
- Tag badge: inline pill (10px, colored bg, 2px 8px padding, 4px radius)
- Description: 12px, #94a3b8, 1-3 lines
- Never skip any element. Every node = icon + title + tag + description.

### Connections (KodeKloud signature)
- Vertical connectors between layers: 2px colored line + text label + arrow
- LABEL EVERY CONNECTION (e.g., "dispatch to specialist", "message / command")
- Never leave an unlabeled arrow

### Section Headers
- Numbered square (28x28px, rounded 8px, colored bg, white text)
- Title: 15px uppercase, letter-spacing 1px
- Trailing line extending to right edge

### Layouts
- **Portrait (mobile-first)**: 1080x2400-3600px — DEFAULT for all diagrams
- **Landscape**: 2400x1600px — only when explicitly requested
- Grid: `grid-template-columns: 1fr 1fr` for agent/component grids
- Vertical flow for workflows/timelines

### Required Elements
1. **Header** — badge + title + subtitle
2. **Sections** — 3-7 numbered, each with header
3. **Legend** — 3-column grid explaining all colors
4. **Stats bar** — 3-5 key metrics (optional but recommended)
5. **Footer** — quote + signature

## Adapting for Different Topics

Read `references/examples.md` for patterns covering:
- System architecture (layered: access → orchestration → agents → infra)
- CI/CD pipelines (horizontal flow steps)
- Comparison diagrams (side-by-side grids)
- Technology stacks (vertical layers)
- Network topology (hub and spoke)

## File Size Targets
- PNG output: 400-900KB for good detail
- HTML source: 10-20KB
- Render time: 3-5 seconds via Playwright
