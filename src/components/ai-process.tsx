import { motion } from 'framer-motion';
import {
    ActivityIcon,
    BrainIcon,
    ChartBarIcon,
    WalletIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const AIProcessSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    const steps = [
        {
            icon: WalletIcon,
            title: 'Submit Address',
            description: 'Enter any Solana wallet address to begin analysis',
            gradient: 'from-purple-500/20 via-violet-500/20 to-indigo-500/20',
        },
        {
            icon: BrainIcon,
            title: 'AI Processing',
            description:
                'Our AI analyzes on-chain data and transaction patterns',
            gradient: 'from-cyan-500/20 via-blue-500/20 to-purple-500/20',
        },
        {
            icon: ChartBarIcon,
            title: 'View Insights',
            description: 'Get detailed metrics and AI-powered recommendations',
            gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
        },
    ];

    return (
        <section className="relative overflow-hidden py-24">
            {/* AI-themed background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/10 blur-3xl delay-1000" />
            </div>

            <div className="mx-auto max-w-6xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center">
                    <Badge
                        variant="outline"
                        className="mb-4 border-purple-500/20">
                        <ActivityIcon className="mr-2 h-4 w-4 text-purple-500" />
                        How It Works
                    </Badge>

                    <h2 className="mt-4 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-4xl font-bold text-transparent">
                        AI-Powered Analysis Pipeline
                    </h2>

                    <p className="mt-4 text-lg text-muted-foreground">
                        Experience the future of blockchain analytics
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid gap-8 md:grid-cols-3">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 },
                            }}>
                            <Card className="relative h-full overflow-hidden border border-white/10 bg-black/50 p-6 backdrop-blur-xl">
                                {/* Animated gradient background */}
                                <div
                                    className={`absolute inset-0 -z-10 bg-gradient-to-br ${step.gradient} animate-gradient opacity-20`}
                                />

                                {/* Glowing orb effect */}
                                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-2xl" />

                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    whileInView={{ scale: 1 }}
                                    className="mb-4 inline-flex rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                                    <step.icon className="h-6 w-6 text-purple-400" />
                                </motion.div>

                                <motion.h3
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    className="mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-xl font-semibold text-transparent">
                                    {step.title}
                                </motion.h3>

                                <p className="text-sm text-muted-foreground">
                                    {step.description}
                                </p>

                                {/* Animated border effect */}
                                <div
                                    className="absolute inset-0 rounded-xl border border-white/10 opacity-20 [background:linear-gradient(var(--border-angle),var(--primary),var(--secondary)_50%,var(--primary))] [mask-composite:exclude] [mask:linear-gradient(white,white)_padding-box,linear-gradient(white,white)]"
                                    style={
                                        {
                                            '--border-angle': '0deg',
                                        } as React.CSSProperties
                                    }
                                />
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default AIProcessSection;
