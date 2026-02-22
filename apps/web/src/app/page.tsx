"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
    Code, Palette, Film, Target, Zap, Shield, ArrowRight, Play, Check,
    Workflow, Bot, Globe, BarChart3, Lock, Clock, MessageSquare,
    ChevronDown, Layers, Terminal, Cpu, Database,
} from "lucide-react"
import { useState } from "react"

/* ── Animation Variants ── */
const fade = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
    }),
}

/* ── Data ── */
const integrations = [
    { name: "OpenAI", svg: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" /></svg> },
    { name: "LangChain", svg: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg> },
    { name: "n8n", svg: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><circle cx="6" cy="12" r="3" /><circle cx="18" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><line x1="8.5" y1="10.5" x2="15.5" y2="6.5" stroke="currentColor" strokeWidth="1.5" /><line x1="8.5" y1="13.5" x2="15.5" y2="17.5" stroke="currentColor" strokeWidth="1.5" /></svg> },
    { name: "Zapier", svg: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21l2-7.5L2 9h7z" /></svg> },
    { name: "Vercel", svg: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2L2 22h20L12 2z" /></svg> },
    { name: "Make", svg: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg> },
    { name: "Supabase", svg: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M13.5 21.15c-.46.56-1.37.2-1.37-.54V13h8.33c.84 0 1.3-.98.76-1.63L12.5 2.85c-.46-.56-1.37-.2-1.37.54V11H2.8c-.85 0-1.3.98-.76 1.63l8.96 10.52z" /></svg> },
    { name: "Replicate", svg: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect x="4" y="4" width="6" height="16" rx="1" /><rect x="12" y="7" width="4" height="13" rx="1" opacity="0.7" /><rect x="18" y="10" width="3" height="10" rx="1" opacity="0.4" /></svg> },
    { name: "CrewAI", svg: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><circle cx="8" cy="8" r="3" /><circle cx="16" cy="8" r="3" /><circle cx="12" cy="16" r="3" /><line x1="10" y1="9.5" x2="14" y2="9.5" stroke="black" strokeWidth="1" /><line x1="9" y1="10.5" x2="11" y2="14" stroke="black" strokeWidth="1" /><line x1="15" y1="10.5" x2="13" y2="14" stroke="black" strokeWidth="1" /></svg> },
    { name: "AutoGPT", svg: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18M7 7l10 10M17 7L7 17" /></svg> },
]

const features = [
    { icon: Code, title: "API-First", desc: "RESTful API with full OpenAPI spec. Integrate with any language or framework in under 5 minutes." },
    { icon: Palette, title: "Brand Kit System", desc: "Upload fonts, colors, and logos once. Every render is automatically on-brand, every time." },
    { icon: Film, title: "Video Generation", desc: "1080p video with motion graphics, transitions, and audio. Powered by React + Remotion." },
    { icon: Target, title: "Deterministic Output", desc: "Same input, same output. No randomness — perfect for automated pipelines." },
    { icon: Zap, title: "Sub-5s Renders", desc: "Async queue with BullMQ. Process thousands of renders concurrently without bottlenecks." },
    { icon: Shield, title: "Enterprise Security", desc: "API key auth, rate limiting, team management, and full audit trail." },
]

const useCases = [
    { icon: Bot, title: "AI Agent Workflows", desc: "Let your autonomous agents generate branded visuals as part of their task execution — no human in the loop." },
    { icon: Workflow, title: "Marketing Automation", desc: "Connect to your CMS or scheduler. Publish daily social content across 10+ channels automatically." },
    { icon: BarChart3, title: "Data Visualization", desc: "Turn analytics dashboards into shareable, branded images for stakeholders and social media." },
    { icon: Globe, title: "Multi-Language Content", desc: "Generate the same asset in 20 languages simultaneously. Perfect for global campaigns." },
]

const testimonials = [
    { quote: "We replaced a 3-person design team for social content. AgentCanvas pays for itself in the first week.", name: "Marco R.", role: "Head of Growth, SeriesA Startup", avatar: "M", color: "#2997FF", stars: 5 },
    { quote: "The API is absurdly simple. We went from concept to production in one afternoon.", name: "Sarah K.", role: "Lead Engineer, AI Agency", avatar: "S", color: "#BF5AF2", stars: 5 },
    { quote: "Our agents now produce 200+ branded posts per day. The consistency is unmatched.", name: "David L.", role: "CTO, Content Platform", avatar: "D", color: "#32D74B", stars: 5 },
]

const plans = [
    {
        name: "Starter", price: "0", period: "/mo", desc: "Perfect for prototyping.",
        features: ["50 renders/month", "1 Brand Kit", "Image output", "Community support", "API access"],
        cta: "Start Free", highlight: false,
    },
    {
        name: "Pro", price: "29", period: "/mo", desc: "For production workloads.",
        features: ["2,000 renders/month", "5 Brand Kits", "Image + Video output", "Priority queue", "Webhooks & callbacks", "Email support", "Analytics dashboard"],
        cta: "Start Trial", highlight: true,
    },
    {
        name: "Enterprise", price: "Custom", period: "", desc: "For scale and compliance.",
        features: ["Unlimited renders", "Unlimited Brand Kits", "Custom templates", "Dedicated infrastructure", "SLA guarantee", "SSO & SAML", "Priority phone support"],
        cta: "Contact Sales", highlight: false,
    },
]

const faqs = [
    { q: "What exactly does AgentCanvas do?", a: "AgentCanvas is a rendering API. You send it data (a title, image URL, brand settings) via a simple POST request, and it returns a production-ready image or video. Think of it as 'Canva as an API' — designed for machines, not humans." },
    { q: "Who is this for?", a: "Developers building AI agents, marketing automation platforms, or any software that needs to generate visual content programmatically. If your product creates social posts, reports, or video — AgentCanvas handles the visual layer." },
    { q: "How is this different from Canva or Figma?", a: "Canva and Figma are manual design tools for humans. AgentCanvas is a headless rendering engine for code. There's no UI to design in — you call an API and get pixel-perfect output. It's built for automation, not manual design." },
    { q: "What output formats are supported?", a: "PNG and JPEG for images, MP4 for videos. All outputs are high-resolution (up to 4K) and optimized for social media platforms." },
    { q: "How fast is rendering?", a: "Average image render takes 2-4 seconds. Video renders (up to 60 seconds long) take 10-30 seconds. All renders are processed asynchronously — you get a webhook when it's ready." },
    { q: "Can I use my own fonts and brand colors?", a: "Yes. Upload your .woff2 font files, hex colors, and logo via the Brand Kit API. Every subsequent render automatically uses your brand assets." },
    { q: "Is there a free tier?", a: "Yes. The Starter plan includes 50 free renders per month with full API access. No credit card required." },
    { q: "What happens if I exceed my render limit?", a: "Renders will be queued and processed at reduced priority. You can upgrade your plan at any time to restore full-speed rendering." },
]

const metrics = [
    { value: "2.8s", label: "Average render time", icon: Zap, color: "#2997FF" },
    { value: "99.9%", label: "API uptime", icon: Shield, color: "#32D74B" },
    { value: "50K+", label: "Assets generated", icon: Layers, color: "#BF5AF2" },
    { value: "200+", label: "Teams using it", icon: Globe, color: "#FF9F0A" },
]

/* ── Component ── */
export default function LandingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    return (
        <div className="min-h-screen bg-black">
            {/* ─── Nav ─── */}
            <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-black/60 backdrop-blur-2xl">
                <div className="max-w-6xl mx-auto h-14 px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2997FF] to-[#BF5AF2] flex items-center justify-center shadow-[0_0_15px_rgba(41,151,255,0.3)]">
                            <Layers className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-[15px] font-semibold text-white tracking-tight">AgentCanvas</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        {["Features", "Use Cases", "Pricing", "FAQ"].map((item) => (
                            <Link key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-[13px] text-[#A1A1AA] hover:text-white transition-colors duration-200">
                                {item}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-[13px] text-[#A1A1AA] hover:text-white transition-colors duration-200 hidden sm:block">Sign in</Link>
                        <Link href="/login" className="relative overflow-hidden text-[13px] font-medium text-white bg-gradient-to-r from-[#2997FF] to-[#5856D6] px-5 py-2 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(41,151,255,0.25)] hover:shadow-[0_0_25px_rgba(41,151,255,0.4)]">
                            <span className="absolute inset-0 shimmer-btn"></span>
                            <span className="relative z-10">Get Started</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* ─── Hero ─── */}
            <section className="relative pt-32 pb-24 px-6 overflow-hidden">
                {/* Background: Radial gradient + dot grid */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(41,151,255,0.12),transparent_70%)]" />
                <div className="absolute inset-0 dot-grid opacity-20" />
                {/* Floating orbs */}
                <div className="absolute top-20 left-[15%] w-72 h-72 bg-[#2997FF]/6 rounded-full blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
                <div className="absolute top-40 right-[10%] w-64 h-64 bg-[#BF5AF2]/6 rounded-full blur-[120px] animate-[float_8s_ease-in-out_infinite_reverse]" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-medium text-[#2997FF] border border-[#2997FF]/20 bg-[#2997FF]/5 mb-8 animate-[glow-pulse_3s_ease-in-out_infinite]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] animate-pulse"></span>
                                Public Beta — 50 Free Renders
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                            className="text-5xl sm:text-6xl lg:text-[80px] font-semibold text-white leading-[1.05] tracking-[-0.04em]"
                        >
                            Visual AI for
                            <br />
                            <span className="bg-gradient-to-r from-[#2997FF] via-[#BF5AF2] to-[#FF375F] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_4s_ease_infinite]">autonomous agents.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.12 }}
                            className="mt-6 text-[17px] sm:text-xl text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed font-light"
                        >
                            The API that turns data into branded images and videos.
                            <br className="hidden sm:block" />
                            Built for developers, designed for scale.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.24 }}
                            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link href="/login" className="relative overflow-hidden inline-flex items-center gap-2 bg-gradient-to-r from-[#2997FF] to-[#5856D6] text-white px-8 py-3.5 rounded-full text-[15px] font-semibold transition-all duration-300 group shadow-[0_0_30px_rgba(41,151,255,0.3)] hover:shadow-[0_0_40px_rgba(41,151,255,0.5)]">
                                <span className="absolute inset-0 shimmer-btn"></span>
                                <span className="relative z-10 flex items-center gap-2">Get Started Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                            </Link>
                            <Link href="#how-it-works" className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-white px-7 py-3 rounded-full text-[15px] font-medium transition-colors duration-200 border border-white/[0.06] hover:border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.05]">
                                <Play className="w-4 h-4" /> See How It Works
                            </Link>
                        </motion.div>
                    </div>

                    {/* ── Hero Product Showcase — Simple & Premium ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                        className="mt-20 relative max-w-5xl mx-auto px-4"
                    >
                        <div className="relative rounded-[2rem] p-3 bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl shadow-[0_20px_80px_rgba(41,151,255,0.15)] group">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent rounded-[2rem] opacity-50 pointer-events-none" />

                            {/* Inner Screen */}
                            <div className="relative rounded-[1.5rem] overflow-hidden border border-white/[0.1] bg-[#030303] shadow-2xl z-10">
                                {/* Mac-style window controls */}
                                <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-white/[0.05] to-transparent flex items-center px-6 z-20 border-b border-white/[0.04]">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80 flex items-center justify-center group-hover:bg-[#FF5F56] transition-colors"><div className="opacity-0 group-hover:opacity-100 w-1.5 h-1.5 rounded-full bg-black/40"></div></div>
                                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 flex items-center justify-center group-hover:bg-[#FFBD2E] transition-colors"><div className="opacity-0 group-hover:opacity-100 w-1.5 h-1.5 rounded-full bg-black/40"></div></div>
                                        <div className="w-3 h-3 rounded-full bg-[#27C93F]/80 flex items-center justify-center group-hover:bg-[#27C93F] transition-colors"><div className="opacity-0 group-hover:opacity-100 w-1.5 h-1.5 rounded-full bg-black/40"></div></div>
                                    </div>
                                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/[0.03] px-3 py-1 rounded-md border border-white/[0.05]">
                                        <span className="text-[11px] font-medium text-[#A1A1AA] tracking-wide">agentcanvas.io / studio</span>
                                    </div>
                                </div>

                                <img
                                    src="/card-brand.png"
                                    alt="AgentCanvas Studio Interface"
                                    className="w-full h-auto block pt-12 transform group-hover:scale-[1.02] duration-700 ease-[cubic-bezier(0.25,0.4,0.25,1)]"
                                />

                                {/* Reflection gradient at the bottom */}
                                <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent pointer-events-none" />
                            </div>
                        </div>

                        {/* Ambient Glow behind the whole wrapper */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#2997FF]/20 via-[#BF5AF2]/20 to-[#FF9F0A]/20 blur-[100px] rounded-[100%] -z-10 opacity-60 mix-blend-screen" />
                    </motion.div>
                </div>
            </section>

            {/* ─── Metrics Bar ─── */}
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                    {metrics.map((m, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fade}
                            className="glass-card rounded-2xl p-5 text-center group cursor-default"
                        >
                            <div className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${m.color}15` }}>
                                <m.icon className="w-5 h-5" style={{ color: m.color }} strokeWidth={1.5} />
                            </div>
                            <p className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">{m.value}</p>
                            <p className="mt-1 text-[13px] text-[#A1A1AA]">{m.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── Integrations / Logo Cloud ─── */}
            <section className="py-16 px-6 border-y border-white/[0.06] overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <p className="text-center text-[13px] text-[#A1A1AA] mb-10 tracking-wide uppercase font-medium">
                        Works with the tools you already use
                    </p>
                    {/* Scrolling Marquee */}
                    <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
                        <div className="flex animate-[marquee_25s_linear_infinite] gap-12 items-center" style={{ width: 'max-content' }}>
                            {[...integrations, ...integrations].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 text-[#A1A1AA]/60 hover:text-white transition-colors duration-300 shrink-0"
                                >
                                    {item.svg}
                                    <span className="text-[15px] font-medium tracking-tight whitespace-nowrap">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Code Preview ─── */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-[-0.03em]">
                        Ship in minutes, not weeks.
                    </h2>
                    <p className="mt-4 text-[15px] text-[#A1A1AA] font-light">
                        Five lines of code. That&apos;s all it takes.
                    </p>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="bg-[#161617] rounded-2xl border border-white/[0.06] overflow-hidden">
                        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06]">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
                            </div>
                            <span className="ml-3 text-[11px] text-[#A1A1AA] font-mono">render.ts</span>
                        </div>
                        <pre className="p-5 text-[13px] leading-[1.8] font-mono overflow-x-auto">
                            <code className="text-[#A1A1AA]"><span className="text-[#FF7B72]">const</span> <span className="text-[#D2A8FF]">result</span> = <span className="text-[#FF7B72]">await</span> <span className="text-[#79C0FF]">agentcanvas</span>.<span className="text-[#D2A8FF]">render</span>({`{`}{"\n"}{"  "}template: <span className="text-[#A5D6FF]">&quot;social-post&quot;</span>,{"\n"}{"  "}data: {`{`}{"\n"}{"    "}title: <span className="text-[#A5D6FF]">&quot;AI just changed everything&quot;</span>,{"\n"}{"    "}brandKit: <span className="text-[#A5D6FF]">&quot;bk_acme_corp&quot;</span>,{"\n"}{"  "}{`}`},{"\n"}{`}`});{"\n"}{"\n"}<span className="text-[#484F58]">// → 1080×1080 branded PNG in ~3 seconds</span>{"\n"}<span className="text-[#FF7B72]">console</span>.<span className="text-[#D2A8FF]">log</span>(result.<span className="text-[#79C0FF]">url</span>);</code>
                        </pre>
                    </div>
                </motion.div>
            </section>

            {/* ─── Signature Divider ─── */}
            <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-[#2997FF]/40 to-transparent"></div>

            {/* ─── Features ─── */}
            <section id="features" className="py-28 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-[13px] font-medium text-[#2997FF] mb-3 tracking-wide uppercase">Capabilities</p>
                        <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-[-0.03em]">
                            Built for production.
                        </h2>
                        <p className="mt-4 text-[15px] text-[#A1A1AA] font-light max-w-lg mx-auto">
                            Not a toy. A rendering engine that handles real-world workloads at scale.
                        </p>
                    </div>
                    {/* Bento Grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-40px" }}
                                variants={fade}
                                className={`glass-card rounded-2xl p-8 group hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-300 relative overflow-hidden ${i === 0 || i === 2 ? 'lg:row-span-1' : ''}`}
                            >
                                {/* Hover gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#2997FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-[#2997FF]/10 border border-[#2997FF]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                        <f.icon className="w-6 h-6 text-[#2997FF]" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-[17px] font-semibold text-white mb-2">{f.title}</h3>
                                    <p className="text-[14px] text-[#A1A1AA] leading-relaxed font-light">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Signature Divider ─── */}
            <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-[#2997FF]/40 to-transparent"></div>

            {/* ─── How It Works ─── */}
            <section id="how-it-works" className="py-28 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-[13px] font-medium text-[#2997FF] mb-3 tracking-wide uppercase">Workflow</p>
                        <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-[-0.03em]">
                            Three steps. That&apos;s it.
                        </h2>
                    </div>
                    {[
                        { num: "01", title: "Define your brand", desc: "Upload colors, fonts, and logo via the API or dashboard. Stored securely, applied automatically to every render.", icon: Palette },
                        { num: "02", title: "Call the render endpoint", desc: "POST your content data — title, image, template ID. Our engine processes it in a distributed queue.", icon: Terminal },
                        { num: "03", title: "Receive your assets", desc: "Get the rendered image or video URL via webhook or polling. Ready to publish. No editing needed.", icon: Globe },
                    ].map((step, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fade}
                            className="flex gap-6 py-10 border-b border-white/[0.06] last:border-0"
                        >
                            <div className="shrink-0">
                                <div className="w-12 h-12 rounded-xl bg-[#1D1D1F] border border-white/[0.06] flex items-center justify-center">
                                    <step.icon className="w-5 h-5 text-[#2997FF]" strokeWidth={1.5} />
                                </div>
                            </div>
                            <div>
                                <span className="text-[12px] text-[#A1A1AA]/50 font-mono mb-1 block">{step.num}</span>
                                <h3 className="text-[17px] font-semibold text-white mb-2">{step.title}</h3>
                                <p className="text-[14px] text-[#A1A1AA] leading-relaxed font-light max-w-md">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── Signature Divider ─── */}
            <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-[#2997FF]/40 to-transparent"></div>

            {/* ─── Use Cases ─── */}
            <section id="use-cases" className="py-28 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-[13px] font-medium text-[#2997FF] mb-3 tracking-wide uppercase">Use Cases</p>
                        <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-[-0.03em]">
                            What you can build.
                        </h2>
                        <p className="mt-4 text-[15px] text-[#A1A1AA] font-light max-w-lg mx-auto">
                            From AI agents to marketing pipelines — real production use cases.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {useCases.map((uc, i) => {
                            const colors = ['#2997FF', '#BF5AF2', '#32D74B', '#FF9F0A'];
                            const c = colors[i % colors.length];
                            return (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fade}
                                    whileHover={{ y: -4 }}
                                    className="glass-card rounded-2xl p-8 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${c}08, transparent)` }} />
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${c}15` }}>
                                            <uc.icon className="w-6 h-6" style={{ color: c }} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-[18px] font-semibold text-white mb-2">{uc.title}</h3>
                                        <p className="text-[14px] text-[#A1A1AA] leading-relaxed font-light">{uc.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── Testimonials ─── */}
            <section className="py-28 px-6 border-t border-white/[0.06]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-[13px] font-medium text-[#2997FF] mb-3 tracking-wide uppercase">Testimonials</p>
                        <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-[-0.03em]">
                            Trusted by builders.
                        </h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fade}
                                whileHover={{ y: -4 }}
                                className="glass-card rounded-2xl p-7 relative overflow-hidden group"
                            >
                                {/* Top border accent */}
                                <div className="absolute top-0 left-8 right-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${t.color}40, transparent)` }} />
                                {/* Decorative quote mark */}
                                <span className="text-5xl font-serif leading-none block mb-3" style={{ color: `${t.color}20` }}>&ldquo;</span>
                                <div className="flex gap-0.5 mb-3">
                                    {Array.from({ length: t.stars }).map((_, j) => (
                                        <span key={j} className="text-[#FF9F0A] text-[14px]">★</span>
                                    ))}
                                </div>
                                <p className="text-[14px] text-[#F5F5F7]/80 leading-relaxed font-light mb-6">&ldquo;{t.quote}&rdquo;</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold border" style={{ backgroundColor: `${t.color}15`, borderColor: `${t.color}30`, color: t.color }}>
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-medium text-white">{t.name}</p>
                                        <p className="text-[12px] text-[#A1A1AA]">{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Pricing ─── */}
            <section id="pricing" className="py-28 px-6 border-t border-white/[0.06]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-[13px] font-medium text-[#2997FF] mb-3 tracking-wide uppercase">Pricing</p>
                        <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-[-0.03em]">
                            Simple pricing.
                        </h2>
                        <p className="mt-4 text-[15px] text-[#A1A1AA] font-light">
                            Start free. Upgrade when you&apos;re ready. No hidden fees.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3 items-start">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fade}
                                whileHover={{ y: -4 }}
                                className={`glass-card rounded-2xl p-7 flex flex-col relative overflow-hidden group transition-all duration-300 ${plan.highlight
                                    ? 'ring-1 ring-[#2997FF]/30 shadow-[0_0_40px_rgba(41,151,255,0.1)]'
                                    : ''
                                    }`}
                            >
                                {/* Hover glow */}
                                {plan.highlight && <div className="absolute inset-0 bg-gradient-to-b from-[#2997FF]/5 to-transparent" />}
                                {plan.highlight && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                                        <span className="relative overflow-hidden inline-flex items-center bg-gradient-to-r from-[#2997FF] to-[#5856D6] text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-[0_0_20px_rgba(41,151,255,0.4)]">
                                            <span className="absolute inset-0 shimmer-btn" />
                                            <span className="relative z-10">Most Popular</span>
                                        </span>
                                    </div>
                                )}
                                <div className="relative z-10">
                                    <h3 className="text-[16px] font-semibold text-white">{plan.name}</h3>
                                    <div className="mt-3 flex items-baseline gap-0.5">
                                        {plan.price !== "Custom" && <span className="text-[14px] text-[#A1A1AA]">$</span>}
                                        <span className="text-[42px] font-semibold text-white tracking-tight leading-none">{plan.price}</span>
                                        {plan.period && <span className="text-[13px] text-[#A1A1AA] ml-1">{plan.period}</span>}
                                    </div>
                                    <p className="mt-3 text-[13px] text-[#A1A1AA] font-light">{plan.desc}</p>
                                    <ul className="mt-6 space-y-3 flex-1">
                                        {plan.features.map((f, j) => (
                                            <li key={j} className="flex items-center gap-2.5 text-[13px] text-[#F5F5F7]/70">
                                                <Check className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-[#2997FF]' : 'text-[#32D74B]'}`} strokeWidth={2} />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={plan.name === "Enterprise" ? "mailto:hello@agentcanvas.io" : "/login"}
                                        className={`block text-center py-3 mt-6 rounded-xl text-[14px] font-semibold transition-all duration-300 ${plan.highlight
                                            ? 'relative overflow-hidden bg-gradient-to-r from-[#2997FF] to-[#5856D6] text-white shadow-[0_0_25px_rgba(41,151,255,0.3)] hover:shadow-[0_0_35px_rgba(41,151,255,0.5)]'
                                            : 'border border-white/[0.12] text-white hover:border-white/25 hover:bg-white/[0.03]'
                                            }`}
                                    >
                                        {plan.highlight && <span className="absolute inset-0 shimmer-btn" />}
                                        <span className="relative z-10">{plan.cta}</span>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section id="faq" className="py-28 px-6 border-t border-white/[0.06]">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-[13px] font-medium text-[#2997FF] mb-3 tracking-wide uppercase">FAQ</p>
                        <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-[-0.03em]">
                            Questions? Answered.
                        </h2>
                    </div>
                    <div className="space-y-0">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fade}
                                className="border-b border-white/[0.06]"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between py-5 text-left"
                                >
                                    <span className="text-[15px] font-medium text-white pr-4">{faq.q}</span>
                                    <ChevronDown className={`w-4 h-4 text-[#A1A1AA] shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="overflow-hidden"
                                >
                                    <p className="pb-5 text-[14px] text-[#A1A1AA] leading-relaxed font-light">{faq.a}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Architecture ─── */}
            <section className="py-28 px-6 border-t border-white/[0.06]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-[13px] font-medium text-[#2997FF] mb-3 tracking-wide uppercase">Architecture</p>
                        <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-[-0.03em]">
                            Built on proven tech.
                        </h2>
                        <p className="mt-4 text-[15px] text-[#A1A1AA] font-light">
                            No vendor lock-in. Open standards. Infrastructure you can trust.
                        </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { icon: Cpu, name: "Remotion", desc: "React-based video rendering engine", color: "#2997FF" },
                            { icon: Database, name: "BullMQ + Redis", desc: "Distributed job queue", color: "#FF375F" },
                            { icon: Lock, name: "Supabase", desc: "Auth, database, and storage", color: "#32D74B" },
                            { icon: Globe, name: "Edge CDN", desc: "Global asset delivery", color: "#FF9F0A" },
                        ].map((tech, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fade}
                                whileHover={{ y: -3 }}
                                className="glass-card rounded-xl p-6 text-center group transition-all duration-300"
                            >
                                <div className="w-11 h-11 mx-auto rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${tech.color}15` }}>
                                    <tech.icon className="w-5 h-5" style={{ color: tech.color }} strokeWidth={1.5} />
                                </div>
                                <p className="text-[14px] font-semibold text-white">{tech.name}</p>
                                <p className="text-[12px] text-[#A1A1AA] mt-1">{tech.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Final CTA ─── */}
            <section className="py-28 px-6 border-t border-white/[0.06] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(41,151,255,0.08),transparent_70%)]" />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-[-0.03em] leading-tight">
                        Stop designing manually.
                        <br />
                        <span className="bg-gradient-to-r from-[#2997FF] via-[#BF5AF2] to-[#FF375F] bg-clip-text text-transparent">Start rendering at scale.</span>
                    </h2>
                    <p className="mt-6 text-[16px] text-[#A1A1AA] font-light max-w-md mx-auto">
                        50 free renders. No credit card. Deploy in 5 minutes.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/login" className="relative overflow-hidden inline-flex items-center gap-2 bg-gradient-to-r from-[#2997FF] to-[#5856D6] text-white px-10 py-4 rounded-full text-[16px] font-semibold transition-all duration-300 shadow-[0_0_40px_rgba(41,151,255,0.3)] hover:shadow-[0_0_50px_rgba(41,151,255,0.5)]">
                            <span className="absolute inset-0 shimmer-btn" />
                            <span className="relative z-10 flex items-center gap-2">Start Building Free <ArrowRight className="w-4.5 h-4.5" /></span>
                        </Link>
                        <Link href="mailto:hello@agentcanvas.io" className="text-[15px] text-[#A1A1AA] hover:text-white font-medium transition-colors duration-200">
                            Talk to us →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── Footer ─── */}
            <footer className="border-t border-white/[0.06] py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid gap-10 md:grid-cols-4 mb-12">
                        <div>
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2997FF] to-[#BF5AF2] flex items-center justify-center shadow-[0_0_10px_rgba(41,151,255,0.2)]">
                                    <Layers className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                                </div>
                                <span className="text-[15px] font-semibold text-white">AgentCanvas</span>
                            </div>
                            <p className="text-[13px] text-[#A1A1AA] font-light leading-relaxed">
                                The rendering API for AI agents and developers. Turn data into visuals at scale.
                            </p>
                        </div>
                        <div>
                            <p className="text-[12px] font-semibold text-[#A1A1AA] uppercase tracking-wider mb-4">Product</p>
                            <div className="space-y-2.5">
                                {[
                                    { name: "Features", href: "#features" },
                                    { name: "Pricing", href: "#pricing" },
                                    { name: "Templates", href: "#features" },
                                    { name: "API Docs", href: "https://docs.agentcanvas.io" }
                                ].map((l) => (
                                    <Link key={l.name} href={l.href} className="block text-[13px] text-[#A1A1AA]/70 hover:text-white transition-colors">{l.name}</Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[12px] font-semibold text-[#A1A1AA] uppercase tracking-wider mb-4">Company</p>
                            <div className="space-y-2.5">
                                {[
                                    { name: "About", href: "#" },
                                    { name: "Blog", href: "#" },
                                    { name: "Careers", href: "#" },
                                    { name: "Contact", href: "mailto:hello@agentcanvas.io" }
                                ].map((l) => (
                                    <Link key={l.name} href={l.href} className="block text-[13px] text-[#A1A1AA]/70 hover:text-white transition-colors">{l.name}</Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[12px] font-semibold text-[#A1A1AA] uppercase tracking-wider mb-4">Legal</p>
                            <div className="space-y-2.5">
                                {["Terms of Service", "Privacy Policy", "Cookie Policy", "Security"].map((l) => (
                                    <Link key={l} href="#" className="block text-[13px] text-[#A1A1AA]/70 hover:text-white transition-colors">{l}</Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-[12px] text-[#A1A1AA]/40">© 2026 AgentCanvas, Inc. All rights reserved.</p>
                        <div className="flex gap-6">
                            {[
                                { name: "Twitter", href: "https://twitter.com/agentcanvas" },
                                { name: "GitHub", href: "https://github.com/agentcanvas" },
                                { name: "Discord", href: "#" }
                            ].map((s) => (
                                <Link key={s.name} href={s.href} className="text-[12px] text-[#A1A1AA]/40 hover:text-[#A1A1AA] transition-colors">{s.name}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
