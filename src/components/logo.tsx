import Link from 'next/link';

import { cn } from '@/lib/utils';

import { DynamicImage } from './dynamic-image';
import { Pill } from 'lucide-react';
import { BorderBeam } from './ui/border-beam';
import { motion } from 'framer-motion';

export default function Logo({
    width = 100,
    height = width,
    className,
}: {
    width?: number;
    height?: number;
    className?: string;
}) {
    return (
        <DynamicImage
            lightSrc="/images/android-chrome-512x512.png"
            darkSrc="/images/android-chrome-512x512.png"
            alt="Logo"
            width={width}
            height={height}
            className={cn('select-none', className)}
        />
    );
}

interface BrandProps {
    className?: string;
}

export function Brand({ className }: BrandProps) {
    return (
        <Link href="https://pump.fun" className={className}>
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative flex items-center gap-2 p-2 rounded-xl bg-card/50 backdrop-blur-sm"
            >
                <div className="flex items-center gap-2 z-10">
                    <Logo width={32} />
                    {/* <Pill className="h-5 w-5" /> */}
                </div>
                <BorderBeam
                    size={200}
                    duration={10}
                    colorFrom="#8b5cf6"
                    colorTo="#3b82f6"
                    borderWidth={1.5}
                />
            </motion.div>
        </Link>
    );
}
