import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'mr';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<string, { en: string; mr: string }> = {
    // Navbar
    'nav.home': { en: 'Home', mr: 'मुख्य पृष्ठ' },
    'nav.about': { en: 'About Us', mr: 'आमच्याबद्दल' },
    'nav.berries': { en: 'Our Berries', mr: 'आमची फळे' },
    'nav.wholesale': { en: 'Wholesale', mr: 'घाऊक विक्री' },
    'nav.contact': { en: 'Contact', mr: 'संपर्क' },
    'nav.order': { en: 'Order Now', mr: 'ऑर्डर करा' },

    // Hero Section
    'hero.title1': { en: 'Native', mr: 'नेटिव्ह' },
    'hero.title2': { en: 'Berry', mr: 'बेरी' },
    'hero.title3': { en: 'Farms', mr: 'फार्म्स' },
    'hero.tagline': { en: 'The Real Gavakries of Mahabaleshwar', mr: 'महाबळेश्वरची खरी गावकरी चव' },
    'hero.desc': { en: 'Farm-fresh strawberries grown with 25+ years of legacy. Harvested at sunrise, delivered to your doorstep.', mr: '२५ हून अधिक वर्षांची परंपरा असलेली शेतातील ताजी स्ट्रॉबेरी. सूर्योदयाला तोडलेली, तुमच्या दारापर्यंत पोहोचवलेली.' },
    'hero.whatsapp': { en: 'Order on WhatsApp', mr: 'व्हॉट्सॲपवर ऑर्डर करा' },
    'hero.call': { en: 'Call Farmer', mr: 'शेतकऱ्याला कॉल करा' },

    // Berries Section
    'berries.title': { en: 'Explore the Berry Patch', mr: 'आमच्या बेरींच्या जगात' },
    'berries.subtitle': { en: 'Fresh • Organic • Hand-Picked', mr: 'ताजी • सेंद्रिय • हाताने वेचलेली' },
    'berry.strawberries': { en: 'Strawberries', mr: 'स्ट्रॉबेरीज' },
    'berry.mulberries': { en: 'Mulberries', mr: 'मलबेरीज (तुती)' },
    'berry.raspberries': { en: 'Raspberries', mr: 'रासबेरीज' },
    'berry.goldenberries': { en: 'Golden Berries', mr: 'गोल्डन बेरीज' },

    // About Section
    'about.label': { en: 'About Us', mr: 'आमच्याबद्दल' },
    'about.title1': { en: "The True", mr: 'खरे' },
    'about.title2': { en: "Taste of Home", mr: 'घरची चव' },
    'about.desc1': { en: 'Discover the essence of Native Berry Farms. What started with a small farm in Gureghar, Mahabaleshwar has grown into a legacy spanning 25+ years.', mr: 'नेटिव्ह बेरी फार्म्सचे सार अनुभवा. गुरेघर, महाबळेश्वरमधील एका छोट्या शेतापासून सुरू झालेला हा प्रवास आज २५+ वर्षांच्या समृद्ध वारशात रूपांतरित झाला आहे.' },
    'about.desc2': {
        en: 'Today, Native Berry Farms continues that legacy. We combine traditional wisdom with modern organic practices to bring you strawberries that taste exactly as nature intended—sweet, juicy, and full of honest flavor.',
        mr: 'आज, नेटिव्ह बेरी फार्म्स तो वारसा पुढे चालवत आहे. आम्ही पारंपारिक ज्ञान आणि आधुनिक सेंद्रिय पद्धतींची सांगड घालतो, जेणेकरून तुम्हाला अशा स्ट्रॉबेरीज मिळतील ज्यांची चव निसर्गाला अभिप्रेत असलेल्या गोड, रसाळ आणि अस्सल चवीसारखीच असेल.'
    },
    'about.quote': { en: '"It\'s not just what we grow. It\'s how we grow it—with care, consistency, and purpose."', mr: '"आम्ही काय पिकवतो यापेक्षा आम्ही ते कसे पिकवतो हे महत्त्वाचे आहे—काळजीपूर्वक, सातत्याने आणि हेतूने."' },
    'about.journey': { en: 'Our Journey', mr: 'आमचा प्रवास' },
    'about.legacy': { en: 'A Legacy of', mr: 'एक वारसा' },
    'about.years': { en: '100+ Years', mr: '१००+ वर्षांचा' },

    // Timeline
    'timeline.1920.title': { en: 'British Introduction', mr: 'ब्रिटिशांचे आगमन' },
    'timeline.1920.desc': { en: 'British introduce strawberries to Mahabaleshwar hill station.', mr: 'ब्रिटिशांनी महाबळेश्वरच्या थंड हवेच्या ठिकाणी स्ट्रॉबेरीची ओळख करून दिली.' },
    'timeline.1930.title': { en: 'Gureghar Adopts', mr: 'गुरेघरचा स्वीकार' },
    'timeline.1930.desc': { en: 'Gureghar village adopts the crop. Our ancestors begin cultivation.', mr: 'गुरेघर गावाने हे पीक स्वीकारले. आमच्या पूर्वजांनी लागवड सुरू केली.' },
    'timeline.1999.title': { en: 'Native Berry Farms', mr: 'नेटिव्ह बेरी फार्म्स' },
    'timeline.1999.desc': { en: 'The Gade family establishes Native Berry Farms officially.', mr: 'गाडे कुटुंबाने अधिकृतपणे नेटिव्ह बेरी फार्म्सची स्थापना केली.' },
    'timeline.today.title': { en: 'Direct to Doorstep', mr: 'थेट तुमच्या दारी' },
    'timeline.today.desc': { en: 'Delivering farm-fresh berries directly to Pune, Mumbai & beyond.', mr: 'पुणे, मुंबई आणि त्यापलीकडे थेट शेतातील ताजी फळे पोहोचवत आहोत.' },
    'timeline.today.time': { en: 'Today', mr: 'आज' },

    // Hero Extras
    'hero.badge': { en: '100% Fresh', mr: '१००% ताजी' },
    'hero.vitc': { en: 'Vitamin C Rich', mr: 'व्हिटॅमिन सी युक्त' },
    'hero.antioxidant': { en: 'High Antioxidants', mr: 'भरपूर अँटिऑक्सिडंट्स' },
    'hero.heart': { en: 'Heart Healthy', mr: 'हृदयासाठी पोषक' },
    'hero.natural': { en: '100% Natural', mr: '१००% नैसर्गिक' },

    // Wholesale Section
    'wholesale.title': { en: 'Partner with the Source', mr: 'थेट उत्पादकांशी भागीदारी' },
    'wholesale.desc': { en: 'Cut out the middlemen. Work directly with third-generation farmers.', mr: 'मध्यस्थांना टाळा. थेट तिसऱ्या पिढीतील शेतकऱ्यांशी व्यवहार करा.' },
    'wholesale.opt1.title': { en: 'Corporate Gifting', mr: 'कॉर्पोरेट गिफ्टिंग' },
    'wholesale.opt1.desc': { en: 'Premium packaging for Diwali, festivals & corporate events.', mr: 'दिवाळी, सण आणि कॉर्पोरेट कार्यक्रमांसाठी खास पॅकेजिंग.' },
    'wholesale.opt2.title': { en: 'Retail Supply', mr: 'रिटेल सप्लाई' },
    'wholesale.opt2.desc': { en: 'Direct delivery to supermarkets and organic stores.', mr: 'सुपरमार्केट आणि ऑरगॅनिक स्टोअर्सना थेट पुरवठा.' },
    'wholesale.opt3.title': { en: 'Chefs & Hotels', mr: 'शेफ आणि हॉटेल्स' },
    'wholesale.opt3.desc': { en: 'Consistent quality supply for premium restaurants.', mr: 'प्रिमियम हॉटेल्ससाठी सातत्यपूर्ण आणि दर्जेदार पुरवठा.' },
    'wholesale.partner': { en: 'Become a Partner', mr: 'भागीदार व्हा' },
    'wholesale.excellence': { en: 'Years of Farming Excellence', mr: 'वर्षांची कृषी परंपरा' },

    // Contact Section
    'contact.title': { en: 'Ready to Order?', mr: 'ऑर्डर देण्यासाठी तयार?' },
    'contact.desc': { en: 'Three ways to connect with us.', mr: 'आमच्याशी संपर्क साधण्याचे तीन मार्ग.' },
    'contact.address': { en: 'Parking No 4, Near Mapro Garden, Gureghar, Mahabaleshwar', mr: 'पार्किंग क्र. ४, मॅप्रो गार्डन जवळ, गुरेघर, महाबळेश्वर' },
    'contact.visit': { en: 'Visit Farm', mr: 'शेताला भेट द्या' },
    'contact.chat': { en: 'Chat Now', mr: 'चॅट करा' },
    'contact.chat_desc': { en: 'Connect on WhatsApp', mr: 'व्हॉट्सॲपवर संपर्क साधा' },
    'contact.call_action': { en: 'Call Now', mr: 'कॉल करा' },
    'contact.directions': { en: 'Get Directions', mr: 'दिशा मिळवा' },

    // Footer
    'footer.brand': { en: 'Native Berry Farms', mr: 'नेटिव्ह बेरी फार्म्स' },
    'footer.love': { en: 'Grown with ❤️ since 1999', mr: '१९९९ पासून प्रेमाने पिकवलेले ❤️' },
    'footer.tagline': { en: 'The Real Gavakries of Mahabaleshwar', mr: 'महाबळेश्वरची खरी गावकरी चव' },

    // Detail Pages Common
    'detail.back': { en: 'Back to Home', mr: 'मुख्य पृष्ठावर परत' },
    'detail.availability': { en: 'Availability & Growing Regions', mr: 'उपलब्धता आणि उत्पादन क्षेत्र' },
    'detail.store': { en: 'How to Store', mr: 'साठवणूक कशी करावी' },
    'detail.season': { en: 'Seasonality & Harvest', mr: 'हंगाम आणि कापणी' },
    'detail.handling': { en: 'Handling & Storage', mr: 'हाताळणी आणि साठवणूक' },

    // 404 Page
    '404.title': { en: '404', mr: '४०४' },
    '404.message': { en: 'Oops! Page not found', mr: 'अरेरे! पृष्ठ सापडले नाही' },
    '404.home': { en: 'Return to Home', mr: 'मुख्य पृष्ठावर परत जा' },

    // Nutritional Facts
    'fact.vitc': { en: 'Vitamin C', mr: 'व्हिटॅमिन सी' },
    'fact.manganese': { en: 'Manganese', mr: 'मॅंगनीज' },
    'fact.folate': { en: 'Folate', mr: 'फोलेट' },
    'fact.potassium': { en: 'Potassium', mr: 'पोटॅशियम' },
    'fact.iron': { en: 'Iron', mr: 'लोह' },
    'fact.vitk1': { en: 'Vitamin K1', mr: 'व्हिटॅमिन के१' },
    'fact.antioxidants': { en: 'Antioxidants', mr: 'अँटिऑक्सिडंट्स' },
    'fact.fiber': { en: 'Fiber', mr: 'फायबर' },
    'fact.carbs': { en: 'Carbs', mr: 'कर्बोदके' },
    'fact.vita': { en: 'Vit A', mr: 'व्हिटॅमिन ए' },
    'fact.protein': { en: 'Protein', mr: 'प्रथिने' },
    'fact.sugar': { en: 'Sugar', mr: 'साखर' },
    'fact.immunity': { en: 'Immunity', mr: 'प्रतिकारशक्ती' },

    'fact.daily_value': { en: 'Daily Value', mr: 'दैनिक गरज' },
    'fact.bone_health': { en: 'Bone Health', mr: 'हाडांचे आरोग्य' },
    'fact.cell_function': { en: 'Cell Function', mr: 'पेशी कार्य' },
    'fact.blood_pressure': { en: 'Blood Pressure', mr: 'रक्तदाब' },
    'fact.blood_health': { en: 'Blood Health', mr: 'रक्ताचे आरोग्य' },
    'fact.cell_protection': { en: 'Cell Protection', mr: 'पेशी संरक्षण' },
    'fact.digestive_health': { en: 'Digestive Health', mr: 'पचन आरोग्य' },
    'fact.metabolism': { en: 'Metabolism', mr: 'चयापचय' },
    'fact.keto_friendly': { en: 'Keto Friendly', mr: 'कीटो फ्रेंडली' },
    'fact.running_eyes': { en: 'Running Eyes', mr: 'डोळ्यांचे आरोग्य' },
    'fact.in_fruits': { en: 'In Fruits', mr: 'फळांमध्ये' },
    'fact.low_gi': { en: 'Low GI', mr: 'कमी जीआय' },
    'fact.boost': { en: 'Boost', mr: 'वाढ' },
    'fact.antioxidant': { en: 'Antioxidant', mr: 'अँटिऑक्सिडंट' },
    'fact.high': { en: 'High', mr: 'जास्त' },
    'fact.rich': { en: 'Rich', mr: 'भरपूर' },
    'fact.ess': { en: 'Ess.', mr: 'आवश्यक' },
    'fact.top': { en: 'Top', mr: 'उत्तम' },
    'fact.low': { en: 'Low', mr: 'कमी' },
    'fact.rare': { en: 'Rare', mr: 'दुर्मिळ' },

    // Strawberry Detail
    'strawberry.hero.title': { en: 'The Sweetheart of the Berry World', mr: 'बेरी विश्वाची लाडकी' },
    'strawberry.hero.desc': { en: 'Bright, juicy, and full of charm, strawberries are the timeless favorite. Whether dipped in chocolate or blended into a smoothie, our Mahabaleshwar strawberries bring a perfect balance of sweetness and tartness.', mr: 'चमकदार, रसाळ आणि मोहक, स्ट्रॉबेरी ही नेहमीच सर्वांची आवडती आहे. चॉकलेटमध्ये बुडवलेली असो किंवा स्मूदीमध्ये, आमची महाबळेश्वरची स्ट्रॉबेरी गोडवा आणि आंबटपणाचा परिपूर्ण समतोल आणते.' },
    'strawberry.soil.title': { en: 'Perfect Soil', mr: 'परिपूर्ण माती' },
    'strawberry.soil.desc': { en: 'Our laterite red soil, rich in iron and unique to the Mahabaleshwar plateau, gives our strawberries their distinctive deep red distinct color and intense sweetness.', mr: 'आमची लोहयुक्त जांभा (लॅटराइट) तांबडी माती, जी महाबळेश्वर पठाराचे वैशिष्ट्य आहे, आमच्या स्ट्रॉबेरीला गडद लाल रंग आणि तीव्र गोडवा देते.' },
    'strawberry.climate.title': { en: 'Ideal Climate', mr: 'योग्य हवामान' },
    'strawberry.climate.desc': { en: 'At 1,353m elevation, the cool winters (10°C-24°C) promote slow ripening, allowing sugars to develop fully before harvest.', mr: '१,३५३ मीटर उंचीवर, थंड हिवाळा (१०°C-२४°C) फळाला हळूहळू पिकण्यास मदत करतो, ज्यामुळे काढणीपूर्वी साखरेचे प्रमाण पूर्णपणे विकसित होते.' },
    'strawberry.pick.title': { en: 'Hand Picked', mr: 'हाताने निवडलेली' },
    'strawberry.pick.desc': { en: 'Every single berry is hand-inspected at sunrise. We only pick fruit that has reached 100% maturity on the vine.', mr: 'प्रत्येक बेरी सूर्योदयाच्या वेळी हाताने तपासली जाते. आम्ही केवळ तीच फळे तोडतो जी वेलीवर १००% पूर्ण वाढलेली आहेत.' },

    // Strawberry Storage
    'strawberry.store.title': { en: 'How to Store Strawberries', mr: 'स्ट्रॉबेरीजची साठवणूक कशी करावी' },
    'strawberry.store.desc': { en: 'Follow these tips to keep your berries fresh and crisp for 5-7 days.', mr: 'तुमची फळे ५-७ दिवस ताजी आणि कुरकुरीत ठेवण्यासाठी या टिप्स फॉलो करा.' },
    'strawberry.step1.title': { en: 'Keep them Dry', mr: 'कोरड्या ठेवा' },
    'strawberry.step1.desc': { en: 'Try to keep your fresh strawberries as dry as possible. Moisture is the enemy!', mr: 'तुमच्या ताज्या स्ट्रॉबेरीज शक्य तितक्या कोरड्या ठेवण्याचा प्रयत्न करा. ओलावा हा त्यांचा शत्रू आहे!' },
    'strawberry.step2.title': { en: 'Refrigerate', mr: 'फ्रिजमध्ये ठेवा' },
    'strawberry.step2.desc': { en: 'Store them in their original clamshell package between 32° and 34°F.', mr: 'त्यांना त्यांच्या मूळ बॉक्समध्ये ३२° ते ३४° फॅरेनहाइट तापमानात ठेवा.' },
    'strawberry.step3.title': { en: 'Wash Before Eating', mr: 'खाण्यापूर्वी धुवा' },
    'strawberry.step3.desc': { en: "Rinse strawberries gently with cool water just before you're ready to eat them.", mr: 'खाण्यापूर्वीच स्ट्रॉबेरी थंड पाण्याने हलक्या हाताने धुवा.' },
    'strawberry.step4.title': { en: 'Serve at Room Temp', mr: 'खोलीच्या तापमानाला सर्व्ह करा' },
    'strawberry.step4.desc': { en: 'To enhance their natural flavors, let strawberries reach room temperature before serving.', mr: 'त्यांची नैसर्गिक चव वाढवण्यासाठी, सर्व्ह करण्यापूर्वी त्या खोलीच्या तापमानाला येऊ द्या.' },

    // Video Section
    'video.title': { en: 'Real Taste of Gavkari Farming', mr: 'गावकरी शेतीची खरी चव' },
    'video.subtitle': { en: 'Organic • Authentic • Pure', mr: 'सेंद्रिय • अस्सल • शुद्ध' },
    'video.desc1': { en: 'Experience the authentic taste of "Gavkari" (Villager) produce. Grown with traditional organic methods passed down through generations.', mr: '"गावकरी" उत्पादनाची अस्सल चव अनुभवा. पिढ्यानपिढ्या चालत आलेल्या पारंपरिक सेंद्रिय पद्धतींनी पिकवलेले.' },
    'video.desc2': { en: 'No harmful chemicals, just pure nature. Our strawberries carry the sweet scent of the Mahabaleshwar soil.', mr: 'कोणतीही हानिकारक रसायने नाहीत, फक्त शुद्ध निसर्ग. आमच्या स्ट्रॉबेरीमध्ये महाबळेश्वरच्या मातीचा गोड सुगंध आहे.' },

    // Mulberry Detail
    'mulberry.hero.subtitle': { en: 'Native Treasures', mr: 'देशी खजिना' },
    'mulberry.hero.title': { en: 'The Ancient Superfood', mr: 'प्राचीन सुपरफूड' },
    'mulberry.hero.desc': { en: 'Deeply pigmented and intensely flavorful, our Mahabaleshwar Mulberries (Shahtoot) are a rare seasonal treat. Known for their balance of sweet and tart, they stain your fingers but heal your soul.', mr: 'गडद रंगाची आणि तीव्र चव असलेली आमची महाबळेश्वरची तुती (शहतूत) ही एक दुर्मिळ हंगामी मेजवानी आहे. गोड आणि आंबट चवीच्या समतोलासाठी प्रसिद्ध, ती तुमची बोटे रंगवते पण आत्म्याला तृप्त करते.' },
    'mulberry.season.desc': { en: 'Mulberries have two distinct short seasons in Mahabaleshwar. Catch them while you can!', mr: 'महाबळेश्वरमध्ये तुतीचे दोन छोटे हंगाम असतात. संधी गमावू नका!' },
    'mulberry.season.harvest': { en: 'Mahabaleshwar Harvesting', mr: 'महाबळेश्वर कापणी' },
    'mulberry.season.summer': { en: 'Summer Harvest', mr: 'उन्हाळी हंगाम' },
    'mulberry.season.winter': { en: 'Winter Harvest', mr: 'हिवाळी हंगाम' },
    'mulberry.season.note': { en: '* Mulberries are excessively fragile and are best consumed within 2 days of harvest.', mr: '* तुती अत्यंत नाजूक असते आणि कापणीनंतर २ दिवसांच्या आत खाणे सर्वोत्तम असते.' },
    'mulberry.store.desc': { en: 'Mulberries are delicate gems. Handle with extreme care to enjoy their full glory.', mr: 'तुती ही नाजूक रत्ने आहेत. त्यांची पूर्ण मजा घेण्यासाठी अत्यंत काळजीपूर्वक हाताळा.' },
    'mulberry.step1.title': { en: "Don't Wash Yet", mr: 'लगेच धुवू नका' },
    'mulberry.step1.desc': { en: 'Similar to strawberries, moisture accelerates spoilage. Keep them dry until eating.', mr: 'स्ट्रॉबेरीप्रमाणेच, ओलाव्यामुळे त्या लवकर खराब होतात. खाण्यापूर्वी त्यांना कोरडे ठेवा.' },
    'mulberry.step2.title': { en: 'Refrigerate ASAP', mr: 'त्वरित फ्रिजमध्ये ठेवा' },
    'mulberry.step2.desc': { en: 'They ferment quickly in heat. Get them into the fridge immediately upon arrival.', mr: 'उष्णतेमुळे त्या लवकर आंबतात. आल्यावर लगेच त्यांना फ्रिजमध्ये ठेवा.' },
    'mulberry.step3.title': { en: 'Gentle Rinse', mr: 'हलक्या हाताने धुवा' },
    'mulberry.step3.desc': { en: 'Place in a colander and gently run cool water over them. Do not soak.', mr: 'चाळणीत ठेवून त्यावर हळूवार थंड पाणी सोडा. भिजवून ठेवू नका.' },
    'mulberry.step4.title': { en: 'Stain Warning', mr: 'डागांपासून सावध राहा' },
    'mulberry.step4.desc': { en: 'Mulberry juice stains fingers and clothes deeply. Handle with love (and maybe a napkin)!', mr: 'तुतीचा रस बोटे आणि कपड्यांवर गडद डाग सोडतो. प्रेमाने (आणि नॅपकीनने) हाताळा!' },

    // Raspberry Detail
    'raspberry.hero.subtitle': { en: 'Delicate & Tart', mr: 'नाजूक आणि आंबट-गोड' },
    'raspberry.hero.title': { en: "Nature's Candy", mr: 'निसर्गाची गोड कँडी' },
    'raspberry.hero.desc': { en: 'With their hollow core and delicate structure, Raspberries offer a melt-in-your-mouth texture. Grown in our controlled polyhouses to protect them from the harsh sun.', mr: 'पोकळ गाभा आणि नाजूक रचनेमुळे रासबेरी तोंडात विरघळते. कडक उन्हापासून वाचवण्यासाठी आम्ही त्यांना नियंत्रित पॉलीहाऊसमध्ये पिकवतो.' },
    'raspberry.season.title': { en: 'Harvest Calendar', mr: 'कापणी वेळापत्रक' },
    'raspberry.season.desc': { en: 'Raspberries love the cool Mahabaleshwar winter. We harvest them daily during peak season.', mr: 'रासबेरीला महाबळेश्वरची थंड हिवाळा आवडतो. मुख्य हंगामात आम्ही दररोज त्यांची कापणी करतो.' },
    'raspberry.season.growing': { en: 'Growing Season', mr: 'वाढीचा हंगाम' },
    'raspberry.season.peak': { en: 'Peak Winter', mr: 'भर हिवाळा' },
    'raspberry.season.limited': { en: 'Limited Supply', mr: 'मर्यादित साठा' },
    'raspberry.season.note': { en: '* We grow exotic Raspberry varieties imported from California nurseries.', mr: '* आम्ही कॅलिफोर्निया नर्सरीमधून आयात केलेल्या विदेशी रासबेरीच्या जाती पिकवतो.' },
    'raspberry.store.desc': { en: 'Raspberries are the most fragile of all. One wrong move and they insistently squash.', mr: 'रासबेरी सर्वात नाजूक असतात. थोडासा दाब लागला तरी त्या चेपतात.' },
    'raspberry.step1.title': { en: 'Keep them Cold', mr: 'थंड ठेवा' },
    'raspberry.step1.desc': { en: "Don't leave them on the counter. The fridge is their best friend.", mr: 'त्यांना बाहेर ठेवू नका. फ्रिज हाच त्यांचा खरा मित्र आहे.' },
    'raspberry.step2.title': { en: 'No Stacking', mr: 'एकावर एक ठेवू नका' },
    'raspberry.step2.desc': { en: 'Never stack punnets on top of each other. The weight will crush the bottom berries.', mr: 'कधीही बॉक्स एकावर एक ठेवू नका. वजनामुळे खालच्या बेरीज चेपल्या जातील.' },
    'raspberry.step3.title': { en: 'Eat Fresh', mr: 'ताज्या खा' },
    'raspberry.step3.desc': { en: "Raspberries don't improve with age. Eat them within 2-3 days of purchase.", mr: 'रासबेरी शिळ्या झाल्यावर चांगल्या लागत नाहीत. खरेदीनंतर २-३ दिवसांत खाऊन टाका.' },
    'raspberry.step4.title': { en: 'Freeze for Later', mr: 'नंतरसाठी गोठवा' },
    'raspberry.step4.desc': { en: "If you can't finish them, freeze them on a tray first, then bag them for smoothies.", mr: 'जर संपवू शकत नसाल, तर ट्रेमध्ये गोठवा आणि नंतर स्मूदीसाठी पिशवीत ठेवा.' },

    // Golden Berry Detail
    'golden.hero.subtitle': { en: 'Exotic & Tangy', mr: 'विदेशी आणि आंबट' },
    'golden.hero.title': { en: 'The Hidden Gem', mr: 'लपलेला अनमोल ठेवा' },
    'golden.hero.desc': { en: 'Enclosed in a paper-like lantern (husk), these golden spheres explode with a sweet-tart flavor profile. Also known as Cape Gooseberry or Rasbhari, they are a native wild delight of the Western Ghats.', mr: 'कागदासारख्या आवरणात (हस्क) बंदिस्त, हे सोनेरी गोळे गोड-आंबट चवीचा स्फोट घडवतात. केप गूजबेरी किंवा रासभरी म्हणून ओळखले जाणारे हे पश्चिम घाटातील एक रानटी वैभव आहे.' },
    'golden.season.title': { en: 'Seasonal Availability', mr: 'हंगामी उपलब्धता' },
    'golden.season.desc': { en: 'A summer favorite. Our Rasbhari harvest peaks just as the winter chill fades away.', mr: 'उन्हाळ्यातील आवडते फळ. थंडी कमी होताच आमची रासभरी बहरते.' },
    'golden.season.harvest': { en: 'Harvest Period', mr: 'कापणी कालावधी' },
    'golden.season.peak': { en: 'Peak Flavor', mr: 'सर्वोत्तम चव' },
    'golden.season.note': { en: '* We harvest exclusively when the husk turns completely golden and papery dry.', mr: '* जेव्हा आवरण पूर्णपणे सोनेरी आणि कागदासारखे कोरडे होते तेव्हाच आम्ही कापणी करतो.' },
    'golden.store.desc': { en: 'Thanks to their natural protective husk, Golden Berries have a secret superpower: Long Shelf Life.', mr: 'नैसर्गिक संरक्षक आवरणामुळे, गोल्डन बेरीजकडे एक खास शक्ती आहे: जास्त काळ टिकण्याची क्षमता.' },
    'golden.step1.title': { en: 'Keep the Husk', mr: 'आवरण ठेवू नका' },
    'golden.step1.desc': { en: 'Does it look pretty? Keep it on! The husk protects the berry and extends freshness.', mr: 'ते छान दिसते ना? तसेच ठेवा! आवरण बेरीचे संरक्षण करते आणि ताजेपणा टिकवते.' },
    'golden.step2.title': { en: 'Counter is OK', mr: 'बाहेर ठेवले तरी चालेल' },
    'golden.step2.desc': { en: 'Unlike other berries, these can stay at room temperature for a week if dry.', mr: 'इतर बेरीजप्रमाणे नाही, कोरडे असल्यास या खोलीच्या तापमानाला आठवडाभर टिकतात.' },
    'golden.step3.title': { en: 'Fridge for Long Term', mr: 'जास्त काळासाठी फ्रिज' },
    'golden.step3.desc': { en: 'Want to keep them for 3-4 weeks? Pop them in the fridge in a breathable container.', mr: '३-४ आठवडे ठेवायच्या आहेत? हवेशीर डब्यात फ्रिजमध्ये ठेवा.' },
    'golden.step4.title': { en: 'Peel & Rinse', mr: 'सोलून धुवा' },
    'golden.step4.desc': { en: 'Peel the husk and rinse under cold water only when ready to eat. They might feel slightly sticky (natural pectin).', mr: 'खाण्यापूर्वीच आवरण काढा आणि थंड पाण्याने धुवा. त्या थोड्या चिकट असू शकतात (नैसर्गिक पेक्टिन).' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string) => {
        return translations[key]?.[language] || translations[key]?.['en'] || key;
    };

    React.useEffect(() => {
        if (language === 'mr') {
            document.body.classList.add('lang-mr');
        } else {
            document.body.classList.remove('lang-mr');
        }
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
