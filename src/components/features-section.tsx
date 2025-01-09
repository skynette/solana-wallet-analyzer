import { useRef } from 'react';

import { motion, useInView } from 'framer-motion';
import {
    ActivityIcon,
    BarChart3Icon,
    BrainIcon,
    ChartBarIcon,
    LucideIcon,
    RocketIcon,
    ShieldIcon,
    TrendingUpIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    gradient: string;
    delay?: number;
    className?: string;
}

const FeatureCard = ({
    title,
    description,
    icon: Icon,
    gradient,
    delay = 0,
    className,
}: FeatureCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className={cn('group relative', className)}>
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-black/50 to-black/10 p-6 backdrop-blur-xl">
            <div
                className={cn(
                    'absolute inset-0 -z-10 bg-gradient-to-br opacity-10 transition-opacity duration-500 group-hover:opacity-20',
                    gradient,
                )}
            />
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

            <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative z-10 flex flex-col items-center">
                <div className="mb-4 rounded-xl bg-white/5 p-3 ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/20">
                    <Icon className="h-6 w-6 text-purple-400 transition-colors group-hover:text-purple-300" />
                </div>
                <h3 className="mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-xl font-semibold text-transparent">
                    {title}
                </h3>
                <p className="text-center text-sm text-muted-foreground/80 transition-colors group-hover:text-muted-foreground">
                    {description}
                </p>
            </motion.div>
        </Card>
    </motion.div>
);

const MainFeature = ({
    title,
    description,
    icon: Icon,
    gradient,
    className,
}: FeatureCardProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={cn(
            'group relative overflow-hidden rounded-2xl border-0 bg-black/50 p-8 backdrop-blur-xl',
            className,
        )}>
        <div
            className={cn(
                'absolute inset-0 -z-10 bg-gradient-to-br opacity-20 transition-opacity duration-500 group-hover:opacity-30',
                gradient,
            )}
        />

        <div className="relative z-10">
            <div className="mb-6 inline-flex rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                <Icon className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent">
                {title}
            </h3>
            <p className="text-muted-foreground/90">{description}</p>
        </div>

        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
);

const Features = () => {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });

    const primaryFeatures = [
        {
            icon: BarChart3Icon,
            title: 'Predictive Analytics',
            description:
                'AI-powered price predictions and trend analysis for Solana assets',
            gradient: 'from-purple-600/20 via-pink-600/20 to-red-600/20',
        },
        {
            icon: ActivityIcon,
            title: 'Risk Assessment',
            description:
                'Real-time portfolio risk evaluation with smart alerts',
            gradient: 'from-blue-600/20 via-cyan-600/20 to-teal-600/20',
        },
        {
            icon: RocketIcon,
            title: 'Smart Suggestions',
            description:
                'Personalized investment recommendations based on your portfolio',
            gradient: 'from-emerald-600/20 via-green-600/20 to-lime-600/20',
        },
    ];

    return (
        <section ref={ref} className="relative py-24">
            {/* Background gradients */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/10 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute bottom-1/3 left-1/3 h-96 w-96 animate-pulse rounded-full bg-cyan-500/10 blur-3xl" />
            </div>

            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="mb-16 text-center">
                    <Badge
                        variant="outline"
                        className="mb-4 border-purple-500/20">
                        <BrainIcon className="mr-2 h-4 w-4 text-purple-500" />
                        AI-Powered Features
                    </Badge>

                    <h2 className="mt-4 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-4xl font-bold text-transparent">
                        Smart Crypto Analytics
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                        Leverage the power of artificial intelligence for
                        comprehensive portfolio analysis
                    </p>
                </motion.div>

                {/* Main Feature */}
                <MainFeature
                    icon={BrainIcon}
                    title="Advanced Solana Analytics"
                    description="Our AI analyzes every transaction, token transfer, and smart contract interaction on the Solana blockchain to provide comprehensive insights and actionable recommendations."
                    gradient="from-purple-600/20 via-violet-600/20 to-indigo-600/20"
                    className="mb-12"
                />

                {/* Feature Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {primaryFeatures.map((feature, idx) => (
                        <FeatureCard
                            key={idx}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            gradient={feature.gradient}
                            delay={idx * 0.1}
                        />
                    ))}
                </div>

                {/* Additional Features */}
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FeatureCard
                        icon={ShieldIcon}
                        title="Secure Analysis"
                        description="Read-only analysis of public blockchain data with no private keys or signatures required"
                        gradient="from-purple-600/20 via-violet-600/20 to-indigo-600/20"
                        className="sm:col-span-1"
                    />
                    <FeatureCard
                        icon={TrendingUpIcon}
                        title="Performance Tracking"
                        description="Track ROI, gas usage, trading performance, and portfolio value across all Solana tokens"
                        gradient="from-purple-600/20 via-violet-600/20 to-indigo-600/20"
                        className="sm:col-span-1"
                    />
                </div>
            </div>
        </section>
    );
};

export default Features;
