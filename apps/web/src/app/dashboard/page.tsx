"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    Sparkles, Clock, Layout, Palette, Key, Settings,
    Download, Image, ChevronDown, Loader2
} from "lucide-react"

const navItems = [
    { icon: Sparkles, label: "Create", tab: "create" },
    { icon: Clock, label: "History", tab: "history" },
    { icon: Layout, label: "Templates", tab: "templates" },
    { icon: Palette, label: "Brand Kit", tab: "brand" },
    { icon: Key, label: "API Keys", tab: "api" },
    { icon: Settings, label: "Settings", tab: "settings" },
]

const templates = [
    { name: "Social Post", size: "1080 × 1080", color: "#2997FF" },
    { name: "Instagram Story", size: "1080 × 1920", color: "#FF375F" },
    { name: "Twitter Banner", size: "1500 × 500", color: "#1DA1F2" },
    { name: "Short Video", size: "1080 × 1080", color: "#BF5AF2" },
    { name: "LinkedIn Post", size: "1200 × 627", color: "#0A66C2" },
    { name: "YouTube Thumb", size: "1280 × 720", color: "#FF0000" },
]

const historyItems = [
    { title: "Launch Announcement", template: "Social Post", status: "completed", time: "2m ago" },
    { title: "Product Feature Reveal", template: "Instagram Story", status: "completed", time: "15m ago" },
    { title: "Team Spotlight", template: "Social Post", status: "processing", time: "Just now" },
    { title: "Q4 Results Summary", template: "LinkedIn Post", status: "completed", time: "1h ago" },
]

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("create")
    const [loading, setLoading] = useState(false)
    const [rendered, setRendered] = useState(false)
    const [title, setTitle] = useState("AI just changed everything")
    const [template, setTemplate] = useState("social-post")

    const handleRender = () => {
        setLoading(true)
        setRendered(false)
        setTimeout(() => {
            setLoading(false)
            setRendered(true)
        }, 2500)
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-60 flex-col border-r border-white/[0.06] bg-[#0A0A0A]">
                <div className="h-14 px-5 flex items-center border-b border-white/[0.06]">
                    <Link href="/" className="text-[15px] font-semibold text-white tracking-tight">
                        AgentCanvas
                    </Link>
                </div>

                <nav className="flex-1 p-3 space-y-0.5">
                    {navItems.map((item) => (
                        <button
                            key={item.tab}
                            onClick={() => setActiveTab(item.tab)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 ${activeTab === item.tab
                                    ? "bg-white/[0.08] text-white"
                                    : "text-[#86868B] hover:text-white hover:bg-white/[0.04]"
                                }`}
                        >
                            <item.icon className="w-4 h-4" strokeWidth={1.5} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-3 border-t border-white/[0.06]">
                    <div className="bg-[#1D1D1F] rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[12px] text-[#86868B]">Usage</span>
                            <span className="text-[12px] font-medium text-white">38 / 50</span>
                        </div>
                        <div className="h-1 rounded-full bg-white/[0.08]">
                            <div className="h-1 rounded-full bg-[#2997FF]" style={{ width: "76%" }}></div>
                        </div>
                        <Link href="#" className="block mt-3 text-[12px] text-[#2997FF] font-medium hover:text-[#2997FF]/80 transition-colors">
                            Upgrade to Pro →
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="h-14 px-6 flex items-center justify-between border-b border-white/[0.06] bg-black/80 backdrop-blur-xl shrink-0">
                    <div className="lg:hidden">
                        <span className="text-[15px] font-semibold text-white">AgentCanvas</span>
                    </div>
                    <h1 className="text-[15px] font-medium text-white hidden lg:block capitalize">{activeTab}</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-[12px] text-[#86868B] hidden sm:block">Free Plan</span>
                        <div className="w-7 h-7 rounded-full bg-[#2997FF] flex items-center justify-center text-[12px] font-semibold text-white">R</div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-6 lg:p-8">
                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                        {[
                            { label: "Renders Today", value: "12" },
                            { label: "Credits Left", value: "38" },
                            { label: "Templates", value: "6" },
                            { label: "Avg. Time", value: "3.2s" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.3 }}
                                className="bg-[#1D1D1F] rounded-xl p-4 border border-white/[0.06]"
                            >
                                <p className="text-[12px] text-[#86868B] mb-1">{stat.label}</p>
                                <p className="text-2xl font-semibold text-white tracking-tight">{stat.value}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile tabs */}
                    <div className="flex gap-1 mb-6 lg:hidden overflow-x-auto pb-2">
                        {["create", "history", "templates"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-1.5 rounded-lg text-[13px] font-medium whitespace-nowrap transition-colors ${activeTab === tab ? "bg-white/[0.08] text-white" : "text-[#86868B]"
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Create */}
                    {activeTab === "create" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid gap-6 lg:grid-cols-5"
                        >
                            {/* Form */}
                            <div className="lg:col-span-2 bg-[#1D1D1F] rounded-2xl border border-white/[0.06] p-6">
                                <h2 className="text-[17px] font-semibold text-white mb-1">New render</h2>
                                <p className="text-[13px] text-[#86868B] mb-6">Configure your asset settings.</p>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-[13px] font-medium text-[#F5F5F7]/80 mb-2">Template</label>
                                        <div className="relative">
                                            <select
                                                value={template}
                                                onChange={(e) => setTemplate(e.target.value)}
                                                className="w-full appearance-none bg-black/40 border border-white/[0.08] rounded-lg px-3 py-2.5 text-[14px] text-white focus:outline-none focus:ring-2 focus:ring-[#2997FF]/40 focus:border-[#2997FF]/40 transition-all"
                                            >
                                                <option value="social-post">Social Post (1080×1080)</option>
                                                <option value="story">Instagram Story (1080×1920)</option>
                                                <option value="banner">Twitter Banner (1500×500)</option>
                                                <option value="video">Short Video (1080×1080)</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868B] pointer-events-none" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[13px] font-medium text-[#F5F5F7]/80 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-3 py-2.5 text-[14px] text-white placeholder-[#86868B]/50 focus:outline-none focus:ring-2 focus:ring-[#2997FF]/40 focus:border-[#2997FF]/40 transition-all"
                                            placeholder="Your headline..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] font-medium text-[#F5F5F7]/80 mb-2">Background Image</label>
                                        <input
                                            type="text"
                                            className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-3 py-2.5 text-[14px] text-white placeholder-[#86868B]/50 focus:outline-none focus:ring-2 focus:ring-[#2997FF]/40 focus:border-[#2997FF]/40 transition-all"
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] font-medium text-[#F5F5F7]/80 mb-2">Brand Kit</label>
                                        <div className="relative">
                                            <select className="w-full appearance-none bg-black/40 border border-white/[0.08] rounded-lg px-3 py-2.5 text-[14px] text-white focus:outline-none focus:ring-2 focus:ring-[#2997FF]/40 focus:border-[#2997FF]/40 transition-all">
                                                <option>Default</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868B] pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleRender}
                                    disabled={loading}
                                    className="w-full mt-6 bg-[#2997FF] text-white py-2.5 rounded-lg text-[14px] font-medium hover:bg-[#2997FF]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Rendering...
                                        </>
                                    ) : (
                                        "Generate Asset"
                                    )}
                                </button>
                            </div>

                            {/* Preview */}
                            <div className="lg:col-span-3 bg-[#1D1D1F] rounded-2xl border border-white/[0.06] p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-[17px] font-semibold text-white">Preview</h2>
                                    {rendered && (
                                        <button className="flex items-center gap-1.5 text-[13px] text-[#2997FF] font-medium hover:text-[#2997FF]/80 transition-colors">
                                            <Download className="w-3.5 h-3.5" />
                                            Download
                                        </button>
                                    )}
                                </div>
                                <div className="aspect-square max-w-sm mx-auto rounded-xl border border-white/[0.06] overflow-hidden bg-black/40 flex items-center justify-center">
                                    {loading ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-center"
                                        >
                                            <Loader2 className="w-8 h-8 text-[#2997FF] animate-spin mx-auto mb-3" />
                                            <p className="text-[13px] text-[#86868B]">Rendering your asset...</p>
                                        </motion.div>
                                    ) : rendered ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                                            className="w-full h-full bg-[#1D1D1F] flex flex-col items-center justify-center p-10 text-center relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#2997FF]/20 via-transparent to-[#BF5AF2]/20"></div>
                                            <p className="relative text-2xl font-semibold text-white leading-tight tracking-tight">{title}</p>
                                            <span className="relative mt-5 text-[11px] text-[#86868B] tracking-widest uppercase font-medium">AgentCanvas</span>
                                        </motion.div>
                                    ) : (
                                        <div className="text-center p-8">
                                            <Image className="w-8 h-8 text-[#86868B]/40 mx-auto mb-3" strokeWidth={1} />
                                            <p className="text-[13px] text-[#86868B]">Your asset will appear here</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* History */}
                    {activeTab === "history" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#1D1D1F] rounded-2xl border border-white/[0.06] overflow-hidden">
                            <div className="px-6 py-4 border-b border-white/[0.06]">
                                <h2 className="text-[17px] font-semibold text-white">Render History</h2>
                            </div>
                            {historyItems.map((item, i) => (
                                <div key={i} className="px-6 py-4 flex items-center justify-between border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center">
                                            <Image className="w-4 h-4 text-[#86868B]" strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-medium text-white">{item.title}</p>
                                            <p className="text-[12px] text-[#86868B]">{item.template} · {item.time}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[12px] font-medium px-2 py-0.5 rounded-md ${item.status === "completed"
                                            ? "text-[#32D74B] bg-[#32D74B]/10"
                                            : "text-[#FF9F0A] bg-[#FF9F0A]/10"
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* Templates */}
                    {activeTab === "templates" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 className="text-[17px] font-semibold text-white mb-6">Templates</h2>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {templates.map((tpl, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setTemplate(tpl.name.toLowerCase().replace(" ", "-")); setActiveTab("create") }}
                                        className="bg-[#1D1D1F] rounded-2xl border border-white/[0.06] overflow-hidden text-left hover:border-white/[0.12] transition-all duration-200 group"
                                    >
                                        <div className="h-28 flex items-center justify-center" style={{ backgroundColor: `${tpl.color}10` }}>
                                            <Layout className="w-8 h-8 transition-transform duration-200 group-hover:scale-110" style={{ color: tpl.color }} strokeWidth={1.5} />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-[14px] font-medium text-white">{tpl.name}</h3>
                                            <p className="text-[12px] text-[#86868B] mt-0.5">{tpl.size}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Placeholder */}
                    {!["create", "history", "templates"].includes(activeTab) && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#1D1D1F] rounded-2xl border border-white/[0.06] p-16 text-center">
                            <Settings className="w-8 h-8 text-[#86868B]/40 mx-auto mb-4" strokeWidth={1.5} />
                            <h2 className="text-[17px] font-semibold text-white mb-2">Coming Soon</h2>
                            <p className="text-[13px] text-[#86868B]">This section is under development.</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
