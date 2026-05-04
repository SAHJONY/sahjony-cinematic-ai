'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars, OrbitControls, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

function RainbowParticles(props: any) {
  const ref = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);
  const { viewport, mouse: threeMouse } = useThree();
  const hueRef = useRef(0);

  const count = 10000;
  const radius = 7;
  
  // Generate particles with dynamic rainbow colors
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.2 + Math.random() * 0.8);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      
      // Base color will be animated via shader or uniform, but we set initial random
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 1;
      
      sizes[i] = Math.random() * 0.15;
    }
    
    return { positions, sizes };
  }, [count, radius]);

  useFrame((state) => {
    if (ref.current) {
      // Rotate the entire system
      ref.current.rotation.x += 0.002;
      ref.current.rotation.y += 0.003;
      
      // Pulse effect
      const pulse = hovered ? 1.15 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05 : 1.0;
      ref.current.scale.set(pulse, pulse, pulse);
      
      // Wobble effect
      ref.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.8;
      ref.current.position.y = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.8;
      
      // Animate hue for rainbow effect
      hueRef.current = (hueRef.current + 0.01) % 1;
    }
  });

  return (
    <group>
      <Points
        ref={ref}
        positions={particles.positions}
        sizes={particles.sizes}
        stride={3}
        frustumCulled={false}
        {...props}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <PointMaterial
          transparent
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color={`hsl(${hueRef.current * 360}, 100%, 60%)`}
        />
      </Points>
      
      // Inner glowing core with rainbow gradient
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial 
          color={`hsl(${(hueRef.current * 360 + 180) % 360}, 100%, 50%)`} 
          transparent 
          opacity={0.15} 
          side={THREE.DoubleSide}
        />
      </mesh>
      
      // Secondary rainbow layer
      <Points>
        {Array.from({ length: 3000 }).map((_, i) => {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = radius * 1.6;
          const hue = (hueRef.current * 360 + i * 0.1) % 360;
          return (
            <mesh key={i} position={[
              r * Math.sin(phi) * Math.cos(theta),
              r * Math.sin(phi) * Math.sin(theta),
              r * Math.cos(phi)
            ]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial color={`hsl(${hue}, 100%, 60%)`} transparent opacity={0.7} />
            </mesh>
          );
        })}
      </Points>
    </group>
  );
}

function CinematicCamera() {
  return (
    <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={75} />
  );
}

function NeuralCoreBackground() {
  const hueRef = useRef(0);
  
  useFrame((state) => {
    hueRef.current = (hueRef.current + 0.005) % 1;
  });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Canvas gl={{ antialias: false, powerPreference: 'high-performance' }}>
        <CinematicCamera />
        
        // Dynamic Rainbow Lights
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={2} color={`hsl(${hueRef.current * 360}, 100%, 60%)`} distance={30} decay={2} />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color={`hsl(${(hueRef.current * 360 + 120) % 360}, 100%, 60%)`} distance={30} decay={2} />
        <pointLight position={[0, 0, 5]} intensity={2.5} color={`hsl(${(hueRef.current * 360 + 240) % 360}, 100%, 60%)`} distance={25} decay={2} />
        
        // Volumetric Fog with subtle color shift
        <fog attach="fog" args={[`hsl(${hueRef.current * 360}, 10%, 5%)`, 8, 30]} />
        
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
          <RainbowParticles />
        </Float>
        
        <Stars radius={200} depth={80} count={15000} factor={8} saturation={1} fade speed={3} />
        <Sparkles count={800} scale={15} size={5} speed={0.6} opacity={0.7} color={`hsl(${hueRef.current * 360}, 100%, 70%)`} />
        
        // Cinematic Post-Processing
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} mipmapBlur intensity={2} radius={0.8} />
          <Noise opacity={0.08} />
          <Vignette eskil={false} offset={0.15} darkness={1.2} />
        </EffectComposer>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.8} 
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      // Enhanced Overlay for scanlines and rainbow gradient
      <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsIDAsIDAsIDAuMSkiIC8+Cjwvc3ZnPg==')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--hue,0), 50%, 2%)_100%)] opacity-70" style={{ '--hue': hueRef.current * 360 } as any}></div>
      
      // Rainbow border glow effect
      <div className="absolute inset-0 pointer-events-none border-[2px] border-transparent" 
           style={{ 
             boxShadow: `inset 0 0 100px hsl(${hueRef.current * 360}, 100%, 50%, 0.1)`,
             animation: 'hue-rotate 10s linear infinite'
           }}></div>
    </div>
  );
}

export default NeuralCoreBackground;
