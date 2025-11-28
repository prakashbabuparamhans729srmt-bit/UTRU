
'use client';

import React, { useState, createContext, useContext, useEffect } from 'react';

// Define the shape of your translations
interface Translations {
    settings: {
        title: string;
    };
    // Add other pages and keys here
}

// Define the translations for each language
const translations: Record<string, Translations> = {
    English: {
        settings: {
            title: 'Setting',
        },
    },
    'हिंदी': {
        settings: {
            title: 'सेटिंग',
        },
    },
    'Bhojpuri': {
        settings: {
            title: 'सेटिंग',
        }
    },
    'मराठी': {
        settings: {
            title: 'सेटिंग',
        }
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
