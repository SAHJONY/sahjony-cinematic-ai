'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles, Zap, Target, TrendingUp, Play, ChevronDown, Star, Shield, Clock } from 'lucide-react';
import dynamic from 'next/dynamic';
import AIAssistant from '@/components/AIAssistant';

// Import NeuralCore with no SSR to avoid Three.js issues
const NeuralCore = dynamic(() => import('@/components/NeuralCore'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-deep-space flex items-center justify-center">
      <div className="text-neon-blue animate-pulse font-cinematic text-2xl">Initializing Neural Core...</div>
    </div>
  )
});

const industries = [
  { name: 'Real Estate', icon: Target, color: 'from-neon-blue to-cyan-500' },
  { name: 'E-Commerce', icon: TrendingUp, color: 'from-neon-purple to-pink-500' },
  { name: 'Legal Services', icon: Shield, color: 'from-neon-green to-emerald-500' },
  { name: 'Personal Brand', icon: Star, color: 'from-yellow-400 to-orange-500' },
];

const stats = [
  { label: 'Videos Generated', value: '10M+', icon: Play },
  { label: 'Uptime', value: '99.99%', icon: Clock },
  { label: 'Rating', value: '4.9/5', icon: Star },
  { label: 'AI Models', value: '50+', icon: Zap },
];

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* 3D Neural Core Background */}
      <NeuralCore />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-10 p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between holo-glass rounded-2xl px-6 py-4">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-8 h-8 text-neon-blue animate-pulse" />
            <span className="font-cinematic text-2xl font-bold neon-text">SAHJONY</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-neon-blue transition-colors">Features</a>
            <a href="#" className="text-gray-300 hover:text-neon-blue transition-colors">Pricing</a>
            <a href="#" className="text-gray-300 hover:text-neon-blue transition-colors">Enterprise</a>
            <button className="px-6 py-2 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-cinematic text-white cinematic-btn">
              Get Started
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-cinematic text-6xl md:text-8xl font-black mb-6">
              <span className="text-white">Hollywood-</span>
              <br />
              <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent neon-text glitch" data-text="Cinematic AI">
                Cinematic AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-neural">
              The world's most advanced AI video engine. Create Hollywood-grade content 
              with neural networks, volumetric lighting, and cinematic VFX.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl font-cinematic text-xl font-bold text-white shadow-lg shadow-neon-blue/50 cinematic-btn flex items-center space-x-3"
              >
                <Play className="w-6 h-6" />
                <span>Start Creating</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 holo-glass rounded-xl font-cinematic text-xl font-bold text-neon-blue border border-neon-blue/50 cinematic-btn"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="holo-glass rounded-2xl p-6 text-center"
              >
                <stat.icon className="w-8 h-8 text-neon-blue mx-auto mb-3" />
                <div className="font-cinematic text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-neon-blue" />
        </motion.div>
      </section>

      {/* Industries Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-cinematic text-5xl font-bold text-center mb-16 neon-text"
          >
            Industry-Agnostic AI
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`holo-glass rounded-2xl p-8 cursor-pointer group`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${industry.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <industry.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-cinematic text-2xl font-bold text-white mb-3">{industry.name}</h3>
                <p className="text-gray-400">
                  AI-powered content creation tailored for {industry.name.toLowerCase()} with Hollywood-grade VFX.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="holo-glass rounded-3xl p-12"
          >
            <h2 className="font-cinematic text-5xl font-bold mb-6 neon-text">Ready to Create Hollywood Magic?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join 10M+ creators using SAHJONY to produce cinematic content with AI.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl font-cinematic text-2xl font-bold text-white shadow-2xl shadow-neon-blue/50 cinematic-btn"
            >
              Get Started Free
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-neon-blue/20">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2026 SAHJONY. Hollywood-grade AI Video Engine. All rights reserved.</p>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIAssistant />
    </main>
  );
}
// Trigger deployment
