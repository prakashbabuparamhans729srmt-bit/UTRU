
'use client';

import {
  BarChart2,
  Bell,
  Box,
  Building,
  Calendar,
  CheckCircle,
  ChevronRight,
  ClipboardList,
  Clock,
  CloudSun,
  Contact,
  CreditCard,
  Crown,
  Database,
  Download,
  Droplets,
  Edit,
  Eye,
  File,
  FileText,
  Filter,
  Globe,
  Headset,
  Landmark,
  LayoutDashboard,
  Link,
  List,
  Lock,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  Monitor,
  Paperclip,
  Plus,
  RefreshCw,
  Rocket,
  Save,
  Search,
  Settings,
  Share2,
  Shield,
  Signal,
  Sparkles,
  Sun,
  Sunrise,
  Sunset,
  Table as TableIcon,
  Target,
  Ticket,
  Trash,
  Trash2,
  TrendingUp,
  Upload,
  User,
  Users,
  Video,
  Wallet,
  Wind,
  Wrench,
  Zap,
  AlertTriangle,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';

// Main Dashboard Component
export default function AdminDashboardPage() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 p-4">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Crown className="text-primary" />
          एडमिन डैशबोर्ड
        </h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold">राजेश कुमार</p>
            <p className="text-xs text-muted-foreground">सुपर एडमिन</p>
          </div>
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/admin-avatar/40/40" />
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon" onClick={() => router.push('/admin/login')}>
            <LogOut className="text-destructive" />
          </Button>
        </div>
      </header>

      {/* System Snapshot */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 />
            सिस्टम स्नैपशॉट
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Users className="mx-auto mb-2 h-6 w-6 text-blue-500" />
            <p className="text-2xl font-bold">5.2K</p>
            <p className="text-sm text-muted-foreground">यूजर</p>
          </div>
          <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <TrendingUp className="mx-auto mb-2 h-6 w-6 text-green-500" />
            <p className="text-2xl font-bold">12.5 लाख</p>
            <p className="text-sm text-muted-foreground">हिट्स (आज)</p>
          </div>
          <div className="p-4 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
            <CheckCircle className="mx-auto mb-2 h-6 w-6 text-teal-500" />
            <p className="text-2xl font-bold">98%</p>
            <p className="text-sm text-muted-foreground">अपटाइम</p>
          </div>
          <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <RefreshCw className="mx-auto mb-2 h-6 w-6 text-purple-500" />
            <p className="text-2xl font-bold">45</p>
            <p className="text-sm text-muted-foreground">आज के अपडेट</p>
          </div>
          <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
            <AlertTriangle className="mx-auto mb-2 h-6 w-6 text-red-500" />
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">अटेंशन चाहिए</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="content"><FileText className="mr-2" />कंटेंट प्रबंधन</TabsTrigger>
          <TabsTrigger value="users"><Users className="mr-2" />यूजर प्रबंधन</TabsTrigger>
          <TabsTrigger value="data"><Database className="mr-2" />डेटा प्रबंधन</TabsTrigger>
          <TabsTrigger value="settings"><Settings className="mr-2" />सेटिंग्स और टूल्स</TabsTrigger>
        </TabsList>

        {/* Content Management Tab */}
        <TabsContent value="content" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>कंटेंट प्रबंधन</CardTitle>
              <div className="flex gap-2">
                <Button onClick={() => router.push('/admin/editor')}><Plus className="mr-2 h-4 w-4" />नया</Button>
                <Button variant="outline"><Upload className="mr-2 h-4 w-4" />आयात</Button>
                <Button variant="outline"><Download className="mr-2 h-4 w-4" />निर्यात</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 border rounded-lg flex gap-4 items-center">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="क्विक सर्च..." className="pl-10" />
                </div>
                <Button variant="outline"><Filter className="mr-2 h-4 w-4" />फिल्टर</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base"><MapPin/>मेरा स्थान टैब</CardTitle></CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <p>• मौसम डेटा</p>
                    <p>• आपातकालीन नंबर</p>
                    <p>• स्थानीय समाचार</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Landmark/>जिला टैब</CardTitle></CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <p>• जिला प्रशासन</p>
                    <p>• जिला आँकड़े</p>
                    <p>• स्वास्थ्य सुविधाएँ</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Building/>राज्य टैब</CardTitle></CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <p>• राज्य सरकार</p>
                    <p>• राज्य बजट</p>
                    <p>• राज्य नीतियाँ</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base">🇮🇳 देश टैब</CardTitle></CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <p>• राष्ट्रीय प्रतीक</p>
                    <p>• केंद्र सरकार</p>
                    <p>• संविधान</p>
                  </CardContent>
                </Card>
              </div>
              <CardTitle className="text-lg mb-4">हाल ही में संपादित कंटेंट</CardTitle>
              <ShadcnTable>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>शीर्षक</TableHead>
                    <TableHead>प्रकार</TableHead>
                    <TableHead>अंतिम संपादन</TableHead>
                    <TableHead>स्थिति</TableHead>
                    <TableHead>क्रियाएँ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>01</TableCell>
                    <TableCell>लखनऊ मौसम अपडेट</TableCell>
                    <TableCell>मेरा स्थान</TableCell>
                    <TableCell>2 घंटे पहले</TableCell>
                    <TableCell><span className="flex items-center text-green-500"><CheckCircle className="mr-1 h-4 w-4" />सक्रिय</span></TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => router.push('/admin/editor')}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>02</TableCell>
                    <TableCell>UP बजट २०२४-२५</TableCell>
                    <TableCell>राज्य</TableCell>
                    <TableCell>१ दिन पहले</TableCell>
                    <TableCell><span className="flex items-center text-yellow-500"><Edit className="mr-1 h-4 w-4" />ड्राफ्ट</span></TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => router.push('/admin/editor')}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </ShadcnTable>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
            <Card>
                <CardHeader>
                    <CardTitle>यूजर प्रबंधन</CardTitle>
                    <CardDescription>यह सुविधा निर्माणाधीन है।</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>यहाँ उपयोगकर्ता प्रबंधन के लिए UI आएगा।</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="data">
            <Card>
                <CardHeader>
                    <CardTitle>डेटा प्रबंधन</CardTitle>
                    <CardDescription>यह सुविधा निर्माणाधीन है।</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>यहाँ डेटा प्रबंधन के लिए UI आएगा।</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="settings">
            <Card>
                <CardHeader>
                    <CardTitle>सेटिंग्स और टूल्स</CardTitle>
                    <CardDescription>यह सुविधा निर्माणाधीन है।</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>यहाँ सेटिंग्स और टूल्स के लिए UI आएगा।</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
