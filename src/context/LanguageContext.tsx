
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
        admin: string;
        masterAdminPanel: string;
        open: string;
    };
    about: {
        title: string;
        welcome: string;
        storyTitle: string;
        storyP1: string;
        storyP2: string;
    };
    address: {
        title: string;
        nothingHere: string;
        deliveryMessage: string;
        addNew: string;
        currentLocation: string;
        change: string;
    },
    cart: {
        searchPlaceholder: string;
        blackFriday: string;
        discountsAvailable: string;
        categories: string;
        seeAll: string;
        popularProducts: string;
        yourCart: string;
        emptyTitle: string;
        emptySubtitle: string;
        browseServices: string;
        paymentSummary: string;
        itemTotal: string;
        deliveryFee: string;
        platformFee: string;
        toPay: string;
        checkout: string;
    },
    home: {
        searchPlaceholder: string;
        locationLabel: string;
        all: string;
        electronics: string;
        beauty: string;
        kids: string;
        gifting: string;
        premium: string;
        productBuy: string;
        category: string;
        popularProducts: string;
        home: string;
        bookings: string;
        chat: string;
        profile: string;
        car: string;
        painting: string;
        more: string;
        library: string;
        explore: string;
        opinion: string;
    },
    language: {
        title: string;
        chooseLanguage: string;
        update: string;
    },
    location: {
        selectLocation: string;
        man: string;
        searchPlaceholder: string;
        emergency: string;
        my: string;
        district: string;
        state: string;
        bharat: string;
        blackFriday: string;
        discountsAvailable: string;
        whatElsePopular: string;
        seeAll: string;
        home: string;
        library: string;
        explore: string;
        opinion: string;
    },
    login: {
        continueWithPhone: string;
    },
    myPlans: {
        title: string;
        activePlans: string;
        noActivePlans: string;
        bookings: string;
        pastBookings: string;
    },
    nativeDevices: {
        title: string;
        oops: string;
        textWidget: string;
    },
    newAddress: {
        title: string;
        completeAddress: string;
        orderingFor: string;
        myself: string;
        someoneElse: string;
        home: string;
        work: string;
        hotel: string;
        other: string;
        name: string;
        mobile: string;
        flatHouse: string;
        floor: string;
        landmark: string;
        save: string;
    },
    paymentSettings: {
        title: string;
        cards: string;
        creditDebit: string;
        sliceUpi: string;
        pluxee: string;
        netbanking: string;
        add: string;
        payOnDelivery: string;
        wallets: string;
        googlePay: string;
        link: string;
        amazonPay: string;
    },
    phoneLogin: {
        title: string;
        subtitle: string;
        placeholder: string;
        continue: string;
    },
    plusMembership: {
        title: string;
        oops: string;
        textWidget: string;
    },
    profile: {
        title: string;
        continue: string;
        loginMessage: string;
        payments: string;
        support: string;
        wallet: string;
        myPlans: string;
        nativeDevices: string;
        addressBook: string;
        plusMembership: string;
        myRating: string;
        setting: string;
        otherInfo: string;
        shareApp: string;
        aboutUs: string;
        logOut: string;
        referEarn: string;
        referEarnDescription: string;
        hurryUp: string;
        referNow: string;
        lightMode: string;
        darkMode: string;
        appVersions: string;
    },
    refer: {
        title: string;
        subtitle: string;
        code: string;
        share: string;
    },
    search: {
        searchPlaceholder: string;
        resultsFor: string;
        noResults: string;
        tryAgain: string;
    },
    support: {
        title: string;
aiChatbot: string;
webLink: string;
    },
    verifyPhone: {
        title: string;
        subtitle: string;
        changeNumber: string;
        verifyCode: string;
    },
    wallet: {
        title: string;
        availableBalance: string;
        transitionHistory: string;
        refund: string;
    },
    paymentSuccess: {
        title: string;
        subtitle: string;
        viewBookings: string;
        continueShopping: string;
    }
}

// Define the translations for each language
const translations: Record<string, Translations> = {
    English: {
        settings: {
            title: 'Settings',
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
            admin: 'Admin',
            masterAdminPanel: 'Master Admin Panel',
            open: 'Open',
        },
        about: {
            title: 'About Us',
            welcome: 'Welcome to our app, your ultimate destination for a seamless experience! We are an innovative, customer-centric platform designed to bring you the best services, exceptional deals, and unrivaled convenience—all at your fingertips.',
            storyTitle: 'Our Story',
            storyP1: 'We began with a simple idea: to provide a platform that not only offers a wide variety of services but also makes the entire process effortless and enjoyable.',
            storyP2: 'From humble beginnings, we quickly grew into one of the most trusted platforms. Our core values of customer satisfaction, accessibility, and constant innovation continue to drive us as we aim to expand our offerings.',
        },
        address: {
            title: 'My addresses',
            nothingHere: 'Nothing here yet',
            deliveryMessage: 'Tell us where you want your orders delivered',
            addNew: 'Add new address',
            currentLocation: 'Use current location',
            change: 'Change'
        },
        cart: {
            searchPlaceholder: 'Search for...',
            blackFriday: 'BLACK FRIEDAY',
            discountsAvailable: 'discounts are available',
            categories: 'Categories',
            seeAll: 'See all',
            popularProducts: 'Popular products',
            yourCart: 'Your Cart',
            emptyTitle: 'Your cart is empty',
            emptySubtitle: "Looks like you haven't added any services yet.",
            browseServices: 'Browse Services',
            paymentSummary: 'Payment Summary',
            itemTotal: 'Item Total',
            deliveryFee: 'Delivery Fee',
            platformFee: 'Platform Fee',
            toPay: 'To Pay',
            checkout: 'Proceed to Checkout',
        },
        home: {
            searchPlaceholder: 'Search for services, e.g. Plumber...',
            locationLabel: 'Location',
            all: 'All',
            electronics: 'Electronics',
            beauty: 'Beauty',
            kids: 'Kids',
            gifting: 'Gifting',
            premium: 'Cleaning',
            productBuy: 'Product Buy',
            category: 'Category',
            popularProducts: 'Popular Products',
            home: 'Home',
            bookings: 'Bookings',
            chat: 'Chat',
            profile: 'Profile',
            car: 'Car',
            painting: 'Painting',
            more: 'More',
            library: 'Library',
            explore: 'Explore',
            opinion: 'Opinion',
        },
        language: {
            title: 'Select Language',
            chooseLanguage: 'Choose your preferred language',
            update: 'Update Language',
        },
        location: {
            selectLocation: 'Select Location',
            man: 'Man',
            searchPlaceholder: 'Search for...',
            emergency: 'Emergency',
            my: 'My',
            district: 'District',
            state: 'State',
            bharat: 'Bharat',
            blackFriday: 'BLACK FRIDAY',
            discountsAvailable: 'discounts are available',
            whatElsePopular: 'What else is popular',
            seeAll: 'See all',
            home: 'Home',
            library: 'Library',
            explore: 'Explore',
            opinion: 'Opinion',
        },
        login: {
            continueWithPhone: 'Continue with Phone'
        },
        myPlans: {
            title: 'My Bookings',
            activePlans: 'Upcoming Bookings',
            noActivePlans: 'You have no upcoming bookings.',
            bookings: 'Bookings',
            pastBookings: 'Past Bookings',
        },
        nativeDevices: {
            title: 'Native',
            oops: "Oops, you haven't placed an order yet",
            textWidget: '[Text Widget]',
        },
        newAddress: {
            title: 'newaddress',
            completeAddress: 'Enter complete address',
            orderingFor: 'Who you are ordering for ?',
            myself: 'My self',
            someoneElse: 'Someone else',
            home: 'Home',
            work: 'work',
            hotel: 'Hotel',
            other: 'Other',
            name: 'Name',
            mobile: 'Mobile no.',
            flatHouse: 'Flat / House no / Building name',
            floor: 'Floor (Optional)',
            landmark: 'Near by landmark (Optional)',
            save: 'Save',
        },
        paymentSettings: {
            title: 'Payment setting',
            cards: 'Cards',
            creditDebit: 'Credit card / Devit card',
            sliceUpi: 'slice UPI',
            pluxee: 'Pluxxee',
            netbanking: 'Netbanking',
            add: 'Add',
            payOnDelivery: 'Pay on delivery',
            wallets: 'Wallets',
            googlePay: 'Google Pay UPI',
            link: 'Link',
            amazonPay: 'Amazon pay balence',
        },
        phoneLogin: {
            title: 'Login with Phone',
            subtitle: 'Input your number below in order to login.',
            placeholder: 'Your phone number...',
            continue: 'Continue',
        },
        plusMembership: {
            title: 'Membership',
            oops: "Oops, you haven't placed an order yet",
            textWidget: '[Text Widget]',
        },
        profile: {
            title: 'Profile',
            continue: 'Continue',
            loginMessage: 'Log in or sign up to view your complete profile',
            payments: 'My Payments',
            support: 'Help & Support',
            wallet: 'My Wallet',
            myPlans: 'My Bookings',
            nativeDevices: 'Native devices',
            addressBook: 'Address book',
            plusMembership: 'Plus membership',
            myRating: 'My rating',
            setting: 'Settings',
            otherInfo: 'OTHER INFORMATION',
            shareApp: 'Share the app',
            aboutUs: 'About us',
            logOut: 'Log out',
            referEarn: 'Refer or Earn',
            referEarnDescription: 'Get ₹ 100 when your friend completes their first booking.',
            hurryUp: 'Hurry up',
            referNow: 'Refer now',
            lightMode: 'Light Mode',
            darkMode: 'Dark Mode',
            appVersions: 'App Versions',
        },
        refer: {
            title: 'Refer & Earn',
            subtitle: 'Share your code with friends and get rewards!',
            code: 'Your Code',
            share: 'Share Now'
        },
        search: {
            searchPlaceholder: 'Search for...',
            resultsFor: 'Results for',
            noResults: 'No results found',
            tryAgain: 'Try searching for something else.',
        },
        support: {
            title: 'Support',
aiChatbot: 'AI Chatbot',
webLink: 'Web Link',
        },
        verifyPhone: {
            title: 'Verification Code',
            subtitle: 'Enter the 6 digit code that you received at:',
            changeNumber: 'change number?',
            verifyCode: 'Verify Code',
        },
        wallet: {
            title: 'UC Wallet',
            availableBalance: 'Available Balance',
            transitionHistory: 'Transition history',
            refund: 'Refund',
        },
        paymentSuccess: {
            title: 'Order Placed Successfully!',
            subtitle: "Your booking has been confirmed. You can check the status of your booking in the 'My Bookings' section.",
            viewBookings: 'View Bookings',
            continueShopping: 'Continue Shopping',
        },
    },
    'हिंदी': {
        settings: {
            title: 'सेटिंग्स',
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
            admin: 'एडमिन',
            masterAdminPanel: 'मास्टर एडमिन पैनल',
            open: 'खोलें',
        },
        about: {
            title: 'हमारे बारे में',
            welcome: 'हमारे ऐप में आपका स्वागत है, एक सहज अनुभव के लिए आपका अंतिम गंतव्य! हम एक अभिनव, ग्राहक-केंद्रित प्लेटफ़ॉर्म हैं जो आपको सर्वोत्तम सेवाएँ, असाधारण सौदे और अद्वितीय सुविधा प्रदान करने के लिए डिज़ाइन किया गया है - सब कुछ आपकी उंगलियों पर।',
            storyTitle: 'हमारी कहानी',
            storyP1: 'हमने एक सरल विचार के साथ शुरुआत की: एक ऐसा प्लेटफ़ॉर्म प्रदान करना जो न केवल विभिन्न प्रकार की सेवाएँ प्रदान करता है बल्कि पूरी प्रक्रिया को सहज और मनोरंजक भी बनाता है।',
            storyP2: 'मामूली शुरुआत से, हम जल्दी से सबसे भरोसेमंद प्लेटफ़ॉर्म में से एक बन गए। ग्राहक संतुष्टि, पहुंच और निरंतर नवाचार के हमारे मूल मूल्य हमें आगे बढ़ाते रहते हैं क्योंकि हमारा लक्ष्य अपने प्रस्तावों का विस्तार करना है।',
        },
        address: {
            title: 'मेरे पते',
            nothingHere: 'यहाँ अभी कुछ नहीं है',
            deliveryMessage: 'हमें बताएं कि आप अपने ऑर्डर कहां पहुंचाना चाहते हैं',
            addNew: 'नया पता जोड़ें',
            currentLocation: 'वर्तमान स्थान का उपयोग करें',
            change: 'बदलें',
        },
        cart: {
            searchPlaceholder: 'के लिए खोजें...',
            blackFriday: 'ब्लैक फ्राइडे',
            discountsAvailable: 'छूट उपलब्ध है',
            categories: 'श्रेणियाँ',
            seeAll: 'सभी देखें',
            popularProducts: 'लोकप्रिय उत्पाद',
            yourCart: 'आपकी कार्ट',
            emptyTitle: 'आपकी कार्ट खाली है',
            emptySubtitle: 'लगता है आपने अभी तक कोई सेवा नहीं जोड़ी है।',
            browseServices: 'सेवाएं ब्राउज़ करें',
            paymentSummary: 'भुगतान सारांश',
            itemTotal: 'कुल आइटम',
            deliveryFee: 'डिलीवरी शुल्क',
            platformFee: 'प्लेटफार्म शुल्क',
            toPay: 'भुगतान करना है',
            checkout: 'चेकआउट के लिए आगे बढ़ें',
        },
        home: {
            searchPlaceholder: 'सेवाओं के लिए खोजें, जैसे प्लंबर...',
            locationLabel: 'स्थान',
            all: 'सभी',
            electronics: 'इलेक्ट्रॉनिक्स',
            beauty: 'सौंदर्य',
            kids: 'बच्चे',
            gifting: 'उपहार',
            premium: 'सफाई',
            productBuy: 'उत्पाद खरीदें',
            category: 'श्रेणी',
            popularProducts: 'लोकप्रिय उत्पाद',
            home: 'होम',
            bookings: 'बुकिंग',
            chat: 'चैट',
            profile: 'प्रोफ़ाइल',
            car: 'कार',
            painting: 'पेंटिंग',
            more: 'और',
            library: 'लाइब्रेरी',
            explore: 'अन्वेषण करें',
            opinion: 'राय',
        },
        language: {
            title: 'भाषा चुनें',
            chooseLanguage: 'अपनी पसंदीदा भाषा चुनें',
            update: 'भाषा अपडेट करें',
        },
        location: {
            selectLocation: 'स्थान चुनें',
            man: 'आदमी',
            searchPlaceholder: 'के लिए खोजें...',
            emergency: 'आपातकाल',
            my: 'मेरा',
            district: 'जिला',
            state: 'राज्य',
            bharat: 'भारत',
            blackFriday: 'ब्लैक फ्राइडे',
            discountsAvailable: 'छूट उपलब्ध है',
            whatElsePopular: 'और क्या लोकप्रिय है',
            seeAll: 'सभी देखें',
            home: 'होम',
            library: 'लाइब्रेरी',
            explore: 'अन्वेषण करें',
            opinion: 'राय',
        },
        login: {
            continueWithPhone: 'फ़ोन से जारी रखें'
        },
        myPlans: {
            title: 'मेरी बुकिंग',
            activePlans: 'आगामी बुकिंग',
            noActivePlans: 'आपकी कोई आगामी बुकिंग नहीं है।',
            bookings: 'बुकिंग',
            pastBookings: 'पिछली बुकिंग',
        },
        nativeDevices: {
            title: 'देशी',
            oops: 'उफ़, आपने अभी तक कोई ऑर्डर नहीं दिया है',
            textWidget: '[टेक्स्ट विजेट]',
        },
        newAddress: {
            title: 'नया पता',
            completeAddress: 'पूरा पता दर्ज करें',
            orderingFor: 'आप किसके लिए ऑर्डर कर रहे हैं?',
            myself: 'मेरे लिए',
            someoneElse: 'किसी और के लिए',
            home: 'घर',
            work: 'कार्य',
            hotel: 'होटल',
            other: 'अन्य',
            name: 'नाम',
            mobile: 'मोबाइल नंबर',
            flatHouse: 'फ्लैट/मकान नंबर/इमारत का नाम',
            floor: 'मंज़िल (वैकल्पिक)',
            landmark: 'आस-पास का लैंडमार्क (वैकल्पिक)',
            save: 'सहेजें',
        },
        paymentSettings: {
            title: 'भुगतान सेटिंग',
            cards: 'कार्ड',
            creditDebit: 'क्रेडिट कार्ड / डेबिट कार्ड',
            sliceUpi: 'स्लाइस यूपीआई',
            pluxee: 'प्लक्सी',
            netbanking: 'नेटबैंकिंग',
            add: 'जोड़ें',
            payOnDelivery: 'डिलीवरी पर भुगतान',
            wallets: 'वॉलेट',
            googlePay: 'गूगल पे यूपीआई',
            link: 'लिंक करें',
            amazonPay: 'अमेज़न पे बैलेंस',
        },
        phoneLogin: {
            title: 'फ़ोन से लॉगिन करें',
            subtitle: 'लॉगिन करने के लिए नीचे अपना नंबर डालें।',
            placeholder: 'आपका फ़ोन नंबर...',
            continue: 'जारी रखें',
        },
        plusMembership: {
            title: 'सदस्यता',
            oops: 'उफ़, आपने अभी तक कोई ऑर्डर नहीं दिया है',
            textWidget: '[टेक्स्ट विजेट]',
        },
        profile: {
            title: 'प्रोफ़ाइल',
            continue: 'जारी रखें',
            loginMessage: 'अपनी पूरी प्रोफ़ाइल देखने के लिए लॉग इन या साइन अप करें',
            payments: 'मेरे भुगतान',
            support: 'सहायता और समर्थन',
            wallet: 'मेरा बटुआ',
            myPlans: 'मेरी बुकिंग',
            nativeDevices: 'देशी डिवाइस',
            addressBook: 'पता पुस्तिका',
            plusMembership: 'प्लस सदस्यता',
            myRating: 'मेरी रेटिंग',
            setting: 'सेटिंग्स',
            otherInfo: 'अन्य जानकारी',
            shareApp: 'ऐप साझा करें',
            aboutUs: 'हमारे बारे में',
            logOut: 'लॉग आउट करें',
            referEarn: 'रेफर करें या कमाएं',
            referEarnDescription: 'जब आपका दोस्त अपनी पहली बुकिंग पूरी कर ले तो ₹100 पाएं।',
            hurryUp: 'जल्दी करो',
            referNow: 'अभी रेफर करें',
            lightMode: 'लाइट मोड',
            darkMode: 'डार्क मोड',
            appVersions: 'ऐप संस्करण',
        },
        refer: {
            title: 'रेफर करें और कमाएं',
            subtitle: 'अपना कोड दोस्तों के साथ साझा करें और पुरस्कार पाएं!',
            code: 'आपका कोड',
            share: 'अभी साझा करें'
        },
        search: {
            searchPlaceholder: 'के लिए खोजें...',
            resultsFor: 'के लिए परिणाम',
            noResults: 'कोई परिणाम नहीं मिला',
            tryAgain: 'कुछ और खोजने का प्रयास करें।',
        },
        support: {
            title: 'समर्थन',
            aiChatbot: 'एआई चैटबॉट',
            webLink: 'वेब लिंक',
        },
        verifyPhone: {
            title: 'प्रमाणीकरण कोड',
            subtitle: 'आपको प्राप्त 6 अंकों का कोड दर्ज करें:',
            changeNumber: 'नंबर बदलें?',
            verifyCode: 'कोड सत्यापित करें',
        },
        wallet: {
            title: 'यूसी वॉलेट',
            availableBalance: 'उपलब्ध शेष राशि',
            transitionHistory: 'लेन-देन इतिहास',
            refund: 'धनवापसी',
        },
        paymentSuccess: {
            title: 'ऑर्डर सफलतापूर्वक दिया गया!',
            subtitle: 'आपकी बुकिंग की पुष्टि हो गई है। आप अपनी बुकिंग की स्थिति \'मेरी बुकिंग\' अनुभाग में देख सकते हैं।',
            viewBookings: 'बुकिंग देखें',
            continueShopping: 'खरीदारी जारी रखें',
        },
    },
    'Bhojpuri': {
        settings: {
            title: 'सेटिंग्स',
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
            admin: 'एडमिन',
            masterAdminPanel: 'मास्टर एडमिन पैनल',
            open: 'खोलीं',
        },
        about: {
            title: 'हमनी के बारे में',
            welcome: 'हमनी के ऐप में रउआ स्वागत बा, एक सहज अनुभव खातिर रउआ अंतिम गंतव्य! हमनी के एगो अभिनव, ग्राहक-केंद्रित प्लेटफॉर्म हईं जवन रउआ के बेहतरीन सेवा, असाधारण सौदा, आ बेजोड़ सुविधा देवे खातिर डिजाइन कइल गइल बा - सब रउआ अंगुरी पर।',
            storyTitle: 'हमनी के कहानी',
            storyP1: 'हमनी के एगो सरल विचार से शुरू कइनी: एगो अइसन प्लेटफॉर्म दिहल जवन खाली विभिन्न किसिम के सेवा ना देवेला बल्कि पूरा प्रक्रिया के सहज आ मनोरंजक भी बनावेला।',
            storyP2: 'मामूली शुरुआत से, हमनी के जल्दीए सबसे भरोसेमंद प्लेटफॉर्म में से एक बन गइनी। ग्राहक संतुष्टि, पहुंच, आ निरंतर नवाचार के हमनी के मूल मूल्य हमनी के आगे बढ़ावत रहेला काहेकि हमनी के लक्ष्य आपन प्रस्ताव के विस्तार करे के बा।',
        },
        address: {
            title: 'हमरा पता',
            nothingHere: 'इहाँ अबही कुछ नइखे',
            deliveryMessage: 'हमनी के बताईं कि रउआ आपन ऑर्डर कहाँ पहुँचावल चाहत बानी',
            addNew: 'नया पता जोड़ीं',
            currentLocation: 'वर्तमान स्थान के उपयोग करीं',
            change: 'बदलीं'
        },
        cart: {
            searchPlaceholder: 'खातिर खोजीं...',
            blackFriday: 'ब्लैक फ्राइडे',
            discountsAvailable: 'छूट उपलब्ध बा',
            categories: 'श्रेणी',
            seeAll: 'सब देखीं',
            popularProducts: 'लोकप्रिय उत्पाद',
            yourCart: 'रउआ कार्ट',
            emptyTitle: 'रउआ कार्ट खाली बा',
            emptySubtitle: 'लागता कि रउआ अबहीं तक कवनो सेवा नइखीं जोड़ले।',
            browseServices: 'सेवा खोजीं',
            paymentSummary: 'भुगतान सारांश',
            itemTotal: 'कुल आइटम',
            deliveryFee: 'डिलीवरी शुल्क',
            platformFee: 'प्लेटफार्म शुल्क',
            toPay: 'भुगतान करे के बा',
            checkout: 'चेकआउट खातिर आगे बढ़ीं',
        },
        home: {
            searchPlaceholder: 'सेवा खातिर खोजीं, जइसे प्लंबर...',
            locationLabel: 'स्थान',
            all: 'सब',
            electronics: 'इलेक्ट्रॉनिक्स',
            beauty: 'सुंदरता',
            kids: 'लइका',
            gifting: 'उपहार',
            premium: 'सफाई',
            productBuy: 'उत्पाद खरीदीं',
            category: 'श्रेणी',
            popularProducts: 'लोकप्रिय उत्पाद',
            home: 'होम',
            bookings: 'बुकिंग',
            chat: 'चैट',
            profile: 'प्रोफ़ाइल',
            car: 'गाड़ी',
            painting: 'पेंटिंग',
            more: 'अउरी',
            library: 'लाइब्रेरी',
            explore: 'खोजीं',
            opinion: 'राय',
        },
        language: {
            title: 'भाषा चुनीं',
            chooseLanguage: 'आपन पसंदीदा भाषा चुनीं',
            update: 'भाषा अपडेट करीं',
        },
        location: {
            selectLocation: 'स्थान चुनीं',
            man: 'आदमी',
            searchPlaceholder: 'खातिर खोजीं...',
            emergency: 'आपातकाल',
            my: 'मोर',
            district: 'जिला',
            state: 'राज्य',
            bharat: 'भारत',
            blackFriday: 'ब्लैक फ्राइडे',
            discountsAvailable: 'छूट उपलब्ध बा',
            whatElsePopular: 'अउरी का लोकप्रिय बा',
            seeAll: 'सब देखीं',
            home: 'होम',
            library: 'लाइब्रेरी',
            explore: 'खोजीं',
            opinion: 'राय',
        },
        login: {
            continueWithPhone: 'फोन से जारी राखीं'
        },
        myPlans: {
            title: 'मोर बुकिंग',
            activePlans: 'आवे वाला बुकिंग',
            noActivePlans: 'रउआ पास कवनो आवे वाला बुकिंग नइखे।',
            bookings: 'बुकिंग',
            pastBookings: 'पिछला बुकिंग',
        },
        nativeDevices: {
            title: 'देशी',
            oops: 'उफ़, रउआ अबही तक कवनो ऑर्डर नइखीं दिहले',
            textWidget: '[टेक्स्ट विजेट]',
        },
        newAddress: {
            title: 'नया पता',
            completeAddress: 'पूरा पता डालीं',
            orderingFor: 'रउआ केकरा खातिर ऑर्डर करत बानी?',
            myself: 'अपना खातिर',
            someoneElse: 'केहू दोसरा खातिर',
            home: 'घर',
            work: 'काम',
            hotel: 'होटल',
            other: 'अन्य',
            name: 'नाम',
            mobile: 'मोबाइल नं.',
            flatHouse: 'फ्लैट/घर नं./बिल्डिंग के नाम',
            floor: 'मंजिल (वैकल्पिक)',
            landmark: 'नजदीकी लैंडमार्क (वैकल्पिक)',
            save: 'सहेजीं',
        },
        paymentSettings: {
            title: 'भुगतान सेटिंग',
            cards: 'कार्ड',
            creditDebit: 'क्रेडिट कार्ड / डेबिट कार्ड',
            sliceUpi: 'स्लाइस यूपीआई',
            pluxee: 'प्लक्सी',
            netbanking: 'नेटबैंकिंग',
            add: 'जोड़ीं',
            payOnDelivery: 'डिलीवरी पर भुगतान',
            wallets: 'वॉलेट',
            googlePay: 'गूगल पे यूपीआई',
            link: 'लिंक करीं',
            amazonPay: 'अमेज़न पे बैलेंस',
        },
        phoneLogin: {
            title: 'फोन से लॉगिन करीं',
            subtitle: 'लॉगिन करे खातिर नीचे आपन नंबर डालीं।',
            placeholder: 'रउआ फोन नंबर...',
            continue: 'जारी राखीं',
        },
        plusMembership: {
            title: 'सदस्यता',
            oops: 'उफ़, रउआ अबही तक कवनो ऑर्डर नइखीं दिहले',
            textWidget: '[टेक्स्ट विजेट]',
        },
        profile: {
            title: 'प्रोफ़ाइल',
            continue: 'जारी राखीं',
            loginMessage: 'आपन पूरा प्रोफाइल देखे खातिर लॉग इन करीं भा साइन अप करीं',
            payments: 'मोर भुगतान',
            support: 'सहायता आ समर्थन',
            wallet: 'मोर बटुआ',
            myPlans: 'मोर बुकिंग',
            nativeDevices: 'देशी डिवाइस',
            addressBook: 'पता पुस्तिका',
            plusMembership: 'प्लस सदस्यता',
            myRating: 'मोर रेटिंग',
            setting: 'सेटिंग्स',
            otherInfo: 'अन्य जानकारी',
            shareApp: 'ऐप साझा करीं',
            aboutUs: 'हमनी के बारे में',
            logOut: 'लॉग आउट करीं',
            referEarn: 'रेफर करीं भा कमाईं',
            referEarnDescription: 'जब रउआ दोस्त आपन पहिला बुकिंग पूरा क लेवे त ₹100 पाईं।',
            hurryUp: 'जल्दी करीं',
            referNow: 'अबही रेफर करीं',
            lightMode: 'लाइट मोड',
            darkMode: 'डार्क मोड',
            appVersions: 'ऐप संस्करण',
        },
        refer: {
            title: 'रेफर करीं आ कमाईं',
            subtitle: 'आपन कोड दोस्त लोग के साथ साझा करीं आ इनाम पाईं!',
            code: 'रउआ कोड',
            share: 'अबही साझा करीं'
        },
        search: {
            searchPlaceholder: 'खातिर खोजीं...',
            resultsFor: 'खातिर परिणाम',
            noResults: 'कवनो परिणाम ना मिलल',
            tryAgain: 'कुछ अउरी खोजे के कोशिश करीं।',
        },
        support: {
            title: 'समर्थन',
            aiChatbot: 'एआई चैटबॉट',
            webLink: 'वेब लिंक',
        },
        verifyPhone: {
            title: 'सत्यापन कोड',
            subtitle: 'रउआ प्राप्त 6 अंक के कोड डालीं:',
            changeNumber: 'नंबर बदलीं?',
            verifyCode: 'कोड सत्यापित करीं',
        },
        wallet: {
            title: 'यूसी वॉलेट',
            availableBalance: 'उपलब्ध शेष राशि',
            transitionHistory: 'लेन-देन इतिहास',
            refund: 'धनवापसी',
        },
        paymentSuccess: {
            title: 'ऑर्डर सफलतापूर्वक दिहल गईल!',
            subtitle: 'रउआ बुकिंग के पुष्टि हो गईल बा। रउआ आपन बुकिंग के स्थिति \'मोर बुकिंग\' अनुभाग में देख सकत बानी।',
            viewBookings: 'बुकिंग देखीं',
            continueShopping: 'खरीदारी जारी राखीं',
        },
    },
    'मराठी': {
        settings: {
            title: 'सेटिंग्ज',
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
            admin: 'ऍडमिन',
            masterAdminPanel: 'मास्टर ऍडमिन पॅनेल',
            open: 'उघडा',
        },
        about: {
            title: 'आमच्याबद्दल',
            welcome: 'आमच्या अॅपमध्ये आपले स्वागत आहे, अखंड अनुभवासाठी आपले अंतिम गंतव्य! आम्ही एक नाविन्यपूर्ण, ग्राहक-केंद्रित प्लॅटफॉर्म आहोत जे तुम्हाला सर्वोत्तम सेवा, अपवादात्मक सौदे आणि अतुलनीय सोय देण्यासाठी डिझाइन केलेले आहे - सर्व काही तुमच्या बोटांच्या टोकावर.',
            storyTitle: 'आमची कहाणी',
            storyP1: 'आम्ही एका साध्या कल्पनेने सुरुवात केली: एक प्लॅटफॉर्म प्रदान करणे जे केवळ विविध प्रकारच्या सेवा देत नाही तर संपूर्ण प्रक्रिया सहज आणि आनंददायक बनवते.',
            storyP2: 'विनम्र सुरुवातीपासून, आम्ही त्वरीत सर्वात विश्वसनीय प्लॅटफॉर्मपैकी एक बनलो. ग्राहक समाधान, सुलभता आणि सतत नवनवीनतेची आमची मुख्य मूल्ये आम्हाला पुढे नेत राहतात कारण आमचे ध्येय आमच्या ऑफरिंगचा विस्तार करणे आहे.',
        },
        address: {
            title: 'माझे पत्ते',
            nothingHere: 'येथे अजून काहीही नाही',
            deliveryMessage: 'तुमचे ऑर्डर कुठे वितरित करायचे आहेत ते आम्हाला सांगा',
            addNew: 'नवीन पत्ता जोडा',
            currentLocation: 'सध्याचे स्थान वापरा',
            change: 'बदला',
        },
        cart: {
            searchPlaceholder: 'साठी शोधा...',
            blackFriday: 'ब्लॅक फ्रायडे',
            discountsAvailable: 'सवलत उपलब्ध आहे',
            categories: 'श्रेणी',
            seeAll: 'सर्व पहा',
            popularProducts: 'लोकप्रिय उत्पादने',
            yourCart: 'तुमची कार्ट',
            emptyTitle: 'तुमची कार्ट रिकामी आहे',
            emptySubtitle: 'असे दिसते की तुम्ही अद्याप कोणत्याही सेवा जोडलेल्या नाहीत.',
            browseServices: 'सेवा ब्राउझ करा',
            paymentSummary: 'पेमेंट सारांश',
            itemTotal: 'एकूण आयटम',
            deliveryFee: 'डिलिव्हरी शुल्क',
            platformFee: 'प्लॅटफॉर्म शुल्क',
            toPay: 'देय रक्कम',
            checkout: 'चेकआउट करण्यासाठी पुढे जा',
        },
        home: {
            searchPlaceholder: 'सेवा शोधा, उदा. प्लंबर...',
            locationLabel: 'स्थान',
            all: 'सर्व',
            electronics: 'इलेक्ट्रॉनिक्स',
            beauty: 'सौंदर्य',
            kids: 'मुले',
            gifting: 'भेटवस्तू',
            premium: 'स्वच्छता',
            productBuy: 'उत्पादन खरेदी',
            category: 'श्रेणी',
            popularProducts: 'लोकप्रिय उत्पादने',
            home: 'होम',
            bookings: 'बुकिंग',
            chat: 'चॅट',
            profile: 'प्रोफाइल',
            car: 'कार',
            painting: 'पेंटिंग',
            more: 'अधिक',
            library: 'लायब्ररी',
            explore: 'अन्वेषण करा',
            opinion: 'मत',
        },
        language: {
            title: 'भाषा निवडा',
            chooseLanguage: 'तुमची पसंतीची भाषा निवडा',
            update: 'भाषा अपडेट करा',
        },
        location: {
            selectLocation: 'स्थान निवडा',
            man: 'माणूस',
            searchPlaceholder: 'साठी शोधा...',
            emergency: 'आणीबाणी',
            my: 'माझे',
            district: 'जिल्हा',
            state: 'राज्य',
            bharat: 'भारत',
            blackFriday: 'ब्लॅक फ्रायडे',
            discountsAvailable: 'सवलत उपलब्ध आहे',
            whatElsePopular: 'आणखी काय लोकप्रिय आहे',
            seeAll: 'सर्व पहा',
            home: 'होम',
            library: 'लायब्ररी',
            explore: 'अन्वेषण करा',
            opinion: 'मत',
        },
        login: {
            continueWithPhone: 'फोनने सुरू ठेवा'
        },
        myPlans: {
            title: 'माझे बुकिंग',
            activePlans: 'आगामी बुकिंग',
            noActivePlans: 'तुमच्याकडे कोणतीही आगामी बुकिंग नाही.',
            bookings: 'बुकिंग',
            pastBookings: 'मागील बुकिंग',
        },
        nativeDevices: {
            title: 'नेटिव्ह',
            oops: 'अरेरे, तुम्ही अजून ऑर्डर दिलेली नाही',
            textWidget: '[मजकूर विजेट]',
        },
        newAddress: {
            title: 'नवीन पत्ता',
            completeAddress: 'पूर्ण पत्ता प्रविष्ट करा',
            orderingFor: 'तुम्ही कोणासाठी ऑर्डर करत आहात?',
            myself: 'माझ्यासाठी',
            someoneElse: 'इतरांसाठी',
            home: 'घर',
            work: 'काम',
            hotel: 'हॉटेल',
            other: 'इतर',
            name: 'नाव',
            mobile: 'मोबाइल क्र.',
            flatHouse: 'फ्लॅट / घर क्र. / इमारतीचे नाव',
            floor: 'मजला (पर्यायी)',
            landmark: 'जवळपासची खूण (पर्यायी)',
            save: 'जतन करा',
        },
        paymentSettings: {
            title: 'पेमेंट सेटिंग',
            cards: 'कार्ड',
            creditDebit: 'क्रेडिट कार्ड / डेबिट कार्ड',
            sliceUpi: 'स्लाइस यूपीआय',
            pluxee: 'प्लक्सी',
            netbanking: 'नेटबँकिंग',
            add: 'जोडा',
            payOnDelivery: 'डिलिव्हरीवर पैसे द्या',
            wallets: 'वॉलेट',
            googlePay: 'गूगल पे यूपीआय',
            link: 'लिंक करा',
            amazonPay: 'अमेझॉन पे बॅलन्स',
        },
        phoneLogin: {
            title: 'फोनने लॉगिन करा',
            subtitle: 'लॉगिन करण्यासाठी खाली तुमचा नंबर टाका.',
            placeholder: 'तुमचा फोन नंबर...',
            continue: 'सुरू ठेवा',
        },
        plusMembership: {
            title: 'सदस्यत्व',
            oops: 'अरेरे, तुम्ही अजून ऑर्डर दिलेली नाही',
            textWidget: '[मजकूर विजेट]',
        },
        profile: {
            title: 'प्रोफाइल',
            continue: 'सुरू ठेवा',
            loginMessage: 'तुमचे पूर्ण प्रोफाइल पाहण्यासाठी लॉग इन करा किंवा साइन अप करा',
            payments: 'माझे पेमेंट',
            support: 'मदत आणि समर्थन',
            wallet: 'माझे वॉलेट',
            myPlans: 'माझे बुकिंग',
            nativeDevices: 'नेटिव्ह डिव्हाइस',
            addressBook: 'पत्ता पुस्तिका',
            plusMembership: 'प्लस सदस्यत्व',
            myRating: 'माझे रेटिंग',
            setting: 'सेटिंग्ज',
            otherInfo: 'इतर माहिती',
            shareApp: 'अॅप शेअर करा',
            aboutUs: 'आमच्याबद्दल',
            logOut: 'लॉग आउट करा',
            referEarn: 'रेफर करा किंवा कमवा',
            referEarnDescription: 'तुमचा मित्र त्याचे पहिले बुकिंग पूर्ण केल्यावर ₹100 मिळवा.',
            hurryUp: 'त्वरा करा',
            referNow: 'आता रेफर करा',
            lightMode: 'लाइट मोड',
            darkMode: 'डार्क मोड',
            appVersions: 'अॅप आवृत्त्या',
        },
        refer: {
            title: 'रेफर करा आणि कमवा',
            subtitle: 'तुमचा कोड मित्रांसह सामायिक करा आणि बक्षिसे मिळवा!',
            code: 'तुमचा कोड',
            share: 'आता सामायिक करा'
        },
        search: {
            searchPlaceholder: 'साठी शोधा...',
            resultsFor: 'साठी निकाल',
            noResults: 'कोणतेही निकाल आढळले नाहीत',
            tryAgain: 'दुसरे काहीतरी शोधण्याचा प्रयत्न करा.',
        },
        support: {
            title: 'समर्थन',
            aiChatbot: 'एआय चॅटबॉट',
            webLink: 'वेब लिंक',
        },
        verifyPhone: {
            title: 'सत्यापन कोड',
            subtitle: 'तुम्हाला मिळालेला ६ अंकी कोड टाका:',
            changeNumber: 'नंबर बदला?',
            verifyCode: 'कोड सत्यापित करा',
        },
        wallet: {
            title: 'यूसी वॉलेट',
            availableBalance: 'उपलब्ध शिल्लक',
            transitionHistory: 'व्यवहार इतिहास',
            refund: 'परतावा',
        },
        paymentSuccess: {
            title: 'ऑर्डर यशस्वीरित्या पूर्ण झाले!',
            subtitle: 'तुमची बुकिंग निश्चित झाली आहे. तुम्ही तुमच्या बुकिंगची स्थिती \'माझे बुकिंग\' विभागात तपासू शकता.',
            viewBookings: 'बुकिंग पहा',
            continueShopping: 'खरेदी सुरू ठेवा',
        },
    }
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
        } else {
            // Fallback to English if the selected language doesn't have translations
            setLanguageState('English');
            localStorage.setItem('language', 'English');
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
