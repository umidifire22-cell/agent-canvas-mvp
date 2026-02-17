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
    "LangChain", "AutoGPT", "n8n", "Make", "Zapier",
    "CrewAI", "OpenAI", "Vercel", "Supabase", "Replicate",
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
    { quote: "We replaced a 3-person design team for social content. AgentCanvas pays for itself in the first week.", name: "Marco R.", role: "Head of Growth, SeriesA Startup", avatar: "M" },
    { quote: "The API is absurdly simple. We went from concept to production in one afternoon.", name: "Sarah K.", role: "Lead Engineer, AI Agency", avatar: "S" },
    { quote: "Our agents now produce 200+ branded posts per day. The consistency is unmatched.", name: "David L.", role: "CTO, Content Platform", avatar: "D" },
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
    { value: "2.8s", label: "Average render time" },
    { value: "99.9%", label: "API uptime" },
    { value: "50K+", label: "Assets generated" },
    { value: "200+", label: "Teams using it" },
]

/* ── Component ── */
export default function LandingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    return (
        <div className="min-h-screen bg-black">
            {/* ─── Nav ─── */}
            <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto h-12 px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-[5px] bg-[#2997FF] flex items-center justify-center">
                            <Layers className="w-3 h-3 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-[15px] font-semibold text-white tracking-tight">AgentCanvas</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        {["Features", "Use Cases", "Pricing", "FAQ"].map((item) => (
                            <Link key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-[13px] text-[#86868B] hover:text-white transition-colors duration-200">
                                {item}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-[13px] text-[#86868B] hover:text-white transition-colors duration-200 hidden sm:block">Sign in</Link>
                        <Link href="/dashboard" className="text-[13px] font-medium text-white bg-[#2997FF] hover:bg-[#2997FF]/90 px-4 py-1.5 rounded-full transition-all duration-200">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* ─── Hero ─── */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-medium text-[#2997FF] border border-[#2997FF]/20 bg-[#2997FF]/5 mb-8">
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
                        autonomous agents.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.12 }}
                        className="mt-6 text-[17px] sm:text-xl text-[#86868B] max-w-2xl mx-auto leading-relaxed font-light"
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
                        <Link href="/dashboard" className="inline-flex items-center gap-2 bg-white text-black px-7 py-3 rounded-full text-[15px] font-medium hover:bg-white/90 transition-all duration-200">
                            Start Building <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="#how-it-works" className="inline-flex items-center gap-2 text-[#86868B] hover:text-white px-7 py-3 rounded-full text-[15px] font-medium transition-colors duration-200">
                            <Play className="w-4 h-4" /> See How It Works
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ─── Metrics Bar ─── */}
            <section className="border-y border-white/[0.06] py-10 px-6">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {metrics.map((m, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fade}
                            className="text-center"
                        >
                            <p className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">{m.value}</p>
                            <p className="mt-1 text-[13px] text-[#86868B]">{m.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── Integrations / Logo Cloud ─── */}
            <section className="py-16 px-6 border-b border-white/[0.06]">
                <div className="max-w-5xl mx-auto">
                    <p className="text-center text-[13px] text-[#86868B] mb-8 tracking-wide uppercase font-medium">
                        Works with the tools you already use
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
                        {integrations.map((name, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fade}
                                className="flex items-center gap-2 text-[#86868B]/60 hover:text-[#86868B] transition-colors duration-300"
                            >
                                <Terminal className="w-4 h-4" strokeWidth={1.5} />
                                <span className="text-[14px] font-medium tracking-tight">{name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Code Preview ─── */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-[-0.03em]">
                        Ship in minutes, not weeks.
                    </h2>
                    <p className="mt-4 text-[15px] text-[#86868B] font-light">
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
                            <span className="ml-3 text-[11px] text-[#86868B]/60 font-mono">render.ts</span>
                        </div>
                        <pre className="p-5 text-[13px] leading-[1.8] font-mono overflow-x-auto">
                            <code className="text-[#86868B]"><span className="text-[#FF7B72]">const</span> <span className="text-[#D2A8FF]">result</span> = <span className="text-[#FF7B72]">await</span> <span className="text-[#79C0FF]">agentcanvas</span>.<span className="text-[#D2A8FF]">render</span>({`{`}{"\n"}{"  "}template: <span className="text-[#A5D6FF]">&quot;social-post&quot;</span>,{"\n"}{"  "}data: {`{`}{"\n"}{"    "}title: <span className="text-[#A5D6FF]">&quot;AI just changed everything&quot;</span>,{"\n"}{"    "}brandKit: <span className="text-[#A5D6FF]">&quot;bk_acme_corp&quot;</span>,{"\n"}{"  "}{`}`},{"\n"}{`}`});{"\n"}{"\n"}<span className="text-[#484F58]">// → 1080×1080 branded PNG in ~3 seconds</span>{"\n"}<span className="text-[#FF7B72]">console</span>.<span className="text-[#D2A8FF]">log</span>(result.<span className="text-[#79C0FF]">url</span>);</code>
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
                        <p className="mt-4 text-[15px] text-[#86868B] font-light max-w-lg mx-auto">
                            Not a toy. A rendering engine that handles real-world workloads at scale.
                        </p>
                    </div>
                    <div className="grid gap-px bg-white/[0.06] rounded-2xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-40px" }}
                                variants={fade}
                                className="bg-black p-8 lg:p-10 group hover:bg-[#0D0D0D] transition-colors duration-300"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#1D1D1F] border border-white/[0.06] flex items-center justify-center mb-5 group-hover:border-[#2997FF]/20 transition-colors duration-300">
                                    <f.icon className="w-5 h-5 text-[#86868B] group-hover:text-[#2997FF] transition-colors duration-300" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-[16px] font-semibold text-white mb-2">{f.title}</h3>
                                <p className="text-[14px] text-[#86868B] leading-relaxed font-light">{f.desc}</p>
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
                                <span className="text-[12px] text-[#86868B]/50 font-mono mb-1 block">{step.num}</span>
                                <h3 className="text-[17px] font-semibold text-white mb-2">{step.title}</h3>
                                <p className="text-[14px] text-[#86868B] leading-relaxed font-light max-w-md">{step.desc}</p>
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
                        <p className="mt-4 text-[15px] text-[#86868B] font-light max-w-lg mx-auto">
                            From AI agents to marketing pipelines — real production use cases.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {useCases.map((uc, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fade}
                                className="bg-[#161617] rounded-2xl border border-white/[0.06] p-8 hover:border-white/[0.12] transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#1D1D1F] border border-white/[0.06] flex items-center justify-center mb-5 group-hover:border-[#2997FF]/20 transition-colors duration-300">
                                    <uc.icon className="w-5 h-5 text-[#86868B] group-hover:text-[#2997FF] transition-colors duration-300" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-[17px] font-semibold text-white mb-2">{uc.title}</h3>
                                <p className="text-[14px] text-[#86868B] leading-relaxed font-light">{uc.desc}</p>
                            </motion.div>
                        ))}
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
                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fade}
                                className="bg-[#161617] rounded-2xl border border-white/[0.06] p-6"
                            >
                                <p className="text-[14px] text-[#F5F5F7]/80 leading-relaxed font-light mb-6">&ldquo;{t.quote}&rdquo;</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#2997FF]/10 border border-[#2997FF]/20 flex items-center justify-center text-[12px] font-semibold text-[#2997FF]">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-medium text-white">{t.name}</p>
                                        <p className="text-[12px] text-[#86868B]">{t.role}</p>
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
                        <p className="mt-4 text-[15px] text-[#86868B] font-light">
                            Start free. Upgrade when you&apos;re ready. No hidden fees.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fade}
                                className={`rounded-2xl p-7 flex flex-col ${plan.highlight
                                        ? "bg-[#161617] border-2 border-[#2997FF]/30 relative"
                                        : "bg-[#161617]/60 border border-white/[0.06]"
                                    }`}
                            >
                                {plan.highlight && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-white bg-[#2997FF] px-3 py-0.5 rounded-full">
                                        Most Popular
                                    </span>
                                )}
                                <h3 className="text-[15px] font-semibold text-white">{plan.name}</h3>
                                <div className="mt-3 flex items-baseline gap-0.5">
                                    {plan.price !== "Custom" && <span className="text-[14px] text-[#86868B]">$</span>}
                                    <span className="text-[38px] font-semibold text-white tracking-tight leading-none">{plan.price}</span>
                                    {plan.period && <span className="text-[13px] text-[#86868B] ml-1">{plan.period}</span>}
                                </div>
                                <p className="mt-3 text-[13px] text-[#86868B] font-light">{plan.desc}</p>
                                <ul className="mt-6 space-y-2.5 flex-1">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2.5 text-[13px] text-[#F5F5F7]/70">
                                            <Check className="w-3.5 h-3.5 text-[#2997FF] shrink-0" strokeWidth={2} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={plan.name === "Enterprise" ? "mailto:hello@agentcanvas.io" : "/dashboard"}
                                    className={`block text-center py-2.5 mt-6 rounded-full text-[13px] font-medium transition-all duration-200 ${plan.highlight
                                            ? "bg-[#2997FF] text-white hover:bg-[#2997FF]/90"
                                            : "border border-white/[0.12] text-white hover:border-white/25"
                                        }`}
                                >
                                    {plan.cta}
                                </Link>
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
                                    <ChevronDown className={`w-4 h-4 text-[#86868B] shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="overflow-hidden"
                                >
                                    <p className="pb-5 text-[14px] text-[#86868B] leading-relaxed font-light">{faq.a}</p>
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
                        <p className="mt-4 text-[15px] text-[#86868B] font-light">
                            No vendor lock-in. Open standards. Infrastructure you can trust.
                        </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { icon: Cpu, name: "Remotion", desc: "React-based video rendering engine" },
                            { icon: Database, name: "BullMQ + Redis", desc: "Distributed job queue" },
                            { icon: Lock, name: "Supabase", desc: "Auth, database, and storage" },
                            { icon: Globe, name: "Edge CDN", desc: "Global asset delivery" },
                        ].map((tech, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fade}
                                className="bg-[#161617] rounded-xl border border-white/[0.06] p-5 text-center"
                            >
                                <tech.icon className="w-6 h-6 text-[#2997FF] mx-auto mb-3" strokeWidth={1.5} />
                                <p className="text-[14px] font-semibold text-white">{tech.name}</p>
                                <p className="text-[12px] text-[#86868B] mt-1">{tech.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Final CTA ─── */}
            <section className="py-28 px-6 border-t border-white/[0.06]">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-[-0.03em] leading-tight">
                        Stop designing manually.
                        <br />
                        Start rendering at scale.
                    </h2>
                    <p className="mt-6 text-[16px] text-[#86868B] font-light max-w-md mx-auto">
                        50 free renders. No credit card. Deploy in 5 minutes.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/dashboard" className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-full text-[15px] font-medium hover:bg-white/90 transition-all duration-200">
                            Start Building Free <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="mailto:hello@agentcanvas.io" className="text-[15px] text-[#86868B] hover:text-white font-medium transition-colors duration-200">
                            Talk to us →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── Footer ─── */}
            <footer className="border-t border-white/[0.06] py-10 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid gap-8 md:grid-cols-4 mb-10">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-5 h-5 rounded-[5px] bg-[#2997FF] flex items-center justify-center">
                                    <Layers className="w-3 h-3 text-white" strokeWidth={2.5} />
                                </div>
                                <span className="text-[14px] font-semibold text-white">AgentCanvas</span>
                            </div>
                            <p className="text-[13px] text-[#86868B] font-light leading-relaxed">
                                The rendering API for AI agents and developers.
                            </p>
                        </div>
                        <div>
                            <p className="text-[12px] font-semibold text-[#86868B] uppercase tracking-wider mb-4">Product</p>
                            <div className="space-y-2.5">
                                {["Features", "Pricing", "Templates", "API Docs"].map((l) => (
                                    <Link key={l} href="#" className="block text-[13px] text-[#86868B]/70 hover:text-white transition-colors">{l}</Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[12px] font-semibold text-[#86868B] uppercase tracking-wider mb-4">Company</p>
                            <div className="space-y-2.5">
                                {["About", "Blog", "Careers", "Contact"].map((l) => (
                                    <Link key={l} href="#" className="block text-[13px] text-[#86868B]/70 hover:text-white transition-colors">{l}</Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[12px] font-semibold text-[#86868B] uppercase tracking-wider mb-4">Legal</p>
                            <div className="space-y-2.5">
                                {["Terms of Service", "Privacy Policy", "Cookie Policy", "Security"].map((l) => (
                                    <Link key={l} href="#" className="block text-[13px] text-[#86868B]/70 hover:text-white transition-colors">{l}</Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-[12px] text-[#86868B]/40">© 2026 AgentCanvas, Inc. All rights reserved.</p>
                        <div className="flex gap-6">
                            {["Twitter", "GitHub", "Discord"].map((s) => (
                                <Link key={s} href="#" className="text-[12px] text-[#86868B]/40 hover:text-[#86868B] transition-colors">{s}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
