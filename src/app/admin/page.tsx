'use client';

import { ChevronRight, Menu, Search, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { adminSidebarNav, dashboardCards, dashboardStats } from '@/lib/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';


const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4500 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 7500 },
    { month: 'Jul', sales: 6500 },
];
const salesChartConfig = {
  sales: {
    label: 'Sales',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;


const SalesOverviewChart = () => {
    return (
        <div className="bg-card p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-1">Sales Overview</h3>
            <p className="text-muted-foreground text-sm mb-4">Total sales over the last 7 months.</p>
            <div className="h-[300px]">
                <ChartContainer config={salesChartConfig} className="w-full h-full">
                  <LineChart data={salesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} tickLine={false} axisLine={false} tickMargin={8} />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                      />
                      <Line dataKey="sales" type="monotone" stroke="var(--color-sales)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ChartContainer>
            </div>
        </div>
    );
};

const ordersData = [
    { status: 'Pending', orders: 150 },
    { status: 'Processing', orders: 80 },
    { status: 'Completed', orders: 450 },
    { status: 'Cancelled', orders: 50 },
];
const ordersChartConfig = {
    orders: {
        label: 'Orders',
        color: 'hsl(var(--primary))',
    },
} satisfies ChartConfig;

const OrderStatisticsChart = () => {
    return (
        <div className="bg-card p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Order Statistics</h3>
             <div className="h-[300px]">
                 <ChartContainer config={ordersChartConfig} className="w-full h-full">
                    <BarChart data={ordersData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                         <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="status" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="orders" fill="var(--color-orders)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </div>
        </div>
    );
};


export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-screen bg-background text-foreground">
        <Sidebar collapsible="offcanvas" className="hidden md:flex">
          <SidebarHeader>
            <div className="text-2xl font-bold text-center text-sidebar-foreground group-data-[state=expanded]:block group-data-[state=collapsed]:hidden">
              UCLAP
            </div>
            <div className="text-2xl font-bold text-center text-sidebar-foreground group-data-[state=collapsed]:block group-data-[state=expanded]:hidden">
              U
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {adminSidebarNav.map((section, sectionIndex) => (
                <SidebarGroup key={sectionIndex}>
                  {section.title && <SidebarGroupLabel>{section.title}</SidebarGroupLabel>}
                  {section.items.map((item, itemIndex) => (
                    <SidebarMenuItem key={itemIndex}>
                      <SidebarMenuButton isActive={item.isSelected} tooltip={item.name}>
                        <item.icon />
                        <span>{item.name}</span>
                        {item.hasSubmenu && <ChevronRight className="ml-auto" />}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroup>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <header className="flex items-center justify-between p-4 border-b bg-card">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="p-2 border rounded-md">
                <Menu className="w-6 h-6" />
              </SidebarTrigger>
              <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="bg-background border-border rounded-lg pl-10 pr-10 w-full sm:w-48 md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <X
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground cursor-pointer"
                    onClick={() => setSearchQuery('')}
                  />
                )}
              </div>
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/admin-avatar/40/40" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-background">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-6">
              {dashboardStats.map((stat) => (
                <div key={stat.title} className="bg-card p-4 rounded-lg border">
                  <p className="text-muted-foreground text-sm">{stat.title}</p>
                  <p className={cn('text-2xl md:text-3xl font-bold', stat.valueClass || 'text-foreground')}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <SalesOverviewChart />
              <OrderStatisticsChart />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {dashboardCards.map((card, index) => (
                <div
                  key={index}
                  className={cn(
                    'p-4 rounded-lg flex flex-col justify-between border',
                    card.isHighlighted ? 'bg-primary text-primary-foreground' : 'bg-card'
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-col">
                      <p className={cn('text-sm', card.isHighlighted ? 'text-primary-foreground/80' : 'text-muted-foreground')}>{card.title}</p>
                      <p className={cn('text-2xl font-bold', card.isHighlighted ? 'text-primary-foreground' : 'text-foreground')}>{card.value}</p>
                    </div>
                    {card.icon && <card.icon className="w-6 h-6" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
