import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/ui/Reveal';
import strawberryHero from '@/assets/strawberry_hero.png';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const StrawberryDetail = () => {
    const { t } = useLanguage();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const nutritionalFacts = [
        { label: t('fact.vitc'), value: '140%', desc: t('fact.daily_value') },
        { label: t('fact.manganese'), value: '30%', desc: t('fact.bone_health') },
        { label: t('fact.folate'), value: 'B9', desc: t('fact.cell_function') },
        { label: t('fact.potassium'), value: t('fact.high'), desc: t('fact.blood_pressure') },
    ];

    return (
        <main className="min-h-screen bg-[#FFF0F0]">
            <Navbar />

            {/* ---------------- HERO SECTION ---------------- */}
            <section className="relative pt-20 pb-12 md:pt-24 md:pb-20 px-6 md:px-12 lg:px-20 overflow-hidden">
                <div className="container mx-auto">
                    <Link to="/" className="inline-flex items-center text-red-800 hover:text-red-600 mb-8 transition-colors group">
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        {t('detail.back')}
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="z-10">
                            <Reveal>
                                <p className="font-script text-3xl text-red-600 mb-2">{t('nav.berries')}</p>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#2D3A26] leading-normal mb-6 py-2">
                                    {t('berry.strawberries')}:<br />
                                    <span className="text-red-600">{t('strawberry.hero.title')}</span>
                                </h1>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <p className="text-lg md:text-xl text-[#5C6B50] mb-8 leading-relaxed max-w-xl">
                                    {t('strawberry.hero.desc')}
                                </p>
                            </Reveal>

                            <Reveal delay={0.5}>
                                <div className="grid grid-cols-2 gap-4 max-w-md">
                                    {nutritionalFacts.map((fact) => (
                                        <div key={fact.label} className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-red-100">
                                            <p className="text-3xl font-bold text-red-600">{fact.value}</p>
                                            <p className="font-semibold text-[#2D3A26]">{fact.label}</p>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">{fact.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>

                        {/* Right Image */}
                        <div className="relative flex justify-center lg:justify-end">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="relative z-10"
                            >
                                <img
                                    src={strawberryHero}
                                    alt="Fresh Strawberries"
                                    className="w-full max-w-[500px] drop-shadow-2xl"
                                    style={{ filter: 'drop-shadow(0 30px 50px rgba(220, 20, 60, 0.3))' }}
                                />

                                {/* Floating Elements mimicking the screenshot vibes */}
                                <motion.div
                                    className="absolute -top-10 -right-10 w-24 h-24 bg-red-500 rounded-full opacity-20 blur-3xl"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------------- AVAILABILITY SECTION (Dark Red) ---------------- */}
            <section className="bg-[#781B26] text-white py-12 md:py-20 px-6 md:px-12">
                <div className="container mx-auto">
                    <div className="text-center mb-10 md:mb-16">
                        <Reveal>
                            <h2 className="text-4xl md:text-6xl font-bold mb-4 font-script leading-normal py-2">
                                {t('detail.availability')}
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
                                Discover the peak seasons of our premium Mahabaleshwar Strawberries.
                                Grown in the cool, misty slopes of the Sahyadris.
                            </p>
                        </Reveal>

                        {/* Legend */}
                        <Reveal delay={0.3}>
                            <div className="flex justify-center gap-8 mt-8 text-sm font-medium tracking-widest uppercase">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-3 bg-[#FF4D4D] rounded-full"></div>
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
                                        <span className="font-bold text-lg md:text-xl">Mahabaleshwar (Our Farm)</span>
                                    </div>
                                    <div className="grid grid-cols-12 gap-1 h-3 md:h-4 bg-white/10 rounded-full overflow-hidden">
                                        {/* Jan - May (Available) */}
                                        <div className="col-span-5 bg-[#FF4D4D] rounded-l-full relative group cursor-pointer">
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-red-900 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold hidden md:block">
                                                Peak Season!
                                            </div>
                                        </div>
                                        {/* Jun - Sep (Rain/Off) */}
                                        <div className="col-span-4"></div>
                                        {/* Oct - Dec (Early) */}
                                        <div className="col-span-3 bg-[#FF4D4D] rounded-r-full opacity-80 relative group cursor-pointer">
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-red-900 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold hidden md:block">
                                                Early Harvest
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2: Comparison / Rest of India */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-lg md:text-xl text-white/60">Common Market</span>
                                    </div>
                                    <div className="grid grid-cols-12 gap-1 h-3 md:h-4 bg-white/10 rounded-full overflow-hidden">
                                        {/* Jan - Mar */}
                                        <div className="col-span-3 bg-white/40 rounded-l-full"></div>
                                        {/* Apr - Dec */}
                                        <div className="col-span-9"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Legend/Info (Visible only on mobile) */}
                        <div className="md:hidden mt-4 space-y-2 text-sm text-white/80 bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#FF4D4D] rounded-full"></span>
                                <span><strong>Jan - May:</strong> Peak Season!</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#FF4D4D] opacity-80 rounded-full"></span>
                                <span><strong>Oct - Dec:</strong> Early Harvest</span>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-white/60 text-sm italic">
                                * Our unique micro-climate in Mahabaleshwar allows for an extended, sweeter harvest compared to other regions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------------- INFO GRID ---------------- */}
            <section className="py-12 md:py-20 px-6 md:px-12 bg-white">
                <div className="container mx-auto grid md:grid-cols-3 gap-8">
                    <Reveal delay={0.1}>
                        <div className="p-6 md:p-8 rounded-3xl bg-[#FFF5F5] hover:bg-[#FFE0E0] transition-colors h-full">
                            <h3 className="text-2xl font-bold text-red-900 mb-4 font-script leading-normal py-1">{t('strawberry.soil.title')}</h3>
                            <p className="text-red-800/70 leading-relaxed">
                                {t('strawberry.soil.desc')}
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="p-6 md:p-8 rounded-3xl bg-[#FFF5F5] hover:bg-[#FFE0E0] transition-colors h-full">
                            <h3 className="text-2xl font-bold text-red-900 mb-4 font-script leading-normal py-1">{t('strawberry.climate.title')}</h3>
                            <p className="text-red-800/70 leading-relaxed">
                                {t('strawberry.climate.desc')}
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <div className="p-6 md:p-8 rounded-3xl bg-[#FFF5F5] hover:bg-[#FFE0E0] transition-colors h-full">
                            <h3 className="text-2xl font-bold text-red-900 mb-4 font-script leading-normal py-1">{t('strawberry.pick.title')}</h3>
                            <p className="text-red-800/70 leading-relaxed">
                                {t('strawberry.pick.desc')}
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ---------------- HOW TO STORE SECTION ---------------- */}
            <section className="py-12 md:py-20 px-6 md:px-12 bg-[#FFF0F0]">
                <div className="container mx-auto text-center">
                    <Reveal>
                        <h2 className="text-4xl md:text-5xl font-bold text-red-800 font-script mb-4 leading-normal py-2">
                            {t('strawberry.store.title')}
                        </h2>
                        <p className="text-red-900/70 mb-12 max-w-2xl mx-auto leading-relaxed">
                            {t('strawberry.store.desc')}
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {[
                            {
                                step: "STEP 1",
                                title: t('strawberry.step1.title'),
                                desc: t('strawberry.step1.desc'),
                                icon: "🚫💧"
                            },
                            {
                                step: "STEP 2",
                                title: t('strawberry.step2.title'),
                                desc: t('strawberry.step2.desc'),
                                icon: "❄️"
                            },
                            {
                                step: "STEP 3",
                                title: t('strawberry.step3.title'),
                                desc: t('strawberry.step3.desc'),
                                icon: "🚿"
                            },
                            {
                                step: "STEP 4",
                                title: t('strawberry.step4.title'),
                                desc: t('strawberry.step4.desc'),
                                icon: "🌡️"
                            }
                        ].map((item, idx) => (
                            <Reveal key={idx} delay={idx * 0.1}>
                                <div className="text-left group cursor-pointer">
                                    <div className="h-40 md:h-48 bg-white rounded-2xl mb-4 md:mb-6 flex items-center justify-center text-4xl md:text-6xl shadow-sm group-hover:shadow-md transition-shadow border border-red-100">
                                        {item.icon}
                                    </div>
                                    <p className="font-bold text-red-900/50 mb-1 tracking-widest text-xs md:text-sm">{item.step}</p>
                                    <h3 className="font-bold text-lg md:text-xl text-red-950 mb-2 md:mb-3 leading-normal py-1">{item.title}</h3>
                                    <p className="text-red-900/60 text-xs md:text-sm leading-relaxed">{item.desc}</p>
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

export default StrawberryDetail;
