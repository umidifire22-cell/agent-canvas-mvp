"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Layers, ArrowRight, Loader2, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push("/dashboard")
        }
    }

    const handleSignUp = async () => {
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            setError(error.message)
        } else {
            setError("Check your email for the confirmation link.")
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-15%] w-[50%] h-[50%] bg-[#2997FF]/8 blur-[150px] rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-[-20%] right-[-15%] w-[50%] h-[50%] bg-[#BF5AF2]/8 blur-[150px] rounded-full animate-[float_8s_ease-in-out_infinite_reverse]"></div>
            </div>
            {/* Dot Grid */}
            <div className="fixed inset-0 dot-grid opacity-30 pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                className="w-full max-w-[420px] relative z-10"
            >
                <div className="flex flex-col items-center mb-10">
                    <Link href="/" className="flex items-center gap-3 mb-8 group">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2997FF] to-[#BF5AF2] flex items-center justify-center shadow-[0_0_30px_rgba(41,151,255,0.4)] group-hover:shadow-[0_0_40px_rgba(41,151,255,0.6)] group-hover:scale-110 transition-all duration-300"
                        >
                            <Layers className="w-6 h-6 text-white" strokeWidth={2} />
                        </motion.div>
                        <span className="text-2xl font-semibold text-white tracking-tight">AgentCanvas</span>
                    </Link>
                    <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Welcome back</h1>
                    <p className="text-[14px] text-[#A1A1AA] font-light text-center">
                        The visual engine for autonomous agents.
                    </p>
                </div>

                <div className="glass-card rounded-2xl p-8 glow-border">
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[13px] font-medium text-[#F5F5F7]/80 flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5" /> Email
                            </label>
                            <div className="group p-[1px] rounded-xl bg-gradient-to-r from-white/[0.08] to-white/[0.03] hover:from-[#2997FF]/40 hover:to-[#BF5AF2]/20 focus-within:from-[#2997FF]/50 focus-within:to-[#BF5AF2]/30 transition-all duration-400">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-black/80 backdrop-blur-md rounded-[11px] px-4 py-3 text-[14px] text-white placeholder-[#86868B]/50 focus:outline-none transition-all"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-[13px] font-medium text-[#F5F5F7]/80 flex items-center gap-2">
                                    <Lock className="w-3.5 h-3.5" /> Password
                                </label>
                                <button type="button" className="text-[12px] text-[#2997FF] hover:underline">Forgot?</button>
                            </div>
                            <div className="group p-[1px] rounded-xl bg-gradient-to-r from-white/[0.08] to-white/[0.03] hover:from-[#2997FF]/40 hover:to-[#BF5AF2]/20 focus-within:from-[#2997FF]/50 focus-within:to-[#BF5AF2]/30 transition-all duration-400">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-black/80 backdrop-blur-md rounded-[11px] px-4 py-3 text-[14px] text-white placeholder-[#86868B]/50 focus:outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[12px] text-[#FF375F] bg-[#FF375F]/10 px-3 py-2 rounded-lg border border-[#FF375F]/20"
                            >
                                {error}
                            </motion.p>
                        )}

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full relative overflow-hidden bg-gradient-to-r from-[#2997FF] to-[#5856D6] text-white py-3 rounded-xl text-[14px] font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(41,151,255,0.3)] hover:shadow-[0_0_35px_rgba(41,151,255,0.5)] disabled:opacity-50"
                        >
                            <div className="absolute inset-0 shimmer-btn"></div>
                            <span className="relative z-10 flex items-center gap-2">
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
                            </span>
                        </motion.button>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/[0.05]"></span>
                            </div>
                            <div className="relative flex justify-center text-[11px] uppercase tracking-widest text-[#86868B]">
                                <span className="bg-transparent px-3 text-[#A1A1AA] backdrop-blur-sm">or</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleSignUp}
                            disabled={loading}
                            className="w-full bg-white/[0.04] text-white border border-white/[0.08] py-3 rounded-xl text-[14px] font-medium hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
                        >
                            Create Account
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-[12px] text-[#86868B]/60 font-light">
                    By continuing, you agree to AgentCanvas&apos;s <br />
                    <Link href="#" className="underline hover:text-white/60 transition-colors">Terms of Service</Link> and <Link href="#" className="underline hover:text-white/60 transition-colors">Privacy Policy</Link>.
                </p>
            </motion.div>
        </div>
    )
}
