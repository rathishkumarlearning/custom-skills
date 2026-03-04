---
name: remotion-video
description: Generate stunning programmatic videos using Remotion (React → MP4). Use for course promos, byte summaries, tech explainers, social media shorts, progress reports. Multiple templates with professional animations, glassmorphism, and kinetic typography.
---

# Remotion Video — React → Stunning MP4

Create professional videos programmatically using React components rendered to MP4.

## When to Use
- Byte/course summary videos (30-60s)
- Tech concept explainers (60-120s)
- Social media shorts (15-30s)
- Course promo/trailer videos
- Progress reports with animated stats
- Any visual content that moves

## Project Location
`/Users/rathishkumarsuresh/Documents/projects/Personal/remotion-videos/`

## Quick Start

1. **Pick a template** — See templates below
2. **Create composition** — Add to `src/Root.tsx`
3. **Preview** — `npx remotion studio` (opens browser)
4. **Render** — See render command below

### Render Command
```bash
cd /Users/rathishkumarsuresh/Documents/projects/Personal/remotion-videos
npx remotion render src/index.ts <CompositionId> out/<filename>.mp4 \
  --codec h264 --image-format jpeg --quality 90
```

## Design System (matches brand)

### Colors
- Background: `#050508`
- Grid: `rgba(255,255,255,0.02)` at 60px
- Accents: purple `#8b5cf6`, pink `#ec4899`, cyan `#06b6d4`, green `#10b981`, amber `#d97706`
- Text: white, `rgba(255,255,255,0.7)`, `rgba(255,255,255,0.4)`

### Typography
- Titles: Inter 64-80px weight 900
- Subtitles: Inter 28-36px weight 500
- Body: Inter 24-28px weight 400
- Code: JetBrains Mono 20-24px
- Stats: Inter 80-120px weight 900

### Animation Principles
- Use `spring()` for natural motion (damping 12-18)
- Stagger children by 0.3-0.5s each
- Entry: slide up/left + fade (30 frames)
- Exit: fade out (20 frames at end)
- Hold key content for 2-3 seconds minimum
- Total: 30fps, 1920×1080

### Visual Elements (use in every template)
1. **Grid background** — subtle 60px grid lines
2. **Gradient orbs** — 2-3 radial gradients, pulsing slowly
3. **Glass cards** — `rgba(255,255,255,0.03)` + blur + border
4. **Gradient text** — for titles and branding
5. **Progress bar** — animated bar at bottom showing video progress

## Templates

### 1. ByteSummary (existing, needs upgrade)
**Duration:** 30s (900 frames) | **File:** `src/ByteSummary.tsx`
**Structure:**
- 0-2s: Logo reveal + category badge
- 2-5s: Title kinetic typography (words appear one by one)
- 5-8s: Description with typewriter effect
- 8-22s: Key points slide in with numbered glass cards (stagger 1.5s)
- 22-26s: Stats callout (animated counter)
- 26-30s: CTA + branding outro

### 2. ConceptExplainer (NEW — build this)
**Duration:** 60s (1800 frames) | **File:** `src/ConceptExplainer.tsx`
**Structure:**
- 0-3s: "What is [X]?" title with gradient
- 3-10s: Simple analogy with icon animation
- 10-25s: Step-by-step flow (nodes appear, arrows draw)
- 25-40s: Key components grid (glass cards flip in)
- 40-50s: Code example with syntax highlight animation
- 50-55s: "Remember" takeaway with glow
- 55-60s: Branding outro

### 3. ComparisonVideo (NEW — build this)
**Duration:** 45s (1350 frames) | **File:** `src/ComparisonVideo.tsx`
**Structure:**
- 0-3s: "X vs Y" title slam
- 3-8s: Left side slides in (Option A)
- 8-13s: Right side slides in (Option B)
- 13-30s: Feature-by-feature comparison rows animate
- 30-38s: Verdict with gradient highlight
- 38-42s: Stats row with counters
- 42-45s: Outro

### 4. CoursePromo (NEW — build this)
**Duration:** 60s (1800 frames) | **File:** `src/CoursePromo.tsx`
**Structure:**
- 0-5s: Hook question ("Want to master [X]?")
- 5-15s: 3 pain points (glass cards with ❌)
- 15-25s: Solution intro with course title
- 25-40s: Chapter overview (sidebar animation)
- 40-50s: Testimonial/stats (animated counters)
- 50-55s: CTA ("Start Learning Now")
- 55-60s: URL + branding

### 5. QuickTip (NEW — build this)
**Duration:** 15s (450 frames) | **File:** `src/QuickTip.tsx`
**Structure:**
- 0-2s: "💡 Quick Tip" badge flies in
- 2-5s: Tip title (large kinetic text)
- 5-12s: Code snippet or visual demo
- 12-15s: Branding + "Follow for more"

## Animation Recipes

### Kinetic Typography (word by word)
```tsx
const words = title.split(' ');
words.map((word, i) => {
  const delay = startFrame + i * 4; // 4 frames per word
  const opacity = interpolate(frame, [delay, delay + 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const y = interpolate(frame, [delay, delay + 8], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <span style={{ opacity, transform: `translateY(${y}px)`, display: 'inline-block', marginRight: 16 }}>{word}</span>;
});
```

### Animated Counter
```tsx
const count = interpolate(frame, [startFrame, startFrame + fps * 2], [0, targetNumber], { extrapolateRight: 'clamp' });
return <span>{Math.floor(count)}</span>;
```

### Drawing Arrow (SVG path)
```tsx
const progress = interpolate(frame, [startFrame, startFrame + fps], [0, 1], { extrapolateRight: 'clamp' });
<svg><path d="M0,0 L200,0" strokeDasharray={200} strokeDashoffset={200 * (1 - progress)} /></svg>
```

### Glass Card Entrance
```tsx
const scale = spring({ frame: frame - delay, fps, config: { damping: 14 } });
const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
<div style={{ opacity, transform: `scale(${scale})`, background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16 }}>
```

### Progress Bar (bottom of every video)
```tsx
const progress = frame / durationInFrames;
<div style={{ position: 'absolute', bottom: 0, left: 0, width: `${progress * 100}%`, height: 4, background: `linear-gradient(90deg, ${accent}, #ec4899)` }} />
```

## Building New Templates

1. Create `src/TemplateName.tsx` with the component
2. Register in `src/Root.tsx`:
   ```tsx
   <Composition id="TemplateName" component={TemplateName} durationInFrames={900} fps={30} width={1920} height={1080} defaultProps={{...}} />
   ```
3. Preview: `npx remotion studio`
4. Render: `npx remotion render src/index.ts TemplateName out/video.mp4`

## Batch Rendering
```bash
# Render all bytes
for i in $(seq 1 143); do
  npx remotion render src/index.ts ByteSummary out/byte-$i.mp4 --props '{"byteNumber":'$i'}'
done
```
