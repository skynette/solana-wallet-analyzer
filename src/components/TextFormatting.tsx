import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Components as MarkdownComponents } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TypewriterTextProps {
    text: string;
    delay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay = 0 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let currentText = '';
        let currentIndex = 0;
        let timeoutId: NodeJS.Timeout;
        let intervalId: NodeJS.Timeout;

        // eslint-disable-next-line prefer-const
        timeoutId = setTimeout(() => {
            intervalId = setInterval(() => {
                if (currentIndex < text.length) {
                    currentText += text[currentIndex];
                    setDisplayedText(currentText);
                    currentIndex++;
                } else {
                    clearInterval(intervalId);
                    setIsComplete(true);
                }
            }, 20);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [text, delay]);

    const components: Partial<MarkdownComponents> = {
        h1: ({ children }) => (
            <h1 className="mb-6 bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent">
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 className="mb-4 bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-xl font-bold text-transparent">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="mb-3 bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-lg font-bold text-transparent">
                {children}
            </h3>
        ),
        p: ({ children }) => (
            <p className="mb-4 leading-relaxed text-muted-foreground">
                {children}
            </p>
        ),
        ul: ({ children }) => <ul className="mb-4 space-y-2">{children}</ul>,
        li: ({ children }) => (
            <li className="flex items-start gap-2">
                <ChevronRight className="mt-1 h-4 w-4 text-primary" />
                <span>{children}</span>
            </li>
        ),
        strong: ({ children }) => (
            <strong className="font-semibold text-primary">{children}</strong>
        ),
        em: ({ children }) => (
            <em className="italic text-primary">{children}</em>
        ),
        blockquote: ({ children }) => (
            <blockquote className="mb-4 border-l-4 border-primary/50 pl-4 italic text-muted-foreground">
                {children}
            </blockquote>
        ),
        code: ({ inline, children }: { inline?: boolean; children?: React.ReactNode }) => {
            const content = children?.toString() || '';

            if (inline) {
                return (
                    <code className="rounded bg-primary/10 px-1 py-0.5 font-mono text-sm text-primary">
                        {content}
                    </code>
                );
            }

            return (
                <code className="block rounded-lg bg-primary/5 p-4 font-mono text-sm text-primary">
                    {content}
                </code>
            );
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${isComplete ? 'after:hidden' : 'after:animate-blink after:ml-1 after:content-["▋"]'}`}>
            <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={components}>
                    {displayedText}
                </ReactMarkdown>
            </div>
        </motion.div>
    );
};

export default TypewriterText;
