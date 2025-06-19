import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { NAV_ITEMS } from '@/config/nav';
import { ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const features = [
    {
      title: "Competitor Overview",
      description: "Track features, pricing, and release notes from your competitors.",
      icon: NAV_ITEMS.find(item => item.href === '/competitors')?.icon,
      href: "/competitors",
      cta: "View Competitors"
    },
    {
      title: "Sentiment Analysis",
      description: "Analyze user review sentiment to understand market perception.",
      icon: NAV_ITEMS.find(item => item.href === '/sentiment')?.icon,
      href: "/sentiment",
      cta: "Analyze Sentiment"
    },
    {
      title: "Pricing Insights",
      description: "Visualize competitor pricing changes and plan structures over time.",
      icon: NAV_ITEMS.find(item => item.href === '/pricing')?.icon,
      href: "/pricing",
      cta: "View Pricing Trends"
    },
    {
      title: "Feature Velocity",
      description: "Monitor feature release cadence and scope across the competitive landscape.",
      icon: NAV_ITEMS.find(item => item.href === '/features')?.icon,
      href: "/features",
      cta: "Track Features"
    },
    {
      title: "Intelligent Alerts",
      description: "Get notified about significant competitor updates and market shifts.",
      icon: NAV_ITEMS.find(item => item.href === '/alerts')?.icon,
      href: "/alerts",
      cta: "Manage Alerts"
    },
  ];

  return (
    <>
      <Header title="Dashboard" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <section>
          <h2 className="font-headline text-2xl font-semibold mb-4 text-primary">
            Welcome to MarketSight AI
          </h2>
          <p className="text-muted-foreground">
            Gain actionable intelligence on your competitive landscape. Explore key areas below.
          </p>
        </section>
        
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const IconComponent = feature.icon || (() => null);
            return (
              <Card key={feature.title} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <IconComponent className="h-8 w-8 text-accent" aria-hidden="true" />
                  <CardTitle className="font-headline text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <CardDescription className="mb-4 text-sm">
                    {feature.description}
                  </CardDescription>
                  <Button asChild variant="outline" className="mt-auto w-full group">
                    <Link href={feature.href}>
                      {feature.cta}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Quick Stats</CardTitle>
                    <CardDescription>At-a-glance overview of market activity.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="p-4 bg-secondary rounded-lg">
                        <h3 className="text-sm font-medium text-muted-foreground">Tracked Competitors</h3>
                        <p className="text-3xl font-bold">12</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                        <h3 className="text-sm font-medium text-muted-foreground">New Features This Week</h3>
                        <p className="text-3xl font-bold">5</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                        <h3 className="text-sm font-medium text-muted-foreground">Pricing Changes</h3>
                        <p className="text-3xl font-bold">2</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                        <h3 className="text-sm font-medium text-muted-foreground">Positive Sentiment Trend</h3>
                        <p className="text-3xl font-bold text-green-500">+8%</p>
                    </div>
                </CardContent>
            </Card>
        </section>
      </main>
    </>
  );
}
