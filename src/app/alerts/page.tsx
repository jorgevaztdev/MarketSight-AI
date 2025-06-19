"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { detectSignificantChanges, DetectSignificantChangesInput, ChangeType } from "@/ai/flows/detect-significant-changes";
import type { AlertInfo } from "@/types";
import { Loader2, AlertTriangle, CheckCircle2, Info, Wand2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockAlerts: AlertInfo[] = [
  { id: "alert1", timestamp: new Date(Date.now() - 86400000).toISOString(), competitorName: "AI Solutions Inc.", changeType: "PRICE", summary: "Pro plan increased by $10/mo.", significance: "High", details: "Previous price: $199/mo, New Price: $209/mo" },
  { id: "alert2", timestamp: new Date(Date.now() - 172800000).toISOString(), competitorName: "Innovate AI Corp.", changeType: "FEATURE", summary: "Launched new Salesforce integration.", significance: "Medium", details: "New major feature added to Plus and Enterprise plans." },
  { id: "alert3", timestamp: new Date(Date.now() - 259200000).toISOString(), competitorName: "FutureAI Ltd.", changeType: "RELEASE_NOTE", summary: "Version 3.2 released with minor UI tweaks.", significance: "Low", details: "Focus on bug fixes and small usability improvements." },
];

export default function AlertsPage() {
  const [competitorName, setCompetitorName] = React.useState("");
  const [competitorUrl, setCompetitorUrl] = React.useState("");
  const [changeType, setChangeType] = React.useState<ChangeType | undefined>(undefined);
  const [details, setDetails] = React.useState("");
  const [context, setContext] = React.useState("");

  const [analysisResult, setAnalysisResult] = React.useState<{ isSignificant: boolean; reason: string } | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!competitorName || !competitorUrl || !changeType || !details) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields to analyze significance.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const input: DetectSignificantChangesInput = {
        competitorData: {
          name: competitorName,
          url: competitorUrl,
          changeType: changeType,
          details: details,
        },
        context: context || undefined,
      };
      const result = await detectSignificantChanges(input);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error detecting significant changes:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not assess change significance. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const SignificanceIcon = analysisResult?.isSignificant ? AlertTriangle : CheckCircle2;
  const significanceColor = analysisResult?.isSignificant ? "text-destructive" : "text-green-500";

  return (
    <>
      <Header title="Smart Alerts" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Assess Change Significance</CardTitle>
            <CardDescription>
              Simulate a detected change and use AI to determine its market significance.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="competitorName">Competitor Name*</Label>
                  <Input id="competitorName" value={competitorName} onChange={(e) => setCompetitorName(e.target.value)} placeholder="e.g., AI Solutions Inc." required />
                </div>
                <div>
                  <Label htmlFor="competitorUrl">Competitor URL*</Label>
                  <Input id="competitorUrl" type="url" value={competitorUrl} onChange={(e) => setCompetitorUrl(e.target.value)} placeholder="https://competitor.example.com" required />
                </div>
              </div>
              <div>
                <Label htmlFor="changeType">Change Type*</Label>
                <Select onValueChange={(value: ChangeType) => setChangeType(value)} value={changeType}>
                  <SelectTrigger id="changeType" aria-label="Select change type">
                    <SelectValue placeholder="Select change type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRICE">Price Change</SelectItem>
                    <SelectItem value="FEATURE">Feature Update</SelectItem>
                    <SelectItem value="RELEASE_NOTE">New Release Note</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="details">Change Details*</Label>
                <Textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Describe the change. E.g., 'Pro plan price increased from $99 to $129.' or 'Added new AI summarization feature.'" required />
              </div>
              <div>
                <Label htmlFor="context">Market Context (Optional)</Label>
                <Textarea id="context" value={context} onChange={(e) => setContext(e.target.value)} placeholder="Any relevant market context, e.g., 'Our main competitor just launched a similar feature last week.'" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto group">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                )}
                Assess Significance
              </Button>
            </CardFooter>
          </form>
        </Card>

        {analysisResult && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <SignificanceIcon className={`h-6 w-6 ${significanceColor}`} />
                Significance Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className={`text-lg font-semibold ${significanceColor}`}>
                This change is considered {analysisResult.isSignificant ? "SIGNIFICANT" : "NOT SIGNIFICANT"}.
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Reason:</span> {analysisResult.reason}
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Past Alerts</CardTitle>
                <CardDescription>History of significant competitor changes detected.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Competitor</TableHead>
                            <TableHead>Change Type</TableHead>
                            <TableHead>Summary</TableHead>
                            <TableHead>Significance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockAlerts.map(alert => (
                            <TableRow key={alert.id}>
                                <TableCell className="text-xs">{new Date(alert.timestamp).toLocaleDateString()}</TableCell>
                                <TableCell>{alert.competitorName}</TableCell>
                                <TableCell><Badge variant="outline">{alert.changeType}</Badge></TableCell>
                                <TableCell className="text-sm">{alert.summary}</TableCell>
                                <TableCell>
                                    <Badge variant={alert.significance === "High" ? "destructive" : alert.significance === "Medium" ? "default" : "secondary"}
                                      className={alert.significance === "Medium" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/30" : ""}>
                                        {alert.significance}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                         {mockAlerts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground">No past alerts.</TableCell>
                            </TableRow>
                         )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

      </main>
    </>
  );
}
