'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, Target, TrendingUp, Play, ChevronDown, Star, Shield, Clock, Cpu, Globe, Eye } from 'lucide-react';
import dynamic from 'next/dynamic';
import AIAssistant from '@/components/AIAssistant';

const NeuralCore = dynamic(() => import('@/components/NeuralCore'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-deep-space flex items-center justify-center">
      <div className="text-neon-blue animate-pulse font-cinematic text-2xl flex flex-col items-center">
        <Cpu className="w-12 h-12 mb-4 animate-spin" />
        <span>Initializing Neural Core...</span>
      </div>
    </div>
  )
});

const industries = [
  { 
    name: 'Real Estate', 
    icon: Target, 
    color: 'from-cyan-400 to-blue-600',
    desc: 'AI-powered property tours with volumetric lighting and neural rendering.'
  },
  { 
    name: 'E-Commerce', 
    icon: TrendingUp, 
    color: 'from-purple-400 to-pink-600',
    desc: 'Dynamic product showcases with holographic overlays and real-time customization.'
  },
  { 
    name: 'Legal Services', 
    icon: Shield, 
    color: 'from-emerald-400 to-green-600',
    desc: 'Secure, AI-generated case presentations with forensic-grade visual clarity.'
  },
  { 
    name: 'Personal Brand', 
    icon: Star, 
    color: 'from-amber-400 to-orange-600',
    desc: 'Cinematic personal narratives with director-level AI cinematography.'
  },
];

const stats = [
  { label: 'Videos Generated', value: '10M+', icon: Play, sub: 'and counting' },
  { label: 'Uptime', value: '99.99%', icon: Clock, sub: 'global edge network' },
  { label: 'Rating', value: '4.9/5', icon: Star, sub: 'from 50k+ creators' },
  { label: 'AI Models', value: '50+', icon: Cpu, sub: 'specialized neural nets' },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green origin-left z-50"
        style={{ scaleX }}
      />

      {/* 3D Neural Core Background */}
      <NeuralCore />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between holo-glass rounded-2xl px-6 py-4 border border-neon-blue/20 backdrop-blur-xl bg-black/40">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-neon-blue animate-pulse group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-neon-blue blur-xl opacity-50 animate-pulse"></div>
            </div>
            <span className="font-cinematic text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple neon-text">
              SAHJONY
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {['Features', 'Pricing', 'Enterprise', 'Showcase'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-gray-300 hover:text-neon-blue transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue transition-all group-hover:w-full"></span>
              </a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-cinematic text-white shadow-lg shadow-neon-blue/50 cinematic-btn relative overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <motion.div 
          style={{ y, opacity }}
          className="max-w-7xl mx-auto text-center relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="inline-block mb-6 px-4 py-2 rounded-full holo-glass border border-neon-blue/30">
              <span className="text-sm font-neural text-neon-blue flex items-center space-x-2">
                <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></span>
                <span>Next-Gen AI Video Engine</span>
              </span>
            </div>
            
            <h1 className="font-cinematic text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight">
              <motion.span 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white block"
              >
                Hollywood-
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="neon-text glitch" 
                data-text="Cinematic AI"
              >
                Cinematic AI
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto font-neural leading-relaxed"
            >
              The world's most advanced AI video engine. Create <span className="text-neon-blue font-bold">Hollywood-grade</span> content 
              with neural networks, <span className="text-neon-purple font-bold">volumetric lighting</span>, and <span className="text-neon-green font-bold">cinematic VFX</span>.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 243, 255, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl font-cinematic text-2xl font-bold text-white shadow-2xl shadow-neon-blue/50 cinematic-btn flex items-center space-x-3 relative overflow-hidden group"
              >
                <Play className="w-7 h-7 group-hover:scale-110 transition-transform" />
                <span>Start Creating</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 holo-glass rounded-xl font-cinematic text-2xl font-bold text-neon-blue border-2 border-neon-blue/50 cinematic-btn backdrop-blur-xl bg-black/30"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10, scale: 1.05 }}
                className="holo-glass rounded-2xl p-6 text-center border border-neon-blue/20 backdrop-blur-xl bg-black/40 group"
              >
                <div className="relative inline-block mb-3">
                  <stat.icon className="w-10 h-10 text-neon-blue mx-auto group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-neon-blue blur-lg opacity-30 group-hover:opacity-60 transition-opacity"></div>
                </div>
                <div className="font-cinematic text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm font-neural">{stat.label}</div>
                {stat.sub && <div className="text-neon-purple/70 text-xs mt-1">{stat.sub}</div>}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          <ChevronDown className="w-10 h-10 text-neon-blue drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]" />
        </motion.div>
      </section>

      {/* Industries Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-cinematic text-5xl md:text-7xl font-bold text-center mb-8 neon-text"
          >
            Industry-Agnostic AI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto font-neural"
          >
            Powered by specialized neural networks trained on millions of industry-specific datasets.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -15, scale: 1.03 }}
                className={`holo-glass rounded-3xl p-8 cursor-pointer group border border-transparent hover:border-${industry.color.split('-')[1]}-500/50 backdrop-blur-xl bg-black/40 relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${industry.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-${industry.color.split('-')[1]}-500/50`}>
                  <industry.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-cinematic text-2xl font-bold text-white mb-4 group-hover:text-neon-blue transition-colors">{industry.name}</h3>
                <p className="text-gray-400 font-neural leading-relaxed group-hover:text-gray-300 transition-colors">
                  {industry.desc}
                </p>
                <div className="mt-6 flex items-center text-neon-blue text-sm font-bold group-hover:translate-x-2 transition-transform">
                  <span>Explore</span>
                  <ChevronDown className="w-4 h-4 ml-2 -rotate-90" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="holo-glass rounded-3xl p-16 border border-neon-purple/30 backdrop-blur-xl bg-black/60 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 animate-pulse"></div>
            <div className="relative z-10">
              <h2 className="font-cinematic text-5xl md:text-7xl font-bold mb-8 neon-text">Ready to Create Hollywood Magic?</h2>
              <p className="text-2xl text-gray-300 mb-10 font-neural max-w-3xl mx-auto">
                Join 10M+ creators using SAHJONY to produce cinematic content with AI. 
                <span className="text-neon-blue font-bold"> No experience required.</span>
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(188, 19, 254, 0.7)' }}
                whileTap={{ scale: 0.95 }}
                className="px-16 py-6 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl font-cinematic text-3xl font-bold text-white shadow-2xl shadow-neon-purple/50 cinematic-btn relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
              </motion.button>
              <p className="mt-6 text-gray-500 text-sm font-neural">
                Free tier includes 5 videos/month. No credit card required.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-neon-blue/20 backdrop-blur-xl bg-black/80">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Sparkles className="w-6 h-6 text-neon-blue" />
            <span className="font-cinematic text-xl font-bold text-white">SAHJONY</span>
          </div>
          <p className="text-gray-500 text-sm font-neural">
            © 2026 SAHJONY. Hollywood-grade AI Video Engine. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-6 mt-6">
            {['Privacy', 'Terms', 'Security', 'Contact'].map((item) => (
              <a key={item} href="#" className="text-gray-500 hover:text-neon-blue text-sm transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIAssistant />
    </main>
  );
}
