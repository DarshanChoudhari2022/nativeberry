import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/ui/Reveal';
import raspberryHero from '@/assets/raspberry_hero.png';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrustBadges from '@/components/TrustBadges';

const RaspberryDetail = () => {
    const { t } = useLanguage();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const nutritionalFacts = [
        { label: t('fact.fiber'), value: '8g', desc: t('fact.digestive_health') },
        { label: t('fact.vitc'), value: '54%', desc: t('fact.daily_value') },
        { label: t('fact.manganese'), value: '41%', desc: t('fact.metabolism') },
        { label: t('fact.carbs'), value: t('fact.low'), desc: t('fact.keto_friendly') },
    ];

    return (
        <main className="min-h-screen bg-[#FFF0F5]">
            <Navbar />

            {/* ---------------- HERO SECTION ---------------- */}
            <section className="relative pt-20 pb-12 md:pt-24 md:pb-20 px-6 md:px-12 lg:px-20 overflow-hidden">
                <div className="container mx-auto">
                    <Link to="/" className="inline-flex items-center text-pink-700 hover:text-pink-500 mb-8 transition-colors group">
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        {t('detail.back')}
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="z-10">
                            <Reveal>
                                <p className="font-script text-3xl text-pink-600 mb-2">{t('raspberry.hero.subtitle')}</p>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#3A2626] leading-normal mb-6 py-2">
                                    {t('berry.raspberries')}:<br />
                                    <span className="text-pink-600">{t('raspberry.hero.title')}</span>
                                </h1>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <p className="text-lg md:text-xl text-[#6B5050] mb-8 leading-relaxed max-w-xl">
                                    {t('raspberry.hero.desc')}
                                </p>
                            </Reveal>

                            <Reveal delay={0.5}>
                                <div className="grid grid-cols-2 gap-4 max-w-md">
                                    {nutritionalFacts.map((fact) => (
                                        <div key={fact.label} className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-pink-100">
                                            <p className="text-3xl font-bold text-pink-600">{fact.value}</p>
                                            <p className="font-semibold text-[#3A2626]">{fact.label}</p>
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
                                    src={raspberryHero}
                                    alt="Fresh Raspberries"
                                    className="w-full max-w-[500px] drop-shadow-xl"
                                    style={{ filter: 'drop-shadow(0 25px 45px rgba(219, 39, 119, 0.25))' }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <TrustBadges />

            {/* ---------------- AVAILABILITY SECTION (Dark Pink) ---------------- */}
            <section className="bg-[#831843] text-white py-12 md:py-20 px-6 md:px-12">
                <div className="container mx-auto">
                    <div className="text-center mb-10 md:mb-16">
                        <Reveal>
                            <h2 className="text-4xl md:text-6xl font-bold mb-4 font-script leading-normal py-2">
                                {t('raspberry.season.title')}
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-white/80 max-w-2xl mx-auto">
                                {t('raspberry.season.desc')}
                            </p>
                        </Reveal>

                        {/* Legend */}
                        <Reveal delay={0.3}>
                            <div className="flex justify-center gap-8 mt-8 text-sm font-medium tracking-widest uppercase">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-3 bg-[#EC4899] rounded-full"></div>
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
                    <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-12 border border-white/10">
                        <div className="overflow-x-auto pb-4">
                            <div className="min-w-[600px]">
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
                                        <span className="font-bold text-lg md:text-xl">{t('raspberry.season.growing')}</span>
                                    </div>
                                    <div className="grid grid-cols-12 gap-1 h-3 md:h-4 bg-white/10 rounded-full overflow-hidden">
                                        {/* Jan - Mar */}
                                        <div className="col-span-3 bg-[#EC4899] rounded-l-full relative group cursor-pointer">
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-pink-900 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold hidden md:block">
                                                {t('raspberry.season.peak')}
                                            </div>
                                        </div>
                                        {/* Apr - May */}
                                        <div className="col-span-2 bg-[#EC4899] opacity-70 rounded-r-full"></div>
                                        {/* Jun - Sep */}
                                        <div className="col-span-4"></div>
                                        {/* Oct - Dec */}
                                        <div className="col-span-3 bg-[#EC4899] rounded-l-full rounded-r-full opacity-60">
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-pink-900 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold hidden md:block">
                                                {t('raspberry.season.limited')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Legend/Info (Visible only on mobile) */}
                        <div className="md:hidden mt-4 space-y-2 text-sm text-white/80 bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#EC4899] rounded-full"></span>
                                <span><strong>Jan - Mar:</strong> {t('raspberry.season.peak')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#EC4899] opacity-60 rounded-full"></span>
                                <span><strong>Oct - Dec:</strong> {t('raspberry.season.limited')}</span>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-white/60 text-sm italic">
                                {t('raspberry.season.note')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------------- HOW TO STORE SECTION ---------------- */}
            <section className="py-12 md:py-20 px-6 md:px-12 bg-[#FFF0F5]">
                <div className="container mx-auto text-center">
                    <Reveal>
                        <h2 className="text-4xl md:text-5xl font-bold text-pink-900 font-script mb-4 leading-normal py-2">
                            {t('detail.handling')}
                        </h2>
                        <p className="text-pink-900/70 mb-12 max-w-2xl mx-auto">
                            {t('raspberry.store.desc')}
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {[
                            {
                                step: "STEP 1",
                                title: t('raspberry.step1.title'),
                                desc: t('raspberry.step1.desc'),
                                icon: "❄️"
                            },
                            {
                                step: "STEP 2",
                                title: t('raspberry.step2.title'),
                                desc: t('raspberry.step2.desc'),
                                icon: "🥞"
                            },
                            {
                                step: "STEP 3",
                                title: t('raspberry.step3.title'),
                                desc: t('raspberry.step3.desc'),
                                icon: "😋"
                            },
                            {
                                step: "STEP 4",
                                title: t('raspberry.step4.title'),
                                desc: t('raspberry.step4.desc'),
                                icon: "🍧"
                            }
                        ].map((item, idx) => (
                            <Reveal key={idx} delay={idx * 0.1}>
                                <div className="text-left group cursor-pointer">
                                    <div className="h-40 md:h-48 bg-white rounded-2xl mb-4 md:mb-6 flex items-center justify-center text-4xl md:text-6xl shadow-sm group-hover:shadow-md transition-shadow border border-pink-100">
                                        {item.icon}
                                    </div>
                                    <p className="font-bold text-pink-900/50 mb-1 tracking-widest text-xs md:text-sm">{item.step}</p>
                                    <h3 className="font-bold text-lg md:text-xl text-pink-950 mb-2 md:mb-3 leading-normal py-1">{item.title}</h3>
                                    <p className="text-pink-900/60 text-xs md:text-sm leading-relaxed">{item.desc}</p>
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

export default RaspberryDetail;
