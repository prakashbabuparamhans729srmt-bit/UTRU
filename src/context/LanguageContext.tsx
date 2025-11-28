
'use client';

import React, { useState, createContext, useContext, useEffect } from 'react';

// Define the shape of your translations
interface Translations {
    settings: {
        title: string;
        orderMessages: string;
        orderMessagesDescription: string;
        language: string;
        change: string;
        notificationsAndReminders: string;
        whatsapp: string;
        sms: string;
        email: string;
        pushNotification: string;
        voiceCalls: string;
        privacyAndData: string;
    };
    // Add other pages and keys here
}

// Define the translations for each language
const translations: Record<string, Translations> = {
    English: {
        settings: {
            title: 'Setting',
            orderMessages: 'Order related messages',
            orderMessagesDescription: "Order related messages can't be turned off as they are important for service experience.",
            language: 'Language',
            change: 'change',
            notificationsAndReminders: 'Notifications & reminders',
            whatsapp: 'Whatsapp',
            sms: 'SMS',
            email: 'Email',
            pushNotification: 'Push Notification',
            voiceCalls: 'Voice calls',
            privacyAndData: 'Privacy & Data',
        },
    },
    'हिंदी': {
        settings: {
            title: 'सेटिंग',
            orderMessages: 'ऑर्डर संबंधित संदेश',
            orderMessagesDescription: "ऑर्डर से संबंधित संदेशों को बंद नहीं किया जा सकता क्योंकि वे सेवा अनुभव के लिए महत्वपूर्ण हैं।",
            language: 'भाषा',
            change: 'बदलें',
            notificationsAndReminders: 'सूचनाएं और अनुस्मारक',
            whatsapp: 'व्हाट्सएप',
            sms: 'एसएमएस',
            email: 'ईमेल',
            pushNotification: 'पुश अधिसूचना',
            voiceCalls: 'वॉयस कॉल',
            privacyAndData: 'गोपनीयता और डेटा',
        },
    },
    'Bhojpuri': {
         settings: {
            title: 'सेटिंग',
            orderMessages: 'ऑर्डर संबंधित संदेश',
            orderMessagesDescription: "ऑर्डर से संबंधित संदेशों के बंद ना कईल जा सकेला काहेकि इ सेवा अनुभव खातिर महत्वपूर्ण बा।",
            language: 'भाषा',
            change: 'बदलीं',
            notificationsAndReminders: 'सूचना अवुरी रिमाइंडर',
            whatsapp: 'व्हाट्सएप',
            sms: 'एसएमएस',
            email: 'ईमेल',
            pushNotification: 'पुश सूचना',
            voiceCalls: 'आवाज कॉल',
            privacyAndData: 'गोपनीयता अवुरी डेटा',
        },
    },
    'मराठी': {
         settings: {
            title: 'सेटिंग',
            orderMessages: 'ऑर्डर संबंधित संदेश',
            orderMessagesDescription: "ऑर्डर संबंधित संदेश बंद केले जाऊ शकत नाहीत कारण ते सेवा अनुभवासाठी महत्त्वाचे आहेत.",
            language: 'भाषा',
            change: 'बदला',
            notificationsAndReminders: 'सूचना आणि स्मरणपत्रे',
            whatsapp: 'व्हाट्सएप',
            sms: 'एसएमएस',
            email: 'ईमेल',
            pushNotification: 'पुश सूचना',
            voiceCalls: 'व्हॉइस कॉल',
            privacyAndData: 'गोपनीयता आणि डेटा',
        },
    }
    // Add other languages here, I have added a few as an example.
    // You can add all the languages you provided in the same way.
};

interface LanguageContextType {
    language: string;
    setLanguage: (language: string) => void;
    translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguageState] = useState('English');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && translations[savedLanguage]) {
            setLanguageState(savedLanguage);
        }
    }, []);

    const setLanguage = (lang: string) => {
        if (translations[lang]) {
            setLanguageState(lang);
            localStorage.setItem('language', lang);
        }
    };

    const currentTranslations = translations[language] || translations.English;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, translations: currentTranslations }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
