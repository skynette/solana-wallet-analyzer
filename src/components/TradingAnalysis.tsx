import React, { useCallback, useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { BrainIcon, SparklesIcon } from 'lucide-react';

import { BorderBeam } from '@/components/ui/border-beam';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TypewriterText from './TextFormatting';

interface TradingAnalysisProps {
    transactions: any[];
    address: string;
    tokens?: any[];
}

interface AnalysisResponse {
    analysis: string;
}

const TradingAnalysis: React.FC<TradingAnalysisProps> = ({
    transactions,
    address,
    tokens = [],
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasRequested, setHasRequested] = useState(false);

    const fetchAnalysis = useCallback(async () => {
        if (!transactions.length || hasRequested) return;

        try {
            setIsLoading(true);
            setHasRequested(true);

            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    transactions,
                    tokens,
                    address,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch analysis');
            }

            const data = await response.json();
            setAnalysis(data);
        } catch (err) {
            console.error('Error fetching analysis:', err);
            setError('Failed to generate analysis');
        } finally {
            setIsLoading(false);
        }
    }, [transactions, tokens, address, hasRequested]);

    useEffect(() => {
        if (transactions.length > 0 && !hasRequested) {
            fetchAnalysis();
        }
    }, [fetchAnalysis, transactions.length, hasRequested]);

    if (error) {
        return (
            <Card className="relative overflow-hidden">
                <CardContent className="p-6 text-red-500">{error}</CardContent>
            </Card>
        );
    }

    if (isLoading || !analysis) {
        return (
            <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                        <BrainIcon className="h-6 w-6 animate-pulse text-primary" />
                        <span className="text-sm">
                            Generating AI analysis...
                        </span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <Card className="relative overflow-hidden">
                {isHovered && (
                    <BorderBeam
                        size={400}
                        duration={15}
                        colorFrom="#4f46e5"
                        colorTo="#8b5cf6"
                        borderWidth={1.5}
                    />
                )}
                <CardHeader className="relative">
                    <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}>
                        <BrainIcon className="h-6 w-6 animate-pulse text-primary" />
                        <CardTitle className="bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-transparent">
                            AI Trading Analysis
                        </CardTitle>
                        <SparklesIcon className="h-6 w-6 animate-pulse text-primary" />
                    </motion.div>
                </CardHeader>
                <CardContent>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative rounded-lg border border-primary/10 bg-card/50 p-6 backdrop-blur-sm">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <TypewriterText
                                text={analysis.analysis}
                                delay={500}
                            />
                        </div>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default TradingAnalysis;
