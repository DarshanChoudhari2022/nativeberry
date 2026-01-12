import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/ui/Reveal';
import goldenBerryHero from '@/assets/golden_berry_hero.png';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const GoldenBerryDetail = () => {
    const { t } = useLanguage();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const nutritionalFacts = [
        { label: t('fact.vita'), value: t('fact.high'), desc: t('fact.running_eyes') },
        { label: t('fact.protein'), value: t('fact.rare'), desc: t('fact.in_fruits') },
        { label: t('fact.sugar'), value: t('fact.low'), desc: t('fact.low_gi') },
        { label: t('fact.immunity'), value: t('fact.boost'), desc: t('fact.antioxidant') },
    ];

    return (
        <main className="min-h-screen bg-[#FFFAF0]">
            <Navbar />

            {/* ---------------- HERO SECTION ---------------- */}
            <section className="relative pt-24 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden">
                <div className="container mx-auto">
                    <Link to="/" className="inline-flex items-center text-amber-700 hover:text-amber-500 mb-8 transition-colors group">
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        {t('detail.back')}
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="z-10">
                            <Reveal>
                                <p className="font-script text-3xl text-amber-600 mb-2">{t('golden.hero.subtitle')}</p>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#3A3526] leading-normal mb-6 py-2">
                                    {t('berry.goldenberries')}:<br />
                                    <span className="text-amber-500">{t('golden.hero.title')}</span>
                                </h1>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <p className="text-lg md:text-xl text-[#6B6550] mb-8 leading-relaxed max-w-xl">
                                    {t('golden.hero.desc')}
                                </p>
                            </Reveal>

                            <Reveal delay={0.5}>
                                <div className="grid grid-cols-2 gap-4 max-w-md">
                                    {nutritionalFacts.map((fact) => (
                                        <div key={fact.label} className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-amber-100">
                                            <p className="text-3xl font-bold text-amber-500">{fact.value}</p>
                                            <p className="font-semibold text-[#3A3526]">{fact.label}</p>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">{fact.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>

                        {/* Right Image */}
                        <div className="relative flex justify-center lg:justify-end">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="relative z-10"
                            >
                                <img
                                    src={goldenBerryHero}
                                    alt="Fresh Golden Berries"
                                    className="w-full max-w-[500px] drop-shadow-xl"
                                    style={{ filter: 'drop-shadow(0 25px 45px rgba(217, 119, 6, 0.25))' }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------------- AVAILABILITY SECTION (Dark Amber) ---------------- */}
            <section className="bg-[#78350F] text-white py-20 px-6 md:px-12">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <Reveal>
                            <h2 className="text-4xl md:text-6xl font-bold mb-4 font-script leading-normal py-2">
                                {t('golden.season.title')}
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-white/80 max-w-2xl mx-auto">
                                {t('golden.season.desc')}
                            </p>
                        </Reveal>

                        {/* Legend */}
                        <Reveal delay={0.3}>
                            <div className="flex justify-center gap-8 mt-8 text-sm font-medium tracking-widest uppercase">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-3 bg-[#F59E0B] rounded-full"></div>
                                    <span>Available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-3 bg-white/20 rounded-full"></div>
                                    <span>No Availability</span>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Timeline Chart */}
                    <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
                        {/* Header Months */}
                        <div className="grid grid-cols-12 gap-1 mb-6 text-center text-xs md:text-sm font-bold opacity-70 tracking-widest">
                            <div>JAN</div>
                            <div>FEB</div>
                            <div>MAR</div>
                            <div>APR</div>
                            <div>MAY</div>
                            <div>JUN</div>
                            <div>JUL</div>
                            <div>AUG</div>
                            <div>SEP</div>
                            <div>OCT</div>
                            <div>NOV</div>
                            <div>DEC</div>
                        </div>

                        {/* Row 1: Mahabaleshwar */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-lg md:text-xl">{t('golden.season.harvest')}</span>
                            </div>
                            <div className="grid grid-cols-12 gap-1 h-3 md:h-4 bg-white/10 rounded-full overflow-hidden">
                                {/* Jan */}
                                <div className="col-span-1 bg-[#F59E0B] opacity-50 rounded-l-full"></div>
                                {/* Feb - May */}
                                <div className="col-span-4 bg-[#F59E0B] relative group cursor-pointer">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-amber-900 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold">
                                        {t('golden.season.peak')}
                                    </div>
                                </div>
                                {/* Jun - Dec */}
                                <div className="col-span-7"></div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-white/60 text-sm italic">
                                {t('golden.season.note')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------------- HOW TO STORE SECTION ---------------- */}
            <section className="py-20 px-6 md:px-12 bg-[#FFFAF0]">
                <div className="container mx-auto text-center">
                    <Reveal>
                        <h2 className="text-4xl md:text-5xl font-bold text-amber-900 font-script mb-4 leading-normal py-2">
                            {t('detail.handling')}
                        </h2>
                        <p className="text-amber-900/70 mb-12 max-w-2xl mx-auto">
                            {t('golden.store.desc')}
                        </p>
                    </Reveal>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                step: "STEP 1",
                                title: t('golden.step1.title'),
                                desc: t('golden.step1.desc'),
                                icon: "🍂"
                            },
                            {
                                step: "STEP 2",
                                title: t('golden.step2.title'),
                                desc: t('golden.step2.desc'),
                                icon: "🏠"
                            },
                            {
                                step: "STEP 3",
                                title: t('golden.step3.title'),
                                desc: t('golden.step3.desc'),
                                icon: "❄️"
                            },
                            {
                                step: "STEP 4",
                                title: t('golden.step4.title'),
                                desc: t('golden.step4.desc'),
                                icon: "🚿"
                            }
                        ].map((item, idx) => (
                            <Reveal key={idx} delay={idx * 0.1}>
                                <div className="text-left group cursor-pointer">
                                    <div className="h-48 bg-white rounded-2xl mb-6 flex items-center justify-center text-6xl shadow-sm group-hover:shadow-md transition-shadow border border-amber-100">
                                        {item.icon}
                                    </div>
                                    <p className="font-bold text-amber-900/50 mb-1 tracking-widest text-sm">{item.step}</p>
                                    <h3 className="font-bold text-xl text-amber-950 mb-3 leading-normal py-1">{item.title}</h3>
                                    <p className="text-amber-900/60 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default GoldenBerryDetail;
