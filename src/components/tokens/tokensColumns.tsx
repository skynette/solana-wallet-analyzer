import { ColumnDef } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { ExternalLinkIcon } from 'lucide-react';

export type Token = {
    name: string;
    mint: string;
    symbol: string;
    amount: string;
    value?: string;
};

export const tokenColumns: ColumnDef<Token>[] = [
    {
        accessorKey: 'name',
        header: 'Token Name',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <span className="font-medium text-primary">
                    {row.getValue('name') || 'Unknown Token'}
                </span>
            </div>
        ),
    },
    {
        accessorKey: 'mint',
        header: 'Mint Address',
        cell: ({ row }) => {
            const mint = row.getValue('mint') as string;
            return (
                <div className="flex items-center gap-2">
                    <a
                        className="group flex items-center gap-1 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
                        href={`https://explorer.solana.com/address/${mint}`}
                        target="_blank"
                        rel="noreferrer">
                        <span>{`${mint.substring(0, 4)}...${mint.substring(mint.length - 4)}`}</span>
                        <ExternalLinkIcon className="h-3 w-3 opacity-50 transition-all group-hover:opacity-100" />
                    </a>
                </div>
            );
        },
    },
    {
        accessorKey: 'symbol',
        header: 'Symbol',
        cell: ({ row }) => (
            <span className="rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary">
                {row.getValue('symbol') || '-'}
            </span>
        ),
    },
    {
        accessorKey: 'amount',
        header: 'Balance',
        cell: ({ row }) => (
            <div className="text-right font-medium">
                {parseFloat(row.getValue('amount')).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                })}
            </div>
        ),
    },
];

export const DataTableSkeleton = () => (
    <div className="space-y-3">
        <div className="h-8 w-full animate-pulse rounded-lg bg-primary/5" />
        {[...Array(5)].map((_, i) => (
            <div
                key={i}
                className="h-16 w-full animate-pulse rounded-lg bg-primary/5"
                style={{ animationDelay: `${i * 100}ms` }}
            />
        ))}
    </div>
);
