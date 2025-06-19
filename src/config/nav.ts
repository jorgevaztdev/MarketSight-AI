import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Users, Smile, DollarSign, Zap, Bell, BarChartBig } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Competitors',
    href: '/competitors',
    icon: Users,
  },
  {
    title: 'Sentiment Radar',
    href: '/sentiment',
    icon: Smile,
  },
  {
    title: 'Pricing Timeline',
    href: '/pricing',
    icon: DollarSign,
  },
  {
    title: 'Feature Velocity',
    href: '/features',
    icon: Zap,
  },
  {
    title: 'Smart Alerts',
    href: '/alerts',
    icon: Bell,
  },
];

export const APP_TITLE = "MarketSight AI";
export const APP_LOGO_ICON = BarChartBig;
