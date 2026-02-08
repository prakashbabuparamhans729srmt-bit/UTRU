
'use client';

import {
  Save,
  Eye,
  Ban,
  Settings,
  Calendar,
  Clock,
  Rocket,
  MapPin,
  Globe,
  Plus,
  Droplets,
  Wind,
  Sunrise,
  Sunset,
  Sun,
  CloudSun,
  CloudRain,
  Target,
  Bell,
  Paperclip,
  Camera,
  Video,
  File,
  Link,
  ChevronLeft,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export default function ContentEditorPage() {
    const router = useRouter();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4">
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ChevronLeft/>
            </Button>
            <h1 className="text-xl font-bold">कंटेंट संपादक: मौसम डेटा - लखनऊ</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary"><Eye className="mr-2 h-4 w-4" />प्रीव्यू</Button>
          <Button><Save className="mr-2 h-4 w-4" />सहेजें</Button>
          <Button variant="destructive"><Ban className="mr-2 h-4 w-4" />रद्द</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Settings/>बेसिक सेटिंग्स</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">शीर्षक</Label>
                <Input id="title" defaultValue="लखनऊ मौसम अपडेट - अगस्त २०२४" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <Label htmlFor="type">प्रकार</Label>
                    <Input id="type" defaultValue="मेरा स्थान - मौसम डेटा"/>
                </div>
                 <div>
                    <Label htmlFor="location">स्थान</Label>
                    <Input id="location" defaultValue="लखनऊ, उत्तर प्रदेश"/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <Label htmlFor="priority">प्राथमिकता</Label>
                    <Input id="priority" defaultValue="सामान्य"/>
                </div>
                 <div>
                    <Label>प्रकाशन तिथि</Label>
                    <div className="flex gap-2">
                        <Input type="text" defaultValue="१५/०८/२०२४" />
                        <Input type="text" defaultValue="१०:०० AM" />
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><CloudSun/>मौसम डेटा इनपुट</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <div><Label>तापमान (°C)</Label><Input defaultValue="32"/></div>
                    <div><Label>आर्द्रता (%)</Label><Input defaultValue="65"/></div>
                    <div><Label>हवा (km/h)</Label><Input defaultValue="12"/></div>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div><Label>AQI सूचकांक</Label><Input defaultValue="45"/></div>
                    <div><Label>AQI स्तर</Label><Input defaultValue="अच्छा"/></div>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div><Label>सूर्योदय</Label><Input defaultValue="०५:४५ AM"/></div>
                    <div><Label>सूर्यास्त</Label><Input defaultValue="०६:३० PM"/></div>
                </div>
                <div>
                    <Label>सलाह/चेतावनी</Label>
                    <Textarea defaultValue="बाहरी गतिविधियों के लिए उत्तम दिन"/>
                </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Target/>टारगेट और डिस्प्ले सेटिंग्स</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label>दिखाएँ जिले</Label>
                    <div className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><Checkbox defaultChecked id="lko"/><Label htmlFor="lko">लखनऊ</Label></div>
                        <div className="flex items-center space-x-2"><Checkbox defaultChecked id="brb"/><Label htmlFor="brb">बाराबंकी</Label></div>
                    </div>
                </div>
                <div>
                    <Label>यूजर समूह</Label>
                    <div className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><Checkbox defaultChecked id="all-users"/><Label htmlFor="all-users">सभी यूजर</Label></div>
                        <div className="flex items-center space-x-2"><Checkbox id="premium"/><Label htmlFor="premium">प्रीमियम</Label></div>
                    </div>
                </div>
                <div>
                    <Label>नोटिफिकेशन भेजें</Label>
                    <Switch className="ml-4" defaultChecked/>
                    <Textarea className="mt-2" placeholder="नोटिफिकेशन संदेश..."/>
                </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Paperclip/>अटैचमेंट और मीडिया</CardTitle></CardHeader>
            <CardContent>
                <div className="flex gap-2 mb-4">
                    <Button variant="outline"><Camera className="mr-2 h-4 w-4"/>छवि जोड़ें</Button>
                    <Button variant="outline"><Video className="mr-2 h-4 w-4"/>वीडियो जोड़ें</Button>
                    <Button variant="outline"><File className="mr-2 h-4 w-4"/>डेटा फ़ाइल</Button>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                        <p>weather_lko_150824.jpg (२.५ MB)</p>
                        <div className="flex gap-2"><Button size="icon" variant="ghost"><Eye/></Button><Button size="icon" variant="ghost"><Trash2/></Button></div>
                    </div>
                     <div className="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                        <p>aqi_report_lko.pdf (१.२ MB)</p>
                        <div className="flex gap-2"><Button size="icon" variant="ghost"><Eye/></Button><Button size="icon" variant="ghost"><Trash2/></Button></div>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Eye/>लाइव प्रीव्यू (मोबाइल)</CardTitle></CardHeader>
                <CardContent>
                    <div className="w-full max-w-[300px] mx-auto border-4 border-gray-800 rounded-2xl p-2 bg-white dark:bg-black">
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><CloudSun/>मौसम और पर्यावरण</CardTitle></CardHeader>
                            <CardContent className="text-xs space-y-1">
                                <p>☀️ तापमान: ३२°C | 💧 आर्द्रता: ६५%</p>
                                <p>💨 हवा: १२ km/h</p>
                                <p>🌅 सूर्योदय: ५:४५ AM | 🌇 सूर्यास्त: ६:३०</p>
                                <p className="text-green-600 font-bold">🟢 वायु गुणवत्ता सूचकांक (AQI): ४५ (अच्छा)</p>
                                <p>🔊 सलाह: बाहरी गतिविधियों के लिए उत्तम दिन</p>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
