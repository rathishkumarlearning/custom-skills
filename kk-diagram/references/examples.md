# Diagram Pattern Examples

## Pattern 1: Layered Architecture (default)
Use for system overviews. Stack layers top-to-bottom:
- Access Layer (user/client) — gold
- Orchestration Layer (router/brain) — green
- Agent/Service Layer (workers) — 2x2 grid, varied colors
- Infrastructure Layer (storage, cron, channels) — 2x2 grid, muted colors

Connect layers with labeled vertical connectors.

## Pattern 2: CI/CD Pipeline
Use for build/deploy workflows. Vertical timeline:
```
flow-steps (padding-left:52px, gradient ::before line)
  f-step (--c:color) → f-dot (numbered) + h5 (step name) + agents + output
```
Each step: name, tools used, output produced.

## Pattern 3: Comparison (Side-by-Side)
Use for before/after, option A vs B:
```html
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
  <div class="node n-red"><!-- Option A --></div>
  <div class="node n-green"><!-- Option B --></div>
</div>
```
Add a "VS" divider or comparison table below.

## Pattern 4: Technology Stack
Vertical layers like a layer cake:
- Frontend (top) — blue
- API Gateway — green  
- Backend Services — amber
- Database — purple
- Infrastructure — gray

Each layer is a full-width node.

## Pattern 5: Hub & Spoke
Central node with radiating connections:
- Use the orchestrator node (green) as center
- Surround with 4-8 connected nodes in a grid
- Label each spoke connection

## Common HTML Classes (from template)

### Nodes
- `.node` — base node with flex layout
- `.node-icon` — 44x44 icon square
- `.node-content` — title + tag + description
- `.n-{color}` — color variant (gold, green, emerald, amber, blue, purple, gray, pink, cyan, violet)

### Sections
- `.sec` — section wrapper
- `.sec-h` — header with number + title + line
- `.sec-num` — numbered square
- `.sec-title` — uppercase title
- `.sec-line` — trailing line

### Connectors
- `.v-conn` — vertical connector (line + label + arrow)
- `.v-line` — the line itself
- `.v-label` — connection label text
- `.v-arrow` — direction arrow (▼ or ▲)

### Grids
- `.agent-grid` — 2-column grid for nodes
- `.legend` — 3-column grid for color legend
- `.stats-row` — 3-5 column stats bar

### Timeline
- `.flow-steps` — wrapper with gradient left border
- `.f-step` — individual step (set --c CSS variable)
- `.f-dot` — numbered circle on the timeline

### Commands
- `.cmd-list` — vertical command list
- `.cmd-row` — single command (code + desc + badge)
- `.cmd-code` — monospace command name
- `.cmd-badge` — role pill badge
