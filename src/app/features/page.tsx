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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { FeatureRelease } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockFeatureReleases: FeatureRelease[] = [
  { id: "fr1", competitorName: "AI Solutions Inc.", date: "2023-10-15T00:00:00Z", featureName: "New Dashboard UI", scope: "major", description: "Revamped user interface for better experience." },
  { id: "fr2", competitorName: "Innovate AI Corp.", date: "2023-10-20T00:00:00Z", featureName: "Salesforce Integration", scope: "major", description: "Connect with Salesforce data." },
  { id: "fr3", competitorName: "AI Solutions Inc.", date: "2023-09-28T00:00:00Z", featureName: "API Performance Boost", scope: "minor", description: "Improved API response times by 20%." },
  { id: "fr4", competitorName: "FutureAI Ltd.", date: "2023-10-05T00:00:00Z", featureName: "New Language Support: Spanish", scope: "minor", description: "Added Spanish language support to NLP engine." },
  { id: "fr5", competitorName: "AI Solutions Inc.", date: "2023-08-10T00:00:00Z", featureName: "Image Recognition V2", scope: "major", description: "Upgraded image recognition model." },
  { id: "fr6", competitorName: "Innovate AI Corp.", date: "2023-09-01T00:00:00Z", featureName: "Chatbot Analytics", scope: "new_product", description: "Analytics dashboard for chatbot performance." },
];

// Aggregate data for chart: count features per competitor per month
const getMonthlyFeatureData = (releases: FeatureRelease[]) => {
  const monthlyData: { [monthYear: string]: { name: string; [competitor: string]: number } } = {};

  releases.forEach(release => {
    const date = new Date(release.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { name: monthYear };
    }
    monthlyData[monthYear][release.competitorName] = (monthlyData[monthYear][release.competitorName] || 0) + 1;
  });

  return Object.values(monthlyData).sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
};

const aggregatedFeatureData = getMonthlyFeatureData(mockFeatureReleases);

const competitorNames = Array.from(new Set(mockFeatureReleases.map(r => r.competitorName)));

const chartConfig = competitorNames.reduce((acc, name, index) => {
  acc[name] = {
    label: name,
    color: `hsl(var(--chart-${(index % 5) + 1}))`,
  };
  return acc;
}, {} as ChartConfig);


export default function FeaturesPage() {
  const [visibleReleases, setVisibleReleases] = React.useState(5);
  const sortedReleases = React.useMemo(() => 
    [...mockFeatureReleases].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), 
  []);

  return (
    <>
      <Header title="Feature Velocity Tracker" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Monthly Feature Releases by Competitor</CardTitle>
            <CardDescription>
              Track the number of new features released each month by key competitors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={aggregatedFeatureData} 
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                  accessibilityLayer
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
                  <YAxis allowDecimals={false} stroke="hsl(var(--foreground))" />
                  <Tooltip 
                    cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                    content={<ChartTooltipContent />} 
                  />
                  <Legend content={<ChartLegendContent />} />
                  {competitorNames.map(name => (
                    <Bar key={name} dataKey={name} fill={chartConfig[name].color} radius={[4, 4, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Recent Feature Releases</CardTitle>
            <CardDescription>Detailed list of the latest features launched by competitors.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Competitor</TableHead>
                  <TableHead>Feature</TableHead>
                  <TableHead>Scope</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedReleases.slice(0, visibleReleases).map((release) => (
                  <TableRow key={release.id}>
                    <TableCell>{new Date(release.date).toLocaleDateString()}</TableCell>
                    <TableCell>{release.competitorName}</TableCell>
                    <TableCell className="font-medium">{release.featureName}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={release.scope === 'major' || release.scope === 'new_product' ? 'default' : 'secondary'}
                        className={
                          release.scope === 'major' ? 'bg-primary/80 hover:bg-primary' : 
                          release.scope === 'new_product' ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''
                        }
                      >
                        {release.scope.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{release.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {visibleReleases < sortedReleases.length && (
              <div className="mt-4 text-center">
                <Button variant="outline" onClick={() => setVisibleReleases(prev => prev + 5)}>
                  Load More
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
