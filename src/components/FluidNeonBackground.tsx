// @ts-nocheck
"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    // Map a standard plane geometry to full absolute screen space
    gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

// Simplex 3D Noise by Ian McEwan, Ashima Arts
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 1.0/7.0; 
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
    // We map UV from 0 to 1 based on screen coordinates
    // Adjust aspect ratio so our math is perfectly circular
    vec2 aspectScale = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 uv = vUv * aspectScale;
    vec2 mouse = u_mouse * aspectScale;

    // Mouse repulsor calculation
    float dist = distance(uv, mouse);
    
    // The radius of the dark void around the mouse
    float voidRadius = 0.25;
    float voidStrength = smoothstep(0.0, voidRadius, dist);

    // Gently push coordinates away from the mouse
    vec2 dir = normalize(uv - mouse);
    vec2 distortedUv = uv + dir * (1.0 - voidStrength) * 0.15;

    // Scale and time for noise frequency mapping
    float scale = 1.8;
    float timeSlow = u_time * 0.12;

    // Multi-layered 3D simplex noise overlapping
    float n1 = snoise(vec3(distortedUv * scale, timeSlow));
    float n2 = snoise(vec3(distortedUv * scale * 1.5 - n1, timeSlow * 1.2));
    float n3 = snoise(vec3(distortedUv * scale * 0.8 + n2, timeSlow * 0.8));

    // Consolidate into flow intensity ~ 0.0 to 1.0
    float flow = (n1 + n2 + n3 + 3.0) / 6.0;

    // Aggressively subtract from flow at the core of the mouse cursor to ensure it's pitch black
    flow = mix(0.0, flow, smoothstep(0.05, voidRadius, dist));

    // Hex Color Palette Mappings
    // Obsidian: #020617
    vec3 obsidian = vec3(0.008, 0.024, 0.090);
    // Cyan: #00FFFF
    vec3 cyan = vec3(0.0, 1.0, 1.0);
    // Electric Blue: #1D4ED8
    vec3 electric = vec3(0.114, 0.306, 0.847);
    // Deep Violet: #4F46E5
    vec3 violet = vec3(0.310, 0.275, 0.898);

    vec3 col = obsidian;

    // Interpolation stops
    float c1 = smoothstep(0.35, 0.60, flow); 
    float c2 = smoothstep(0.55, 0.85, flow); 
    float c3 = smoothstep(0.75, 1.00, flow); 

    col = mix(col, violet, c1);
    col = mix(col, electric, c2);
    col = mix(col, cyan, c3);

    // Subtle edge ring glowing around mouse
    float ring = smoothstep(voidRadius, voidRadius - 0.08, dist) * smoothstep(0.0, voidRadius - 0.08, dist);
    col += mix(vec3(0.0), electric, ring * 0.6);

    gl_FragColor = vec4(col, 1.0);
}
`;

const FluidMaterial = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) }
    }),
    []
  );

  // Keep resolution uniform strictly synced with canvas size
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_resolution.value.set(size.width, size.height);
    }
  }, [size]);

  // Track absolute mouse coordinates globally across exact window space
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (materialRef.current) {
        // Normalize coordinates to [0, 1] relative to bottom-left origin
        const x = e.clientX / window.innerWidth;
        const y = 1.0 - (e.clientY / window.innerHeight);
        
        // Easing interpolation into the shader could make it smoother, 
        // but raw raw data works fine since 60hz hardware updates easily capture subtle moves.
        materialRef.current.uniforms.u_mouse.value.set(x, y);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      {/* 2x2 plane matches exact logical normalized coordinates [-1, 1] mapped in vertex shader */}
      {/* We set uv dimensions dynamically implicitly via screen edges */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default function FluidNeonBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#020617] pointer-events-none">
      {/* Canvas container upscaled slightly to prevent border artifacting on edge blurs */}
      <div className="absolute inset-0 opacity-85" style={{ transform: 'scale(1.05)' }}>
        <Canvas>
          <FluidMaterial />
        </Canvas>
      </div>

      {/* Cinematic Post-Processing: Heavy Gaussian Lens blur overlay across the CSS DOM node rather than expensive WebGL multipass */}
      <div className="absolute inset-0 backdrop-blur-[60px] pointer-events-none" />
      
      {/* Cinematic Post-Processing: Procedural SVG film grain with blend-mode overlay for professional texturing */}
      <div 
        className="absolute inset-0 opacity-[0.25] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
    </div>
  );
}
