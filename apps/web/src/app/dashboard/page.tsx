"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    Sparkles, Clock, Layout, Palette, Key, Settings,
    Download, Image as ImageIcon, ChevronDown, Loader2, LogOut, User,
    CreditCard, Zap, Layers, BarChart3
} from "lucide-react"
import { Billing } from "@/components/Billing"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { VisualEditor, TemplateElement } from "@/components/VisualEditor"

const navItems = [
    { icon: Sparkles, label: "Create", tab: "create" },
    { icon: Clock, label: "History", tab: "history" },
    { icon: Layout, label: "Templates", tab: "templates" },
    { icon: CreditCard, label: "Billing", tab: "billing" },
]

interface DashboardProps { }

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("create")
    const [loading, setLoading] = useState(false)
    const [rendered, setRendered] = useState(false)
    const [topic, setTopic] = useState("")
    const [title, setTitle] = useState("Exploring the Future")
    const [template, setTemplate] = useState("SocialPost")
    const [dynamicValues, setDynamicValues] = useState<Record<string, string>>({})
    const [apiTemplates, setApiTemplates] = useState<any[]>([])

    const [isCreatingTemplate, setIsCreatingTemplate] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [authLoading, setAuthLoading] = useState(true)
    const [credits, setCredits] = useState<number>(50) // Default for safety
    const [historyItems, setHistoryItems] = useState<any[]>([])

    const selectedTemplateObj = apiTemplates.find(t => t.id === template);
    let dynamicVars: string[] = [];
    if (selectedTemplateObj && selectedTemplateObj.id !== 'SocialPost' && selectedTemplateObj.markup) {
        try {
            const elements = JSON.parse(selectedTemplateObj.markup);
            const vars = elements.filter((el: any) => el.type === 'text' && el.isVariable && el.variableName).map((el: any) => el.variableName);
            dynamicVars = Array.from(new Set(vars)) as string[];
        } catch (e) { }
    }

    const [outputUrl, setOutputUrl] = useState<string | null>(null)
    const [jobId, setJobId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.replace("/login")
            } else {
                setUser(session.user)
                setAuthLoading(false)
                fetchUserData(session.user.id)
            }
        }
        checkUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                router.replace("/login")
            } else {
                setUser(session.user)
                fetchUserData(session.user.id)
            }
        })

        return () => subscription.unsubscribe()
    }, [router])

    const fetchUserData = async (userId: string) => {
        try {
            // Fetch Credits
            const { data: profile } = await supabase.from('profiles').select('credits_balance').eq('id', userId).single()
            if (profile) setCredits(profile.credits_balance || 0)

            // Fetch History
            const { data: renders } = await supabase.from('renders').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(20)
            if (renders) setHistoryItems(renders)

            // Fetch Templates
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006"
            const response = await fetch(`${apiUrl}/v1/templates?userId=${userId}`)
            if (response.ok) {
                const data = await response.json()
                setApiTemplates(data)
            }
        } catch (err) {
            console.error("Error fetching user data", err)
        }
    }

    const handleCreateTemplate = async (name: string, elements: TemplateElement[]) => {
        if (!name || !elements.length) return;
        setLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006";
            const res = await fetch(`${apiUrl}/v1/templates`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    name: name,
                    markup: JSON.stringify(elements)
                })
            });
            if (res.ok) {
                setIsCreatingTemplate(false);
                fetchUserData(user.id);
            } else {
                const data = await res.json();
                setError(data.error || "Failed to create template");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteTemplate = async (id: string) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006";
            await fetch(`${apiUrl}/v1/templates/${id}?userId=${user.id}`, { method: "DELETE" });
            fetchUserData(user.id);
        } catch (err) {
            console.error(err);
        }
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.replace("/login")
    }

    const handleRender = async () => {
        if (credits <= 0) {
            setError("Insufficient credits. Please upgrade your plan.")
            return
        }

        setLoading(true)
        setRendered(false)
        setError(null)
        setOutputUrl(null)

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006"
            const response = await fetch(`${apiUrl}/v1/render-direct`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    templateId: template,
                    userId: user?.id,
                    data: {
                        topic: topic || undefined,
                        title: topic ? undefined : title,
                        brandKit: {
                            colors: { primary: "#2997FF", secondary: "#1D1D1F", background: "#030303" },
                            typography: { headingFont: "Inter", bodyFont: "Inter" }
                        }
                    },
                    dynamicVariables: dynamicValues,
                    format: "png"
                })
            })

            const result = await response.json()
            if (!response.ok) throw new Error(result.error || "Failed to generate asset")

            setOutputUrl(result.outputUrl)
            setRendered(true)
            if (user) fetchUserData(user.id)
            setLoading(false)
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unknown error occurred")
            setLoading(false)
        }
    }

    if (authLoading) {
        return (
            <div className="h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#2997FF] animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex h-screen overflow-hidden bg-transparent relative">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col border-r border-white/[0.04] bg-white/[0.01] backdrop-blur-3xl">
                <div className="h-16 px-6 flex items-center border-b border-white/[0.04]">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#2997FF] to-[#BF5AF2] flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                        <Link href="/" className="text-[15px] font-semibold text-white tracking-tight">
                            AgentCanvas
                        </Link>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = activeTab === item.tab;
                        return (
                            <button
                                key={item.tab}
                                onClick={() => setActiveTab(item.tab)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-300 relative ${isActive
                                    ? "text-white bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                                    : "text-[#86868B] hover:text-white hover:bg-white/[0.02]"
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute inset-0 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                                <item.icon className="w-4 h-4 relative z-10" strokeWidth={1.5} />
                                <span className="relative z-10">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/[0.04] bg-white/[0.01]">
                    <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/[0.05] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#2997FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="flex items-center justify-between mb-3 relative z-10">
                            <span className="text-[12px] text-[#A1A1AA]">Credits Available</span>
                            <span className="text-[13px] font-semibold text-white">{credits}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/[0.05] relative z-10 overflow-hidden">
                            <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-[#2997FF] to-[#5AC8FA]"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((credits / 100) * 100, 100)}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                        <Link href="#" onClick={() => setActiveTab('billing')} className="block mt-4 text-[12px] text-[#2997FF] font-medium hover:text-[#5AC8FA] transition-colors relative z-10 flex items-center justify-between">
                            Buy more credits <span>→</span>
                        </Link>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/[0.04] flex flex-col gap-1">
                        <div className="flex items-center gap-3 px-3 py-2 text-[12px] text-[#A1A1AA]">
                            <div className="flex-1 truncate">{user?.email}</div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium text-[#FF375F]/80 hover:text-[#FF375F] hover:bg-[#FF375F]/10 transition-colors duration-200"
                        >
                            <LogOut className="w-4 h-4" strokeWidth={1.5} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0 bg-white/[0.01]">
                {/* Top Bar */}
                <header className="h-16 px-8 flex items-center justify-between border-b border-white/[0.04] bg-white/[0.01] backdrop-blur-2xl shrink-0 z-10">
                    <div className="lg:hidden">
                        <span className="text-[15px] font-semibold text-white">AgentCanvas</span>
                    </div>
                    <h1 className="text-[16px] font-medium text-white hidden lg:block tracking-tight">
                        {navItems.find(n => n.tab === activeTab)?.label || "Dashboard"}
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-[12px] font-medium text-[#A1A1AA] px-3 py-1 bg-white/[0.05] rounded-full hidden sm:block border border-white/[0.05]">Beta Access</span>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2997FF] to-[#BF5AF2] flex items-center justify-center text-[12px] font-bold text-white shadow-lg shadow-[#2997FF]/20 border border-white/20">
                            {user?.email?.charAt(0).toUpperCase() || "U"}
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-6 lg:p-10 relative z-0">
                    {/* Stats */}
                    {activeTab === 'create' && (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                            {[
                                { label: "Total Generated", value: historyItems.length.toString(), icon: Layers, color: "#2997FF", gradient: "from-[#2997FF]/15 to-[#2997FF]/5" },
                                { label: "Credits Left", value: credits.toString(), icon: Zap, color: "#BF5AF2", gradient: "from-[#BF5AF2]/15 to-[#BF5AF2]/5" },
                                { label: "Formats Available", value: apiTemplates.length.toString(), icon: Layout, color: "#32D74B", gradient: "from-[#32D74B]/15 to-[#32D74B]/5" },
                                { label: "Avg. Render Time", value: "2.4s", icon: BarChart3, color: "#FF9F0A", gradient: "from-[#FF9F0A]/15 to-[#FF9F0A]/5" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                    className="glass-card rounded-2xl p-5 relative overflow-hidden group cursor-default"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                    <div className="flex items-center justify-between mb-3 relative z-10">
                                        <p className="text-[12px] text-[#A1A1AA] font-medium">{stat.label}</p>
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                                            <stat.icon className="w-4 h-4" style={{ color: stat.color }} strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    <p className="text-3xl font-semibold text-white tracking-tight relative z-10">{stat.value}</p>
                                    {/* Decorative Sparkline */}
                                    <svg className="absolute bottom-0 right-0 w-24 h-10 opacity-10 group-hover:opacity-25 transition-opacity" viewBox="0 0 100 40">
                                        <polyline fill="none" stroke={stat.color} strokeWidth="2" points="0,30 15,25 30,28 45,15 60,20 75,10 90,18 100,5" />
                                    </svg>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Mobile tabs */}
                    <div className="flex gap-2 mb-8 lg:hidden overflow-x-auto pb-2 scrollbar-hide">
                        {navItems.map((item) => (
                            <button
                                key={item.tab}
                                onClick={() => setActiveTab(item.tab)}
                                className={`px-4 py-2 rounded-xl text-[13px] font-medium whitespace-nowrap transition-all border ${activeTab === item.tab
                                    ? "bg-white/[0.08] text-white border-white/[0.1]"
                                    : "bg-white/[0.02] text-[#86868B] border-transparent"
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Create */}
                    {activeTab === "create" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="grid gap-8 lg:grid-cols-5"
                        >
                            {/* Form */}
                            <div className="lg:col-span-2 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl rounded-3xl border border-white/[0.08] p-7 shadow-2xl">
                                <h2 className="text-[18px] font-semibold text-white mb-2 tracking-tight">Generate Asset</h2>
                                <p className="text-[13px] text-[#A1A1AA] mb-8">Design premium content with AI natively.</p>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[13px] font-medium text-white/80 mb-2.5">Platform Format</label>
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                            {apiTemplates.map(t => (
                                                <button
                                                    key={t.id}
                                                    type="button"
                                                    onClick={() => setTemplate(t.id)}
                                                    className={`relative px-4 py-3 rounded-xl text-left transition-all duration-300 border flex flex-col gap-1 overflow-hidden group ${template === t.id
                                                        ? "bg-[#2997FF]/10 border-[#2997FF]/50 shadow-[0_0_20px_rgba(41,151,255,0.15)]"
                                                        : "bg-black/40 border-white/[0.05] hover:bg-white/[0.03] hover:border-white/[0.15]"
                                                        }`}
                                                >
                                                    {template === t.id && (
                                                        <motion.div layoutId="format_outline" className="absolute inset-0 rounded-xl border border-[#2997FF]" style={{ pointerEvents: 'none' }} transition={{ duration: 0.2 }} />
                                                    )}
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[13px] font-medium text-white">{t.name}</span>
                                                        <div className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: t.color || "#2997FF", color: t.color || "#2997FF" }}></div>
                                                    </div>
                                                    <span className="text-[11px] text-[#A1A1AA] font-mono">{t.size || "Dynamic"}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {dynamicVars.length > 0 ? (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-6">
                                            <div className="p-4 rounded-xl bg-[#2997FF]/10 border border-[#2997FF]/20">
                                                <p className="text-[13px] text-[#2997FF] font-medium flex items-center gap-2">
                                                    <Sparkles className="w-4 h-4" /> Custom Template Detected
                                                </p>
                                                <p className="text-[12px] text-[#2997FF]/70 mt-1">Fill out the dynamic variables below to generate your specific format.</p>
                                            </div>
                                            {dynamicVars.map(vName => (
                                                <div key={vName}>
                                                    <label className="block text-[13px] font-medium text-white/80 mb-2.5 capitalize">{vName.replace(/_/g, ' ')}</label>
                                                    <input
                                                        type="text"
                                                        value={dynamicValues[vName] || ''}
                                                        onChange={(e) => setDynamicValues(prev => ({ ...prev, [vName]: e.target.value }))}
                                                        className="w-full bg-black/50 border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-white placeholder-[#A1A1AA]/40 focus:outline-none focus:ring-2 focus:ring-[#2997FF]/50 transition-all shadow-inner"
                                                        placeholder={`Enter ${vName.replace(/_/g, ' ')}`}
                                                    />
                                                </div>
                                            ))}
                                        </motion.div>
                                    ) : (
                                        <>
                                            <div>
                                                <label className="block text-[13px] font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#2997FF] to-[#BF5AF2] mb-2.5 flex items-center gap-2">
                                                    <Sparkles className="w-4 h-4 text-[#2997FF]" />
                                                    Creative Direction
                                                </label>
                                                <div className="relative group p-[1px] rounded-2xl bg-gradient-to-b from-white/[0.1] to-white/[0.01] hover:from-[#2997FF]/50 hover:to-[#BF5AF2]/30 transition-all duration-500 overflow-hidden shadow-2xl">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-[#2997FF]/20 to-[#BF5AF2]/20 opacity-0 group-focus-within:opacity-100 transition-opacity blur-xl"></div>
                                                    <textarea
                                                        value={topic}
                                                        onChange={(e) => setTopic(e.target.value)}
                                                        rows={4}
                                                        className="w-full relative z-10 bg-black/80 backdrop-blur-md rounded-[15px] px-5 py-4 text-[15px] text-white placeholder-[#86868B] focus:outline-none transition-all resize-none leading-relaxed"
                                                        placeholder="Describe the mood, subject, and lighting of your ideal masterpiece..."
                                                    />
                                                </div>
                                            </div>

                                            {!topic && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                                                    <label className="block text-[13px] font-medium text-white/80 mb-2.5">Headline Title</label>
                                                    <input
                                                        type="text"
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        className="w-full bg-black/50 border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-white placeholder-[#A1A1AA]/40 focus:outline-none focus:ring-2 focus:ring-[#2997FF]/50 transition-all shadow-inner"
                                                        placeholder="Enter a catchy title"
                                                    />
                                                </motion.div>
                                            )}
                                        </>
                                    )}

                                    <div>
                                        <label className="block text-[13px] font-medium text-white/80 mb-2.5">Vibe / Brand Kit</label>
                                        <div className="flex gap-3">
                                            {['Cinematic 8k', 'Neon Cyberpunk', 'Minimalist'].map(kit => (
                                                <button
                                                    key={kit}
                                                    type="button"
                                                    className={`px-4 py-2 rounded-full text-[12px] font-medium transition-all ${kit === 'Cinematic 8k' ? 'bg-white text-black' : 'bg-transparent text-[#A1A1AA] border border-white/10 hover:text-white hover:border-white/30'
                                                        }`}
                                                >
                                                    {kit}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleRender}
                                    disabled={loading}
                                    className="w-full mt-8 relative overflow-hidden bg-gradient-to-r from-[#2997FF] via-[#5856D6] to-[#BF5AF2] text-white py-3.5 rounded-xl text-[15px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(41,151,255,0.3)] hover:shadow-[0_0_40px_rgba(41,151,255,0.5)] animate-[glow-pulse_3s_ease-in-out_infinite]"
                                >
                                    <div className="absolute inset-0 shimmer-btn"></div>
                                    <span className="relative z-10 flex items-center gap-2">
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Synthesizing...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-4 h-4" />
                                                Generate Masterpiece
                                            </>
                                        )}
                                    </span>
                                </motion.button>
                            </div>

                            {/* Preview */}
                            <div className="lg:col-span-3 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-xl rounded-3xl border border-white/[0.05] p-2 flex flex-col relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none z-0"></div>
                                <div className="px-6 py-5 flex items-center justify-between border-b border-white/[0.04] relative z-10 bg-black/20 backdrop-blur-md rounded-t-3xl rounded-b-lg mb-2">
                                    <h2 className="text-[17px] font-medium text-white flex items-center gap-2">
                                        <ImageIcon className="w-5 h-5 text-[#86868B]" />
                                        Studio Canvas
                                    </h2>
                                    {rendered && outputUrl && (
                                        <a href={outputUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[13px] text-white bg-white/10 px-3 py-1.5 rounded-lg font-medium hover:bg-white/20 transition-all border border-white/10 shadow-lg">
                                            <Download className="w-4 h-4" />
                                            Export High-Res
                                        </a>
                                    )}
                                </div>
                                <div className="flex-1 rounded-2xl border border-white/[0.04] overflow-hidden bg-black/60 shadow-inner flex items-center justify-center relative m-2 z-10 min-h-[400px]">
                                    {error ? (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-red-500/5 backdrop-blur-sm">
                                            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-5 border border-red-500/20 shadow-[0_0_30px_rgba(255,55,95,0.2)]">
                                                <LogOut className="w-7 h-7 text-[#FF375F]" />
                                            </div>
                                            <p className="text-[15px] text-white font-medium mb-2 tracking-tight">Render Terminated</p>
                                            <p className="text-[13px] text-[#A1A1AA] max-w-xs">{error}</p>
                                        </div>
                                    ) : loading ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 flex flex-col items-center justify-center bg-transparent"
                                        >
                                            {/* Radar Scanning Effect */}
                                            <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
                                                <div className="absolute inset-0 rounded-full border border-white/5"></div>
                                                <div className="absolute inset-4 rounded-full border border-white/5"></div>
                                                <div className="absolute inset-8 rounded-full border border-white/10 border-dashed animate-[spin_10s_linear_infinite]"></div>
                                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2997FF]/10 to-transparent blur-2xl animate-pulse"></div>

                                                {/* Scanning Line */}
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                                    className="absolute inset-0 origin-center"
                                                >
                                                    <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-[#2997FF]/30 origin-right blur-sm" style={{ clipPath: 'polygon(100% 50%, 0 0, 0 100%)' }}></div>
                                                </motion.div>

                                                <div className="relative z-10 w-16 h-16 rounded-full bg-black/50 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(41,151,255,0.4)]">
                                                    <Sparkles className="w-6 h-6 text-[#2997FF] animate-pulse" />
                                                </div>
                                            </div>
                                            <p className="text-[15px] font-medium text-white mb-2 tracking-tight">Synthesizing Pixels</p>
                                            <div className="flex gap-1 items-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#2997FF] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#2997FF] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#2997FF] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                            </div>
                                        </motion.div>
                                    ) : outputUrl ? (
                                        <div className="relative w-full h-full group">
                                            <motion.img
                                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                                src={outputUrl}
                                                alt="Generated asset"
                                                className="w-full h-full object-cover sm:object-contain bg-black"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                                <p className="text-white text-[13px] font-medium flex items-center gap-2">
                                                    <Sparkles className="w-4 h-4 text-[#32D74B]" /> High Fidelity Render Completed
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center p-8 max-w-sm relative z-10">
                                            {/* Advanced Background Grid pattern */}
                                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                                            <div className="w-20 h-20 bg-gradient-to-br from-white/[0.08] to-white/[0.01] rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/[0.08] shadow-[0_0_40px_rgba(255,255,255,0.02)] group-hover:shadow-[0_0_40px_rgba(41,151,255,0.1)] transition-shadow">
                                                <div className="w-10 h-10 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center animate-[spin_20s_linear_infinite]">
                                                    <Layout className="w-5 h-5 text-white/50" strokeWidth={1.5} />
                                                </div>
                                            </div>
                                            <p className="text-[16px] font-medium text-white mb-2 tracking-tight">Canvas Awaiting Instructions</p>
                                            <p className="text-[13px] text-[#A1A1AA] leading-relaxed">Configure your parameters on the left and ignite the engine to forge your next masterpiece.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* History */}
                    {activeTab === "history" && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.06] overflow-hidden shadow-2xl">
                            <div className="px-8 py-6 border-b border-white/[0.06] bg-black/20 flex justify-between items-center">
                                <div>
                                    <h2 className="text-[18px] font-semibold text-white tracking-tight">Render History</h2>
                                    <p className="text-[13px] text-[#A1A1AA] mt-1">Your past creative generations.</p>
                                </div>
                            </div>

                            {historyItems.length === 0 ? (
                                <div className="p-16 text-center flex flex-col items-center">
                                    <Clock className="w-12 h-12 text-[#86868B]/30 mb-4" />
                                    <p className="text-[15px] text-white font-medium">No history yet</p>
                                    <p className="text-[13px] text-[#86868B] mt-1">Generations will appear here</p>
                                    <button onClick={() => setActiveTab('create')} className="mt-6 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[13px] transition-colors border border-white/10">Start Creating</button>
                                </div>
                            ) : (
                                <div className="divide-y divide-white/[0.04]">
                                    <AnimatePresence>
                                        {historyItems.map((item, i) => (
                                            <motion.div
                                                key={item.id || i}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-white/[0.03] transition-colors duration-200 group gap-4"
                                            >
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.05] flex items-center justify-center shrink-0 shadow-lg group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-shadow">
                                                        <ImageIcon className="w-5 h-5 text-white/70" strokeWidth={1.5} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[15px] font-medium text-white mb-1 group-hover:text-[#2997FF] transition-colors">{item.title || "Untitled Creation"}</p>
                                                        <div className="flex items-center gap-3 text-[12px] text-[#A1A1AA]">
                                                            <span className="bg-white/[0.05] px-2 py-0.5 rounded text-white/80">{item.template_id || "Graphic"}</span>
                                                            <span>•</span>
                                                            <span>{new Date(item.created_at).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className={`text-[12px] font-medium px-2.5 py-1 rounded-md border ${item.status === "completed"
                                                        ? "text-[#32D74B] bg-[#32D74B]/10 border-[#32D74B]/20"
                                                        : item.status === "failed"
                                                            ? "text-[#FF375F] bg-[#FF375F]/10 border-[#FF375F]/20"
                                                            : "text-[#FF9F0A] bg-[#FF9F0A]/10 border-[#FF9F0A]/20"
                                                        }`}>
                                                        {item.status || "Completed"}
                                                    </span>
                                                    {item.output_url && (
                                                        <a href={item.output_url} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors">
                                                            <Download className="w-4 h-4 text-white/80" />
                                                        </a>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Templates */}
                    {activeTab === "templates" && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="mb-8 flex justify-between items-end">
                                <div>
                                    <h2 className="text-[20px] font-semibold text-white tracking-tight mb-2">Creative Formats</h2>
                                    <p className="text-[14px] text-[#A1A1AA]">Manage and build custom Satori templates.</p>
                                </div>
                                <button onClick={() => setIsCreatingTemplate(!isCreatingTemplate)} className="px-4 py-2 bg-[#2997FF] hover:bg-[#5AC8FA] text-black font-medium rounded-lg text-[13px] transition-colors shadow-[0_0_15px_rgba(41,151,255,0.3)]">
                                    {isCreatingTemplate ? "Cancel" : "New Template"}
                                </button>
                            </div>

                            {isCreatingTemplate && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-10">
                                    <VisualEditor onSave={handleCreateTemplate} onCancel={() => setIsCreatingTemplate(false)} />
                                </motion.div>
                            )}

                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {apiTemplates.map((tpl, i) => (
                                    <motion.div
                                        key={tpl.id}
                                        whileHover={{ y: -5 }}
                                        className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.06] overflow-hidden text-left hover:border-white/[0.15] hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 group relative flex flex-col"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
                                        <div className="h-28 flex items-center justify-center relative z-10 before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black/40" style={{ backgroundColor: `${tpl.color || '#2997FF'}15` }}>
                                            <div className="w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/[0.08] group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                                <Layout className="w-6 h-6" style={{ color: tpl.color || "#2997FF" }} strokeWidth={1.5} />
                                            </div>
                                            {!tpl.isDefault && (
                                                <button onClick={() => handleDeleteTemplate(tpl.id)} className="absolute top-3 right-3 p-1.5 bg-black/50 hover:bg-red-500/20 text-[#A1A1AA] hover:text-red-500 rounded-lg transition-colors z-20">
                                                    <LogOut className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                        <div className="p-4 relative z-10 bg-gradient-to-t from-black/80 to-transparent flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-[15px] font-semibold text-white mb-1 group-hover:text-[#2997FF] transition-colors">{tpl.name}</h3>
                                                <p className="text-[13px] text-[#A1A1AA] flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tpl.color || "#2997FF" }}></span>
                                                    {tpl.size || "Dynamic"}
                                                </p>
                                            </div>
                                            <button onClick={() => { setTemplate(tpl.id); setActiveTab("create") }} className="mt-4 w-full py-1.5 border border-white/10 hover:border-[#2997FF]/50 rounded-lg text-[13px] text-white/80 hover:text-white transition-colors">
                                                Use Template
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Billing */}
                    {activeTab === "billing" && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <Billing user={user} />
                        </motion.div>
                    )}

                </div>
            </div >
        </div >
    )
}
