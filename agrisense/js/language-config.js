/**
 * Language Configuration for Multi-Language Support
 * Supports: Hindi, English, Bhojpuri, Marathi, Punjabi
 */

const LanguageConfig = {
    // Available languages
    languages: ['hi', 'en', 'bh', 'mr', 'pa'],

    // Display names for each language
    displayNames: {
        hi: 'हिन्दी',
        en: 'English',
        bh: 'भोजपुरी',
        mr: 'मराठी',
        pa: 'ਪੰਜਾਬੀ'
    },

    // Default language
    defaultLang: 'hi',

    // Translation dictionary - Add all your page translations here
    translations: {
        hi: {
            // Common UI elements
            back: 'वापस',
            submit: 'जमा करें',
            cancel: 'रद्द करें',
            save: 'सहेजें',
            loading: 'लोड हो रहा है...',
            error: 'त्रुटि हुई',
            success: 'सफलता',

            // Intro screen
            'intro.title': 'Welcome To AgriSense AI / कृषि मित्र',
            'intro.start': 'शुरू करें',

            // Login screen
            'login.title': '👨‍🌾 किसान का स्वागत है',
            'login.tagline': 'AI Powered Farming Assistant',
            'login.mobile.placeholder': '📱 मोबाइल नंबर',
            'login.button': 'लॉगिन',
            'login.guest': 'अतिथि के रूप में जारी रखें',
            // Dashboard
            'dashboard.location': '2°C, पलवल में साफ मौसम',
            'dashboard.greeting': 'सुप्रभात, प्राची जी',
            'dashboard.date': 'शनिवार, 1 मार्च 2025',
            'dashboard.weatherToday': 'आज का मौसम',
            'dashboard.weatherLocation': 'पलवल',
            'dashboard.weatherHigh': 'उच्च',
            'dashboard.weatherWind': 'हवा',
            'dashboard.mandiPrices': 'मंडी भाव',
            'dashboard.todaysPrices': 'आज के भाव',
            'dashboard.bajra': 'बाजरा',
            'dashboard.barley': 'जौ',
            'dashboard.jowar': 'ज्वार',
            'dashboard.communityUpdates': 'किसान समुदाय',
            'dashboard.viewAll': 'सभी देखें',
            'dashboard.communityPost1': 'आज मंडी में गेहूं का भाव 2200 रु प्रति क्विंटल मिला।',
            'dashboard.communityPost2': 'कपास में कीट लग गया है, कोई उपाय बताओ।',
            'dashboard.logistics': 'लॉजिस्टिक्स',
            'dashboard.ordersInspections': 'ऑर्डर और निरीक्षण',
            'dashboard.activeOrders': '3 सक्रिय ऑर्डर',
            'dashboard.allFeatures': 'सभी सुविधाएं',
            'dashboard.cropLibrary': 'फसल लाइब्रेरी',
            'dashboard.browseGallery': 'गैलरी ब्राउज़ करें',
            'dashboard.liveMandi': 'मौसम',
            'dashboard.weatherData': 'मौसम डेटा',
            'dashboard.transport': 'परिवहन',
            'dashboard.organise': 'कैसे व्यवस्थित करें',
            'dashboard.farmAlerts': 'फार्म अलर्ट',
            'dashboard.zoningUpdates': 'ज़ोनिंग अपडेट',
            'dashboard.cropSelection': '🌱 फसल चयन',
            'dashboard.diseaseDetection': '📷 रोग पहचान',
            'dashboard.weatherAdvice': '🌦 मौसम सलाह',
            'dashboard.aiKisanMitra': '🧑‍🌾 एआई किसान मित्र',
            'dashboard.soilFertilizer': '🧪 मिट्टी और उर्वरक',
            'dashboard.marketPrice': '🏪 मंडी मूल्य',
            'dashboard.govtSchemes': '🏛 सरकारी योजनाएं',
            'dashboard.emergencyAlerts': '🚨 आपातकालीन अलर्ट',
            'dashboard.farmerCommunity': '👥 किसान समुदाय',
            'dashboard.requestPickup': '🚚 अनाज भेजने का अनुरोध',
            'dashboard.compliance': '📋 डेटा पॉलिसी अनुपालन',
            'dashboard.themeToggle': 'डार्क मोड',
            'dashboard.voiceAssistant': 'किसान मित्र',

            // Crop Selection Page
            'crop.heading': '🌱 फसल चयन',
            'crop.sub': 'खेती की जानकारी भरें',
            'crop.soilL': '🌍 मिट्टी का प्रकार',
            'crop.seasonL': '🌦 मौसम',
            'crop.waterL': '💧 पानी उपलब्धता',
            'crop.btn': '🌾 फसल सुझाव',
            'crop.back': 'वापस',
            'crop.result': '✅ सुझाई गई फसलें: ',
            'crop.noData': '⚠️ इस संयोजन के लिए जानकारी उपलब्ध नहीं',
            'crop.soil.black': 'काली मिट्टी',
            'crop.soil.loamy': 'दोमट मिट्टी',
            'crop.soil.sandy': 'रेतीली मिट्टी',
            'crop.season.kharif': 'खरीफ',
            'crop.season.rabi': 'रबी',
            'crop.season.zaid': 'जायद',
            'crop.water.low': 'कम',
            'crop.water.medium': 'मध्यम',
            'crop.water.high': 'अधिक',

            // Crop Names
            'crop.name.millet': 'बाजरा',
            'crop.name.wheat': 'गेहूं',
            'crop.name.rice': 'चावल / धान',
            'crop.name.maize': 'मक्का',
            'crop.name.cotton': 'कपास',
            'crop.name.sugarcane': 'गन्ना',
            'crop.name.onion': 'प्याज',
            'crop.name.tomato': 'टमाटर',
            'crop.name.soybean': 'सोयाबीन',
            'crop.name.chickpea': 'चना',
            'crop.name.mustard': 'सरसों',
            'crop.name.vegetables': 'सब्जियां',
            'crop.name.fodder': 'चारा',
            'crop.name.pulses': 'दालें',
            'crop.name.barley': 'जौ',
            'crop.name.gram': 'चना',
            'crop.name.bajra': 'बाजरा',
            'crop.name.groundnut': 'मूंगफली',
            'crop.name.watermelon': 'तरबूज',
        },
        en: {
            back: 'Back',
            submit: 'Submit',
            cancel: 'Cancel',
            save: 'Save',
            loading: 'Loading...',
            error: 'Error occurred',
            success: 'Success',

            // Intro screen
            'intro.title': 'Welcome To AgriSense AI / Krishi Mitra',
            'intro.start': 'Start',

            // Login screen
            'login.title': '👨‍🌾 Welcome Farmer',
            'login.tagline': 'AI Powered Farming Assistant',
            'login.mobile.placeholder': '📱 Mobile Number',
            'login.button': 'Login',
            'login.guest': 'Continue as Guest',

            // Dashboard
            'dashboard.location': '2°C, Clear in Palwal',
            'dashboard.greeting': 'Good morning, Prachi ji',
            'dashboard.date': 'Saturday, 1 March 2025',
            'dashboard.weatherToday': 'Weather Today',
            'dashboard.weatherLocation': 'Palwal',
            'dashboard.weatherHigh': 'high',
            'dashboard.weatherWind': 'wind',
            'dashboard.mandiPrices': 'Mandi Prices',
            'dashboard.todaysPrices': 'Today\'s prices',
            'dashboard.bajra': 'Bajra/Pearl Millet/Cornflour',
            'dashboard.barley': 'Barley/Ladi',
            'dashboard.jowar': 'Jowar (Sorghum)',
            'dashboard.communityUpdates': 'Community Updates',
            'dashboard.viewAll': 'View all',
            'dashboard.communityPost1': 'Today wheat price in mandi is ₹2200 per quintal.',
            'dashboard.communityPost2': 'Cotton has pests, any solution?',
            'dashboard.logistics': 'Logistics',
            'dashboard.ordersInspections': 'Orders & Inspections',
            'dashboard.activeOrders': '3 Active Orders',
            'dashboard.allFeatures': 'All Features',
            'dashboard.cropLibrary': 'Crop Library',
            'dashboard.browseGallery': 'Browse this gallery.',
            'dashboard.liveMandi': 'Weather',
            'dashboard.weatherData': 'Current weather data.',
            'dashboard.transport': 'Transport',
            'dashboard.organise': 'How to organise.',
            'dashboard.farmAlerts': 'Farm Alerts',
            'dashboard.zoningUpdates': 'Zoning updates.',
            'dashboard.cropSelection': '🌱 Crop Selection',
            'dashboard.diseaseDetection': '📷 Disease Detection',
            'dashboard.weatherAdvice': '🌦 Weather Advice',
            'dashboard.aiKisanMitra': '🧑‍🌾 AI Kisan Mitra',
            'dashboard.soilFertilizer': '🧪 Soil & Fertilizer',
            'dashboard.marketPrice': '🏪 Market Price',
            'dashboard.govtSchemes': '🏛 Govt Schemes',
            'dashboard.emergencyAlerts': '🚨 Emergency Alerts',
            'dashboard.farmerCommunity': '👥 Farmer Community',
            'dashboard.requestPickup': '🚚 Request to send grains',
            'dashboard.compliance': '📋 Data Policy Compliance',
            'dashboard.themeToggle': 'Dark Mode',
            'dashboard.voiceAssistant': 'Kisan Mitra',

            // Crop Selection Page
            'crop.heading': '🌱 Crop Selection',
            'crop.sub': 'Enter farming details',
            'crop.soilL': '🌍 Soil Type',
            'crop.seasonL': '🌦 Season',
            'crop.waterL': '💧 Water Availability',
            'crop.btn': '🌾 Recommend Crops',
            'crop.back': 'Back',
            'crop.result': '✅ Recommended Crops: ',
            'crop.noData': '⚠️ No recommendation data available for this combination',
            'crop.soil.black': 'Black Soil',
            'crop.soil.loamy': 'Loamy Soil',
            'crop.soil.sandy': 'Sandy Soil',
            'crop.season.kharif': 'Kharif',
            'crop.season.rabi': 'Rabi',
            'crop.season.zaid': 'Zaid',
            'crop.water.low': 'Low',
            'crop.water.medium': 'Medium',
            'crop.water.high': 'High',

            // Crop Names
            'crop.name.millet': 'Millet',
            'crop.name.wheat': 'Wheat',
            'crop.name.rice': 'Rice',
            'crop.name.maize': 'Maize / Corn',
            'crop.name.cotton': 'Cotton',
            'crop.name.sugarcane': 'Sugarcane',
            'crop.name.onion': 'Onion',
            'crop.name.tomato': 'Tomato',
            'crop.name.soybean': 'Soybean',
            'crop.name.chickpea': 'Chickpea',
            'crop.name.mustard': 'Mustard',
            'crop.name.vegetables': 'Vegetables',
            'crop.name.fodder': 'Fodder',
            'crop.name.pulses': 'Pulses',
            'crop.name.barley': 'Barley',
            'crop.name.gram': 'Gram',
            'crop.name.bajra': 'Bajra / Pearl Millet',
            'crop.name.groundnut': 'Groundnut',
            'crop.name.watermelon': 'Watermelon',
        },
        bh: {
            back: 'लौटीं',
            submit: 'जमा करीं',
            cancel: 'रद्द करीं',
            save: 'सहेजीं',
            loading: 'लोड हो रहल बा...',
            error: 'त्रुटि भइल',
            success: 'सफल भइल',

            // Intro screen
            'intro.title': 'Welcome To AgriSense AI / Krishi Mitra',
            'intro.start': 'शुरू करीं',

            // Login screen
            'login.title': '👨‍🌾 किसान के स्वागत बा',
            'login.tagline': 'AI से चल रहल खेती साथी',
            'login.mobile.placeholder': '📱 मोबाइल नंबर',
            'login.button': 'लॉगिन',
            'login.guest': 'Guest बन के आगे बढ़ीं',
            // Dashboard
            'dashboard.location': '2°C, पलवल में साफ मौसम',
            'dashboard.greeting': 'सुप्रभात, प्राची जी',
            'dashboard.date': 'शनिच्चर, 1 मार्च 2025',
            'dashboard.weatherToday': 'आज के मौसम',
            'dashboard.weatherLocation': 'पलवल',
            'dashboard.weatherHigh': 'उंच',
            'dashboard.weatherWind': 'हवा',
            'dashboard.mandiPrices': 'मंडी भाव',
            'dashboard.todaysPrices': 'आज के भाव',
            'dashboard.bajra': 'बाजरा',
            'dashboard.barley': 'जौ',
            'dashboard.jowar': 'ज्वार',
            'dashboard.communityUpdates': 'किसान समुदाय',
            'dashboard.viewAll': 'सब देखीं',
            'dashboard.communityPost1': 'आज मंडी में गेहूं के भाव 2200 रु प्रति क्विंटल मिलल।',
            'dashboard.communityPost2': 'कपास में कीट लाग गईल बा, कवनो उपाय बताईं?',
            'dashboard.logistics': 'लॉजिस्टिक्स',
            'dashboard.ordersInspections': 'ऑर्डर अउर निरीक्षण',
            'dashboard.activeOrders': '3 सक्रिय ऑर्डर',
            'dashboard.allFeatures': 'सब सुविधा',
            'dashboard.cropLibrary': 'फसल लाइब्रेरी',
            'dashboard.browseGallery': 'गैलरी ब्राउज़ करीं',
            'dashboard.liveMandi': 'मौसम',
            'dashboard.weatherData': 'मौसम डेटा',
            'dashboard.transport': 'परिवहन',
            'dashboard.organise': 'कइसे व्यवस्थित करीं',
            'dashboard.farmAlerts': 'फार्म अलर्ट',
            'dashboard.zoningUpdates': 'ज़ोनिंग अपडेट',
            'dashboard.cropSelection': '🌱 फसल चयन',
            'dashboard.diseaseDetection': '📷 रोग पहचान',
            'dashboard.weatherAdvice': '🌦 मौसम सलाह',
            'dashboard.aiKisanMitra': '🧑‍🌾 एआई किसान मित्र',
            'dashboard.soilFertilizer': '🧪 माटी अउर खाद',
            'dashboard.marketPrice': '🏪 मंडी भाव',
            'dashboard.govtSchemes': '🏛 सरकारी योजना',
            'dashboard.emergencyAlerts': '🚨 आपातकालीन अलर्ट',
            'dashboard.farmerCommunity': '👥 किसान समुदाय',
            'dashboard.requestPickup': '🚚 अनाज भेजने का अनुरोध',
            'dashboard.compliance': '📋 डेटा पॉलिसी अनुपालन',
            'dashboard.themeToggle': 'डार्क मोड',
            'dashboard.voiceAssistant': 'किसान मित्र',

            // Crop Selection Page
            'crop.heading': '🌱 फसल चुने',
            'crop.sub': 'खेती जानकारी भरीं',
            'crop.soilL': '🌍 माटी के प्रकार',
            'crop.seasonL': '🌦 मौसम',
            'crop.waterL': '💧 पानी उपलब्धता',
            'crop.btn': '🌾 फसल बताईं',
            'crop.back': 'लौटिन',
            'crop.result': '✅ सुझावल फसल: ',
            'crop.noData': '⚠️ ए संयोजन खातिर जानकारी उपलब्ध ना बा',
            'crop.soil.black': 'काली माटी',
            'crop.soil.loamy': 'दोमट माटी',
            'crop.soil.sandy': 'रेती माटी',
            'crop.season.kharif': 'खरीफ',
            'crop.season.rabi': 'रबी',
            'crop.season.zaid': 'जायद',
            'crop.water.low': 'कम',
            'crop.water.medium': 'मध्यम',
            'crop.water.high': 'ज्यादा',

            // Crop Names
            'crop.name.millet': 'बाजरा',
            'crop.name.wheat': 'गेहूं',
            'crop.name.rice': 'चावल / धान',
            'crop.name.maize': 'मकई',
            'crop.name.cotton': 'कपास',
            'crop.name.sugarcane': 'गन्ना',
            'crop.name.onion': 'पियाज',
            'crop.name.tomato': 'टमाटर',
            'crop.name.soybean': 'सोयाबीन',
            'crop.name.chickpea': 'चना',
            'crop.name.mustard': 'सरसों',
            'crop.name.vegetables': 'सब्जी',
            'crop.name.fodder': 'चारा',
            'crop.name.pulses': 'दाल',
            'crop.name.barley': 'जौ',
            'crop.name.gram': 'चना',
            'crop.name.bajra': 'बाजरा',
            'crop.name.groundnut': 'मूंगफली',
            'crop.name.watermelon': 'तरबूज',
        },
        mr: {
            back: 'मागे',
            submit: 'सबमिट करा',
            cancel: 'रद्द करा',
            save: 'जतन करा',
            loading: 'लोड होत आहे...',
            error: 'त्रुटी आली',
            success: 'यशस्वी',

            // Intro screen
            'intro.title': 'Welcome To AgriSense AI / Krishi Mitra',
            'intro.start': 'सुरू करा',

            // Login screen
            'login.title': '👨‍🌾 शेतकऱ्याचे स्वागत आहे',
            'login.tagline': 'AI आधारित शेती सहाय्यक',
            'login.mobile.placeholder': '📱 मोबाईल नंबर',
            'login.button': 'लॉगिन',
            'login.guest': 'Guest म्हणून पुढे जा',
            // Dashboard
            'dashboard.location': '2°C, पलवलमध्ये स्वच्छ हवामान',
            'dashboard.greeting': 'सुप्रभात, प्राची जी',
            'dashboard.date': 'शनिवार, 1 मार्च 2025',
            'dashboard.weatherToday': 'आजचे हवामान',
            'dashboard.weatherLocation': 'पलवल',
            'dashboard.weatherHigh': 'उच्च',
            'dashboard.weatherWind': 'वारा',
            'dashboard.mandiPrices': 'मंडी दर',
            'dashboard.todaysPrices': 'आजचे दर',
            'dashboard.bajra': 'बाजरी',
            'dashboard.barley': 'जव',
            'dashboard.jowar': 'ज्वारी',
            'dashboard.communityUpdates': 'शेतकरी समुदाय',
            'dashboard.viewAll': 'सर्व पहा',
            'dashboard.communityPost1': 'आज मंडीत गहू दर ₹2200 प्रतिक्विंटल मिळाला.',
            'dashboard.communityPost2': 'कापसाला किड लागला आहे, काही उपाय सांगा.',
            'dashboard.logistics': 'लॉजिस्टिक्स',
            'dashboard.ordersInspections': 'ऑर्डर आणि निरीक्षणे',
            'dashboard.activeOrders': '3 सक्रिय ऑर्डर',
            'dashboard.allFeatures': 'सर्व वैशिष्ट्ये',
            'dashboard.cropLibrary': 'पीक लायब्ररी',
            'dashboard.browseGallery': 'गॅलरी ब्राउझ करा',
            'dashboard.liveMandi': 'हवामान',
            'dashboard.weatherData': 'सध्याचे हवामान डेटा',
            'dashboard.transport': 'वाहतूक',
            'dashboard.organise': 'कसे आयोजित करावे',
            'dashboard.farmAlerts': 'फार्म अलर्ट',
            'dashboard.zoningUpdates': 'झोनिंग अपडेट',
            'dashboard.cropSelection': '🌱 पीक निवड',
            'dashboard.diseaseDetection': '📷 रोग शोध',
            'dashboard.weatherAdvice': '🌦 हवामान सल्ला',
            'dashboard.aiKisanMitra': '🧑‍🌾 एआय किसान मित्र',
            'dashboard.soilFertilizer': '🧪 माती आणि खत',
            'dashboard.marketPrice': '🏪 बाजारभाव',
            'dashboard.govtSchemes': '🏛 शासकीय योजना',
            'dashboard.emergencyAlerts': '🚨 आणीबाणी अलर्ट',
            'dashboard.farmerCommunity': '👥 शेतकरी समुदाय',
            'dashboard.requestPickup': '🚚 धान्य पाठविण्याची विनंती',
            'dashboard.compliance': '📋 डेटा धोरण अनुपालन',
            'dashboard.themeToggle': 'डार्क मोड',
            'dashboard.voiceAssistant': 'किसान मित्र',

            // Crop Selection Page
            'crop.heading': '🌱 पीक निवड',
            'crop.sub': 'शेती माहिती भरा',
            'crop.soilL': '🌍 मातीचा प्रकार',
            'crop.seasonL': '🌦 हंगाम',
            'crop.waterL': '💧 पाणी उपलब्धता',
            'crop.btn': '🌾 पीक सुचवा',
            'crop.back': 'परत',
            'crop.result': '✅ शिफारस पिके: ',
            'crop.noData': '⚠️ या संयोजनासाठी शिफारस उपलब्ध नाही',
            'crop.soil.black': 'काळी माती',
            'crop.soil.loamy': 'दोमट माती',
            'crop.soil.sandy': 'वाळूची माती',
            'crop.season.kharif': 'खरीप',
            'crop.season.rabi': 'रब्बी',
            'crop.season.zaid': 'जायद',
            'crop.water.low': 'कमी',
            'crop.water.medium': 'मध्यम',
            'crop.water.high': 'जास्त',

            // Crop Names
            'crop.name.millet': 'बाजरी',
            'crop.name.wheat': 'गहू',
            'crop.name.rice': 'तांदूळ / भात',
            'crop.name.maize': 'मका',
            'crop.name.cotton': 'कापूस',
            'crop.name.sugarcane': 'ऊस',
            'crop.name.onion': 'कांदा',
            'crop.name.tomato': 'टोमॅटो',
            'crop.name.soybean': 'सोयाबीन',
            'crop.name.chickpea': 'हरभरा',
            'crop.name.mustard': 'मोहरी',
            'crop.name.vegetables': 'भाज्या',
            'crop.name.fodder': 'चारा',
            'crop.name.pulses': 'कडधान्ये',
            'crop.name.barley': 'जव',
            'crop.name.gram': 'हरभरा',
            'crop.name.bajra': 'बाजरी',
            'crop.name.groundnut': 'भुईमूग',
            'crop.name.watermelon': 'टरबूज',
        },
        pa: {
            back: 'ਵਾਪਸ',
            submit: 'ਜਮ੍ਹਾਂ ਕਰੋ',
            cancel: 'ਰੱਦ ਕਰੋ',
            save: 'ਸੰਭਾਲੋ',
            loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
            error: 'ਗਲਤੀ ਹੋਈ',
            success: 'ਸਫਲਤਾ',

            // Intro screen
            'intro.title': 'Welcome To AgriSense AI / Krishi Mitra',
            'intro.start': 'ਸ਼ੁਰੂ ਕਰੋ',

            // Login screen
            'login.title': '👨‍🌾 ਕਿਸਾਨ ਦਾ ਸਵਾਗਤ ਹੈ',
            'login.tagline': 'AI ਆਧਾਰਿਤ ਖੇਤੀ ਸਹਾਇਕ',
            'login.mobile.placeholder': '📱 ਮੋਬਾਈਲ ਨੰਬਰ',
            'login.button': 'ਲੌਗਿਨ',
            'login.guest': 'Guest ਵਜੋਂ ਜਾਰੀ ਰੱਖੋ',

            // Dashboard
            'dashboard.location': '2°C, ਪਲਵਲ ਵਿੱਚ ਸਾਫ ਮੌਸਮ',
            'dashboard.greeting': 'ਸੁਪ੍ਰਭਾਤ, ਪ੍ਰਾਚੀ ਜੀ',
            'dashboard.date': 'ਸ਼ਨੀਵਾਰ, 1 ਮਾਰਚ 2025',
            'dashboard.weatherToday': 'ਅੱਜ ਦਾ ਮੌਸਮ',
            'dashboard.weatherLocation': 'ਪਲਵਲ',
            'dashboard.weatherHigh': 'ਉੱਚ',
            'dashboard.weatherWind': 'ਹਵਾ',
            'dashboard.mandiPrices': 'ਮੰਡੀ ਦਰ',
            'dashboard.todaysPrices': 'ਅੱਜ ਦੇ ਦਰ',
            'dashboard.bajra': 'ਬਾਜਰਾ',
            'dashboard.barley': 'ਜੌ',
            'dashboard.jowar': 'ਜੌਂਅਰ',
            'dashboard.communityUpdates': 'ਕਿਸਾਨ ਸਮਾਜ',
            'dashboard.viewAll': 'ਸਭ ਵੇਖੋ',
            'dashboard.communityPost1': 'ਅੱਜ ਮੰਡੀ ਵਿੱਚ ਗੇਹੁੰ ਦਾ ਦਰ ₹2200 ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਮਿਲਿਆ।',
            'dashboard.communityPost2': 'ਕਪਾਹ ਨੂੰ ਕੀੜੇ ਲਗ ਗਏ ਹਨ, ਕੋਈ ਹੱਲ?',
            'dashboard.logistics': 'ਲੌਜਿਸਟਿਕਸ',
            'dashboard.ordersInspections': 'ਆਰਡਰ ਅਤੇ ਨਿਰੀਖਣ',
            'dashboard.activeOrders': '3 ਸਰਗਰਮ ਆਰਡਰ',
            'dashboard.allFeatures': 'ਸਭ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
            'dashboard.cropLibrary': 'ਫਸਲ ਲਾਇਬ੍ਰੇਰੀ',
            'dashboard.browseGallery': 'ਗੈਲਰੀ ਬ੍ਰਾਊਜ਼ ਕਰੋ',
            'dashboard.liveMandi': 'ਮੌਸਮ',
            'dashboard.weatherData': 'ਮੌਜੂਦਾ ਮੌਸਮ ਡੇਟਾ',
            'dashboard.transport': 'ਟ੍ਰਾਂਸਪੋਰਟ',
            'dashboard.organise': 'ਕਿਵੇਂ ਵਿਵਸਥਿਤ ਕਰਨਾ ਹੈ',
            'dashboard.farmAlerts': 'ਫਾਰਮ ਅਲਰਟ',
            'dashboard.zoningUpdates': 'ਜ਼ੋਨਿੰਗ ਅਪਡੇਟ',
            'dashboard.cropSelection': '🌱 ਫਸਲ ਚੋਣ',
            'dashboard.diseaseDetection': '📷 ਬਿਮਾਰੀ ਖੋਜ',
            'dashboard.weatherAdvice': '🌦 ਮੌਸਮ ਸਲਾਹ',
            'dashboard.aiKisanMitra': '🧑‍🌾 ਏਆਈ ਕਿਸਾਨ ਮਿੱਤਰ',
            'dashboard.soilFertilizer': '🧪 ਮਿੱਟੀ ਅਤੇ ਖਾਦ',
            'dashboard.marketPrice': '🏪 ਮੰਡੀ ਦਰ',
            'dashboard.govtSchemes': '🏛 ਸਰਕਾਰੀ ਸਕੀਮਾਂ',
            'dashboard.emergencyAlerts': '🚨 ਐਮਰਜੈਂਸੀ ਅਲਰਟ',
            'dashboard.farmerCommunity': '👥 ਕਿਸਾਨ ਸਮਾਜ',
            'dashboard.requestPickup': '🚚 ਅਨਾਜ ਭੇਜਣ ਦੀ ਬੇਨਤੀ',
            'dashboard.compliance': '📋 ਡੇਟਾ ਪਾਲਿਸੀ ਅਨੁਕੂਲਤਾ',
            'dashboard.themeToggle': 'ਡਾਰਕ ਮੋਡ',
            'dashboard.voiceAssistant': 'ਕਿਸਾਨ ਮਿੱਤਰ',

            // Crop Selection Page
            'crop.heading': '🌱 ਫਸਲ ਚੋਣ',
            'crop.sub': 'ਖੇਤੀ ਜਾਣਕਾਰੀ ਭਰੋ',
            'crop.soilL': '🌍 ਮਿੱਟੀ ਦੀ ਕਿਸਮ',
            'crop.seasonL': '🌦 ਮੌਸਮ',
            'crop.waterL': '💧 ਪਾਣੀ ਉਪਲਬਧਤਾ',
            'crop.btn': '🌾 ਫਸਲ ਸੁਝਾਅ',
            'crop.back': 'ਵਾਪਸ',
            'crop.result': '✅ ਸਿਫਾਰਸ਼ੀ ਫਸਲਾਂ: ',
            'crop.noData': '⚠️ ਇਸ ਮਿਲਾਪ ਲਈ ਸਿਫਾਰਸ਼ੀ ਡੇਟਾ ਉਪਲਬਧ ਨਹੀਂ',
            'crop.soil.black': 'ਕਾਲੀ ਮਿੱਟੀ',
            'crop.soil.loamy': 'ਦੋਮਟ ਮਿੱਟੀ',
            'crop.soil.sandy': 'ਰੇਤੀਲੀ ਮਿੱਟੀ',
            'crop.season.kharif': 'ਖਰੀਫ',
            'crop.season.rabi': 'ਰੱਬੀ',
            'crop.season.zaid': 'ਜ਼ਾਇਦ',
            'crop.water.low': 'ਘੱਟ',
            'crop.water.medium': 'ਦਰਮਿਆਨਾ',
            'crop.water.high': 'ਵੱਧ',

            // Crop Names
            'crop.name.millet': 'ਬਾਜਰਾ',
            'crop.name.wheat': 'ਕਣਕ',
            'crop.name.rice': 'ਚੌਲ / ਝੋਨਾ',
            'crop.name.maize': 'ਮੱਕੀ',
            'crop.name.cotton': 'ਕਪਾਹ',
            'crop.name.sugarcane': 'ਗੰਨਾ',
            'crop.name.onion': 'ਪਿਆਜ',
            'crop.name.tomato': 'ਟਮਾਟਰ',
            'crop.name.soybean': 'ਸੋਇਆਬੀਨ',
            'crop.name.chickpea': 'ਚਨਾ',
            'crop.name.mustard': 'ਸਰੋਂ',
            'crop.name.vegetables': 'ਸਬਜ਼ੀਆਂ',
            'crop.name.fodder': 'ਚਾਰਾ',
            'crop.name.pulses': 'ਦਾਲਾਂ',
            'crop.name.barley': 'ਜੌ',
            'crop.name.gram': 'ਚਨਾ',
            'crop.name.bajra': 'ਬਾਜਰਾ',
            'crop.name.groundnut': 'ਮੂੰਗਫਲੀ',
            'crop.name.watermelon': 'ਤਰਬੂਜ',
        }
    },

    // Initialize language system
    init: function() {
        // Get saved language or use default
        const savedLang = localStorage.getItem('preferredLanguage') || this.defaultLang;
        this.currentLang = savedLang;

        // Setup language selector
        this.setupSelector();

        // Apply initial language
        this.applyLanguage(savedLang);

        // Listen for language changes (both names for compatibility)
        window.addEventListener('languageChange', (e) => {
            this.applyLanguage(e.detail);
        });
        window.addEventListener('languageChanged', (e) => {
            this.applyLanguage(e.detail);
        });
    },

    // Setup language selector buttons
    setupSelector: function() {
        document.addEventListener('DOMContentLoaded', () => {
            const langPills = document.querySelectorAll('.lang-pill');

            // Set active state based on saved language
            langPills.forEach(pill => {
                if (pill.dataset.lang === this.currentLang) {
                    pill.classList.add('active');
                }

                // Add click handler
                pill.addEventListener('click', (e) => {
                    const newLang = e.target.dataset.lang;

                    // Update active states
                    langPills.forEach(p => p.classList.remove('active'));
                    e.target.classList.add('active');

                    // Save to localStorage
                    localStorage.setItem('preferredLanguage', newLang);

                    // Trigger language change event
                    window.dispatchEvent(new CustomEvent('languageChange', {
                        detail: newLang
                    }));
                });
            });
        });
    },

    // Apply language to page
    applyLanguage: function(lang) {
        this.currentLang = lang;

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            if (this.translations[lang] && this.translations[lang][key]) {
                element.textContent = this.translations[lang][key];
            }
        });

        // Update all elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.dataset.i18nPlaceholder;
            if (this.translations[lang] && this.translations[lang][key]) {
                element.placeholder = this.translations[lang][key];
            }
        });

        // Dispatch event for custom handlers and viewer components
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
        document.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
        document.dispatchEvent(new CustomEvent('languageApplied', {
            detail: { language: lang }
        }));
    },

    // Get translation for a key
    t: function(key) {
        return this.translations[this.currentLang]?.[key] ||
               this.translations[this.defaultLang]?.[key] ||
               key;
    },

    // Get current language
    getCurrentLang: function() {
        return this.currentLang || this.defaultLang;
    },

    // Alias for backward compatibility
    getCurrentLanguage: function() {
        return this.getCurrentLang();
    },

    // Set language & persist
    setLanguage: function(lang) {
        if (!this.languages.includes(lang)) {
            console.warn(`Unsupported language code: ${lang}`);
            return;
        }

        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        this.applyLanguage(lang);
    }
};

// Initialize when script loads
LanguageConfig.init();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageConfig;
}