import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageToggle = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'mr' : 'en');
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
            <div className="bg-white/90 backdrop-blur text-black text-xs font-bold px-3 py-1 rounded-lg shadow-md mb-1 animate-bounce">
                Change Language / भाषा बदला
            </div>
            <div className="bg-white rounded-full p-1 shadow-2xl border-2 border-red-100 flex items-center">
                <button
                    onClick={() => setLanguage('en')}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 ${language === 'en'
                            ? 'bg-red-600 text-white shadow-md'
                            : 'text-gray-500 hover:text-red-600'
                        }`}
                >
                    English
                </button>
                <button
                    onClick={() => setLanguage('mr')}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 ${language === 'mr'
                            ? 'bg-red-600 text-white shadow-md'
                            : 'text-gray-500 hover:text-red-600'
                        }`}
                >
                    मराठी
                </button>
            </div>
        </div>
    );
};

export default LanguageToggle;
