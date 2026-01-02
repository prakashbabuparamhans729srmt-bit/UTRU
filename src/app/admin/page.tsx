
'use client';

import {
  LayoutDashboard,
  Box,
  Building,
  List,
  ChevronRight,
  Calendar,
  Ticket,
  Users,
  CreditCard,
  Wallet,
  MessageSquare,
  Settings,
  Search,
  Bell,
  Banknote,
  Tags,
  Plus,
  Wrench,
  User,
  MapPin,
  ClipboardList,
  Menu,
  X
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';


const SidebarMenuItem = ({ icon: Icon, children, isSelected, hasSubmenu, isExpanded }) => (
  <div
    className={cn(
      'flex items-center p-2 rounded-lg cursor-pointer text-white',
      isSelected ? 'bg-gray-700' : 'hover:bg-gray-700'
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
            <SidebarMenuItem icon={LayoutDashboard} isSelected isExpanded={isExpanded}>
                Dashboard
            </SidebarMenuItem>
            <SidebarMenuItem icon={Box} isExpanded={isExpanded}>Orders</SidebarMenuItem>

            <div className={cn("mt-4 mb-2 text-gray-400 text-sm font-semibold transition-opacity duration-200", !isExpanded && 'opacity-0 text-center text-xs')}>
                {isExpanded ? 'MANAGEMENT' : '...'}
            </div>
            <SidebarMenuItem icon={Building} isExpanded={isExpanded}>City</SidebarMenuItem>

            <div className={cn("mt-4 mb-2 text-gray-400 text-sm font-semibold transition-opacity duration-200", !isExpanded && 'opacity-0 text-center text-xs')}>
                {isExpanded ? 'CATEGORIES' : '...'}
            </div>
            <SidebarMenuItem icon={List} hasSubmenu isExpanded={isExpanded}>
                Main Category
            </SidebarMenuItem>

            <div className={cn("mt-4 mb-2 text-gray-400 text-sm font-semibold transition-opacity duration-200", !isExpanded && 'opacity-0 text-center text-xs')}>
                {isExpanded ? 'BUSINESS' : '...'}
            </div>
            <SidebarMenuItem icon={Calendar} isExpanded={isExpanded}>TimeSlot & Date</SidebarMenuItem>
            <SidebarMenuItem icon={Ticket} isExpanded={isExpanded}>Banner</SidebarMenuItem>
            <SidebarMenuItem icon={Users} isExpanded={isExpanded}>Partner</SidebarMenuItem>

            <div className={cn("mt-4 mb-2 text-gray-400 text-sm font-semibold transition-opacity duration-200", !isExpanded && 'opacity-0 text-center text-xs')}>
                {isExpanded ? 'FINANCE' : '...'}
            </div>
            <SidebarMenuItem icon={CreditCard} isExpanded={isExpanded}>Credit Packages</SidebarMenuItem>
            <SidebarMenuItem icon={Wallet} isExpanded={isExpanded}>Payment Gateway</SidebarMenuItem>

            <div className={cn("mt-4 mb-2 text-gray-400 text-sm font-semibold transition-opacity duration-200", !isExpanded && 'opacity-0 text-center text-xs')}>
                {isExpanded ? 'CONTENT' : '...'}
            </div>
            <SidebarMenuItem icon={MessageSquare} isExpanded={isExpanded}>Testimonials</SidebarMenuItem>

            <div className="mt-auto">
                <SidebarMenuItem icon={Settings} isExpanded={isExpanded}>Settings</SidebarMenuItem>
            </div>
        </nav>
    </>
)


export default function AdminDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  const stats = [
    { title: 'Pending', value: '1413', valueClass: 'text-cyan-400' },
    { title: 'Process', value: '2' },
    { title: 'Cancel', value: '90' },
    { title: 'Completed', value: '1' },
  ];

  const dashboardCards = [
    {
      icon: Box,
      title: 'Total Orders',
      value: '1506',
      isHighlighted: true,
    },
    { icon: Banknote, title: 'Total Sales', value: '₹ 534' },
    { icon: Ticket, title: 'Total Banners', value: '3' },
    { icon: List, title: 'Total Main Category', value: '9' },
    { icon: Wallet, title: 'Total Payment Gateway', value: '5' },
    { icon: List, title: 'Total Sub Category', value: '9' },
    { icon: List, title: 'Total Child Category', value: '41' },
    { icon: Plus, title: 'Total Add On', value: '36' },
    { icon: Calendar, title: 'Total Timeslot & Date', value: '9' },
    { icon: Users, title: 'Total Partner', value: '148' },
    { icon: Wrench, title: 'Total Partner Service', value: '57' },
    { icon: CreditCard, title: 'Total Credit Package', value: '3' },
    { icon: ClipboardList, title: 'Total Section', value: '1' },
    { icon: Wrench, title: 'Total Section Service', value: '4' },
    { icon: MapPin, title: 'Total City', value: '1' },
    { icon: User, title: 'Total Customer', value: '631' },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar for Desktop */}
       <aside 
        className={cn(
          "bg-gray-800 p-4 flex-col hidden md:flex transition-all duration-300 ease-in-out",
          isSidebarExpanded ? 'w-64' : 'w-20'
        )}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        <SidebarContent isExpanded={isSidebarExpanded} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-gray-900">
        <header className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
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
            <div className="p-2 border border-gray-600 rounded-md hidden md:block">
                <LayoutDashboard className="w-6 h-6" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold hidden sm:block">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="bg-gray-700 border-gray-600 rounded-lg pl-10 pr-10 w-36 sm:w-48 md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <X 
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
                  onClick={() => setSearchQuery('')}
                />
              )}
            </div>
            <Bell className="w-6 h-6 text-gray-400 cursor-pointer" />
            <Avatar>
              <AvatarImage src="https://picsum.photos/seed/admin-avatar/40/40" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden bg-gray-800 p-4 absolute top-16 left-0 right-0 z-20"
          >
            <SidebarContent isExpanded={true} />
          </div>
        )}

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-6">
            {stats.map((stat) => (
              <div key={stat.title} className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className={`text-2xl md:text-3xl font-bold ${stat.valueClass || 'text-white'}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {dashboardCards.map((card, index) => (
              <div
                key={index}
                className={cn(
                  'p-4 rounded-lg flex flex-col justify-between',
                  card.isHighlighted ? 'bg-cyan-400 text-black' : 'bg-gray-800'
                )}
              >
                <div className="flex justify-between items-start">
                    <div className="flex-col">
                        <p className={cn('text-sm', card.isHighlighted ? 'text-black' : 'text-gray-400')}>{card.title}</p>
                        <p className={cn('text-2xl font-bold', card.isHighlighted ? 'text-black' : 'text-white')}>{card.value}</p>
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

