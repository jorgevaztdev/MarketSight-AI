import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { CompetitorScrapedData, Feature, PricingPlan, ReleaseNote } from "@/types";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

const mockCompetitorsData: CompetitorScrapedData[] = [
  {
    competitor: { id: "comp1", name: "AI Solutions Inc.", url: "https://aisolutions.example.com", logo: "https://placehold.co/100x40.png?text=AI+Solutions" },
    features: [
      { id: "f1", name: "Advanced NLP Engine", description: "Processes natural language with high accuracy.", category: "Core AI" },
      { id: "f2", name: "Image Recognition API", description: "Identifies objects and patterns in images.", category: "Vision" },
      { id: "f3", name: "Real-time Analytics", description: "Provides instant insights from data streams.", category: "Analytics" },
    ],
    pricingPlans: [
      { id: "p1", name: "Starter", price: "$49/mo", features: ["NLP Basic", "500 API Calls"], isPopular: false },
      { id: "p2", name: "Pro", price: "$199/mo", features: ["NLP Advanced", "Image Recognition", "2000 API Calls"], isPopular: true },
      { id: "p3", name: "Enterprise", price: "Contact Us", features: ["All Features", "Dedicated Support"], isPopular: false },
    ],
    releaseNotes: [
      { id: "rn1", version: "2.5.0", date: "2023-10-15T00:00:00Z", title: "New Dashboard UI", summary: "Revamped user interface for better experience." },
      { id: "rn2", version: "2.4.1", date: "2023-09-28T00:00:00Z", title: "API Performance Boost", summary: "Improved API response times by 20%." },
    ],
    lastScraped: new Date().toISOString(),
  },
  {
    competitor: { id: "comp2", name: "Innovate AI Corp.", url: "https://innovateai.example.com", logo: "https://placehold.co/100x40.png?text=InnovateAI" },
    features: [
      { id: "f4", name: "Predictive Modeling", description: "Forecasts future trends based on historical data.", category: "ML" },
      { id: "f5", name: "Chatbot Platform", description: "Build and deploy intelligent chatbots.", category: "Conversational AI" },
    ],
    pricingPlans: [
      { id: "p4", name: "Basic", price: "$29/mo", features: ["Chatbot Basic", "1000 Interactions"] },
      { id: "p5", name: "Plus", price: "$99/mo", features: ["Chatbot Advanced", "Predictive Modeling Lite", "5000 Interactions"], isPopular: true },
    ],
    releaseNotes: [
      { id: "rn3", version: "1.8.0", date: "2023-10-20T00:00:00Z", title: "New Integration: Salesforce", summary: "Seamlessly connect with your Salesforce data." },
    ],
    lastScraped: new Date().toISOString(),
  }
];

export default function CompetitorsPage() {
  return (
    <>
      <Header title="Competitor Overview" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        {mockCompetitorsData.map((data) => (
          <Card key={data.competitor.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50 p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {data.competitor.logo && <Image src={data.competitor.logo} alt={`${data.competitor.name} logo`} data-ai-hint="company logo" width={100} height={40} className="rounded" />}
                  <CardTitle className="font-headline text-xl">{data.competitor.name}</CardTitle>
                </div>
                <a href={data.competitor.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                  Visit Website <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <CardDescription className="text-xs mt-1">
                Last Scraped: {new Date(data.lastScraped).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid md:grid-cols-3">
                <div className="md:col-span-1 p-4 border-b md:border-b-0 md:border-r">
                  <h3 className="font-semibold mb-2 text-base">Key Features</h3>
                  {data.features.length > 0 ? (
                    <ul className="space-y-1 text-sm">
                      {data.features.slice(0, 5).map(feature => (
                        <li key={feature.id} className="text-muted-foreground">{feature.name}</li>
                      ))}
                      {data.features.length > 5 && <li className="text-xs text-muted-foreground/70">...and {data.features.length - 5} more</li>}
                    </ul>
                  ) : <p className="text-sm text-muted-foreground">No features listed.</p>}
                </div>

                <div className="md:col-span-1 p-4 border-b md:border-b-0 md:border-r">
                  <h3 className="font-semibold mb-2 text-base">Pricing Plans</h3>
                  {data.pricingPlans.length > 0 ? (
                    <div className="space-y-2">
                      {data.pricingPlans.slice(0,3).map(plan => (
                        <div key={plan.id} className="text-sm">
                          <span className="font-medium">{plan.name}:</span> {plan.price}
                          {plan.isPopular && <Badge variant="outline" className="ml-2 text-accent border-accent">Popular</Badge>}
                        </div>
                      ))}
                    </div>
                  ): <p className="text-sm text-muted-foreground">No pricing plans listed.</p>}
                </div>

                <div className="md:col-span-1 p-4">
                  <h3 className="font-semibold mb-2 text-base">Latest Release Notes</h3>
                  {data.releaseNotes.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                      {data.releaseNotes.slice(0,2).map(note => (
                        <li key={note.id}>
                          <p className="font-medium">{note.title} <span className="text-xs text-muted-foreground">({note.version})</span></p>
                          <p className="text-xs text-muted-foreground">{new Date(note.date).toLocaleDateString()}</p>
                        </li>
                      ))}
                    </ul>
                   ) : <p className="text-sm text-muted-foreground">No release notes found.</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {mockCompetitorsData.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No competitor data available yet. Start by adding competitors to scrape.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
