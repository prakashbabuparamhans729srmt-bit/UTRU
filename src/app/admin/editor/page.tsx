
'use client';

import {
  Save,
  Eye,
  Ban,
  Settings,
  MapPin,
  Plus,
  Target,
  Bell,
  Paperclip,
  Camera,
  Video,
  File as FileIcon,
  Link as LinkIcon,
  ChevronLeft,
  Trash2,
  Edit,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { useUser, useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CONTENT_TYPES = [
    { value: 'मौसम', label: 'मौसम (Weather)' },
    { value: 'आपातकालीन', label: 'आपातकालीन (Emergency)' },
    { value: 'स्थानीय समाचार', label: 'स्थानीय समाचार (Local News)' },
    { value: 'स्थानीय आँकड़े', label: 'स्थानीय आँकड़े (Statistics)' },
    { value: 'जिला प्रशासन', label: 'जिला प्रशासन (Administration)' },
    { value: 'जिला वेब सूची', label: 'जिला वेब सूची (District Web List)' },
    { value: 'राज्य वेब सूची', label: 'राज्य वेब सूची (State Web List)' },
    { value: 'देश वेब सूची', label: 'देश वेब सूची (Country Web List)' },
    { value: 'banner', label: 'बैनर (Banner Carousel)' },
];

export default function ContentEditorPage() {
    const router = useRouter();
    const { user } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [priority, setPriority] = useState('सामान्य');
    const [publishDate, setPublishDate] = useState('');
    const [publishTime, setPublishTime] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [expiryTime, setExpiryTime] = useState('');
    const [contentData, setContentData] = useState('');
    const [sendNotification, setSendNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleSave = async () => {
        if (!title || !type || !contentData) {
            toast({
                variant: 'destructive',
                title: 'आवश्यक फ़ील्ड',
                description: 'कृपया शीर्षक, प्रकार, और कंटेंट डेटा भरें।',
            });
            return;
        }

        if (!user || !firestore) {
            toast({
                variant: 'destructive',
                title: 'प्रमाणीकरण त्रुटि',
                description: 'कृपया कंटेंट सहेजने के लिए लॉग इन करें।',
            });
            router.push('/admin/login');
            return;
        }

        setIsLoading(true);

        const contentObject = {
            title,
            type,
            location,
            priority,
            publishDate,
            publishTime,
            expiryDate,
            expiryTime,
            contentData,
            sendNotification,
            notificationMessage,
            createdBy: user.uid,
            createdAt: serverTimestamp(),
        };

        try {
            const contentCollection = collection(firestore, 'content');
            await addDoc(contentCollection, contentObject);
            toast({
                title: 'सहेज लिया गया!',
                description: 'कंटेंट सफलतापूर्वक सहेज लिया गया है।',
            });
            router.push('/admin');
        } catch (serverError) {
            const permissionError = new FirestorePermissionError({
                path: 'content',
                operation: 'create',
                requestResourceData: contentObject,
            });
            errorEmitter.emit('permission-error', permissionError);
            toast({
                variant: 'destructive',
                title: 'त्रुटि',
                description: 'कंटेंट सहेजने में विफल।',
            });
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4">
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ChevronLeft/>
            </Button>
            <h1 className="text-xl font-bold flex items-center gap-2"><Edit/>कंटेंट संपादक</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary"><Eye className="mr-2 h-4 w-4" />प्रीव्यू</Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            सहेजें
            </Button>
          <Button variant="destructive" onClick={() => router.back()}><Ban className="mr-2 h-4 w-4" />रद्द</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Settings/>बेसिक सेटिंग्स</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">शीर्षक</Label>
                <Input id="title" placeholder="कंटेंट का शीर्षक" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <Label htmlFor="type">कंटेंट का प्रकार (Type)</Label>
                    <Select onValueChange={setType} value={type}>
                        <SelectTrigger id="type">
                            <SelectValue placeholder="प्रकार चुनें" />
                        </SelectTrigger>
                        <SelectContent>
                            {CONTENT_TYPES.map(t => (
                                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <Label htmlFor="location">स्थान</Label>
                    <div className='flex items-center gap-2'>
                        <Input id="location" placeholder="जैसे - लखनऊ, उत्तर प्रदेश" value={location} onChange={(e) => setLocation(e.target.value)} />
                        <Button variant="outline" size="icon"><MapPin/></Button>
                    </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <Label htmlFor="priority">प्राथमिकता</Label>
                    <Input id="priority" placeholder="जैसे - सामान्य, उच्च" value={priority} onChange={(e) => setPriority(e.target.value)} />
                </div>
                 <div>
                    <Label>प्रकाशन तिथि</Label>
                    <div className="flex gap-2 items-center">
                        <Input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} />
                        <Input type="time" value={publishTime} onChange={(e) => setPublishTime(e.target.value)} />
                    </div>
                </div>
              </div>
              <div>
                  <Label>समाप्ति तिथि</Label>
                  <div className="flex gap-2 items-center">
                        <Input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                        <Input type="time" value={expiryTime} onChange={(e) => setExpiryTime(e.target.value)} />
                    </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileIcon/>कंटेंट डेटा 
                    {type.includes('सूची') && <span className="text-xs font-normal text-primary">(JSON फॉर्मेट अनिवार्य)</span>}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {type.includes('सूची') && (
                    <div className="bg-muted p-2 rounded-md mb-2 text-[10px] font-mono">
                        उदाहरण: [{"label": "Google", "url": "https://google.com"}]
                    </div>
                )}
                <Textarea placeholder="कंटेंट यहाँ लिखें (JSON, टेक्स्ट, आदि)..." rows={10} value={contentData} onChange={(e) => setContentData(e.target.value)} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Target/>टारगेट और डिस्प्ले सेटिंग्स</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label>दिखाएँ जिले</Label>
                    <div className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><Checkbox id="lko"/><Label htmlFor="lko">लखनऊ</Label></div>
                        <div className="flex items-center space-x-2"><Checkbox id="brb"/><Label htmlFor="brb">बाराबंकी</Label></div>
                        <div className="flex items-center space-x-2"><Checkbox id="un"/><Label htmlFor="un">उन्नाव</Label></div>
                        <Button variant="link" size="sm"><Plus className="w-4 h-4 mr-1"/>सभी</Button>
                    </div>
                </div>
                 <div>
                    <Label>यूजर समूह</Label>
                    <div className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><Checkbox id="all-users"/><Label htmlFor="all-users">सभी यूजर</Label></div>
                        <div className="flex items-center space-x-2"><Checkbox id="premium"/><Label htmlFor="premium">प्रीमियम</Label></div>
                        <div className="flex items-center space-x-2"><Checkbox id="registered"/><Label htmlFor="registered">केवल रजिस्टर्ड</Label></div>
                    </div>
                </div>
                 <div>
                    <Label>डिवाइस</Label>
                    <div className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><Checkbox defaultChecked id="mobile"/><Label htmlFor="mobile">मोबाइल</Label></div>
                        <div className="flex items-center space-x-2"><Checkbox defaultChecked id="tablet"/><Label htmlFor="tablet">टैबलेट</Label></div>
                         <div className="flex items-center space-x-2"><Checkbox defaultChecked id="desktop"/><Label htmlFor="desktop">डेस्कटॉप</Label></div>
                    </div>
                </div>
                 <div>
                    <Label>भाषाएँ</Label>
                    <div className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><Checkbox defaultChecked id="hindi"/><Label htmlFor="hindi">हिंदी</Label></div>
                        <div className="flex items-center space-x-2"><Checkbox id="english"/><Label htmlFor="english">अंग्रेजी</Label></div>
                         <Button variant="link" size="sm"><Plus className="w-4 h-4 mr-1"/>अन्य</Button>
                    </div>
                </div>
                <div>
                    <Label className="flex items-center gap-2"><Bell/>नोटिफिकेशन</Label>
                    <div className='flex items-center gap-2 mt-2'>
                        <Switch id="notification-switch" checked={sendNotification} onCheckedChange={setSendNotification} />
                        <Label htmlFor="notification-switch">पुश नोटिफिकेशन भेजें</Label>
                    </div>
                    <Textarea className="mt-2" placeholder="नोटिफिकेशन संदेश..." value={notificationMessage} onChange={(e) => setNotificationMessage(e.target.value)} />
                </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Paperclip/>अटैचमेंट और मीडिया</CardTitle></CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                    <Button variant="outline"><Camera className="mr-2 h-4 w-4"/>छवि जोड़ें</Button>
                    <Button variant="outline"><Video className="mr-2 h-4 w-4"/>वीडियो जोड़ें</Button>
                    <Button variant="outline"><FileIcon className="mr-2 h-4 w-4"/>डेटा फ़ाइल</Button>
                    <Button variant="outline"><MapPin className="mr-2 h-4 w-4"/>मैप लिंक जोड़ें</Button>
                    <Button variant="outline"><LinkIcon className="mr-2 h-4 w-4"/>एक्सटर्नल लिंक</Button>
                </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Eye/>लाइव प्रीव्यू (मोबाइल व्यू)</CardTitle></CardHeader>
                <CardContent>
                    <div className="w-full max-w-[300px] mx-auto border-4 border-gray-800 rounded-2xl p-2 bg-white dark:bg-black">
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><FileIcon/> {title || 'कंटेंट प्रीव्यू'}</CardTitle></CardHeader>
                            <CardContent className="text-xs space-y-2">
                                <p className="font-bold">{type} - {location}</p>
                                <p className="text-muted-foreground">{contentData || 'कंटेंट का प्रीव्यू यहाँ दिखाई देगा जब आप उसे लिखेंगे।'}</p>
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
