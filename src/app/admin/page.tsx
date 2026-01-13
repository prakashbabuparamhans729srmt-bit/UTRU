
'use client';

import { ChevronRight, Menu, Search, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { adminSidebarNav, dashboardCards, dashboardStats } from '@/lib/navigation';


const SidebarMenuItem = ({ icon: Icon, children, isSelected, hasSubmenu, isExpanded }) => (
  <div
    className={cn(
      'flex items-center p-2 rounded-lg cursor-pointer text-white',
      isSelected ? 'bg-gray-800' : 'hover:bg-gray-800'
    )}
  >
    <Icon className="w-5 h-5 shrink-0" />
    <span className={cn('ml-3 flex-grow transition-opacity duration-200', !isExpanded && 'opacity-0')}>
      {children}
    </span>
    {hasSubmenu && <ChevronRight className={cn('w-5 h-5 shrink-0 transition-opacity duration-200', !isExpanded && 'opacity-0')} />}
  </div>
);


const SidebarContent = ({ isExpanded }) => (
    <>
        <div className="text-2xl font-bold mb-8 text-center text-white">
            {isExpanded ? 'UCLAP' : 'U'}
        </div>
        <nav className="flex flex-col gap-2">
           {adminSidebarNav.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                    {section.title && (
                         <div className={cn("mt-4 mb-2 text-gray-400 text-sm font-semibold transition-opacity duration-200", !isExpanded && 'opacity-0 text-center text-xs')}>
                            {isExpanded ? section.title : '...'}
                        </div>
                    )}
                    {section.items.map((item, itemIndex) => (
                        <SidebarMenuItem key={itemIndex} icon={item.icon} isSelected={item.isSelected} hasSubmenu={item.hasSubmenu} isExpanded={isExpanded}>
                            {item.name}
                        </SidebarMenuItem>
                    ))}
                </div>
           ))}
        </nav>
    </>
)

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar for Desktop */}
       <aside 
        className={cn(
          "bg-card p-4 flex-col hidden md:flex transition-all duration-300 ease-in-out border-r",
          isSidebarExpanded ? 'w-64' : 'w-20'
        )}
      >
        <SidebarContent isExpanded={isSidebarExpanded} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-4">
             <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="p-2 border rounded-md hidden md:block"
                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            >
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle Sidebar</span>
            </Button>
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
            <Button variant="ghost" size="icon" className='rounded-full'>
              <Search className="w-6 h-6 text-muted-foreground" />
            </Button>
            <Avatar>
              <AvatarImage src="https://picsum.photos/seed/admin-avatar/40/40" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden bg-card p-4 absolute top-16 left-0 right-0 z-20 border-b"
          >
            <SidebarContent isExpanded={true} />
          </div>
        )}

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
      </main>
    </div>
  );
}
