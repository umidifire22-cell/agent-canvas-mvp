"use client"

import { useState } from "react"
import Link from "next/link"

export default function Dashboard() {
    const [loading, setLoading] = useState(false)
    const [outputUrl, setOutputUrl] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState("create")
    const [title, setTitle] = useState("AI just changed everything")
    const [template, setTemplate] = useState("social-post")

    const handleRender = async () => {
        setLoading(true)
        setTimeout(() => {
            setOutputUrl("done")
            setLoading(false)
        }, 2500)
    }

    const stats = [
        { label: "Renders Today", value: "12", change: "+3" },
        { label: "Credits Left", value: "38", change: "of 50" },
        { label: "Templates", value: "4", change: "available" },
        { label: "Avg. Time", value: "3.2s", change: "per render" },
    ]

    const history = [
        { id: "rnd_01", template: "Social Post", title: "Launch Day Announcement", status: "completed", time: "2 min ago" },
        { id: "rnd_02", template: "Instagram Story", title: "Product Feature Reveal", status: "completed", time: "15 min ago" },
        { id: "rnd_03", template: "Social Post", title: "Team Spotlight", status: "processing", time: "Just now" },
    ]

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col glass border-r border-white/5 p-4">
                <Link href="/" className="flex items-center gap-2 mb-8 px-2">
                    <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center text-white font-bold text-sm">A</div>
                    <span className="font-bold text-white">AgentCanvas</span>
                </Link>
                <nav className="flex flex-col gap-1 flex-1">
                    {[
                        { icon: "✨", label: "Create", tab: "create" },
                        { icon: "📋", label: "History", tab: "history" },
                        { icon: "📐", label: "Templates", tab: "templates" },
                        { icon: "🎨", label: "Brand Kit", tab: "brand" },
                        { icon: "🔑", label: "API Keys", tab: "api" },
                        { icon: "⚙️", label: "Settings", tab: "settings" },
                    ].map((item) => (
                        <button
                            key={item.tab}
                            onClick={() => setActiveTab(item.tab)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === item.tab
                                    ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>
                <div className="glass rounded-xl p-4 mt-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-400">Credits</span>
                        <span className="text-xs font-semibold text-indigo-400">38/50</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-700">
                        <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: '76%' }}></div>
                    </div>
                    <Link href="#" className="mt-3 block text-center text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                        Upgrade to Pro →
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col mesh-gradient">
                {/* Top Bar */}
                <header className="glass border-b border-white/5 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="lg:hidden flex items-center gap-2">
                            <div className="w-7 h-7 rounded-md btn-gradient flex items-center justify-center text-white font-bold text-xs">A</div>
                            <span className="font-bold text-white text-sm">AgentCanvas</span>
                        </div>
                        <h1 className="text-lg font-semibold text-white hidden lg:block">Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 hidden sm:block">Free Plan</span>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">R</div>
                    </div>
                </header>

                <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
                    {/* Stats */}
                    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="glass rounded-xl p-4 hover:border-indigo-500/20 transition-all">
                                <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                                <p className="text-xs text-indigo-400 mt-1">{stat.change}</p>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Tabs */}
                    <div className="flex gap-2 mb-6 lg:hidden overflow-x-auto">
                        {["create", "history", "templates"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab ? "bg-indigo-500/15 text-indigo-400" : "text-slate-400"
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Create Tab */}
                    {(activeTab === "create") && (
                        <div className="grid gap-6 lg:grid-cols-5">
                            {/* Configure */}
                            <div className="lg:col-span-2 glass rounded-2xl p-6">
                                <h2 className="text-lg font-semibold text-white mb-1">Create New Asset</h2>
                                <p className="text-sm text-slate-400 mb-6">Configure your render settings.</p>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Template</label>
                                        <select
                                            value={template}
                                            onChange={(e) => setTemplate(e.target.value)}
                                            className="w-full px-3 py-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                                        >
                                            <option value="social-post">Social Post (1080×1080)</option>
                                            <option value="story">Instagram Story (1080×1920)</option>
                                            <option value="banner">Twitter Banner (1500×500)</option>
                                            <option value="video">Short Video (1080×1080)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Title</label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full px-3 py-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                                            placeholder="Enter your headline..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Background Image</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Brand Kit</label>
                                        <select className="w-full px-3 py-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50">
                                            <option>Default Brand Kit</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    onClick={handleRender}
                                    disabled={loading}
                                    className="w-full mt-6 btn-gradient py-3 rounded-xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                                            Rendering...
                                        </span>
                                    ) : "Generate Asset ⚡"}
                                </button>
                            </div>

                            {/* Preview */}
                            <div className="lg:col-span-3 glass rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-white">Preview</h2>
                                    {outputUrl && (
                                        <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                                            Download PNG ↓
                                        </button>
                                    )}
                                </div>
                                <div className="aspect-square max-w-md mx-auto rounded-xl border border-slate-700/50 overflow-hidden bg-slate-900/50 flex items-center justify-center">
                                    {loading ? (
                                        <div className="text-center">
                                            <svg className="animate-spin h-8 w-8 text-indigo-500 mx-auto mb-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                                            <p className="text-sm text-slate-400">Rendering your asset...</p>
                                        </div>
                                    ) : outputUrl ? (
                                        <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center p-8 text-center">
                                            <p className="text-3xl font-bold text-white leading-tight">{title}</p>
                                            <div className="mt-6 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur text-white text-sm font-medium">
                                                Made with AgentCanvas
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center p-8">
                                            <div className="text-4xl mb-3">🖼️</div>
                                            <p className="text-sm text-slate-400">Your rendered asset will appear here</p>
                                            <p className="text-xs text-slate-500 mt-1">Click &quot;Generate Asset&quot; to start</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* History Tab */}
                    {activeTab === "history" && (
                        <div className="glass rounded-2xl overflow-hidden">
                            <div className="p-6 border-b border-white/5">
                                <h2 className="text-lg font-semibold text-white">Render History</h2>
                            </div>
                            <div className="divide-y divide-white/5">
                                {history.map((item) => (
                                    <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/10">
                                                <span className="text-sm">🖼️</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">{item.title}</p>
                                                <p className="text-xs text-slate-400">{item.template} • {item.time}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${item.status === "completed"
                                                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                                : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                            }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Templates Tab */}
                    {activeTab === "templates" && (
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-6">Template Gallery</h2>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {[
                                    { name: "Social Post", size: "1080×1080", gradient: "from-indigo-600 to-blue-500", icon: "📱" },
                                    { name: "Instagram Story", size: "1080×1920", gradient: "from-pink-500 to-rose-500", icon: "📸" },
                                    { name: "Twitter Banner", size: "1500×500", gradient: "from-sky-500 to-cyan-500", icon: "🐦" },
                                    { name: "Short Video", size: "1080×1080", gradient: "from-purple-500 to-violet-500", icon: "🎬" },
                                    { name: "LinkedIn Post", size: "1200×627", gradient: "from-blue-600 to-blue-400", icon: "💼" },
                                    { name: "YouTube Thumbnail", size: "1280×720", gradient: "from-red-500 to-orange-500", icon: "▶️" },
                                ].map((tpl, i) => (
                                    <div key={i} className="glass glass-hover rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:translate-y-[-2px]">
                                        <div className={`h-32 bg-gradient-to-br ${tpl.gradient} flex items-center justify-center`}>
                                            <span className="text-4xl">{tpl.icon}</span>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-sm font-semibold text-white">{tpl.name}</h3>
                                            <p className="text-xs text-slate-400 mt-1">{tpl.size}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Other tabs placeholder */}
                    {!["create", "history", "templates"].includes(activeTab) && (
                        <div className="glass rounded-2xl p-12 text-center">
                            <div className="text-4xl mb-4">🚧</div>
                            <h2 className="text-lg font-semibold text-white mb-2">Coming Soon</h2>
                            <p className="text-sm text-slate-400">This section is under development.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
