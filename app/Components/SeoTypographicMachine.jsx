"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  Cpu,
  Search,
  Sparkles,
  Link2,
  Activity,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Layers,
  BarChart3,
  Target,
  RefreshCw,
  Award,
} from "lucide-react";

const FOCUS_CARDS = [
  {
    num: "01",
    title: "Data-Driven Keyword Strategy",
    tag: "High-Intent Focus",
    desc: "Targeting commercial and transactional search queries that drive actual business revenue, not just vanity impressions.",
    icon: Search,
    stats: "94.8% Buying Intent",
    highlight: "Semantic Clustering",
    color: "from-[#0077B6]/15 to-[#38BDF8]/5",
    badgeColor: "bg-[#0077B6]/10 text-[#0077B6] border-[#0077B6]/20",
  },
  {
    num: "02",
    title: "White-Hat SEO Practices Only",
    tag: "100% Google Compliant",
    desc: "Strict adherence to Google search essentials. Zero spam networks or risky shortcuts, keeping your rankings completely safe.",
    icon: ShieldCheck,
    stats: "0% Penalty Vulnerability",
    highlight: "Ethical Growth",
    color: "from-emerald-500/15 to-teal-500/5",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    num: "03",
    title: "Continuous Algorithm Adaptation",
    tag: "AI & Update Shield",
    desc: "Real-time calibration against Google core updates, AI search summaries, and changing user behavior patterns.",
    icon: Cpu,
    stats: "< 24h Response Time",
    highlight: "Active Calibration",
    color: "from-indigo-500/15 to-blue-500/5",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    num: "04",
    title: "Focus on Long-Term Ranking Stability",
    tag: "Compounding Authority",
    desc: "Building sustainable domain equity and topical authority that holds top positions across quarters, not temporary spikes.",
    icon: TrendingUp,
    stats: "98.2% Retention Rate",
    highlight: "Evergreen ROI",
    color: "from-sky-500/15 to-cyan-500/5",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
  },
];

const DIFFERENCE_POINTS = [
  {
    title: "System-Driven SEO, Not Random Execution",
    desc: "A structured, repeatable methodology engineered with precision workflows instead of uncoordinated trial and error.",
    icon: Target,
    advantage: "Predictable, compounding organic growth",
    avoid: "Random guesswork and disjointed blog posts",
  },
  {
    title: "Strong Integration of Content Marketing & Technical Optimization",
    desc: "Editorial copywriting seamlessly aligned with Core Web Vitals, site speed, crawlability, and schema architecture.",
    icon: Layers,
    advantage: "Unified content & speed synergy",
    avoid: "Siloed copywriting with slow load times",
  },
  {
    title: "Focus on High-Intent Keywords, Not Vanity Metrics",
    desc: "Prioritizing commercial search queries that convert into paying leads, filtering out high-volume empty traffic.",
    icon: Sparkles,
    advantage: "Qualified, high-converting customer traffic",
    avoid: "Inflated impressions with zero sales impact",
  },
  {
    title: "Clean, Sustainable Backlink Strategies",
    desc: "Earning authoritative, contextual industry references that strengthen domain rating without toxic link farm risks.",
    icon: Link2,
    advantage: "High-trust, enduring domain authority",
    avoid: "Spam PBNs that trigger manual penalties",
  },
  {
    title: "Continuous Monitoring and Improvement",
    desc: "24/7 rank surveillance and iterative on-page refinements to defend and expand market leadership.",
    icon: Activity,
    advantage: "Proactive defense against ranking drops",
    avoid: "Static monthly PDF reports with delayed action",
  },
];

const OPTIMIZATION_STEPS = [
  {
    step: "01",
    name: "MONITOR",
    title: "Continuous Diagnostics",
    desc: "24/7 tracking of keyword positions, search impressions, technical crawl health, and competitor shifts.",
  },
  {
    step: "02",
    name: "ADAPT",
    title: "Algorithmic Calibration",
    desc: "Instant refinements to semantic content, internal linking, and metadata as search models evolve.",
  },
  {
    step: "03",
    name: "IMPROVE",
    title: "Authority Compounding",
    desc: "Systematic expansion of topical clusters to capture dominant, defensible #1 rankings.",
  },
];

export default function SeoTypographicMachine() {
  const [activeTab, setActiveTab] = useState("focus"); // 'focus' | 'difference' | 'cycle'

  return (
    <section className="relative w-full bg-[#FAFBFD] text-[#0B2748] py-24 sm:py-32 px-4 sm:px-8 lg:px-12 select-none overflow-hidden">
      {/* Ambient Lighting Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-r from-[#0077B6]/12 via-[#38BDF8]/10 to-[#0B2748]/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-[#0077B6]/8 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        
        {/* ============================================================== */}
        {/* 1. TOP EDITORIAL HEADER                                        */}
        {/* ============================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0077B6]/10 border border-[#0077B6]/20 text-[#0077B6] font-mono text-xs font-bold uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-[#0077B6] animate-pulse" />
            <span>BRAND 360s · SEO METHODOLOGY</span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0B2748] leading-[1.1]"
            style={{
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Why Businesses Choose <span className="text-[#0077B6]">BRAND 360s</span>
          </motion.h2>

          {/* Subtitle / Core Hook */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            BRAND 360s is not a volume-based SEO agency. We focus on structured, result-driven SEO that builds long-term value.
          </motion.p>
        </div>

        {/* ============================================================== */}
        {/* 2. INTERACTIVE NAVIGATION CONTROLLER                           */}
        {/* ============================================================== */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(11,39,72,0.06)] gap-2">
            {[
              { id: "focus", label: "Our SEO Focus", count: "4 Pillars" },
              { id: "difference", label: "What Sets Us Apart", count: "5 Principles" },
              { id: "cycle", label: "Continuous Adaptation", count: "3 Stages" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm tracking-tight transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#0B2748] text-white shadow-md font-bold"
                      : "text-slate-600 hover:text-[#0B2748] hover:bg-slate-50"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-[#0077B6] text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. DYNAMIC CONTENT VIEWS                                       */}
        {/* ============================================================== */}
        <div className="min-h-[480px]">
          {/* VIEW 1: OUR SEO FOCUS (4 PILLARS) */}
          {activeTab === "focus" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {FOCUS_CARDS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="bg-white border border-slate-200/80 rounded-[24px] p-7 shadow-[0_10px_30px_rgba(11,39,72,0.05)] hover:shadow-[0_20px_40px_rgba(0,119,182,0.12)] hover:border-[#0077B6]/40 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Row */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="w-10 h-10 rounded-xl bg-[#0B2748] text-white font-mono font-bold text-xs flex items-center justify-center shadow-sm">
                          {pillar.num}
                        </span>
                        <div className="p-2.5 rounded-xl bg-[#0077B6]/10 text-[#0077B6] group-hover:bg-[#0077B6] group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Tag */}
                      <span className={`inline-block font-mono text-[11px] font-bold px-2.5 py-1 rounded-md border mb-3 ${pillar.badgeColor}`}>
                        {pillar.tag}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-[#0B2748] leading-snug mb-3 group-hover:text-[#0077B6] transition-colors">
                        {pillar.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    {/* Bottom Stat Card */}
                    <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between font-mono text-xs">
                      <span className="text-slate-400">{pillar.highlight}</span>
                      <span className="font-bold text-[#0077B6]">{pillar.stats}</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* VIEW 2: WHAT SETS US APART (5 PRINCIPLES) */}
          {activeTab === "difference" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {DIFFERENCE_POINTS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-white border border-slate-200/80 rounded-[20px] p-6 sm:p-7 shadow-[0_6px_25px_rgba(11,39,72,0.04)] hover:border-[#0077B6]/40 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="flex items-start gap-4 max-w-2xl">
                      <div className="p-3 rounded-2xl bg-[#0077B6]/10 text-[#0077B6] shrink-0 mt-1">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="text-lg sm:text-xl font-bold text-[#0B2748]">
                          {item.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Comparison Pill Matrix */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                      <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 font-medium">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{item.avoid}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0077B6]/10 border border-[#0077B6]/25 text-xs text-[#0077B6] font-bold">
                        <CheckCircle2 className="w-4 h-4 text-[#0077B6] shrink-0" />
                        <span>{item.advantage}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* VIEW 3: CONTINUOUS ADAPTATION LOOP (3 STAGES) */}
          {activeTab === "cycle" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {OPTIMIZATION_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/80 rounded-[24px] p-8 shadow-[0_10px_30px_rgba(11,39,72,0.05)] flex flex-col justify-between relative group hover:border-[#0077B6]/50 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-4xl font-black text-[#0077B6] font-mono">
                        {step.step}
                      </span>
                      <span className="p-2.5 rounded-xl bg-[#0077B6]/10 text-[#0077B6]">
                        <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400 block mb-1">
                      {step.name}
                    </span>

                    <h3 className="text-2xl font-bold text-[#0B2748] mb-3">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between font-mono text-xs text-[#0077B6] font-bold">
                    <span>Active Feedback Loop</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* ============================================================== */}
        {/* 4. FINAL MANIFESTO BLUE HERO CARD                              */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0B2748] border border-[#0077B6]/40 rounded-[28px] p-8 sm:p-12 text-white shadow-[0_20px_50px_rgba(11,39,72,0.25)] flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0077B6]/25 rounded-full blur-[90px] pointer-events-none" />

          <div className="space-y-3 z-10 max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
              <Award className="w-4 h-4" />
              <span>Our Organic Promise</span>
            </span>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              BRAND 360s is not a volume-based SEO agency.
            </h3>

            <p className="text-sm sm:text-base text-slate-300 font-medium">
              We focus on structured, result-driven SEO that builds long-term value.
            </p>
          </div>

          <div className="z-10 shrink-0">
            <div className="px-6 py-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-4 text-white font-mono text-xs sm:text-sm font-bold shadow-inner">
              <BarChart3 className="w-6 h-6 text-[#38BDF8]" />
              <div className="flex flex-col text-left">
                <span className="text-white">Long-Term Value</span>
                <span className="text-[#38BDF8] text-[11px] font-normal">Compounding Ranking Stability</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
