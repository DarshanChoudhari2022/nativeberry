import { ShieldCheck, Award, Leaf, Truck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

const TrustBadges = () => {
    const { t } = useLanguage();

    const badges = [
        {
            icon: Leaf,
            titleKey: 'trust.organic.title',
            descKey: 'trust.organic.desc',
        },
        {
            icon: ShieldCheck,
            titleKey: 'trust.safety.title',
            descKey: 'trust.safety.desc',
        },
        {
            icon: Award,
            titleKey: 'trust.quality.title',
            descKey: 'trust.quality.desc',
        },
        {
            icon: Truck,
            titleKey: 'trust.delivery.title',
            descKey: 'trust.delivery.desc',
        }
    ];

    return (
        <div className="bg-red-50 py-12 px-6 border-b border-red-100">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {badges.map((badge, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:bg-red-600 transition-colors duration-300">
                                <badge.icon className="w-8 h-8 text-red-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">{t(badge.titleKey)}</h3>
                            <p className="text-xs text-gray-500 max-w-[150px]">{t(badge.descKey)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustBadges;
