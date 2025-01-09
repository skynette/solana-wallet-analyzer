import React, { useState } from 'react';

import { ArcElement, Chart as ChartJS, Title, Tooltip } from 'chart.js';
import { motion } from 'framer-motion';
import { DatabaseIcon, SparklesIcon } from 'lucide-react';
import { Pie } from 'react-chartjs-2';

import { BorderBeam } from '@/components/ui/border-beam';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

ChartJS.register(ArcElement, Tooltip, Title);

const PieChart = ({ tokens }: { tokens: Array<any> }) => {
    const [isHovered, setIsHovered] = useState(false);

    const gradientColors = [
        'from-blue-500 to-indigo-500',
        'from-purple-500 to-pink-500',
        'from-green-500 to-emerald-500',
        'from-yellow-500 to-orange-500',
        'from-pink-500 to-rose-500',
        'from-indigo-500 to-purple-500',
    ];

    const data = {
        labels: tokens.map((token) => token.symbol),
        datasets: [
            {
                label: 'Token Distribution',
                data: tokens.map((token) => parseFloat(token.amount)),
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)', // Indigo
                    'rgba(139, 92, 246, 0.8)', // Purple
                    'rgba(236, 72, 153, 0.8)', // Pink
                    'rgba(59, 130, 246, 0.8)', // Blue
                    'rgba(147, 51, 234, 0.8)', // Violet
                    'rgba(79, 70, 229, 0.8)', // Deep Purple
                ],
                borderColor: 'rgba(30, 41, 59, 0.5)',
                borderWidth: 2,
                hoverBackgroundColor: [
                    'rgba(99, 102, 241, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(236, 72, 153, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(147, 51, 234, 1)',
                    'rgba(79, 70, 229, 1)',
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: 'rgba(255, 255, 255, 0.9)',
                bodyColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: 'rgba(99, 102, 241, 0.3)',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                displayColors: true,
                usePointStyle: true,
                callbacks: {
                    label: function (context: any) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return ` ${label}: ${value.toFixed(2)}`;
                    },
                },
            },
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative">
            <Card
                className={cn(
                    'relative overflow-hidden border border-primary/20 bg-card/50 backdrop-blur-sm',
                    'h-full min-h-[250px] w-full min-w-[250px]',
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                {isHovered && (
                    <BorderBeam
                        size={300}
                        duration={10}
                        colorFrom="#4f46e5"
                        colorTo="#8b5cf6"
                        borderWidth={1.5}
                    />
                )}
                <CardHeader className="relative">
                    <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}>
                        <DatabaseIcon className="h-5 w-5 animate-pulse text-primary" />
                        <CardTitle className="bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Token Distribution
                        </CardTitle>
                        <SparklesIcon className="h-5 w-5 animate-pulse text-primary" />
                    </motion.div>
                    <CardDescription className="text-muted-foreground">
                        {tokens.length === 0
                            ? 'No tokens found in the wallet'
                            : 'Distribution of tokens in the wallet'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {tokens.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-8">
                            <SparklesIcon className="mb-4 h-12 w-12 text-primary/40" />
                            <p className="text-center text-sm text-muted">
                                No tokens found in this wallet
                            </p>
                        </div>
                    ) : (
                        <motion.div
                            className="mx-auto h-[240px] w-[240px]"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}>
                            <Pie data={data} options={options} />
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default PieChart;
