import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageToggle = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'mr' : 'en');
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <motion.button
                onClick={toggleLanguage}
                className="w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-xl flex items-center justify-center font-bold text-lg border-2 border-white/20 hover:scale-105 transition-transform"
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                title={language === 'en' ? 'Switch to Marathi' : 'Switch to English'}
            >
                <AnimatePresence mode="wait">
                    <motion.span
                        key={language}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                    >
                        {language === 'en' ? 'MR' : 'EN'}
                    </motion.span>
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default LanguageToggle;
