import React from "react";
import {
  AbsoluteFill, useCurrentFrame, useVideoConfig,
  interpolate, spring, Sequence,
} from "remotion";

type Props = {
  title: string;
  category: string;
  description: string;
  keyPoints: string[];
  accent: string;
  byteNumber: number;
  totalBytes: number;
  statNumber?: string;
  statLabel?: string;
};

const BG = "#050508";

// Kinetic text — words appear one by one
const KineticText: React.FC<{text: string; startFrame: number; fontSize: number; color: string; fontWeight?: number; maxWidth?: number}> = ({text, startFrame, fontSize, color, fontWeight = 900, maxWidth}) => {
  const frame = useCurrentFrame();
  const words = text.split(' ');
  return (
    <div style={{display:'flex',flexWrap:'wrap',gap:12,maxWidth}}>
      {words.map((word, i) => {
        const delay = startFrame + i * 3;
        const opacity = interpolate(frame, [delay, delay + 8], [0, 1], {extrapolateLeft:'clamp',extrapolateRight:'clamp'});
        const y = interpolate(frame, [delay, delay + 8], [30, 0], {extrapolateLeft:'clamp',extrapolateRight:'clamp'});
        return <span key={i} style={{opacity, transform:`translateY(${y}px)`, display:'inline-block', fontSize, fontWeight, color, lineHeight:1.15}}>{word}</span>;
      })}
    </div>
  );
};

// Animated counter
const Counter: React.FC<{target: number; startFrame: number; suffix?: string; color: string}> = ({target, startFrame, suffix = '', color}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const val = interpolate(frame, [startFrame, startFrame + fps * 1.5], [0, target], {extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <span style={{fontSize:96,fontWeight:900,color,opacity,fontFamily:'Inter,sans-serif'}}>{Math.floor(val)}{suffix}</span>;
};

export const ByteSummary: React.FC<Props> = ({
  title, category, description, keyPoints, accent, byteNumber, totalBytes, statNumber, statLabel,
}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  // Outro fade
  const outroOpacity = interpolate(frame, [durationInFrames - fps * 1.5, durationInFrames], [1, 0], {extrapolateLeft:'clamp'});

  // Progress bar
  const progress = frame / durationInFrames;

  // Pulsing orb
  const pulse = Math.sin(frame * 0.03) * 20;

  return (
    <AbsoluteFill style={{backgroundColor:BG, fontFamily:'Inter,Arial,sans-serif'}}>
      {/* Grid */}
      <AbsoluteFill style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',backgroundSize:'60px 60px'}} />

      {/* Animated orbs */}
      <div style={{position:'absolute',top:-200+pulse,right:-200,width:600,height:600,background:`radial-gradient(circle,${accent}20,transparent 70%)`,borderRadius:'50%',transition:'all 0.3s'}} />
      <div style={{position:'absolute',bottom:-150-pulse,left:-100,width:500,height:500,background:'radial-gradient(circle,#ec489918,transparent 70%)',borderRadius:'50%'}} />
      <div style={{position:'absolute',top:300,left:-200,width:400,height:400,background:'radial-gradient(circle,#06b6d410,transparent 70%)',borderRadius:'50%'}} />

      <div style={{padding:'70px 90px',opacity:outroOpacity,height:'100%',display:'flex',flexDirection:'column'}}>

        {/* Phase 1: Logo + Badge (0-2s) */}
        <Sequence from={0} durationInFrames={durationInFrames}>
          <div style={{display:'flex',alignItems:'center',gap:20,marginBottom:30}}>
            <div style={{
              opacity: interpolate(frame,[0,fps*0.5],[0,1],{extrapolateRight:'clamp'}),
              transform: `scale(${spring({frame,fps,config:{damping:12}})})`,
            }}>
              <span style={{fontSize:22,fontWeight:700,color:accent,padding:'8px 24px',borderRadius:12,background:`${accent}15`,border:`1px solid ${accent}40`,letterSpacing:1}}>{category}</span>
            </div>
            <span style={{
              fontSize:18,color:'rgba(255,255,255,0.35)',fontFamily:'JetBrains Mono,monospace',
              opacity: interpolate(frame,[fps*0.3,fps*0.8],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
            }}>#{byteNumber} of {totalBytes}</span>
          </div>
        </Sequence>

        {/* Phase 2: Kinetic Title (2-5s) */}
        <Sequence from={fps * 1.5} durationInFrames={durationInFrames}>
          <div style={{marginBottom:24}}>
            <KineticText text={title} startFrame={0} fontSize={68} color="white" maxWidth={1500} />
          </div>
        </Sequence>

        {/* Phase 3: Description typewriter (5-8s) */}
        <Sequence from={fps * 4} durationInFrames={durationInFrames}>
          <p style={{
            fontSize:28,color:'rgba(255,255,255,0.55)',maxWidth:1200,lineHeight:1.5,marginBottom:40,
            opacity: interpolate(frame - fps*4,[0,fps*0.8],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          }}>{description}</p>
        </Sequence>

        {/* Phase 4: Key Points with glass cards (8-22s) */}
        <div style={{display:'flex',flexDirection:'column',gap:14,flex:1}}>
          {keyPoints.map((point, i) => {
            const delay = fps * 6 + i * fps * 1.2;
            const s = spring({frame: Math.max(0, frame - delay), fps, config:{damping:14}});
            const opacity = interpolate(frame,[delay,delay+fps*0.4],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
            const x = interpolate(frame,[delay,delay+fps*0.4],[60,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
            return (
              <div key={i} style={{
                opacity, transform:`translateX(${x}px) scale(${s})`,
                display:'flex',alignItems:'center',gap:20,
                padding:'18px 28px',borderRadius:16,
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.06)',
                backdropFilter:'blur(20px)',
              }}>
                <div style={{
                  width:44,height:44,borderRadius:12,
                  background:`linear-gradient(135deg,${accent},#ec4899)`,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:20,fontWeight:800,color:'white',flexShrink:0,
                  boxShadow:`0 0 20px ${accent}40`,
                }}>{i+1}</div>
                <span style={{fontSize:26,color:'rgba(255,255,255,0.85)',fontWeight:500}}>{point}</span>
              </div>
            );
          })}
        </div>

        {/* Phase 5: Stat callout (22-26s) */}
        {statNumber && (
          <Sequence from={fps * 22} durationInFrames={fps * 6}>
            <div style={{
              textAlign:'center',padding:'20px 0',
              opacity: interpolate(frame - fps*22,[0,fps*0.5],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
            }}>
              <Counter target={parseInt(statNumber)} startFrame={fps*22} color={accent} />
              {statLabel && <div style={{fontSize:20,color:'rgba(255,255,255,0.4)',letterSpacing:3,textTransform:'uppercase',marginTop:4}}>{statLabel}</div>}
            </div>
          </Sequence>
        )}

        {/* Phase 6: Branding outro (26-30s) */}
        <Sequence from={fps * 26}>
          <div style={{
            position:'absolute',bottom:50,left:90,right:90,
            display:'flex',justifyContent:'space-between',alignItems:'center',
            opacity: interpolate(frame - fps*26,[0,fps*0.5],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
          }}>
            <span style={{fontSize:32,fontWeight:800,background:`linear-gradient(135deg,${accent},#ec4899)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>MaanavaN® Bytes</span>
            <span style={{fontSize:18,color:'rgba(255,255,255,0.3)',fontFamily:'JetBrains Mono,monospace'}}>bytes.maanavan.com</span>
          </div>
        </Sequence>
      </div>

      {/* Progress bar */}
      <div style={{position:'absolute',bottom:0,left:0,width:`${progress*100}%`,height:4,background:`linear-gradient(90deg,${accent},#ec4899)`,borderRadius:'0 2px 0 0'}} />
    </AbsoluteFill>
  );
};
