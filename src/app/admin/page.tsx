
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
  ClipboardList
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

const SidebarMenuItem = ({ icon: Icon, children, isSelected, hasSubmenu }) => (
  <div
    className={`flex items-center p-2 rounded-lg cursor-pointer ${
      isSelected ? 'bg-gray-700' : 'hover:bg-gray-700'
    }`}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span className="flex-grow">{children}</span>
    {hasSubmenu && <ChevronRight className="w-5 h-5" />}
  </div>
);

const StatCard = ({
  icon: Icon,
  title,
  value,
  isHighlighted,
  iconBg,
  iconClass,
  valueClass,
}) => (
  <div
    className={`p-4 rounded-lg flex flex-col justify-between ${
      isHighlighted ? 'bg-cyan-400 text-black' : 'bg-gray-800'
    }`}
  >
    <div className="flex justify-between items-start">
      <div className="flex-col">
        <p
          className={`text-sm ${
            isHighlighted ? 'text-black' : 'text-gray-400'
          }`}
        >
          {title}
        </p>
        <p
          className={`text-2xl font-bold ${
            isHighlighted ? 'text-black' : 'text-white'
          } ${valueClass}`}
        >
          {value}
        </p>
      </div>
      {Icon && (
        <div className={`p-2 rounded ${iconBg}`}>
          <Icon className={`w-6 h-6 ${iconClass}`} />
        </div>
      )}
    </div>
  </div>
);

export default function AdminDashboard() {
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
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 flex flex-col">
        <div className="text-2xl font-bold mb-8">UCLAP</div>
        <nav className="flex flex-col gap-2">
          <SidebarMenuItem icon={LayoutDashboard} isSelected>
            Dashboard
          </SidebarMenuItem>
          <SidebarMenuItem icon={Box}>Orders</SidebarMenuItem>

          <div className="mt-4 mb-2 text-gray-400 text-sm font-semibold">
            MANAGEMENT
          </div>
          <SidebarMenuItem icon={Building}>City</SidebarMenuItem>

          <div className="mt-4 mb-2 text-gray-400 text-sm font-semibold">
            CATEGORIES
          </div>
          <SidebarMenuItem icon={List} hasSubmenu>
            Main Category
          </SidebarMenuItem>

          <div className="mt-4 mb-2 text-gray-400 text-sm font-semibold">
            BUSINESS
          </div>
          <SidebarMenuItem icon={Calendar}>TimeSlot & Date</SidebarMenuItem>
          <SidebarMenuItem icon={Ticket}>Banner</SidebarMenuItem>
          <SidebarMenuItem icon={Users}>Partner</SidebarMenuItem>

          <div className="mt-4 mb-2 text-gray-400 text-sm font-semibold">
            FINANCE
          </div>
          <SidebarMenuItem icon={CreditCard}>Credit Packages</SidebarMenuItem>
          <SidebarMenuItem icon={Wallet}>Payment Gateway</SidebarMenuItem>

          <div className="mt-4 mb-2 text-gray-400 text-sm font-semibold">
            CONTENT
          </div>
          <SidebarMenuItem icon={MessageSquare}>Testimonials</SidebarMenuItem>

          <div className="mt-auto">
            <SidebarMenuItem icon={Settings}>Settings</SidebarMenuItem>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-2 border border-gray-600 rounded-md">
                <LayoutDashboard className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="bg-gray-800 border-gray-700 rounded-lg pl-10 w-64"
              />
            </div>
            <Bell className="w-6 h-6 text-gray-400 cursor-pointer" />
            <Avatar>
              <AvatarImage src="https://picsum.photos/seed/admin-avatar/40/40" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-4 gap-6 mb-6">
            {stats.map((stat) => (
              <div key={stat.title} className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className={`text-3xl font-bold ${stat.valueClass || 'text-white'}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardCards.map((card, index) => (
              <StatCard
                key={index}
                icon={card.icon}
                title={card.title}
                value={card.value}
                isHighlighted={card.isHighlighted}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
