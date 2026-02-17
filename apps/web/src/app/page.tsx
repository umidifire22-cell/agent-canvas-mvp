import Link from "next/link"

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen mesh-gradient">
            {/* Navigation */}
            <header className="sticky top-0 z-50 glass border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center text-white font-bold text-sm">A</div>
                        <span className="font-bold text-lg text-white">AgentCanvas</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link className="text-sm text-slate-400 hover:text-white transition-colors" href="#features">Features</Link>
                        <Link className="text-sm text-slate-400 hover:text-white transition-colors" href="#how-it-works">How It Works</Link>
                        <Link className="text-sm text-slate-400 hover:text-white transition-colors" href="#pricing">Pricing</Link>
                        <Link className="text-sm text-slate-400 hover:text-white transition-colors" href="/dashboard">Dashboard</Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-sm text-slate-300 hover:text-white transition-colors hidden sm:block">Log in</Link>
                        <Link href="/dashboard" className="btn-gradient px-4 py-2 rounded-lg text-sm font-medium">Start Free →</Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-3xl animate-float"></div>
                        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
                    </div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-4xl mx-auto">
                            <div className="animate-fade-in">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">
                                    ✨ Now in Public Beta — 50 Free Renders
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in-delay-1">
                                Give Your AI Agents{" "}
                                <span className="gradient-text">Visual Superpowers</span>
                            </h1>
                            <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto animate-fade-in-delay-2">
                                The first media generation infrastructure designed for autonomous agents.
                                Generate branded social posts, videos, and stories with a single API call.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-delay-3">
                                <Link href="/dashboard" className="btn-gradient px-8 py-3 rounded-xl text-base font-semibold w-full sm:w-auto text-center">
                                    Start Building Free →
                                </Link>
                                <Link href="#how-it-works" className="glass glass-hover px-8 py-3 rounded-xl text-base font-semibold text-slate-300 w-full sm:w-auto text-center">
                                    See How It Works
                                </Link>
                            </div>
                        </div>

                        {/* Code Preview */}
                        <div className="mt-16 sm:mt-20 max-w-3xl mx-auto animate-fade-in-delay-3">
                            <div className="code-block p-4 sm:p-6 overflow-x-auto">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    <span className="text-xs text-slate-500 ml-2">api-request.ts</span>
                                </div>
                                <pre className="text-sm">
                                    <code><span className="text-purple-400">const</span> <span className="text-blue-300">response</span> = <span className="text-purple-400">await</span> <span className="text-yellow-300">fetch</span>(<span className="text-green-400">&quot;https://api.agentcanvas.io/v1/render&quot;</span>, {"{"}{"\n"}  method: <span className="text-green-400">&quot;POST&quot;</span>,{"\n"}  body: JSON.stringify({"{"}{"\n"}    templateId: <span className="text-green-400">&quot;social-post&quot;</span>,{"\n"}    data: {"{"}{"\n"}      title: <span className="text-green-400">&quot;AI just changed everything&quot;</span>,{"\n"}      brandKit: <span className="text-green-400">&quot;bk_acme_corp&quot;</span>{"\n"}    {"}"}{"\n"}  {"}"}){"\n"}{"}"});{"\n"}{"\n"}<span className="text-slate-500">{"// "}→ Returns 1080x1080 branded image in ~3 seconds</span></code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold">
                                Everything you need to <span className="gradient-text">automate visual content</span>
                            </h2>
                            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
                                From social posts to video stories, AgentCanvas handles the entire visual pipeline.
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                { icon: "⚡", title: "API-First Design", desc: "RESTful API with OpenAPI spec. Integrate with n8n, LangChain, AutoGPT, or your own code in minutes." },
                                { icon: "🎨", title: "Brand Kit System", desc: "Upload your fonts, colors, and logo once. Every render is automatically on-brand." },
                                { icon: "🎬", title: "Video Generation", desc: "Generate 1080p video with animations, transitions, and audio using React components powered by Remotion." },
                                { icon: "📐", title: "Pixel Perfect", desc: "Deterministic rendering ensures identical output every time. No randomness, no surprises." },
                                { icon: "🚀", title: "Blazing Fast", desc: "Async queue processing with BullMQ. Handle thousands of renders in parallel without breaking a sweat." },
                                { icon: "🔒", title: "Enterprise Ready", desc: "SOC2 compliance path, SSO, rate limiting, and dedicated infrastructure for high-volume clients." },
                            ].map((feature, i) => (
                                <div key={i} className="glass glass-hover rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px]">
                                    <div className="text-3xl mb-4">{feature.icon}</div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section id="how-it-works" className="py-24 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold">
                                Three steps to <span className="gradient-text">visual automation</span>
                            </h2>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                { step: "01", title: "Upload Your Brand", desc: "Set your colors, fonts, logo, and visual rules. We store them securely and apply them to every render." },
                                { step: "02", title: "Call the API", desc: "Send a simple POST request with your content data. Our engine renders pixel-perfect visuals in seconds." },
                                { step: "03", title: "Get Your Assets", desc: "Receive high-quality images or videos via webhook or polling. Ready to publish on any platform." },
                            ].map((item, i) => (
                                <div key={i} className="relative text-center p-8">
                                    <div className="text-6xl font-black text-indigo-500/10 mb-4">{item.step}</div>
                                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-24 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold">
                                Simple, transparent <span className="gradient-text">pricing</span>
                            </h2>
                            <p className="mt-4 text-slate-400">Start free. Scale when you&apos;re ready.</p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                            {/* Free */}
                            <div className="glass rounded-2xl p-8 flex flex-col">
                                <h3 className="text-lg font-semibold text-white">Free</h3>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-4xl font-bold text-white">$0</span>
                                    <span className="text-slate-400 ml-2">/month</span>
                                </div>
                                <p className="mt-4 text-sm text-slate-400">Perfect for testing and prototyping.</p>
                                <ul className="mt-6 space-y-3 flex-1">
                                    {["50 renders/month", "1 Brand Kit", "Image output only", "Community support"].map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                            <span className="text-green-400">✓</span> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/dashboard" className="mt-8 block text-center py-3 rounded-xl border border-slate-600 text-slate-300 hover:border-indigo-500 hover:text-white transition-all text-sm font-medium">
                                    Get Started Free
                                </Link>
                            </div>

                            {/* Pro — Highlighted */}
                            <div className="relative glass rounded-2xl p-8 flex flex-col border-2 border-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500 text-white">
                                    Most Popular
                                </div>
                                <h3 className="text-lg font-semibold text-white">Pro</h3>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-4xl font-bold text-white">$29</span>
                                    <span className="text-slate-400 ml-2">/month</span>
                                </div>
                                <p className="mt-4 text-sm text-slate-400">For teams and production workloads.</p>
                                <ul className="mt-6 space-y-3 flex-1">
                                    {["2,000 renders/month", "5 Brand Kits", "Image + Video output", "Priority rendering", "API webhooks", "Email support"].map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                            <span className="text-green-400">✓</span> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/dashboard" className="mt-8 block text-center py-3 rounded-xl btn-gradient text-sm font-semibold">
                                    Start Pro Trial →
                                </Link>
                            </div>

                            {/* Enterprise */}
                            <div className="glass rounded-2xl p-8 flex flex-col">
                                <h3 className="text-lg font-semibold text-white">Enterprise</h3>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-4xl font-bold text-white">Custom</span>
                                </div>
                                <p className="mt-4 text-sm text-slate-400">For high-volume and custom needs.</p>
                                <ul className="mt-6 space-y-3 flex-1">
                                    {["Unlimited renders", "Unlimited Brand Kits", "Custom templates", "Dedicated infrastructure", "SLA guarantee", "Priority phone support"].map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                            <span className="text-green-400">✓</span> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="mailto:hello@agentcanvas.io" className="mt-8 block text-center py-3 rounded-xl border border-slate-600 text-slate-300 hover:border-indigo-500 hover:text-white transition-all text-sm font-medium">
                                    Contact Sales
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 border-t border-white/5">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            Ready to give your agents <span className="gradient-text">creative powers</span>?
                        </h2>
                        <p className="mt-4 text-slate-400 text-lg">
                            Join 200+ teams already using AgentCanvas to automate their visual content pipeline.
                        </p>
                        <div className="mt-8">
                            <Link href="/dashboard" className="btn-gradient inline-block px-10 py-4 rounded-xl text-lg font-semibold">
                                Start Building Free →
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md btn-gradient flex items-center justify-center text-white font-bold text-xs">A</div>
                            <span className="text-sm font-semibold text-slate-400">AgentCanvas</span>
                        </div>
                        <p className="text-xs text-slate-500">© 2026 AgentCanvas. All rights reserved.</p>
                        <nav className="flex gap-6">
                            <Link className="text-xs text-slate-500 hover:text-slate-300 transition-colors" href="#">Terms</Link>
                            <Link className="text-xs text-slate-500 hover:text-slate-300 transition-colors" href="#">Privacy</Link>
                            <Link className="text-xs text-slate-500 hover:text-slate-300 transition-colors" href="#">Docs</Link>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    )
}
