import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Connection, PublicKey } from '@solana/web3.js';
import { motion } from 'framer-motion';
import { SearchIcon, SparklesIcon, WalletIcon } from 'lucide-react';
import Moralis from 'moralis';

import BalanceCard from '@/components/balanceCard';
import BlurFade from '@/components/ui/blur-fade';
import { BorderBeam } from '@/components/ui/border-beam';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { Skeleton } from '@/components/ui/skeleton';

import LineChart from './LineChart';
import PieChart from './PieChart';
import TradingAnalysis from './TradingAnalysis';
import TokensTable from './tokens/tokens-table';
import TransactionTable from './transactions/transaction-table';

const solConversionFactor = 1e9;

interface WalletSearchProps {
    initialAddress?: string;
}

const WalletSearch = ({ initialAddress = '' }: WalletSearchProps) => {
    const [address, setAddress] = useState<string>(initialAddress);
    const [balance, setBalance] = useState<number | null>(null);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [tokens, setTokens] = useState<any[]>([]);
    const [historicalData, setHistoricalData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [connection, setConnection] = useState<Connection | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (initialAddress) {
            fetchWalletData();
        }
    }, [initialAddress]);

    useEffect(() => {
        const initConnectionAndMoralis = async () => {
            const conn = new Connection(
                'https://solana-mainnet.g.alchemy.com/v2/nsjz8GePUTlhMXvz2YcB-F7gR5COI5bc',
                //   process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
            );
            setConnection(conn);

            await Moralis.start({
                apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImZmZGY3NTIzLWNlYWQtNDljMS04ODJiLTg2ODM5NDZiYTI0YiIsIm9yZ0lkIjoiNDI0NDgzIiwidXNlcklkIjoiNDM2NTY5IiwidHlwZUlkIjoiMmYxOWRiNjUtYmY1OC00OTRkLTk3ZGQtNzVkNDMxMjkyMzBmIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MzYyNjcwMzYsImV4cCI6NDg5MjAyNzAzNn0.cEzWJ1ohVexHBXSenDCzB1hkTbreDgoeDsJZ026tG5o',
                            // apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
            });
        };

        initConnectionAndMoralis();
    }, []);

    const fetchWalletData = async () => {
        if (!connection || !address) return;

        setLoading(true);
        setError(null);

        try {
            const publicKey = new PublicKey(address.trim());

            // Get Portfolio data from Moralis
            const portfolioResponse = await Moralis.SolApi.account.getPortfolio(
                {
                    network: 'mainnet',
                    address: address.trim(),
                },
            );

            const portfolioData = portfolioResponse.toJSON();

            // Set native SOL balance (convert from lamports to SOL)
            const solBalance = parseFloat(portfolioData.nativeBalance.solana);
            setBalance(solBalance);

            // Set token balances
            const tokenData = portfolioData.tokens.map((token: any) => ({
                ...token,
                name: token.name || 'Unknown Token',
                symbol: token.symbol || '-',
                amount: parseFloat(token.amount),
                associatedTokenAddress: token.associatedTokenAddress,
                mint: token.mint,
                decimals: token.decimals,
            }));
            setTokens(tokenData);

            // Fetch recent transactions
            const signatures = await connection.getSignaturesForAddress(
                publicKey,
                { limit: 30 },
            );

            const transactionDetailsPromises = signatures.map(
                async (signatureInfo) => {
                    const transaction = await connection.getTransaction(
                        signatureInfo.signature,
                        {
                            maxSupportedTransactionVersion: 2,
                        },
                    );
                    return transaction;
                },
            );

            const transactions = (
                await Promise.all(transactionDetailsPromises)
            ).filter((tx) => tx !== null);
            setTransactions(transactions);

            const historicalBalances = calculateHistoricalBalances(
                transactions,
                solBalance,
            );
            setHistoricalData(historicalBalances);
        } catch (err) {
            console.error('Error fetching wallet data:', err);
            setError(
                'Failed to fetch wallet data. Please check the address and try again.',
            );
            setBalance(null);
            setTokens([]);
            setTransactions([]);
            setHistoricalData([]);
        } finally {
            setLoading(false);
        }
    };

    const calculateHistoricalBalances = (
        transactions: any[],
        currentBalance: number,
    ) => {
        const balanceHistory = [];
        let runningBalance = currentBalance;

        const sortedTransactions = transactions
            .filter((tx) => tx !== null && tx.blockTime)
            .sort((a, b) => b.blockTime - a.blockTime);

        for (const transaction of sortedTransactions) {
            const { meta, blockTime } = transaction;
            const preBalance = meta.preBalances[0] / solConversionFactor;
            const postBalance = meta.postBalances[0] / solConversionFactor;
            const balanceChange = postBalance - preBalance;

            runningBalance -= balanceChange;
            balanceHistory.push({
                time: new Date(blockTime * 1000).toISOString(),
                balance: runningBalance,
            });
        }

        return balanceHistory.reverse();
    };

    return (
        <div className="mx-auto my-8 w-11/12 md:w-10/12 lg:w-9/12 xl:w-2/3">
            {/* Search Bar */}
            <BlurFade delay={0.1}>
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}>
                    <motion.div
                        className="mx-auto flex max-w-xl flex-col gap-3"
                        whileHover={{ scale: 1.02 }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}>
                        <div className="mb-4 text-center">
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/50 px-4 py-2 backdrop-blur-sm">
                                <SparklesIcon className="h-4 w-4 animate-pulse text-primary" />
                                <span className="bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-sm font-medium text-transparent">
                                    Analyze Another Wallet
                                </span>
                                <SparklesIcon className="h-4 w-4 animate-pulse text-primary" />
                            </motion.div>
                        </div>
                        <div className="relative flex gap-2">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter Solana wallet address"
                                    className="h-12 w-full rounded-lg border border-border bg-background/80 px-4 pr-12 text-sm backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                <WalletIcon className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary transition-colors" />
                            </div>
                            <RainbowButton
                                onClick={fetchWalletData}
                                className="h-12 px-6 text-base transition-all duration-300 hover:scale-105">
                                <SearchIcon className="h-4 w-4" />
                            </RainbowButton>
                        </div>
                        {error && (
                            <p className="text-center text-sm text-red-500">
                                {error}
                            </p>
                        )}
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
                </motion.div>
            </BlurFade>

            {/* Content */}
            {!loading && !error && balance === null && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-24 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-clip-text text-center text-2xl text-transparent">
                    Enter a wallet address to get started
                </motion.p>
            )}

            {loading ? (
                <div className="mt-8 space-y-4">
                    <Skeleton className="h-[250px] w-full" />
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <Skeleton className="h-[250px] w-full" />
                        <Skeleton className="h-[250px] w-full" />
                    </div>
                </div>
            ) : (
                balance !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 space-y-4">
                        {/* Balance Cards Row */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="flex flex-col gap-6">
                                <div className="h-[250px]">
                                    <BalanceCard SOLBalance={balance} />
                                </div>
                                <div className="h-[350px]">
                                    <PieChart tokens={tokens} />
                                </div>
                            </div>
                            {/* Line Chart */}
                            {historicalData.length > 0 ? (
                                <Card className="h-[620px]">
                                    <CardHeader>
                                        <CardTitle>Balance Over Time</CardTitle>
                                        <CardDescription>
                                            Historical balance changes
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="h-[520px]">
                                        <LineChart data={historicalData} />
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card className="h-full">
                                    <CardHeader>
                                        <CardTitle>Balance Over Time</CardTitle>
                                        <CardDescription>
                                            No historical data available
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex h-full flex-col items-center justify-center">
                                        <Image
                                            src="/no-data-illustration.png"
                                            alt="No data"
                                            width={200}
                                            height={200}
                                        />
                                        <p className="mt-4 text-sm text-muted-foreground">
                                            No historical data available for
                                            this wallet
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Transactions and Analysis */}
                        {transactions.length > 0 && (
                            <>
                                <TradingAnalysis
                                    transactions={transactions}
                                    address={address}
                                />
                                <TransactionTable
                                    transactions={transactions}
                                    address={address}
                                />
                            </>
                        )}

                        {/* Tokens Table */}
                        {tokens.length > 0 && (
                            <div className="mt-4">
                                <TokensTable tokens={tokens} />
                            </div>
                        )}
                    </motion.div>
                )
            )}
        </div>
    );
};

export default WalletSearch;