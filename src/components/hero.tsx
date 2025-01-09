import React, { useState } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';
import { BrainIcon, Sparkles, SparklesIcon, WalletIcon } from 'lucide-react';

import AnimatedShinyText from '@/components/ui/animated-shiny-text';
import BlurFade from '@/components/ui/blur-fade';
import { BorderBeam } from '@/components/ui/border-beam';
import { RainbowButton } from '@/components/ui/rainbow-button';

interface WalletInputProps {
    onSubmit: (address: string) => void;
}

const WalletInput: React.FC<WalletInputProps> = ({ onSubmit }) => {
    const [address, setAddress] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        console.log('subnit clicked');
        e.preventDefault();
        setError('');

        // Validate address format
        if (!address) {
            setError('Please enter a wallet address');
            return;
        }

        if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) {
            setError('Invalid Solana wallet address format');
            return;
        }

        onSubmit(address.trim());
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="w-full max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}>
            <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}>
                <div className="flex flex-col gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Enter Solana wallet address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={`h-12 w-full rounded-lg border ${error ? 'border-red-500' : 'border-border'
                                } bg-background/80 px-4 pr-12 text-sm backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                        />
                        <WalletIcon className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary transition-colors" />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <RainbowButton
                        type="submit"
                        className="h-12 px-6 text-base transition-all duration-300 hover:scale-105">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Analyze
                    </RainbowButton>
                </div>
                {isHovered && (
                    <BorderBeam
                        size={300}
                        duration={10}
                        colorFrom="#4f46e5"
                        colorTo="#8b5cf6"
                        borderWidth={1.5}
                    />
                )}
            </motion.div>
        </motion.form>
    );
};

interface StatsCardProps {
    label: string;
    value: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative overflow-hidden rounded-xl border bg-card/50 p-6 backdrop-blur-sm">
            {isHovered && (
                <BorderBeam
                    size={200}
                    duration={10}
                    colorFrom="#6366f1"
                    colorTo="#ec4899"
                    borderWidth={1.5}
                    delay={2}
                />
            )}
            <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-secondary/5"
                animate={{ opacity: isHovered ? 0.3 : 0 }}
                transition={{ duration: 0.3 }}
            />
            <motion.h3
                className="bg-gradient-to-r from-primary via-purple-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 300 }}>
                {value}
            </motion.h3>
            <span className="bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
                {label}
            </span>
        </motion.div>
    );
};

const MetricsPreview = () => {
    return (
        <div className="mt-12 grid w-full gap-4 md:grid-cols-2">
            <StatsCard label="Wallets Analyzed" value="50K+" />
            <StatsCard label="SOL Tracked" value="2M+" />
        </div>
    );
};

interface HeroProps {
    handleLogin: (address: string) => void;
}

const Hero: React.FC<HeroProps> = ({ handleLogin }) => (
    <section className="relative pt-24">
        <div className="mx-auto grid max-w-screen-xl gap-8 px-4 md:gap-12 lg:grid-cols-2 lg:gap-16 lg:px-6">
            {/* Left column - Content */}
            <BlurFade
                delay={0.3}
                className="relative flex flex-col justify-center">
                <div className="mb-8">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/50 px-4 py-2 backdrop-blur-sm">
                        <BrainIcon className="h-4 w-4 animate-pulse text-primary" />
                        <span className="bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-sm font-medium text-transparent">
                            Solana AI Analytics
                        </span>
                        <SparklesIcon className="h-4 w-4 animate-pulse text-primary" />
                    </motion.div>
                </div>

                <div className="relative z-10">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                        <span className="block bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                            Analyze Any
                        </span>
                        <AnimatedShinyText>
                            <span className="bg-gradient-to-r from-primary via-purple-400 to-blue-500 bg-clip-text text-transparent">
                                Solana Wallet
                            </span>
                        </AnimatedShinyText>
                        <span className="block bg-gradient-to-r from-white/80 via-white/90 to-white bg-clip-text text-transparent">
                            With AI Insights
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-clip-text text-base text-transparent sm:text-lg">
                        Enter any Solana wallet address to get detailed
                        AI-powered analytics, transaction history, and
                        performance metrics. Powered by advanced on-chain
                        analysis.
                    </p>

                    <div className="mt-10">
                        <WalletInput onSubmit={handleLogin} />
                    </div>
                </div>

                <MetricsPreview />
            </BlurFade>

            {/* Right column - Banner Image */}
            <BlurFade
                delay={0.4}
                className="relative flex min-h-[400px] items-center justify-center lg:min-h-[600px]">
                <div className="relative w-full">
                    {/* Main banner container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="relative z-10 overflow-hidden rounded-2xl border border-primary/20 bg-card/30 shadow-2xl backdrop-blur-sm">
                        {/* Image container with aspect ratio */}
                        <div className="relative aspect-[4/3] w-full">
                            <Image
                                src="/banner.png"
                                alt="AI Analytics Dashboard"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                className="object-contain"
                                priority
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20" />
                        </div>
                        <BorderBeam
                            size={400}
                            duration={15}
                            colorFrom="#6366f1"
                            colorTo="#ec4899"
                            borderWidth={1.5}
                        />
                    </motion.div>

                    {/* Floating feature cards */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="absolute -right-4 top-8 z-20 w-64 max-w-[calc(100%-2rem)] overflow-hidden rounded-xl border bg-card/50 p-4 backdrop-blur-sm">
                        <h3 className="text-lg font-semibold text-primary">
                            Live Analytics
                        </h3>
                        <p className="mt-1 text-sm text-gray-300">
                            Real-time wallet analysis
                        </p>
                        <BorderBeam
                            size={200}
                            duration={10}
                            colorFrom="#6366f1"
                            colorTo="#ec4899"
                            borderWidth={1.5}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="absolute -left-4 bottom-8 z-20 w-64 max-w-[calc(100%-2rem)] overflow-hidden rounded-xl border bg-card/50 p-4 backdrop-blur-sm">
                        <h3 className="text-lg font-semibold text-primary">
                            AI Insights
                        </h3>
                        <p className="mt-1 text-sm text-gray-300">
                            Smart pattern detection
                        </p>
                        <BorderBeam
                            size={200}
                            duration={10}
                            colorFrom="#8b5cf6"
                            colorTo="#3b82f6"
                            borderWidth={1.5}
                        />
                    </motion.div>
                </div>
            </BlurFade>
        </div>
    </section>
);

export default Hero;