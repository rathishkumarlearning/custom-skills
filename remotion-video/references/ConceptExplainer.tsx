import React from "react";
import {
  AbsoluteFill, useCurrentFrame, useVideoConfig,
  interpolate, spring, Sequence,
} from "remotion";

type Step = { icon: string; title: string; detail: string };
type Component = { icon: string; name: string; desc: string };

type Props = {
  concept: string;
  tagline: string;
  analogy: string;
  analogyIcon: string;
  steps: Step[];
  components: Component[];
  codeExample?: string;
  takeaway: string;
  accent: string;
};

const BG = "#050508";

export const ConceptExplainer: React.FC<Props> = ({
  concept, tagline, analogy, analogyIcon, steps, components, codeExample, takeaway, accent,
}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const progress = frame / durationInFrames;
  const pulse = Math.sin(frame * 0.025) * 15;
  const outroOpacity = interpolate(frame,[durationInFrames-fps*1.5,durationInFrames],[1,0],{extrapolateLeft:'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor:BG,fontFamily:'Inter,Arial,sans-serif'}}>
      {/* Grid + orbs */}
      <AbsoluteFill style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',backgroundSize:'60px 60px'}} />
      <div style={{position:'absolute',top:-150+pulse,right:-150,width:500,height:500,background:`radial-gradient(circle,${accent}18,transparent 70%)`,borderRadius:'50%'}} />
      <div style={{position:'absolute',bottom:-100-pulse,left:-150,width:400,height:400,background:'radial-gradient(circle,#ec489915,transparent 70%)',borderRadius:'50%'}} />

      <div style={{padding:'70px 90px',opacity:outroOpacity,height:'100%'}}>

        {/* Phase 1: "What is X?" (0-3s) */}
        <Sequence from={0} durationInFrames={fps*3}>
          {(() => {
            const scale = spring({frame,fps,config:{damping:10,mass:0.8}});
            return (
              <AbsoluteFill style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <div style={{transform:`scale(${scale})`,textAlign:'center'}}>
                  <div style={{fontSize:28,color:accent,fontWeight:600,letterSpacing:4,marginBottom:20,textTransform:'uppercase'}}>WHAT IS</div>
                  <div style={{fontSize:96,fontWeight:900,color:'white',lineHeight:1.1,background:`linear-gradient(135deg,white,${accent})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{concept}</div>
                  <div style={{fontSize:24,color:'rgba(255,255,255,0.5)',marginTop:16}}>{tagline}</div>
                </div>
              </AbsoluteFill>
            );
          })()}
        </Sequence>

        {/* Phase 2: Simple analogy (3-10s) */}
        <Sequence from={fps*3} durationInFrames={fps*7}>
          {(() => {
            const f = frame - fps*3;
            const iconScale = spring({frame:f,fps,config:{damping:8}});
            const textOp = interpolate(f,[fps*0.5,fps*1.5],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
            return (
              <AbsoluteFill style={{display:'flex',alignItems:'center',justifyContent:'center',gap:60}}>
                <div style={{fontSize:160,transform:`scale(${iconScale})`}}>{analogyIcon}</div>
                <div style={{maxWidth:900,opacity:textOp}}>
                  <div style={{fontSize:22,color:accent,fontWeight:600,letterSpacing:2,marginBottom:12}}>THINK OF IT LIKE...</div>
                  <div style={{fontSize:40,color:'white',fontWeight:700,lineHeight:1.4}}>{analogy}</div>
                </div>
              </AbsoluteFill>
            );
          })()}
        </Sequence>

        {/* Phase 3: Step-by-step flow (10-25s) */}
        <Sequence from={fps*10} durationInFrames={fps*15}>
          {(() => {
            const f = frame - fps*10;
            return (
              <AbsoluteFill style={{display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 90px'}}>
                <div style={{fontSize:22,color:accent,fontWeight:600,letterSpacing:3,marginBottom:30,opacity:interpolate(f,[0,fps*0.5],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>HOW IT WORKS</div>
                {steps.map((step, i) => {
                  const delay = fps * 1 + i * fps * 2;
                  const op = interpolate(f,[delay,delay+fps*0.5],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
                  const x = interpolate(f,[delay,delay+fps*0.5],[80,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
                  // Arrow between steps
                  const arrowOp = i < steps.length-1 ? interpolate(f,[delay+fps*0.8,delay+fps*1.2],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}) : 0;
                  return (
                    <React.Fragment key={i}>
                      <div style={{opacity:op,transform:`translateX(${x}px)`,display:'flex',alignItems:'center',gap:24,marginBottom:8}}>
                        <div style={{width:60,height:60,borderRadius:16,background:`${accent}15`,border:`1px solid ${accent}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,flexShrink:0}}>{step.icon}</div>
                        <div>
                          <div style={{fontSize:28,fontWeight:700,color:'white'}}>{step.title}</div>
                          <div style={{fontSize:18,color:'rgba(255,255,255,0.5)',marginTop:4}}>{step.detail}</div>
                        </div>
                      </div>
                      {i < steps.length-1 && <div style={{opacity:arrowOp,marginLeft:28,marginBottom:8,fontSize:20,color:`${accent}60`}}>↓</div>}
                    </React.Fragment>
                  );
                })}
              </AbsoluteFill>
            );
          })()}
        </Sequence>

        {/* Phase 4: Components grid (25-40s) */}
        <Sequence from={fps*25} durationInFrames={fps*15}>
          {(() => {
            const f = frame - fps*25;
            return (
              <AbsoluteFill style={{display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 90px'}}>
                <div style={{fontSize:22,color:accent,fontWeight:600,letterSpacing:3,marginBottom:30,opacity:interpolate(f,[0,fps*0.5],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>KEY COMPONENTS</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
                  {components.map((comp, i) => {
                    const delay = fps * 0.5 + i * fps * 1;
                    const s = spring({frame:Math.max(0,f-delay),fps,config:{damping:14}});
                    const op = interpolate(f,[delay,delay+fps*0.4],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
                    return (
                      <div key={i} style={{opacity:op,transform:`scale(${s})`,padding:28,borderRadius:20,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',backdropFilter:'blur(20px)'}}>
                        <div style={{fontSize:40,marginBottom:12}}>{comp.icon}</div>
                        <div style={{fontSize:24,fontWeight:700,color:'white',marginBottom:6}}>{comp.name}</div>
                        <div style={{fontSize:16,color:'rgba(255,255,255,0.5)',lineHeight:1.5}}>{comp.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </AbsoluteFill>
            );
          })()}
        </Sequence>

        {/* Phase 5: Code example (40-50s) */}
        {codeExample && (
          <Sequence from={fps*40} durationInFrames={fps*10}>
            {(() => {
              const f = frame - fps*40;
              const lines = codeExample.split('\n');
              return (
                <AbsoluteFill style={{display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 90px'}}>
                  <div style={{fontSize:22,color:accent,fontWeight:600,letterSpacing:3,marginBottom:20,opacity:interpolate(f,[0,fps*0.5],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>IN CODE</div>
                  <div style={{background:'rgba(0,0,0,0.5)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:32,fontFamily:'JetBrains Mono,monospace',fontSize:22}}>
                    {lines.map((line, i) => {
                      const lineOp = interpolate(f,[fps*0.5+i*4,fps*0.5+i*4+6],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
                      return <div key={i} style={{opacity:lineOp,color:'#e2e8f0',lineHeight:1.8}}>{line}</div>;
                    })}
                  </div>
                </AbsoluteFill>
              );
            })()}
          </Sequence>
        )}

        {/* Phase 6: Takeaway (50-55s) */}
        <Sequence from={fps*50} durationInFrames={fps*5}>
          {(() => {
            const f = frame - fps*50;
            const s = spring({frame:f,fps,config:{damping:10}});
            return (
              <AbsoluteFill style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div style={{transform:`scale(${s})`,padding:'40px 60px',borderRadius:24,background:`linear-gradient(135deg,${accent}12,#ec489908)`,borderLeft:`4px solid ${accent}`,maxWidth:1200}}>
                  <div style={{fontSize:22,color:accent,fontWeight:600,marginBottom:12}}>💡 REMEMBER</div>
                  <div style={{fontSize:36,color:'white',fontWeight:700,lineHeight:1.4}}>{takeaway}</div>
                </div>
              </AbsoluteFill>
            );
          })()}
        </Sequence>

        {/* Phase 7: Outro (55-60s) */}
        <Sequence from={fps*55}>
          <AbsoluteFill style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',opacity:interpolate(frame-fps*55,[0,fps*0.5],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>
            <div style={{fontSize:40,fontWeight:800,background:`linear-gradient(135deg,${accent},#ec4899)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:12}}>MaanavaN® Bytes</div>
            <div style={{fontSize:20,color:'rgba(255,255,255,0.3)',fontFamily:'JetBrains Mono,monospace'}}>bytes.maanavan.com</div>
          </AbsoluteFill>
        </Sequence>
      </div>

      {/* Progress bar */}
      <div style={{position:'absolute',bottom:0,left:0,width:`${progress*100}%`,height:4,background:`linear-gradient(90deg,${accent},#ec4899)`,borderRadius:'0 2px 0 0'}} />
    </AbsoluteFill>
  );
};
