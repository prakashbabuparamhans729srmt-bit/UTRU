'use client';

import {
  BarChart2,
  Bell,
  Box,
  Building,
  CheckCircle,
  ChevronRight,
  ClipboardList,
  Clock,
  Crown,
  Database,
  Download,
  Edit,
  FileText,
  Filter,
  Landmark,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Trash2,
  TrendingUp,
  Upload,
  User,
  Users,
  AlertTriangle,
  ChevronLeft,
  ChevronDown,
  Eye,
  MoreVertical,
  Link as LinkIcon,
  HardDrive,
  Cloud,
  Layers,
  Archive,
  Terminal,
  Zap,
  TestTube,
  HardHat,
  Share2
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit, type DocumentData } from 'firebase/firestore';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';


interface Content extends DocumentData {
    id: string;
    title: string;
    type: string;
    createdAt: { seconds: number, nanoseconds: number };
}

// Main Dashboard Component
export default function AdminDashboardPage() {
  const router = useRouter();
  const firestore = useFirestore();

  const contentQuery = useMemo(() => {
      if (!firestore) return null;
      return query(
        collection(firestore, 'content'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
  }, [firestore]);

  const { data: recentContent, loading, error } = useCollection<Content>(contentQuery);

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

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 />
            सिस्टम स्नैपशॉट
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Users className="mx-auto mb-2 h-6 w-6 text-blue-500" />
            <p className="text-2xl font-bold">5.2K</p>
            <p className="text-sm text-muted-foreground">यूजर</p>
          </div>
          <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <TrendingUp className="mx-auto mb-2 h-6 w-6 text-green-500" />
            <p className="text-2xl font-bold">12.5 लाख</p>
            <p className="text-sm text-muted-foreground">हिट्स</p>
          </div>
          <div className="p-4 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
            <CheckCircle className="mx-auto mb-2 h-6 w-6 text-teal-500" />
            <p className="text-2xl font-bold">98%</p>
            <p className="text-sm text-muted-foreground">अपटाइम</p>
          </div>
          <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <RefreshCw className="mx-auto mb-2 h-6 w-6 text-purple-500" />
            <p className="text-2xl font-bold">४५</p>
            <p className="text-sm text-muted-foreground">अपडेट</p>
          </div>
        </CardContent>
         <CardContent>
            <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> रियल-टाइम ट्रैफिक: २,३४५ एक्टिव यूजर</span>
                <span className="flex items-center gap-2 text-red-500"><AlertTriangle className="w-4 h-4" /> अटेंशन चाहिए: १२ आइटम</span>
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

        <TabsContent value="content" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>कंटेंट प्रबंधन</CardTitle>
              <div className="flex gap-2">
                <Button onClick={() => router.push('/admin/editor')}><Plus className="mr-2 h-4 w-4" />नया</Button>
                <Button variant="outline"><Upload className="mr-2 h-4 w-4" />आयात</Button>
                <Button variant="outline"><Download className="mr-2 h-4 w-4" />निर्यात</Button>
                 <Button variant="destructive" className='hidden md:flex'><Trash2 className="mr-2 h-4 w-4" />बल्क डिलीट</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 border rounded-lg flex flex-wrap gap-4 items-center">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="क्विक सर्च..." className="pl-10" />
                </div>
                <div className="flex gap-2 items-center">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-medium">फिल्टर:</span>
                    <Button variant="ghost" size="sm">सभी <ChevronDown className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm">प्रकार: सभी <ChevronDown className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm">तिथि: आज <ChevronDown className="w-4 h-4" /></Button>
                </div>
              </div>
              <CardTitle className="text-lg mb-4">कंटेंट श्रेणियाँ</CardTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base"><MapPin/>मेरा स्थान टैब</CardTitle></CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-1">
                    <p>• मौसम डेटा</p>
                    <p>• आपातकालीन नंबर</p>
                    <p>• स्थानीय समाचार</p>
                    <p>• नक्शा डेटा</p>
                    <p>• स्थानीय जानकारी</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Landmark/>जिला टैब</CardTitle></CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-1">
                    <p>• जिला प्रशासन</p>
                    <p>• जिला आँकड़े</p>
                    <p>• स्वास्थ्य सुविधाएँ</p>
                    <p>• शैक्षणिक संस्थान</p>
                    <p>• परिवहन</p>
                    <p>• जिला योजनाएँ</p>
                    <p>• कार्यक्रम</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Building/>राज्य टैब</CardTitle></CardHeader>
                   <CardContent className="text-sm text-muted-foreground space-y-1">
                    <p>• राज्य सरकार</p>
                    <p>• राज्य बजट</p>
                    <p>• राज्य नीतियाँ</p>
                    <p>• राज्य परीक्षाएँ</p>
                    <p>• राज्य परिवहन</p>
                    <p>• कृषि डेटा</p>
                    <p>• स्वास्थ्य सुविधाएँ</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base">🇮🇳 देश टैब</CardTitle></CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-1">
                    <p>• राष्ट्रीय प्रतीक</p>
                    <p>• केंद्र सरकार</p>
                    <p>• संविधान</p>
                    <p>• राष्ट्रीय योजनाएँ</p>
                    <p>• दस्तावेज़ सेवाएँ</p>
                    <p>• आपातकालीन प्रबंधन</p>
                    <p>• भारत तथ्य</p>
                  </CardContent>
                </Card>
              </div>
              <CardTitle className="text-lg mb-4">हाल ही में संपादित कंटेंट</CardTitle>
              <Table>
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
                  {loading && [1,2,3].map(i => <TableRow key={i}><TableCell colSpan={6}><Skeleton className="h-8 w-full" /></TableCell></TableRow>)}
                  {!loading && recentContent?.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{(index + 1).toString().padStart(2, '0')}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>
                        {item.createdAt ? format(new Date(item.createdAt.seconds * 1000), 'd MMM, h:mm a') : 'अभी'}
                      </TableCell>
                      <TableCell><span className="flex items-center text-green-500"><CheckCircle className="mr-1 h-4 w-4" />सक्रिय</span></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => router.push('/admin/editor')}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {!loading && (!recentContent || recentContent.length === 0) && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">कोई हालिया कंटेंट नहीं मिला।</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
               <div className="flex justify-center mt-4">
                  <Button variant="link"><FileText className="w-4 h-4 mr-1"/>सभी कंटेंट देखें</Button>
                  <Button variant="link"><BarChart2 className="w-4 h-4 mr-1"/>एनालिटिक्स</Button>
                  <Button variant="link"><Clock className="w-4 h-4 mr-1"/>शेड्यूल्ड पोस्ट</Button>
               </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="mt-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>यूजर प्रबंधन</CardTitle>
                    <div className="flex gap-2">
                      <Button><Plus className="mr-2 h-4 w-4" />नया यूजर</Button>
                      <Button variant="outline"><BarChart2 className="mr-2 h-4 w-4" />रिपोर्ट</Button>
                      <Button variant="outline"><Mail className="mr-2 h-4 w-4" />बल्क ईमेल</Button>
                      <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" />बल्क डिलीट</Button>
                    </div>
                </CardHeader>
                <CardContent>
                  <Card className="mb-6">
                    <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp/> यूजर एनालिटिक्स</CardTitle></CardHeader>
                    <CardContent>
                      <p className="mb-4">कुल यूजर: ५२,३४१ | नए आज: २३४ | एक्टिव अब: २,३४५</p>
                      <div className="p-4 border rounded-lg">
                        <p>यूजर वृद्धि (७ दिन)</p>
                        <div className="h-40 flex items-center justify-center text-muted-foreground">
                          <BarChart2 className="w-10 h-10 mr-2" /> ग्राफ: २३४, १९८, ३०१, २७६, ३१२, २८९, ३४५
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="mb-6">
                    <CardHeader><CardTitle>यूजर सूची और फिल्टर</CardTitle></CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Button variant="secondary">सभी यूजर (५२,३४१)</Button>
                        <Button variant="ghost">सक्रिय (४८,२३४)</Button>
                        <Button variant="ghost">निष्क्रिय (२,१०३)</Button>
                        <Button variant="ghost">प्रीमियम (३,४५६)</Button>
                        <Button variant="ghost">एडमिन (१२)</Button>
                        <Button variant="ghost">मॉडरेटर (४५)</Button>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>नाम/ईमेल</TableHead>
                            <TableHead>स्थान</TableHead>
                            <TableHead>अंतिम लॉगिन</TableHead>
                            <TableHead>स्थिति/भूमिका</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                              <TableCell>01</TableCell>
                              <TableCell><div>रमेश शर्मा</div><div className="text-xs text-muted-foreground">ramesh@email.com</div></TableCell>
                              <TableCell>लखनऊ, UP</TableCell>
                              <TableCell>२ घंटे पहले</TableCell>
                              <TableCell><div className="flex flex-col gap-1"><span className="flex items-center text-green-500"><CheckCircle className="mr-1 h-4 w-4" />सक्रिय</span><span className="flex items-center"><User className="mr-1 h-4 w-4" />प्रीमियम</span></div></TableCell>
                          </TableRow>
                           <TableRow>
                              <TableCell>02</TableCell>
                              <TableCell><div>प्रिया सिंह</div><div className="text-xs text-muted-foreground">priya@email.com</div></TableCell>
                              <TableCell>दिल्ली</TableCell>
                              <TableCell>१ दिन पहले</TableCell>
                              <TableCell><div className="flex flex-col gap-1"><span className="flex items-center text-green-500"><CheckCircle className="mr-1 h-4 w-4" />सक्रिय</span><span className="flex items-center"><Users className="mr-1 h-4 w-4" />मानक</span></div></TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell>03</TableCell>
                              <TableCell><div>अमित कुमार</div><div className="text-xs text-muted-foreground">amit@email.com</div></TableCell>
                              <TableCell>मुंबई</TableCell>
                              <TableCell>१ सप्ताह पहले</TableCell>
                              <TableCell><div className="flex flex-col gap-1"><span className="flex items-center text-yellow-500"><Clock className="mr-1 h-4 w-4" />निष्क्रिय</span><span className="flex items-center"><Users className="mr-1 h-4 w-4" />मानक</span></div></TableCell>
                          </TableRow>
                           <TableRow>
                              <TableCell>04</TableCell>
                              <TableCell><div>सीमा वर्मा</div><div className="text-xs text-muted-foreground">seema@email.com</div></TableCell>
                              <TableCell>बैंगलोर</TableCell>
                              <TableCell>अभी</TableCell>
                              <TableCell><div className="flex flex-col gap-1"><span className="flex items-center text-green-500"><CheckCircle className="mr-1 h-4 w-4" />सक्रिय</span><span className="flex items-center"><Crown className="mr-1 h-4 w-4" />एडमिन</span></div></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                       <div className="flex justify-center items-center gap-2 mt-4">
                          <Button variant="outline" size="sm"><ChevronLeft className="w-4 h-4 mr-1" />पिछला</Button>
                          <span className="text-sm">१ २ ३ ... १०</span>
                          <Button variant="outline" size="sm">अगला<ChevronRight className="w-4 h-4 ml-1" /></Button>
                          <span className="text-sm">प्रति पेज: 20 <ChevronDown className="inline w-4 h-4"/></span>
                       </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>यूजर डिटेल्स (सिलेक्ट करने पर)</CardTitle></CardHeader>
                    <CardContent>
                      <p>यूजर: रमेश शर्मा (ID: USR-००१२३४)</p>
                      <p>ईमेल: ramesh@email.com | 📱: ९८७६५४३२१०</p>
                      <p>📍: लखनऊ, उत्तर प्रदेश | 📅 रजिस्ट्रेशन: १५ जुलाई २०२४</p>
                      <div className="mt-4 pt-4 border-t">
                        <p>📊 उपयोग आँकड़े:</p>
                        <ul className="list-disc pl-5 text-muted-foreground">
                            <li>कुल सत्र: १२३ | औसत समय: १५ मिनट</li>
                            <li>पसंदीदा टैब: मेरा स्थान (७०%)</li>
                            <li>अंतिम गतिविधि: मौसम देखा</li>
                        </ul>
                      </div>
                      <div className="mt-4 pt-4 border-t flex gap-2">
                        <Button variant="outline" size="sm"><Edit className="mr-1"/>संपादित करें</Button>
                        <Button variant="outline" size="sm"><Shield className="mr-1"/>एक्सेस बदलें</Button>
                        <Button variant="outline" size="sm"><Mail className="mr-1"/>मैसेज</Button>
                        <Button variant="outline" size="sm"><Eye className="mr-1"/>एक्टिविटी लॉग</Button>
                        <Button variant="destructive" size="sm"><AlertTriangle className="mr-1"/>निष्क्रिय करें</Button>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="data" className="mt-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>डेटा प्रबंधन</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline"><RefreshCw className="mr-2" />सिंक</Button>
                      <Button variant="outline"><Download className="mr-2" />बैकअप</Button>
                      <Button variant="outline"><Upload className="mr-2" />रीस्टोर</Button>
                      <Button variant="destructive"><Trash2 className="mr-2" />क्लीन</Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Card>
                      <CardHeader><CardTitle className="flex items-center gap-2"><HardDrive/> डेटाबेस हेल्थ</CardTitle></CardHeader>
                      <CardContent>
                        <p>स्टोरेज उपयोग: ७२% (३४.५ GB / ५० GB)</p>
                        <Progress value={72} className="w-full my-2" />
                        <p>टेबल्स: ४५ | रिकॉर्ड्स: १२.५ लाख | अंतिम बैकअप: कल ०२:०० AM</p>
                        <p>डेटा अखंडता: <span className="text-green-500">✅ १००%</span> | इंडेक्स हेल्थ: <span className="text-green-500">✅ उत्तम</span></p>
                      </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>डेटा टेबल्स प्रबंधन</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold flex items-center gap-2"><MapPin/> लोकेशन डेटा</h3>
                                <ul className="text-sm text-muted-foreground list-disc pl-5">
                                  <li>शहर/गाँव: १,२३४ रिकॉर्ड</li>
                                  <li>जिले: ८०० रिकॉर्ड</li>
                                  <li>राज्य: ३६ रिकॉर्ड</li>
                                  <li>सुविधाएँ: ४५,६७८ रिकॉर्ड</li>
                                </ul>
                                <Button variant="link" size="sm"><Eye className="w-4 h-4 mr-1"/> देखें</Button>
                                <Button variant="link" size="sm"><RefreshCw className="w-4 h-4 mr-1"/> अपडेट</Button>
                            </div>
                            <div>
                                <h3 className="font-semibold flex items-center gap-2"><Cloud/> मौसम डेटा</h3>
                                <ul className="text-sm text-muted-foreground list-disc pl-5">
                                  <li>वर्तमान: ५६७ रिकॉर्ड</li>
                                  <li>पूर्वानुमान: १२,३४५ रिकॉर्ड</li>
                                  <li>ऐतिहासिक: ५ लाख+ रिकॉर्ड</li>
                                </ul>
                                <Button variant="link" size="sm"><Eye className="w-4 h-4 mr-1"/> देखें</Button>
                                <Button variant="link" size="sm"><BarChart2 className="w-4 h-4 mr-1"/> विश्लेषण</Button>
                            </div>
                             <div>
                                <h3 className="font-semibold flex items-center gap-2"><Landmark/> प्रशासनिक डेटा</h3>
                                <ul className="text-sm text-muted-foreground list-disc pl-5">
                                  <li>अधिकारी: २३,४५६ रिकॉर्ड</li>
                                  <li>योजनाएँ: ५,६७८ रिकॉर्ड</li>
                                  <li>कार्यक्रम: ८,९०१ रिकॉर्ड</li>
                                </ul>
                                <Button variant="link" size="sm"><Eye className="w-4 h-4 mr-1"/> देखें</Button>
                                <Button variant="link" size="sm"><BarChart2 className="w-4 h-4 mr-1"/> रिपोर्ट</Button>
                            </div>
                             <div>
                                <h3 className="font-semibold flex items-center gap-2"><FileText/> समाचार/अपडेट्स</h3>
                                <ul className="text-sm text-muted-foreground list-disc pl-5">
                                  <li>समाचार: १२,३४५ रिकॉर्ड</li>
                                  <li>अलर्ट: ३,४५६ रिकॉर्ड</li>
                                  <li>नोटिफिकेशन: २३,४५६ रिकॉर्ड</li>
                                </ul>
                                <Button variant="link" size="sm"><Eye className="w-4 h-4 mr-1"/> देखें</Button>
                                <Button variant="link" size="sm"><Clock className="w-4 h-4 mr-1"/> शेड्यूल</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                      <CardHeader><CardTitle className="flex items-center gap-2"><RefreshCw/> डेटा सिंक और एक्सटर्नल स्रोत</CardTitle></CardHeader>
                      <CardContent>
                        <p>⚡ रीयल-टाइम सिंक स्रोत: <span className="text-green-500">✅ IMD (मौसम) | ✅ निकटतम स्थान API | ✅ समाचार फीड्स</span></p>
                        <p>🔄 अपडेट फ्रीक्वेंसी: हर १५ मिनट <ChevronDown className="inline w-4 h-4"/></p>
                        <Table className="mt-4">
                          <TableHeader><TableRow><TableHead>स्रोत</TableHead><TableHead>स्थिति</TableHead><TableHead>अंतिम सिंक</TableHead></TableRow></TableHeader>
                          <TableBody>
                            <TableRow><TableCell>गूगल मैप्स</TableCell><TableCell className="text-green-500">✅ कनेक्टेड</TableCell><TableCell>५ मिनट पहले</TableCell></TableRow>
                            <TableRow><TableCell>IMD मौसम</TableCell><TableCell className="text-green-500">✅ कनेक्टेड</TableCell><TableCell>१५ मिनट पहले</TableCell></TableRow>
                            <TableRow><TableCell>सरकारी पोर्टल</TableCell><TableCell className="text-yellow-500">🟡 आंशिक</TableCell><TableCell>१ घंटे पहले</TableCell></TableRow>
                            <TableRow><TableCell>समाचार एजेंसी</TableCell><TableCell className="text-green-500">✅ कनेक्टेड</TableCell><TableCell>३० मिनट पहले</TableCell></TableRow>
                          </TableBody>
                        </Table>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm"><LinkIcon className="mr-1"/> नया API जोड़ें</Button>
                          <Button variant="outline" size="sm"><Settings className="mr-1"/> कॉन्फिगर करें</Button>
                          <Button variant="outline" size="sm"><TestTube className="mr-1"/> टेस्ट कनेक्शन</Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader><CardTitle className="flex items-center gap-2"><Archive/> बैकअप और रीस्टोर</CardTitle></CardHeader>
                       <CardContent>
                          <p>🗓️ बैकअप शेड्यूल: प्रतिदिन ०२:०० AM <ChevronDown className="inline w-4 h-4"/></p>
                          <p>बैकअप रखें: ३० दिन <ChevronDown className="inline w-4 h-4"/></p>
                          <ul className="mt-4 space-y-2 text-sm">
                            <li className="flex justify-between items-center"><span>• १५ अगस्त २०२४, ०२:०० AM (३४.२ GB)</span> <div className="flex gap-1"><Button size="sm" variant="ghost"><Download className="mr-1"/>डाउनलोड</Button><Button size="sm" variant="ghost"><Upload className="mr-1"/>रीस्टोर</Button></div></li>
                            <li className="flex justify-between items-center"><span>• १४ अगस्त २०२४, ०२:०० AM (३४.१ GB)</span> <Button size="sm" variant="ghost"><Download className="mr-1"/>डाउनलोड</Button></li>
                            <li className="flex justify-between items-center"><span>• १३ अगस्त २०२४, ०२:०० AM (३४.० GB)</span> <Button size="sm" variant="ghost"><Download className="mr-1"/>डाउनलोड</Button></li>
                          </ul>
                          <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm"><Plus className="mr-1"/> मैन्युअल बैकअप बनाएँ</Button>
                            <Button variant="outline" size="sm"><Cloud className="mr-1"/> क्लाउड स्टोरेज सेटिंग</Button>
                          </div>
                      </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
           <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>सेटिंग्स और टूल्स</CardTitle>
                    <div className="flex gap-2">
                        <Button><Download className="mr-2"/>सभी सेव करें</Button>
                        <Button variant="outline"><RefreshCw className="mr-2"/>डिफॉल्ट</Button>
                        <Button variant="outline"><Terminal className="mr-2"/>लॉग</Button>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><Settings/> ऐप सेटिंग्स</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div><Label>ऐप नाम:</Label><Input defaultValue="भारत सूचना"/></div>
                                <div><Label>वर्जन:</Label><Input defaultValue="२.१.४"/></div>
                                <div><Label>सपोर्ट ईमेल:</Label><Input defaultValue="support@bharatsuchana.in"/></div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><Shield/> सुरक्षा सेटिंग्स</CardTitle></CardHeader>
                             <CardContent className="space-y-2 text-sm">
                                <p>एडमिन लॉगिन अटेम्प्ट्स: ५ <ChevronDown className="inline w-4 h-4"/></p>
                                <p>पासवर्ड एक्सपायरी: ९० दिन <ChevronDown className="inline w-4 h-4"/></p>
                                <div className="flex items-center justify-between"><p>२-फैक्टर ऑथेंटिकेशन</p><CheckCircle className="text-green-500"/></div>
                                <div className="flex items-center justify-between"><p>IP व्हाइटलिस्टिंग</p><span className="text-red-500">Disabled</span></div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><HardHat/> सिस्टम टूल्स</CardTitle></CardHeader>
                             <CardContent className="space-y-4">
                                <h4 className="font-semibold">कैश और सफाई</h4>
                                <div className="flex justify-between items-center text-sm"><p>यूजर कैश: २.३ GB</p><Button size="sm" variant="destructive">साफ करें</Button></div>
                                <div className="flex justify-between items-center text-sm"><p>टेम्प फाइल्स: १.५ GB</p><Button size="sm" variant="destructive">साफ करें</Button></div>
                                <h4 className="font-semibold">डायग्नोस्टिक्स</h4>
                                <div className="flex flex-wrap gap-2">
                                  <Button size="sm" variant="outline"><Zap className="mr-1"/>सिस्टम हेल्थ</Button>
                                  <Button size="sm" variant="outline"><LinkIcon className="mr-1"/>कनेक्शन टेस्ट</Button>
                                  <Button size="sm" variant="outline"><BarChart2 className="mr-1"/>यूजर लोड</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                     <div className="space-y-6">
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><Bell/> नोटिफिकेशन सेटिंग्स</CardTitle></CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center justify-between"><Label>मौसम अलर्ट भेजें</Label><CheckCircle className="text-green-500"/></div>
                                <div className="flex items-center justify-between"><Label>आपातकालीन अलर्ट</Label><CheckCircle className="text-green-500"/></div>
                                <div className="flex items-center justify-between"><Label>समाचार अपडेट</Label><CheckCircle className="text-green-500"/></div>
                                <div className="flex items-center justify-between"><Label>प्रमोशनल नोटिफिकेशन</Label><span className="text-red-500">Disabled</span></div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><BarChart2/> एनालिटिक्स सेटिंग्स</CardTitle></CardHeader>
                             <CardContent className="space-y-2">
                                <div className="flex items-center justify-between"><Label>यूजर ट्रैकिंग</Label><CheckCircle className="text-green-500"/></div>
                                <div className="flex items-center justify-between"><Label>एनॉनिमस डेटा कलेक्शन</Label><CheckCircle className="text-green-500"/></div>
                                <div className="flex items-center justify-between"><Label>गूगल एनालिटिक्स</Label><span className="text-green-500 font-semibold">कनेक्टेड</span></div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><Crown/> एडमिन प्रबंधन</CardTitle></CardHeader>
                             <CardContent className="space-y-4">
                                <ul className="text-sm list-disc pl-5">
                                    <li>राजेश कुमार (सुपर एडमिन)</li>
                                    <li>प्रिया शर्मा (कंटेंट एडमिन)</li>
                                    <li>अमित सिंह (डेटा एडमिन)</li>
                                </ul>
                                <div className="flex flex-wrap gap-2">
                                    <Button size="sm" variant="outline"><Plus className="mr-1"/>नया एडमिन</Button>
                                    <Button size="sm" variant="outline"><Eye className="mr-1"/>एक्सेस लॉग</Button>
                                    <Button size="sm" variant="outline"><Shield className="mr-1"/>भूमिकाएँ</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>

      <footer className="text-center text-sm text-muted-foreground mt-6 py-4 border-t">
        <p>🕒 आखिरी अपडेट: आज १०:३० AM | 🔄 रीयल-टाइम अपडेट चालू | 📱 सर्वर: सामान्य</p>
      </footer>
    </div>
  );
}
