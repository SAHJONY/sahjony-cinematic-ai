'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function NeuralParticles(props: any) {
  const ref = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);
  
  const count = 5000;
  const radius = 5;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.5 + Math.random() * 0.5);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      
      // Color gradient from blue to purple
      const colorFactor = Math.random();
      colors[i * 3] = 0 + colorFactor * 0.7;     // R
      colors[i * 3 + 1] = 0.95 + colorFactor * 0.05; // G
      colors[i * 3 + 2] = 1;                      // B
    }
    
    return { positions, colors };
  }, [count, radius]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.08;
      
      // Pulse effect on hover
      const pulse = hovered ? 1.2 : 1;
      ref.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <Points
      ref={ref}
      positions={particles.positions}
      colors={particles.colors}
      stride={3}
      frustumCulled={false}
      {...props}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <PointMaterial
        transparent
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function NeuralCoreBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <color attach="background" args={['#0a0a0f']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#bc13fe" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <NeuralParticles />
        </Float>
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}

export default NeuralCoreBackground;
