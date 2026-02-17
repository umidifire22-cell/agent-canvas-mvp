"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Code, Palette, Film, Target, Zap, Shield, ArrowRight, Play, Check } from "lucide-react"

const fade = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
    }),
}

const features = [
    { icon: Code, title: "API-First", desc: "RESTful endpoints with OpenAPI spec. Integrate with any stack in under 5 minutes." },
    { icon: Palette, title: "Brand Kit", desc: "Upload fonts, colors, and logos once. Every render is automatically on-brand." },
    { icon: Film, title: "Video Output", desc: "1080p video with animations, transitions, and audio. Powered by Remotion." },
    { icon: Target, title: "Deterministic", desc: "Same input, same output. Every time. No randomness, no surprises." },
    { icon: Zap, title: "Sub-5s Renders", desc: "Async queue processing handles thousands of concurrent renders." },
    { icon: Shield, title: "Enterprise Ready", desc: "Rate limiting, API keys, team management, and audit logs." },
]

const plans = [
    {
        name: "Starter",
        price: "0",
        period: "/month",
        desc: "For prototyping and testing.",
        features: ["50 renders/month", "1 Brand Kit", "Image output", "Community support"],
        cta: "Start Free",
        highlight: false,
    },
    {
        name: "Pro",
        price: "29",
        period: "/month",
        desc: "For production workloads.",
        features: ["2,000 renders/month", "5 Brand Kits", "Image + Video", "Priority queue", "Webhooks", "Email support"],
        cta: "Start Trial",
        highlight: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        desc: "For high-volume needs.",
        features: ["Unlimited renders", "Unlimited Brand Kits", "Custom templates", "Dedicated infra", "SLA guarantee", "Phone support"],
        cta: "Contact Sales",
        highlight: false,
    },
]

export default function LandingPage() {
    return (
        <div className="min-h-screen">
            {/* Nav */}
            <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto h-14 px-6 flex items-center justify-between">
                    <Link href="/" className="text-[15px] font-semibold text-white tracking-tight">
                        AgentCanvas
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="#features" className="text-[13px] text-[#86868B] hover:text-white transition-colors duration-200">Features</Link>
                        <Link href="#how-it-works" className="text-[13px] text-[#86868B] hover:text-white transition-colors duration-200">How It Works</Link>
                        <Link href="#pricing" className="text-[13px] text-[#86868B] hover:text-white transition-colors duration-200">Pricing</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-[13px] text-[#86868B] hover:text-white transition-colors duration-200">Sign in</Link>
                        <Link
                            href="/dashboard"
                            className="text-[13px] font-medium text-white bg-[#2997FF] hover:bg-[#2997FF]/90 px-4 py-1.5 rounded-full transition-all duration-200"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-40 pb-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-[13px] font-medium text-[#2997FF] mb-6 tracking-wide uppercase"
                    >
                        Now in Public Beta
                    </motion.p>
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
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="mt-6 text-lg sm:text-xl text-[#86868B] max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        Generate branded social posts, videos, and stories
                        with a single API call. Built for developers and AI agents.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 bg-white text-black px-7 py-3 rounded-full text-[15px] font-medium hover:bg-white/90 transition-all duration-200"
                        >
                            Start Building
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="inline-flex items-center gap-2 text-[#2997FF] px-7 py-3 rounded-full text-[15px] font-medium hover:text-[#2997FF]/80 transition-colors duration-200"
                        >
                            <Play className="w-4 h-4" />
                            See How It Works
                        </Link>
                    </motion.div>
                </div>

                {/* Code Block */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="max-w-2xl mx-auto mt-20"
                >
                    <div className="bg-[#1D1D1F] rounded-2xl border border-white/[0.06] overflow-hidden">
                        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06]">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
                            <span className="ml-3 text-[12px] text-[#86868B] font-mono">render.ts</span>
                        </div>
                        <pre className="p-5 text-[13px] leading-[1.7] font-mono overflow-x-auto">
                            <code className="text-[#86868B]"><span className="text-[#FF7B72]">const</span> <span className="text-[#D2A8FF]">result</span> = <span className="text-[#FF7B72]">await</span> <span className="text-[#79C0FF]">agentcanvas</span>.<span className="text-[#D2A8FF]">render</span>({`{`}{"\n"}{"  "}template: <span className="text-[#A5D6FF]">&quot;social-post&quot;</span>,{"\n"}{"  "}data: {`{`}{"\n"}{"    "}title: <span className="text-[#A5D6FF]">&quot;AI just changed everything&quot;</span>,{"\n"}{"    "}brandKit: <span className="text-[#A5D6FF]">&quot;bk_acme_corp&quot;</span>,{"\n"}{"  "}{`}`},{"\n"}{`}`});{"\n"}{"\n"}<span className="text-[#484F58]">// → 1080×1080 branded PNG in ~3 seconds</span>{"\n"}<span className="text-[#FF7B72]">console</span>.<span className="text-[#D2A8FF]">log</span>(result.<span className="text-[#79C0FF]">url</span>); <span className="text-[#484F58]">// https://cdn.agentcanvas.io/...</span></code>
                        </pre>
                    </div>
                </motion.div>
            </section>

            {/* Features */}
            <section id="features" className="py-32 px-6 border-t border-white/[0.06]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-[-0.03em]">
                            Built for scale.
                        </h2>
                        <p className="mt-4 text-lg text-[#86868B] font-light">
                            Everything your agents need to create visual content.
                        </p>
                    </div>
                    <div className="grid gap-px bg-white/[0.06] rounded-2xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fade}
                                className="bg-black p-10 hover:bg-[#1D1D1F]/50 transition-colors duration-300"
                            >
                                <f.icon className="w-6 h-6 text-[#86868B] mb-5" strokeWidth={1.5} />
                                <h3 className="text-[17px] font-semibold text-white mb-2">{f.title}</h3>
                                <p className="text-[14px] text-[#86868B] leading-relaxed font-light">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-32 px-6 border-t border-white/[0.06]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-[-0.03em]">
                            Three steps. That&apos;s it.
                        </h2>
                    </div>
                    <div className="space-y-0">
                        {[
                            { num: "1", title: "Define your brand", desc: "Upload your colors, fonts, and logo. We store them securely and apply them to every render automatically." },
                            { num: "2", title: "Call the API", desc: "Send a POST request with your content. Choose a template, pass your data, and our engine handles the rest." },
                            { num: "3", title: "Get your assets", desc: "Receive production-ready images or videos via webhook. Ready to publish on any platform, no editing needed." },
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fade}
                                className="flex gap-8 py-12 border-b border-white/[0.06] last:border-0"
                            >
                                <span className="text-[48px] font-light text-[#86868B]/30 leading-none tabular-nums">{step.num}</span>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                                    <p className="text-[15px] text-[#86868B] leading-relaxed font-light max-w-lg">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-32 px-6 border-t border-white/[0.06]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-[-0.03em]">
                            Simple pricing.
                        </h2>
                        <p className="mt-4 text-lg text-[#86868B] font-light">
                            Start free. Upgrade when you&apos;re ready.
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
                                className={`rounded-2xl p-8 flex flex-col ${plan.highlight
                                        ? "bg-[#1D1D1F] border-2 border-[#2997FF]/40 ring-1 ring-[#2997FF]/10"
                                        : "bg-[#1D1D1F]/50 border border-white/[0.06]"
                                    }`}
                            >
                                <div className="mb-6">
                                    <h3 className="text-[15px] font-semibold text-white">{plan.name}</h3>
                                    <div className="mt-3 flex items-baseline gap-1">
                                        {plan.price !== "Custom" && <span className="text-[13px] text-[#86868B]">$</span>}
                                        <span className="text-[40px] font-semibold text-white tracking-tight leading-none">{plan.price}</span>
                                        <span className="text-[13px] text-[#86868B] ml-1">{plan.period}</span>
                                    </div>
                                    <p className="mt-3 text-[13px] text-[#86868B]">{plan.desc}</p>
                                </div>
                                <ul className="space-y-3 flex-1 mb-8">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-3 text-[14px] text-[#F5F5F7]/80">
                                            <Check className="w-4 h-4 text-[#2997FF] shrink-0" strokeWidth={2} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={plan.name === "Enterprise" ? "mailto:hello@agentcanvas.io" : "/dashboard"}
                                    className={`block text-center py-2.5 rounded-full text-[14px] font-medium transition-all duration-200 ${plan.highlight
                                            ? "bg-[#2997FF] text-white hover:bg-[#2997FF]/90"
                                            : "border border-white/[0.15] text-white hover:border-white/30"
                                        }`}
                                >
                                    {plan.cta}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 border-t border-white/[0.06]">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-[-0.03em]">
                        Ready to automate
                        <br />
                        visual content?
                    </h2>
                    <p className="mt-6 text-lg text-[#86868B] font-light">
                        Join hundreds of teams using AgentCanvas.
                    </p>
                    <div className="mt-10">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-full text-[15px] font-medium hover:bg-white/90 transition-all duration-200"
                        >
                            Start Building Free
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/[0.06] py-8 px-6">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[13px] font-medium text-[#86868B]">AgentCanvas</span>
                    <p className="text-[12px] text-[#86868B]/60">© 2026 AgentCanvas. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-[12px] text-[#86868B]/60 hover:text-[#86868B] transition-colors">Terms</Link>
                        <Link href="#" className="text-[12px] text-[#86868B]/60 hover:text-[#86868B] transition-colors">Privacy</Link>
                        <Link href="#" className="text-[12px] text-[#86868B]/60 hover:text-[#86868B] transition-colors">Docs</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
