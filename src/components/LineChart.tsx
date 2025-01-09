import React, { useState } from 'react';

import {
    CategoryScale,
    Chart as ChartJS,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { motion } from 'framer-motion';
import { SparklesIcon, TrendingUpIcon } from 'lucide-react';
import { Line } from 'react-chartjs-2';

import { BorderBeam } from '@/components/ui/border-beam';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Title,
);

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const LineChart = ({
    data,
}: {
    data: Array<{ time: string; balance: number }>;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const gradientBackground = {
        id: 'gradientFill',
        beforeDatasetsDraw(chart: any) {
            const {
                ctx,
                chartArea: { top, bottom, left, right },
            } = chart;
            const gradientFill = ctx.createLinearGradient(0, top, 0, bottom);
            gradientFill.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
            gradientFill.addColorStop(1, 'rgba(139, 92, 246, 0.05)');

            ctx.save();
            ctx.fillStyle = gradientFill;
            ctx.fillRect(left, top, right - left, bottom - top);
            ctx.restore();
        },
    };

    const chartData = {
        labels: data.map((point) => formatDate(point.time)),
        datasets: [
            {
                label: 'Balance',
                data: data.map((point) => point.balance),
                fill: true,
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: 'rgb(139, 92, 246)',
                pointBorderColor: 'rgb(99, 102, 241)',
                pointHoverRadius: 6,
                pointHoverBackgroundColor: 'rgb(99, 102, 241)',
                pointHoverBorderColor: 'white',
                pointHoverBorderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
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
                displayColors: false,
                callbacks: {
                    label: function (context: any) {
                        return ` Balance: ${context.raw.toFixed(2)} SOL`;
                    },
                },
            },
            gradientBackground,
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.5)',
                    font: {
                        size: 11,
                    },
                },
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    drawBorder: false,
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.5)',
                    font: {
                        size: 11,
                    },
                    callback: function (value: any) {
                        return value + ' SOL';
                    },
                },
            },
        },
    };

    return (
        <motion.div
            className="relative h-full w-full p-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            {isHovered && (
                <BorderBeam
                    size={400}
                    duration={15}
                    colorFrom="#4f46e5"
                    colorTo="#8b5cf6"
                    borderWidth={1.5}
                />
            )}
            <div className="mb-4 flex items-center gap-2">
                <TrendingUpIcon className="h-5 w-5 animate-pulse text-primary" />
                <h3 className="bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-lg font-semibold text-transparent">
                    Balance History
                </h3>
                <SparklesIcon className="h-5 w-5 animate-pulse text-primary" />
            </div>
            <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}>
                <Line data={chartData} options={options} />
            </motion.div>
        </motion.div>
    );
};

export default LineChart;
