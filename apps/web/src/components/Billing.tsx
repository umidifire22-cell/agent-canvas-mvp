import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Check, Sparkles, Loader2, Zap } from 'lucide-react';

interface BillingProps {
    user: any;
}

const plans = [
    {
        id: 'starter',
        name: 'Starter',
        price: '29',
        credits: '1,000',
        features: ['1,000 HD Renders', 'Basic Templates', 'Email Support'],
        color: '#2997FF',
    },
    {
        id: 'growth',
        name: 'Growth',
        price: '99',
        credits: '5,000',
        features: ['5,000 HD Renders', 'Premium Templates', 'Priority Support', 'API Access'],
        color: '#BF5AF2',
        popular: true,
    },
    {
        id: 'scale',
        name: 'Scale',
        price: '299',
        credits: '20,000',
        features: ['20,000 HD Renders', 'Custom Branding', 'dedicated Support', 'Unlimited API'],
        color: '#32D74B',
    },
];

export const Billing: React.FC<BillingProps> = ({ user }) => {
    const [loading, setLoading] = useState<string | null>(null);

    const handlePurchase = async (planId: string) => {
        setLoading(planId);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
            const response = await fetch(`${apiUrl}/v1/checkout/create-session`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    userEmail: user.email,
                    planId,
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error("Failed to create checkout session");
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Error initiating payment. Please try again.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Simple, usage-based pricing</h2>
                <p className="text-[#86868B] text-[15px]">Choose the plan that fits your production needs. Scale as you grow.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {plans.map((plan) => (
                    <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className={`relative glass-card rounded-3xl ${plan.popular ? 'ring-1 ring-[#2997FF]/40 shadow-[0_0_40px_rgba(41,151,255,0.1)]' : ''
                            } p-8 flex flex-col group`}
                    >
                        {/* Hover Glow */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(135deg, ${plan.color}08, transparent)` }}></div>

                        {plan.popular && (
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 relative overflow-hidden bg-gradient-to-r from-[#2997FF] to-[#5856D6] text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-[0_0_20px_rgba(41,151,255,0.4)]">
                                <div className="absolute inset-0 shimmer-btn"></div>
                                <span className="relative z-10">Most Popular</span>
                            </div>
                        )}

                        <div className="mb-8 relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${plan.color}15` }}>
                                    <Sparkles className="w-5 h-5" style={{ color: plan.color }} />
                                </div>
                                <h3 className="text-[18px] font-semibold text-white">{plan.name}</h3>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-bold text-white tracking-tight">${plan.price}</span>
                                <span className="text-[#86868B] text-[14px]">/month</span>
                            </div>
                            <p className="mt-3 text-[14px] font-medium flex items-center gap-2" style={{ color: plan.color }}>
                                <Zap className="w-4 h-4" />
                                {plan.credits} Credits included
                            </p>
                        </div>

                        <ul className="space-y-3.5 mb-8 flex-1 relative z-10">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-[14px] text-[#F5F5F7]/80">
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${plan.color}15` }}>
                                        <Check className="w-3 h-3" style={{ color: plan.color }} />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handlePurchase(plan.id)}
                            disabled={loading !== null}
                            className={`w-full relative overflow-hidden py-3 rounded-xl text-[15px] font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 ${plan.popular
                                ? 'text-white shadow-[0_0_25px_rgba(41,151,255,0.3)] hover:shadow-[0_0_35px_rgba(41,151,255,0.5)]'
                                : 'bg-white/[0.06] text-white border border-white/[0.08] hover:bg-white/[0.12] hover:border-white/[0.15]'
                                }`}
                            style={plan.popular ? { background: `linear-gradient(135deg, ${plan.color}, #5856D6)` } : {}}
                        >
                            {plan.popular && <div className="absolute inset-0 shimmer-btn"></div>}
                            <span className="relative z-10 flex items-center gap-2">
                                {loading === plan.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <CreditCard className="w-4 h-4" />
                                )}
                                Get Started
                            </span>
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="mt-16 glass-card rounded-3xl p-8 text-center">
                <p className="text-[14px] text-[#86868B]">
                    Need a custom plan? <a href="mailto:hello@agentcanvas.io" className="text-[#2997FF] hover:underline font-medium">Contact sales</a> for enterprise volume pricing.
                </p>
            </div>
        </div>
    );
};
