import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/ui/Reveal';
import mulberryHero from '@/assets/mulberry_hero.png';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrustBadges from '@/components/TrustBadges';

const MulberryDetail = () => {
    const { t } = useLanguage();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const nutritionalFacts = [
        { label: t('fact.iron'), value: t('fact.high'), desc: t('fact.blood_health') },
        { label: t('fact.vitc'), value: t('fact.rich'), desc: t('fact.immunity') },
        { label: t('fact.vitk1'), value: t('fact.ess'), desc: t('fact.bone_health') },
        { label: t('fact.antioxidants'), value: t('fact.top'), desc: t('fact.cell_protection') },
    ];

    return (
        <main className="min-h-screen bg-[#FDF4FF]">
            <Navbar />

            {/* ---------------- HERO SECTION ---------------- */}
            <section className="relative pt-20 pb-12 md:pt-24 md:pb-20 px-6 md:px-12 lg:px-20 overflow-hidden">
                <div className="container mx-auto">
                    <Link to="/" className="inline-flex items-center text-purple-800 hover:text-purple-600 mb-8 transition-colors group">
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        {t('detail.back')}
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="z-10">
                            <Reveal>
                                <p className="font-script text-3xl text-purple-600 mb-2">{t('mulberry.hero.subtitle')}</p>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#2D2A3A] leading-normal mb-6 py-2">
                                    {t('berry.mulberries')}:<br />
                                    <span className="text-purple-600">{t('mulberry.hero.title')}</span>
                                </h1>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <p className="text-lg md:text-xl text-[#5C506B] mb-8 leading-relaxed max-w-xl">
                                    {t('mulberry.hero.desc')}
                                </p>
                            </Reveal>

                            <Reveal delay={0.5}>
                                <div className="grid grid-cols-2 gap-4 max-w-md">
                                    {nutritionalFacts.map((fact) => (
                                        <div key={fact.label} className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-purple-100">
                                            <p className="text-3xl font-bold text-purple-600">{fact.value}</p>
                                            <p className="font-semibold text-[#2D2A3A]">{fact.label}</p>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">{fact.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>

                        {/* Right Image */}
                        <div className="relative flex justify-center lg:justify-end">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="relative z-10"
                            >
                                <img
                                    src={mulberryHero}
                                    alt="Fresh Mulberries"
                                    className="w-full max-w-[500px] drop-shadow-xl"
                                    style={{ filter: 'drop-shadow(0 20px 40px rgba(128, 0, 128, 0.2))' }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <TrustBadges />

            {/* ---------------- AVAILABILITY SECTION (Dark Purple) ---------------- */}
            <section className="bg-[#4A1D50] text-white py-12 md:py-20 px-6 md:px-12">
                <div className="container mx-auto">
                    <div className="text-center mb-10 md:mb-16">
                        <Reveal>
                            <h2 className="text-4xl md:text-6xl font-bold mb-4 font-script">
                                {t('detail.season')}
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-white/80 max-w-2xl mx-auto">
                                {t('mulberry.season.desc')}
                            </p>
                        </Reveal>

                        {/* Legend */}
                        <Reveal delay={0.3}>
                            <div className="flex justify-center gap-8 mt-8 text-sm font-medium tracking-widest uppercase">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-3 bg-[#D946EF] rounded-full"></div>
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
                                        <span className="font-bold text-lg md:text-xl">{t('mulberry.season.harvest')}</span>
                                    </div>
                                    <div className="grid grid-cols-12 gap-1 h-3 md:h-4 bg-white/10 rounded-full overflow-hidden">
                                        {/* Jan - Feb (Available late Jan) */}
                                        <div className="col-span-1"></div>
                                        <div className="col-span-1 bg-[#D946EF] opacity-50"></div>
                                        {/* Mar - May (Peak) */}
                                        <div className="col-span-3 bg-[#D946EF] rounded-l-full rounded-r-full relative group cursor-pointer">
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-purple-900 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold hidden md:block">
                                                {t('mulberry.season.summer')}
                                            </div>
                                        </div>
                                        {/* Jun - Sep */}
                                        <div className="col-span-4"></div>
                                        {/* Oct - Nov (Winter Season) */}
                                        <div className="col-span-2 bg-[#D946EF] rounded-full relative group cursor-pointer">
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-purple-900 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold hidden md:block">
                                                {t('mulberry.season.winter')}
                                            </div>
                                        </div>
                                        {/* Dec */}
                                        <div className="col-span-1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Legend/Info (Visible only on mobile) */}
                        <div className="md:hidden mt-4 space-y-2 text-sm text-white/80 bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#D946EF] rounded-full"></span>
                                <span><strong>Mar - May:</strong> {t('mulberry.season.summer')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#D946EF] rounded-full"></span>
                                <span><strong>Oct - Nov:</strong> {t('mulberry.season.winter')}</span>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-white/60 text-sm italic">
                                {t('mulberry.season.note')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------------- HOW TO STORE SECTION ---------------- */}
            <section className="py-12 md:py-20 px-6 md:px-12 bg-[#FDF4FF]">
                <div className="container mx-auto text-center">
                    <Reveal>
                        <h2 className="text-4xl md:text-5xl font-bold text-purple-900 font-script mb-4">
                            {t('detail.handling')}
                        </h2>
                        <p className="text-purple-900/70 mb-12 max-w-2xl mx-auto">
                            {t('mulberry.store.desc')}
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {[
                            {
                                step: "STEP 1",
                                title: t('mulberry.step1.title'),
                                desc: t('mulberry.step1.desc'),
                                icon: "🚫🚿"
                            },
                            {
                                step: "STEP 2",
                                title: t('mulberry.step2.title'),
                                desc: t('mulberry.step2.desc'),
                                icon: "❄️"
                            },
                            {
                                step: "STEP 3",
                                title: t('mulberry.step3.title'),
                                desc: t('mulberry.step3.desc'),
                                icon: "🛁"
                            },
                            {
                                step: "STEP 4",
                                title: t('mulberry.step4.title'),
                                desc: t('mulberry.step4.desc'),
                                icon: "💜"
                            }
                        ].map((item, idx) => (
                            <Reveal key={idx} delay={idx * 0.1}>
                                <div className="text-left group cursor-pointer">
                                    <div className="h-40 md:h-48 bg-white rounded-2xl mb-4 md:mb-6 flex items-center justify-center text-6xl shadow-sm group-hover:shadow-md transition-shadow border border-purple-100">
                                        {item.icon}
                                    </div>
                                    <p className="font-bold text-purple-900/50 mb-1 tracking-widest text-xs md:text-sm">{item.step}</p>
                                    <h3 className="font-bold text-lg md:text-xl text-purple-950 mb-2 md:mb-3">{item.title}</h3>
                                    <p className="text-purple-900/60 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- SERVING SECTION ---------------- */}
            <section className="py-12 md:py-20 px-6 md:px-12 bg-white overflow-hidden">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <Reveal>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src="/src/assets/lifestyle_mulberry.png"
                                    alt="Mulberry Lifestyle"
                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </Reveal>
                        <div className="lg:pl-10">
                            <Reveal delay={0.2}>
                                <h2 className="text-3xl md:text-5xl font-bold text-purple-900 font-script mb-6">
                                    {t('mulberry.hero.title')}
                                </h2>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    {t('mulberry.hero.desc')}
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <span className="text-2xl">🫐</span>
                                        <span>Great for making jams and preserves</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <span className="text-2xl">🥧</span>
                                        <span>Bake into rustic galettes</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <span className="text-2xl">🍷</span>
                                        <span>Infuse into syrups or wines</span>
                                    </li>
                                </ul>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default MulberryDetail;
