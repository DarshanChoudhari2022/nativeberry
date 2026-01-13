import { useLanguage } from '@/context/LanguageContext';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        nameKey: 'testim.1.name',
        textKey: 'testim.1.text',
        locKey: 'testim.1.loc',
        rating: 5,
    },
    {
        id: 2,
        nameKey: 'testim.2.name',
        textKey: 'testim.2.text',
        locKey: 'testim.2.loc',
        rating: 5,
    },
    {
        id: 3,
        nameKey: 'testim.3.name',
        textKey: 'testim.3.text',
        locKey: 'testim.3.loc',
        rating: 5,
    }
];

const TestimonialsSection = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 px-6 section-light relative overflow-hidden">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-script text-red-deep mb-4">{t('testim.title')}</h2>
                        <div className="w-24 h-1 bg-golden mx-auto rounded-full"></div>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="bg-white p-8 rounded-2xl shadow-lg border border-red-50 relative group hover:-translate-y-2 transition-transform duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Quote className="absolute top-6 right-6 text-red-100 w-12 h-12 group-hover:text-red-200 transition-colors" />

                            <div className="flex gap-1 mb-4">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-golden text-golden" />
                                ))}
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed italic relative z-10">
                                "{t(item.textKey)}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-deep font-bold">
                                    {t(item.nameKey).charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{t(item.nameKey)}</h4>
                                    <p className="text-sm text-gray-400 uppercase tracking-wider">{t(item.locKey)}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
