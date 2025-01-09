"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function BalanceCard({ SOLBalance }: { SOLBalance: number }) {
  const [solToUsdRate, setSolToUsdRate] = useState<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    const fetchConversionRate = async () => {
      const now = new Date().getTime();

      const cachedRate = localStorage.getItem("solToUsdRate");
      const cachedTimestamp = localStorage.getItem("solToUsdRateTimestamp");

      if (cachedRate && cachedTimestamp) {
        const oneHour = 60 * 60 * 1000;
        const lastFetched = parseInt(cachedTimestamp, 10);

        if (now - lastFetched < oneHour) {
          setSolToUsdRate(parseFloat(cachedRate));
          return;
        }
      }

      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data = await response.json();
        const rate = data.solana.usd;

        localStorage.setItem("solToUsdRate", rate.toString());
        localStorage.setItem("solToUsdRateTimestamp", now.toString());

        setSolToUsdRate(rate);
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
      }
    };

    fetchConversionRate();
  }, []);

  return (
    <Card
      className={cn(
        "min-w-[300px] min-h-[250px] lg:min-h-fit card bg-slate-900 rounded-xl border-slate-800"
      )}
    >
      <CardHeader>
        <CardTitle className="text-gray-200">Balance</CardTitle>
        <CardDescription className="text-gray-400">
          Current balance in your wallet
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-3">
        <div className="flex h-full items-center justify-between">
          <div className="text-4xl font-semibold text-gray-100">
            {SOLBalance.toFixed(2)} SOL
          </div>
          <div className="text-sm text-gray-400">
            ≈ ${(SOLBalance * solToUsdRate).toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}