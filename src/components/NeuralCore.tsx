'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars, OrbitControls, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';

function NeuralParticles(props: any) {
  const ref = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);
  const mouse = useRef(new THREE.Vector2());
  const { viewport, mouse: threeMouse } = useThree();

  const count = 8000;
  const radius = 6;
  
  // Generate particles with dynamic colors
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Spherical distribution with some randomness
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.3 + Math.random() * 0.7);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      
      // Color gradient: Blue center -> Purple mid -> Cyan outer
      const colorFactor = (r / radius);
      if (colorFactor < 0.33) {
        colors[i * 3] = 0;     // R
        colors[i * 3 + 1] = 0.95; // G
        colors[i * 3 + 2] = 1;    // B
      } else if (colorFactor < 0.66) {
        colors[i * 3] = 0.7;   // R
        colors[i * 3 + 1] = 0.1; // G
        colors[i * 3 + 2] = 1;    // B
      } else {
        colors[i * 3] = 0;     // R
        colors[i * 3 + 1] = 0.95; // G
        colors[i * 3 + 2] = 0.95; // B
      }
      
      sizes[i] = Math.random() * 0.1;
    }
    
    return { positions, colors, sizes };
  }, [count, radius]);

  useFrame((state) => {
    if (ref.current) {
      // Rotate the entire system
      ref.current.rotation.x += 0.002;
      ref.current.rotation.y += 0.003;
      
      // React to mouse movement for dynamic lighting
      const targetX = (threeMouse.x * viewport.width) / 2;
      const targetY = (threeMouse.y * viewport.height) / 2;
      
      // Subtle pulse based on hover
      const pulse = hovered ? 1.1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05 : 1;
      ref.current.scale.set(pulse, pulse, pulse);
      
      // Wobble effect
      ref.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;
      ref.current.position.y = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.5;
    }
  });

  return (
    <group>
      <Points
        ref={ref}
        positions={particles.positions}
        colors={particles.colors}
        sizes={particles.sizes}
        stride={3}
        frustumCulled={false}
        {...props}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <PointMaterial
          transparent
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </Points>
      
      // Add inner glowing core
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial 
          color="#00f3ff" 
          transparent 
          opacity={0.1} 
          side={THREE.DoubleSide}
        />
      </mesh>
      
      // Add secondary particle layer for depth
      <Points>
        {Array.from({ length: 2000 }).map((_, i) => {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = radius * 1.5;
          return (
            <mesh key={i} position={[
              r * Math.sin(phi) * Math.cos(theta),
              r * Math.sin(phi) * Math.sin(theta),
              r * Math.cos(phi)
            ]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial color="#bc13fe" transparent opacity={0.6} />
            </mesh>
          );
        })}
      </Points>
    </group>
  );
}

function CinematicCamera() {
  return (
    <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={75} />
  );
}

function NeuralCoreBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Canvas gl={{ antialias: false, powerPreference: 'high-performance' }}>
        <CinematicCamera />
        
        // Dynamic Lights
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f3ff" distance={20} decay={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#bc13fe" distance={20} decay={2} />
        <pointLight position={[0, 0, 5]} intensity={2} color="#0aff0a" distance={15} decay={2} />
        
        // Volumetric Fog
        <fog attach="fog" args={['#0a0a0f', 5, 25]} />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <NeuralParticles />
        </Float>
        
        <Stars radius={150} depth={60} count={10000} factor={6} saturation={0.5} fade speed={2} />
        <Sparkles count={500} scale={12} size={4} speed={0.4} opacity={0.5} color="#00f3ff" />
        
        // Cinematic Post-Processing
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.6} />
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      // Overlay for scanlines and vignette
      <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsIDAsIDAsIDAuMSkiIC8+Cjwvc3ZnPg==')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0f_100%)] opacity-60"></div>
    </div>
  );
}

export default NeuralCoreBackground;
