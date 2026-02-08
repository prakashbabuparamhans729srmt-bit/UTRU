'use client';

import {
  Home,
  Flame,
  MessageSquare,
  Lightbulb,
  Crown,
  Globe,
  Bell,
  Search,
  User,
  Settings,
  BarChart2,
  MapPin,
  Clock,
  Map as MapIcon,
  Leaf,
  HeartPulse,
  Briefcase,
  Smile,
  Vote,
  Plus,
  Trophy,
  BookOpen,
  ThumbsUp,
  List as ListIcon,
  Landmark,
  CheckCircle,
  Download,
  Users as UsersIcon,
  Share2,
  Bookmark,
  UserPlus,
  Languages,
  X,
  ThumbsDown,
  Repeat,
  Paperclip,
  Tag,
  Rocket,
  Edit,
  Eye,
  Ban,
  Trash2,
  Video,
  File as FileIcon,
  Link as LinkIcon,
  MoreHorizontal,
  ChevronRight,
  Upload,
  RefreshCw,
  LayoutDashboard,
  Box,
  Building,
  CheckCircle2,
  ClipboardList,
  LogOut,
  Mail,
  AlertTriangle,
  HardDrive,
  Cloud,
  Layers,
  Archive,
  Terminal,
  TestTube,
  HardHat,
  Waypoints,
  LocateFixed,
  Footprints,
  Car,
  Wheat,
  Wallet,
  Ruler,
  Medal,
  PlaySquare,
  Quote,
  LayoutGrid,
  Menu,
  Mic,
  SlidersHorizontal,
  Zap,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function GlobalVoicePage() {
  return (
    <div className="bg-gray-100 dark:bg-black text-gray-900 dark:text-white min-h-screen">
      {/* Top Header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm p-2 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Globe className="w-6 h-6 text-primary" />
          Global Voice
        </h1>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon"><Bell className="w-5 h-5" /><span className="sr-only">Notifications</span></Button>
          <Button variant="ghost" size="icon"><Search className="w-5 h-5" /><span className="sr-only">Search</span></Button>
          <Button variant="ghost" size="icon"><User className="w-5 h-5" /><span className="sr-only">Profile</span></Button>
          <Button variant="ghost" size="icon"><Settings className="w-5 h-5" /><span className="sr-only">Settings</span></Button>
        </div>
      </header>
      
      {/* Main Navigation */}
      <nav className="p-2 border-b bg-background/80 backdrop-blur-sm sticky top-[61px] z-20">
        <div className="flex justify-around">
          <Button variant="ghost" className="flex flex-col h-auto p-1 items-center gap-1 text-primary">
            <Home className="w-5 h-5"/> <span className="text-xs font-semibold">होम</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-auto p-1 items-center gap-1 text-muted-foreground">
            <Flame className="w-5 h-5"/> <span className="text-xs">ट्रेंडिंग</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-auto p-1 items-center gap-1 text-muted-foreground">
            <MessageSquare className="w-5 h-5"/> <span className="text-xs">मेरी चर्चाएँ</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-auto p-1 items-center gap-1 text-muted-foreground">
            <Lightbulb className="w-5 h-5"/> <span className="text-xs">समाधान</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-auto p-1 items-center gap-1 text-muted-foreground">
            <Crown className="w-5 h-5"/> <span className="text-xs">लीडरबोर्ड</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-auto p-1 items-center gap-1 text-muted-foreground">
            <Globe className="w-5 h-5"/> <span className="text-xs">वैश्विक दृष्टि</span>
          </Button>
        </div>
      </nav>

      <main className="p-4 space-y-6 pb-20">

        {/* Trending Discussions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">🎯 आज की शीर्ष चर्चाएँ (ट्रेंडिंग)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p><Flame className="inline w-4 h-4 text-red-500 mr-1" /> #ClimateAction2024 (१२.५K) • <Zap className="inline w-4 h-4 text-yellow-500 mr-1" /> #MentalHealthAwareness (८.७K)</p>
            <p>🆕 #AI_Ethics_Debate (३.२K) • 💧 #WaterCrisis (५.४K)</p>
            <p><Leaf className="inline w-4 h-4 text-green-500 mr-1" /> #SustainableLiving (७.९K) • 🎓 #EducationForAll (६.३K)</p>
            <Separator className="my-4"/>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm"><BarChart2 className="mr-1"/> सभी ट्रेंड्स</Button>
              <Button variant="outline" size="sm"><MapPin className="mr-1"/> स्थानीय ट्रेंड्स</Button>
              <Button variant="outline" size="sm"><Clock className="mr-1"/> २४ घंटे</Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Global Activity Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><MapPin /> लाइव ग्लोबल एक्टिविटी मैप</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center text-center p-4">
              <p className="font-semibold text-muted-foreground">[विश्व मानचित्र - रियलटाइम चर्चा हॉटस्पॉट्स]</p>
              <p className="text-xs text-muted-foreground mt-2">● भारत (३४५)  ● USA (५६७)  ● यूरोप (२३४) ● अफ्रीका (१२३) ● ऑस्ट्रेलिया (८९) ● दक्षिण अमेरिका (४५)</p>
            </div>
             <Separator className="my-4"/>
             <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm"><MapIcon className="mr-1"/> मैप विस्तारित करें</Button>
                <Button variant="outline" size="sm"><MapPin className="mr-1"/> मेरा स्थान</Button>
                <Button variant="outline" size="sm"><Globe className="mr-1"/> क्षेत्र चुनें</Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Discussions */}
        <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-lg">💬 सक्रिय चर्चाएँ (रीयल-टाइम अपडेट)</CardTitle></CardHeader>
            <CardContent>
                 <div className="flex flex-wrap gap-2 mb-4">
                    <Button variant="secondary" size="sm">सभी ⬇️</Button>
                    <Button variant="ghost" size="sm"><Leaf className="mr-1"/> पर्यावरण</Button>
                    <Button variant="ghost" size="sm"><HeartPulse className="mr-1"/> स्वास्थ्य</Button>
                    <Button variant="ghost" size="sm"><Briefcase className="mr-1"/> आर्थिक</Button>
                 </div>
                 <div className="space-y-4">
                    <div className="border p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground flex items-center gap-2 mb-2"><Leaf className="text-green-500"/> पर्यावरण • <Flame className="text-red-500"/> ट्रेंडिंग • १५ मिनट पहले</div>
                        <p className="font-semibold">"जलवायु परिवर्तन: क्या २०३० तक कार्बन न्यूट्रल संभव है?"</p>
                        <div className="text-xs text-muted-foreground flex items-center gap-2 mt-2">
                            <User className="w-3 h-3"/> डॉ. एमिली • 🇩🇪 जर्मनी • <MessageSquare className="w-3 h-3"/> २३४ • <ThumbsUp className="w-3 h-3"/> १.५K • <Eye className="w-3 h-3"/> १२K
                        </div>
                        <div className="flex gap-2 mt-3">
                            <Button size="sm"><MessageSquare className="mr-1"/> भाग लें</Button>
                            <Button size="sm" variant="outline"><Vote className="mr-1"/> वोट दें</Button>
                            <Button size="sm" variant="outline"><Lightbulb className="mr-1"/> समाधान</Button>
                        </div>
                    </div>
                     <div className="border p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground flex items-center gap-2 mb-2"><HeartPulse className="text-pink-500"/> स्वास्थ्य • <Zap className="text-yellow-500"/> हॉट • ३० मिनट पहले</div>
                        <p className="font-semibold">"मानसिक स्वास्थ्य: कार्यस्थल पर मानसिक स्वास्थ्य अवकाश अनिवार्य?"</p>
                        <div className="text-xs text-muted-foreground flex items-center gap-2 mt-2">
                            <User className="w-3 h-3"/> प्रो. यामामोटो • 🇯🇵 जापान • <MessageSquare className="w-3 h-3"/> १८९ • <ThumbsUp className="w-3 h-3"/> २.३K • <Eye className="w-3 h-3"/> ८.५K
                        </div>
                         <div className="flex gap-2 mt-3">
                            <Button size="sm"><MessageSquare className="mr-1"/> भाग लें</Button>
                            <Button size="sm" variant="outline"><Vote className="mr-1"/> वोट दें</Button>
                            <Button size="sm" variant="outline"><Lightbulb className="mr-1"/> समाधान</Button>
                        </div>
                    </div>
                     <div className="border p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground flex items-center gap-2 mb-2">🎓 शिक्षा • 🆕 नई • १ घंटा पहले</div>
                        <p className="font-semibold">"एडटेक: क्या AI ट्यूटर्स पारंपरिक शिक्षकों की जगह ले सकते हैं?"</p>
                        <div className="text-xs text-muted-foreground flex items-center gap-2 mt-2">
                            <User className="w-3 h-3"/> अहमद अल-फैसल • 🇸🇦 सऊदी अरब • <MessageSquare className="w-3 h-3"/> १२३ • <ThumbsUp className="w-3 h-3"/> ९८९ • <Eye className="w-3 h-3"/> ५.६K
                        </div>
                         <div className="flex gap-2 mt-3">
                            <Button size="sm"><MessageSquare className="mr-1"/> भाग लें</Button>
                            <Button size="sm" variant="outline"><Vote className="mr-1"/> वोट दें</Button>
                            <Button size="sm" variant="outline"><Lightbulb className="mr-1"/> समाधान</Button>
                        </div>
                    </div>
                 </div>
                 <Separator className="my-4"/>
                 <div className="flex flex-wrap gap-2">
                    <Button variant="link">📜 और चर्चाएँ लोड करें...</Button>
                    <Button><Plus className="mr-1"/> नई चर्चा शुरू करें</Button>
                 </div>
            </CardContent>
        </Card>
        
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Lightbulb/> हॉटसेट समाधान प्रस्ताव (सबसे अधिक वोट)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="border p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                <p className="font-bold">🥇 शीर्ष समाधान: "सौर ऊर्जा सब्सिडी: ग्रामीण क्षेत्रों के लिए विशेष"</p>
                <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                    <ThumbsUp/> ३.४K वोट • <MessageSquare/> ४५६ चर्चाएँ • <Star className="text-amber-500 fill-amber-500"/> ४.८/५.०
                </div>
                 <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                    <User/> मारिया गोंजालेज • 🌍 स्पेन • <Trophy className="text-amber-600"/> टॉप कॉन्ट्रिब्यूटर
                </div>
                <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline"><BookOpen className="mr-1"/> पूरा पढ़ें</Button>
                    <Button size="sm"><ThumbsUp className="mr-1"/> समर्थन</Button>
                    <Button size="sm" variant="outline"><MessageSquare className="mr-1"/> चर्चा</Button>
                </div>
            </div>
            <div className="border p-3 rounded-lg">
                <p className="font-bold">🥈 द्वितीय: "मानसिक स्वास्थ्य हेल्पलाइन: २४x७ मुफ्त सेवा"</p>
                <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                    <ThumbsUp/> २.८K वोट • <MessageSquare/> ३४५ चर्चाएँ • <Star className="text-amber-500 fill-amber-500"/> ४.६/५.०
                </div>
                 <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                    <User/> डॉ. चेन • 🌏 चीन • <Target className="text-blue-600"/> विशेषज्ञ
                </div>
                 <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline"><BookOpen className="mr-1"/> पूरा पढ़ें</Button>
                    <Button size="sm"><ThumbsUp className="mr-1"/> समर्थन</Button>
                    <Button size="sm" variant="outline"><MessageSquare className="mr-1"/> चर्चा</Button>
                </div>
            </div>
            <Separator className="my-4"/>
            <div className="flex flex-wrap gap-2">
                <Button><Lightbulb className="mr-1"/> अपना समाधान सुझाएँ</Button>
                <Button variant="outline"><ListIcon className="mr-1"/> सभी समाधान</Button>
                <Button variant="outline"><Landmark className="mr-1"/> सरकारी पोर्टल</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Crown/> टॉप कॉन्ट्रिब्यूटर्स (इस सप्ताह)</CardTitle></CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>रैंक</TableHead>
                            <TableHead>नाम/देश</TableHead>
                            <TableHead>समाधान</TableHead>
                            <TableHead>प्रभाव</TableHead>
                            <TableHead>अंक</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>🥇</TableCell>
                            <TableCell>मारिया (स्पेन)</TableCell>
                            <TableCell>१२४</TableCell>
                            <TableCell>२३.५K</TableCell>
                            <TableCell>९८५०</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>🥈</TableCell>
                            <TableCell>ताकेशी (जापान)</TableCell>
                            <TableCell>८९</TableCell>
                            <TableCell>१८.७K</TableCell>
                            <TableCell>८७६५</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>🥉</TableCell>
                            <TableCell>फातिमा (सऊदी)</TableCell>
                            <TableCell>७६</TableCell>
                            <TableCell>१५.३K</TableCell>
                            <TableCell>७६५४</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>४</TableCell>
                            <TableCell>राजेश (भारत)</TableCell>
                            <TableCell>६५</TableCell>
                            <TableCell>१२.४K</TableCell>
                            <TableCell>६५४३</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>५</TableCell>
                            <TableCell>एमिली (जर्मनी)</TableCell>
                            <TableCell>५४</TableCell>
                            <TableCell>१०.२K</TableCell>
                            <TableCell>५४३२</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Separator className="my-4"/>
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline"><Trophy className="mr-1"/> पूरा लीडरबोर्ड</Button>
                    <Button variant="outline"><BarChart2 className="mr-1"/> मेरी रैंक</Button>
                    <Button variant="outline"><Award className="mr-1"/> बैज देखें</Button>
                </div>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Globe/> वैश्विक आँकड़े और प्रभाव</CardTitle></CardHeader>
            <CardContent>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-2 bg-muted rounded-lg">
                        <UsersIcon className="mx-auto mb-1 h-5 w-5"/>
                        <p className="font-bold">१२ लाख+</p>
                        <p className="text-xs text-muted-foreground">यूजर</p>
                    </div>
                     <div className="p-2 bg-muted rounded-lg">
                        <Globe className="mx-auto mb-1 h-5 w-5"/>
                        <p className="font-bold">८५ देश</p>
                    </div>
                     <div className="p-2 bg-muted rounded-lg">
                        <Lightbulb className="mx-auto mb-1 h-5 w-5"/>
                        <p className="font-bold">३४.५K</p>
                        <p className="text-xs text-muted-foreground">समाधान</p>
                    </div>
                     <div className="p-2 bg-muted rounded-lg">
                        <CheckCircle className="mx-auto mb-1 h-5 w-5 text-green-500"/>
                        <p className="font-bold">५६७</p>
                        <p className="text-xs text-muted-foreground">कार्यान्वित</p>
                    </div>
                 </div>
                 <div className="mt-4 space-y-2">
                    <p className="text-sm flex items-center gap-2">📈 प्रभाव ग्राफ: <Progress value={45} className="w-24 h-2"/> +४५% (पिछले महीने)</p>
                    <p className="text-sm">🌍 सबसे सक्रिय देश: 🇺🇸 USA, 🇮🇳 भारत, 🇩🇪 जर्मनी, 🇧🇷 ब्राज़ील, 🇯🇵 जापान</p>
                 </div>
                 <Separator className="my-4"/>
                 <div className="flex flex-wrap gap-2">
                    <Button variant="outline"><BarChart2 className="mr-1"/> विस्तृत एनालिटिक्स</Button>
                    <Button variant="outline"><Download className="mr-1"/> रिपोर्ट डाउनलोड</Button>
                    <Button variant="outline"><UsersIcon className="mr-1"/> भागीदार</Button>
                 </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Zap/> त्वरित क्रियाएँ (क्विक एक्शन्स)</CardTitle></CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                    <Button><Plus className="mr-1"/> नई चर्चा</Button>
                    <Button><Lightbulb className="mr-1"/> समाधान सुझाएँ</Button>
                    <Button variant="outline"><Vote className="mr-1"/> वोट दें</Button>
                    <Button variant="outline"><Share2 className="mr-1"/> शेयर</Button>
                    <Button variant="outline"><Bookmark className="mr-1"/> बुकमार्क</Button>
                    <Button variant="outline"><Bell className="mr-1"/> अलर्ट सेट करें</Button>
                    <Button variant="outline"><UserPlus className="mr-1"/> आमंत्रित करें</Button>
                    <Button variant="outline"><Languages className="mr-1"/> अनुवाद</Button>
                </div>
                 <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="समस्या, श्रेणी, देश, यूजर..." className="pl-9" />
                </div>
            </CardContent>
        </Card>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-20 bg-background border-t p-1 flex items-center justify-between">
         <div className="flex justify-around flex-grow">
            <Button variant="ghost" className="flex flex-col h-auto p-1 items-center gap-1 text-primary">
              <Home className="w-5 h-5"/> <span className="text-xs">होम</span>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto p-1 items-center gap-1 text-muted-foreground">
              <Flame className="w-5 h-5"/> <span className="text-xs">ट्रेंडिंग</span>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto p-1 items-center gap-1 text-muted-foreground">
              <MessageSquare className="w-5 h-5"/> <span className="text-xs">चर्चाएँ</span>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto p-1 items-center gap-1 text-muted-foreground">
              <Lightbulb className="w-5 h-5"/> <span className="text-xs">समाधान</span>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto p-1 items-center gap-1 text-muted-foreground">
              <Crown className="w-5 h-5"/> <span className="text-xs">लीडरबोर्ड</span>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto p-1 items-center gap-1 text-muted-foreground">
              <Globe className="w-5 h-5"/> <span className="text-xs">वैश्विक</span>
            </Button>
        </div>
        <Separator orientation="vertical" className="h-8 mx-1"/>
        <div className="text-xs text-muted-foreground text-center pr-2">
            <p className="flex items-center gap-1"><Globe className="w-3 h-3"/> २४,५६७ एक्टिव</p>
            <p className="flex items-center gap-1"><Clock className="w-3 h-3"/> रीयल-टाइम</p>
        </div>
      </footer>
    </div>
  );
}
