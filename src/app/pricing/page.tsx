"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { PricingDataPoint } from "@/types";

const mockPricingData: PricingDataPoint[] = [
  { date: "Jan 2023", "AI Solutions Inc.": 199, "Innovate AI Corp.": 99, "FutureAI Ltd.": 149 },
  { date: "Feb 2023", "AI Solutions Inc.": 199, "Innovate AI Corp.": 99, "FutureAI Ltd.": 149 },
  { date: "Mar 2023", "AI Solutions Inc.": 209, "Innovate AI Corp.": 99, "FutureAI Ltd.": 159 },
  { date: "Apr 2023", "AI Solutions Inc.": 209, "Innovate AI Corp.": 109, "FutureAI Ltd.": 159 },
  { date: "May 2023", "AI Solutions Inc.": 209, "Innovate AI Corp.": 109, "FutureAI Ltd.": 159 },
  { date: "Jun 2023", "AI Solutions Inc.": 219, "Innovate AI Corp.": 109, "FutureAI Ltd.": 169 },
  { date: "Jul 2023", "AI Solutions Inc.": 219, "Innovate AI Corp.": 119, "FutureAI Ltd.": 169 },
  { date: "Aug 2023", "AI Solutions Inc.": 219, "Innovate AI Corp.": 119, "FutureAI Ltd.": 169 },
];

const chartConfig = {
  "AI Solutions Inc.": {
    label: "AI Solutions Inc.",
    color: "hsl(var(--chart-1))",
  },
  "Innovate AI Corp.": {
    label: "Innovate AI Corp.",
    color: "hsl(var(--chart-2))",
  },
  "FutureAI Ltd.": {
    label: "FutureAI Ltd.",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function PricingPage() {
  return (
    <>
      <Header title="Pricing Timeline" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Competitor Pricing Trends (Pro Tier)</CardTitle>
            <CardDescription>
              Interactive chart showing how Pro tier (or equivalent) pricing has changed over time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockPricingData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                  accessibilityLayer
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    stroke="hsl(var(--foreground))"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `$${value}`}
                    stroke="hsl(var(--foreground))"
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Legend content={<ChartLegendContent />} />
                  {Object.keys(chartConfig).map((key) => (
                    <Line
                      key={key}
                      dataKey={key}
                      type="monotone"
                      stroke={chartConfig[key as keyof typeof chartConfig].color}
                      strokeWidth={2}
                      dot={{
                        fill: chartConfig[key as keyof typeof chartConfig].color,
                        r: 4,
                      }}
                      activeDot={{
                        r: 6,
                      }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
