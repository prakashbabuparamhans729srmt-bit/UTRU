
'use client';

import { ChevronRight, Menu, Search, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
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


const SalesOverviewChart = () => {
    const data = [
        { name: 'Jan', sales: 4000 },
        { name: 'Feb', sales: 3000 },
        { name: 'Mar', sales: 5000 },
        { name: 'Apr', sales: 4500 },
        { name: 'May', sales: 6000 },
        { name: 'Jun', sales: 7500 },
        { name: 'Jul', sales: 6500 },
    ];

    return (
        <div className="bg-card p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-1">Sales Overview</h3>
            <p className="text-muted-foreground text-sm mb-4">Total sales over the last 7 months.</p>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                        <YAxis tickFormatter={(value) => `$${value/1000}k`} stroke="hsl(var(--muted-foreground))" />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
                        <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 8, fill: 'hsl(var(--primary))' }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const OrderStatisticsChart = () => {
    const data = [
        { name: 'Pending', orders: 150 },
        { name: 'Processing', orders: 80 },
        { name: 'Completed', orders: 450 },
        { name: 'Cancelled', orders: 50 },
    ];

    return (
        <div className="bg-card p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Order Statistics</h3>
             <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                         <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
                        <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};


export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background text-foreground">
        <Sidebar collapsible="icon" className="hidden md:flex">
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

