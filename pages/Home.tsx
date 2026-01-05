import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Zap, 
  Globe2, 
  Bot,
  ChevronLeft,
  GraduationCap,
  Terminal,
  Gavel,
  Briefcase,
  Sparkles,
  Maximize2,
  X
} from 'lucide-react';
import { SERVICES, INDUSTRIES, INITIAL_TRAINING_POSTERS } from '../constants';
import ImageCarousel from '../components/ImageCarousel';
import TiktokCarousel from '../components/TiktokCarousel';

interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  bgImage: string;
  accent: 'orange' | 'blue';
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: "Enterprise AI Leadership",
    title: "The Future of Autonomous",
    highlight: "Agentic Systems",
    description: "Building intelligent agents capable of planning, reasoning, and executing complex business goals with precision.",
    ctaText: "Request Consultation",
    ctaLink: "/contact",
    secondaryCtaText: "Our Solutions",
    secondaryCtaLink: "/solutions",
    bgImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000",
    accent: 'orange'
  },
  {
    id: 2,
    badge: "Linguistic Infrastructure",
    title: "Breaking Barriers for",
    highlight: "300M+ People",
    description: "Our context-aware NLP engine brings digital inclusion to East Africa, supporting Luganda, Swahili, and beyond.",
    ctaText: "Explore Project",
    ctaLink: "/projects",
    secondaryCtaText: "View Services",
    secondaryCtaLink: "/services",
    bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
    accent: 'blue'
  },
  {
    id: 3,
    badge: "ROI-First Automation",
    title: "Efficiency Reimagined with",
    highlight: "Intelligent Workflows",
    description: "Eliminate repetitive tasks and optimize legacy systems with bespoke automation that delivers measurable value.",
    ctaText: "Automate Now",
    ctaLink: "/contact",
    secondaryCtaText: "Case Studies",
    secondaryCtaLink: "/projects",
    bgImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2000",
    accent: 'orange'
  },
  {
    id: 4,
    badge: "Strategic Intelligence",
    title: "Digital Transformation for",
    highlight: "Enterprise Leaders",
    description: "Strategic AI roadmapping and readiness assessments to prepare your organization for the next decade of growth.",
    ctaText: "Book Strategy Session",
    ctaLink: "/contact",
    secondaryCtaText: "About Us",
    secondaryCtaLink: "/about",
    bgImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000",
    accent: 'blue'
  }
];

const TRAINING_HIGHLIGHTS = [
  {
    title: "Office Professionals",
    desc: "Master prompt engineering and workflow automation.",
    icon: <Briefcase className="w-5 h-5" />,
    color: "innovation-orange"
  },
  {
    title: "Developers & Tech",
    desc: "Build RAG apps and master AI pair programming.",
    icon: <Terminal className="w-5 h-5" />,
    color: "innovation-blue"
  },
  {
    title: "Legal Practitioners",
    desc: "AI research and contract analysis for law firms.",
    icon: <Gavel className="w-5 h-5" />,
    color: "innovation-orange"
  },
  {
    title: "Business Leaders",
    desc: "Strategic ROI and AI governance for executives.",
    icon: <Zap className="w-5 h-5" />,
    color: "innovation-blue"
  }
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [trainingPosters, setTrainingPosters] = useState<string[]>(INITIAL_TRAINING_POSTERS);
  const [selectedPosterIndex, setSelectedPosterIndex] = useState<number | null>(null);

  useEffect(() => {
    setTrainingPosters(INITIAL_TRAINING_POSTERS);

    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      setIsTransitioning(false);
    }, 500);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
      setIsTransitioning(false);
    }, 500);
  };

  // Training Modal Navigation
  const handleTrainingPrev = useCallback(() => {
    if (selectedPosterIndex === null) return;
    setSelectedPosterIndex((prev) => (prev === null ? null : (prev - 1 + trainingPosters.length) % trainingPosters.length));
  }, [selectedPosterIndex, trainingPosters.length]);

  const handleTrainingNext = useCallback(() => {
    if (selectedPosterIndex === null) return;
    setSelectedPosterIndex((prev) => (prev === null ? null : (prev + 1) % trainingPosters.length));
  }, [selectedPosterIndex, trainingPosters.length]);

  const closeTrainingModal = useCallback(() => {
    setSelectedPosterIndex(null);
  }, []);

  // Keyboard navigation for training modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPosterIndex === null) return;
      if (e.key === 'ArrowLeft') handleTrainingPrev();
      if (e.key === 'ArrowRight') handleTrainingNext();
      if (e.key === 'Escape') closeTrainingModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPosterIndex, handleTrainingPrev, handleTrainingNext, closeTrainingModal]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section Carousel */}
      <section className="relative h-[100vh] min-h-[700px] flex items-center bg-navy overflow-hidden">
        {/* Background Images Layer */}
        {HERO_SLIDES.map((s, idx) => (
          <div 
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-40' : 'opacity-0'}`}
          >
            <img 
              src={s.bgImage} 
              alt="" 
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent"></div>
          </div>
        ))}

        {/* Dynamic Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 -right-1/4 w-96 h-96 blur-[120px] rounded-full transition-colors duration-1000 ${slide.accent === 'orange' ? 'bg-innovation-orange/20' : 'bg-innovation-blue/20'}`}></div>
          <div className={`absolute -bottom-1/4 -left-1/4 w-96 h-96 blur-[120px] rounded-full transition-colors duration-1000 ${slide.accent === 'blue' ? 'bg-innovation-blue/10' : 'bg-innovation-orange/10'}`}></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl">
            {/* Animated Content */}
            <div className={`transition-all duration-700 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8">
                <Zap className={`w-4 h-4 ${slide.accent === 'orange' ? 'text-innovation-orange' : 'text-innovation-blue'}`} />
                <span className="text-white text-xs font-semibold tracking-wider uppercase">{slide.badge}</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-poppins font-bold text-white mb-6 leading-[1.1]">
                {slide.title} <br />
                <span className={slide.accent === 'orange' ? 'text-innovation-orange' : 'text-innovation-blue'}>
                  {slide.highlight}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                {slide.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to={slide.ctaLink} className={`${slide.accent === 'orange' ? 'bg-innovation-orange shadow-innovation-orange/20' : 'bg-innovation-blue shadow-innovation-blue/20'} text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl`}>
                  {slide.ctaText}
                </Link>
                <Link to={slide.secondaryCtaLink} className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
                  {slide.secondaryCtaText}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-12 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 z-20 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          {/* Indicators */}
          <div className="flex space-x-4 order-2 md:order-1">
            {HERO_SLIDES.map((s, idx) => (
              <button 
                key={s.id}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentSlide(idx);
                    setIsTransitioning(false);
                  }, 300);
                }}
                className="group relative h-12 w-12 sm:w-24 flex items-center"
              >
                <div className={`h-1 w-full rounded-full transition-colors duration-500 overflow-hidden ${idx === currentSlide ? 'bg-white/30' : 'bg-white/10 group-hover:bg-white/20'}`}>
                  {idx === currentSlide && (
                    <div className={`h-full animate-progress-fill ${s.accent === 'orange' ? 'bg-innovation-orange' : 'bg-innovation-blue'}`}></div>
                  )}
                </div>
                <div className={`absolute -top-6 left-0 text-[10px] font-bold uppercase tracking-widest transition-opacity duration-500 ${idx === currentSlide ? 'opacity-100 text-white' : 'opacity-0'}`}>
                  0{s.id}
                </div>
              </button>
            ))}
          </div>

          {/* Nav Buttons */}
          <div className="flex space-x-3 order-1 md:order-2">
            <button 
              onClick={handlePrev}
              className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/20 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNext}
              className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/20 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <style>{`
          @keyframes progress-fill {
            from { width: 0%; }
            to { width: 100%; }
          }
          .animate-progress-fill {
            animation: progress-fill 7s linear forwards;
          }
        `}</style>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-navy font-poppins font-bold text-3xl md:text-4xl mb-4">Transform Your Business with AI</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Our suite of advanced AI services is designed to drive efficiency, unlock data insights, and scale your operations locally and globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <div key={service.id} className="p-8 rounded-3xl border border-gray-100 bg-white hover:border-innovation-orange/30 hover:shadow-2xl hover:shadow-gray-200/50 transition-all group relative overflow-hidden">
                <div className={`mb-6 p-4 rounded-2xl w-fit transition-colors ${index % 2 === 0 ? 'bg-innovation-orange/5 group-hover:bg-innovation-orange/10' : 'bg-innovation-blue/5 group-hover:bg-innovation-blue/10'}`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-poppins font-bold text-navy mb-4">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link 
                  to={service.id === 'training' ? '/careers/training' : `/services#${service.id}`} 
                  className={`font-semibold text-sm flex items-center hover:translate-x-2 transition-transform ${index % 2 === 0 ? 'text-innovation-orange' : 'text-innovation-blue'}`}
                >
                  Learn More <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Language Project Highlight */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-[40px] p-8 md:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-l from-innovation-blue to-transparent"></div>
            </div>
            
            <div className="relative z-10 lg:w-1/2">
              <div className="inline-flex items-center space-x-2 bg-innovation-blue/20 text-innovation-blue px-4 py-1.5 rounded-full border border-innovation-blue/30 mb-6">
                <Globe2 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Innovation Spotlight</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-6">
                Pioneering Local Language AI Technology
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                We're building East Africa's first context-aware, self-learning local language platform. Breaking linguistic barriers for over 300 million people across the region.
              </p>
              <div className="flex items-center space-x-8 mb-10">
                <div className="text-white">
                  <div className="text-2xl font-bold text-innovation-orange">300M+</div>
                  <div className="text-xs text-gray-400">Target Users</div>
                </div>
                <div className="text-white">
                  <div className="text-2xl font-bold text-innovation-blue">60%</div>
                  <div className="text-xs text-gray-400">Project Complete</div>
                </div>
                <div className="text-white">
                  <div className="text-2xl font-bold text-innovation-orange">140+</div>
                  <div className="text-xs text-gray-400">Local Languages</div>
                </div>
              </div>
              <Link to="/projects" className="bg-innovation-blue text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-innovation-blue/20 transition-all inline-flex items-center">
                Explore This Project <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            
            <div className="lg:w-1/2 mt-12 lg:mt-0 lg:ml-12 relative flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-innovation-blue/20 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-48 h-48 md:w-60 md:h-60 bg-innovation-blue/40 rounded-full flex items-center justify-center">
                  <Globe2 className="w-24 h-24 md:w-32 md:h-32 text-white" />
                </div>
              </div>
              <div className="absolute top-0 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl animate-bounce duration-[3000ms]">
                <span className="text-white text-xs font-mono">NLP_ENGINE_v4.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Deep Shift AI */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-navy font-poppins font-bold text-3xl md:text-4xl mb-2">Why Partner With Deep Shift AI?</h2>
              <p className="text-innovation-orange font-semibold text-lg mb-10">
                We measure success by your outcomes, not our technology.
              </p>
              
              <ul className="space-y-8">
                {[
                  { 
                    title: "ROI-First Approach", 
                    desc: "Every solution starts with your business case. We identify specific processes where AI will save money or generate revenue—then we build to those metrics." 
                  },
                  { 
                    title: "No Vendor Lock-In", 
                    desc: "We build solutions you can maintain and evolve, even without us. Your AI should empower you, not create dependency." 
                  },
                  { 
                    title: "Risk-Managed Implementation", 
                    desc: "Phased deployments, pilot programs, and proof-of-concept stages mean you validate value at every step before scaling." 
                  },
                  { 
                    title: "Industry-Specific Expertise", 
                    desc: "We don't sell generic AI. Our team understands banking, healthcare, telecom, agriculture, and government operations in the East African context." 
                  },
                  { 
                    title: "Training Included", 
                    desc: "Your team learns to use, maintain, and maximize the AI we build. Knowledge transfer is standard, not an add-on." 
                  }
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-4 group">
                    <CheckCircle2 className={`${i % 2 === 0 ? 'text-innovation-orange' : 'text-innovation-blue'} w-6 h-6 shrink-0 mt-1 transition-transform group-hover:scale-110`} />
                    <div>
                      <h4 className="font-bold text-navy text-xl mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-100 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://i.postimg.cc/nrpHWBR1/imageeees.png" 
                  alt="Deep Shift AI Partnership" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-navy shadow-2xl rounded-3xl p-8 border border-white/10 hidden md:block">
                <div className="flex items-center space-x-4 mb-4 text-white">
                  <div className="bg-innovation-orange p-3 rounded-2xl">
                    <Zap className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Efficiency Gain</div>
                    <div className="text-2xl font-bold">~65%</div>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-innovation-orange w-[65%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-navy font-poppins font-bold text-3xl md:text-4xl mb-4">Industries We Serve</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Deep Shift AI delivers specialized enterprise intelligence across every major sector in East Africa.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INDUSTRIES.map((industry) => (
              <div 
                key={industry.id} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:border-innovation-blue hover:-translate-y-2 hover:shadow-xl transform transition-all duration-300"
              >
                <div className="p-3 bg-gray-50 rounded-xl mb-4 group-hover:bg-innovation-blue/10 group-hover:text-innovation-blue transition-all">
                  {industry.icon}
                </div>
                <span className="text-xs font-bold text-navy uppercase tracking-tighter group-hover:text-innovation-blue transition-colors">
                  {industry.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Training Showcase Section (Dynamic) */}
      <section className="py-24 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <div className="inline-flex items-center space-x-2 bg-innovation-orange/10 text-innovation-orange px-4 py-1.5 rounded-full mb-6">
                <GraduationCap className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Skill Up with the Lab</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-navy mb-6">Future-Proof Your Team</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                We bridge the gap between AI potential and human expertise. Our role-specific training programs empower your workforce to operate at the cutting edge of industry.
              </p>
              <div className="mt-4 inline-flex items-center text-xs font-semibold text-innovation-blue uppercase tracking-widest">
                <Maximize2 size={12} className="mr-2" /> Double click posters to view full size
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {TRAINING_HIGHLIGHTS.map((t, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-innovation-orange transition-all">
                  <div className={`w-8 h-8 rounded-lg mb-3 flex items-center justify-center ${t.color === 'innovation-orange' ? 'bg-innovation-orange/10 text-innovation-orange' : 'bg-innovation-blue/10 text-innovation-blue'}`}>
                    {t.icon}
                  </div>
                  <h4 className="font-bold text-navy text-xs mb-1">{t.title}</h4>
                  <p className="text-[10px] text-gray-400 leading-tight">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Poster Ticker */}
        <div className="relative w-full overflow-hidden group/training">
           <div className="flex w-max animate-training-ticker hover:[animation-play-state:paused] transition-all">
              {[...trainingPosters, ...trainingPosters].map((img, idx) => {
                const originalIndex = idx % trainingPosters.length;
                return (
                  <div 
                    key={idx} 
                    onDoubleClick={() => setSelectedPosterIndex(originalIndex)}
                    className="relative w-[280px] md:w-[400px] aspect-[4/5] mx-4 rounded-[40px] overflow-hidden border-4 border-white shadow-2xl group transition-transform duration-500 hover:scale-105 cursor-pointer"
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Training poster ${idx}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                        <div className="flex items-center space-x-2 text-innovation-orange font-bold text-[10px] uppercase tracking-widest mb-2">
                          <Sparkles size={14} /> <span>Next Cohort: Q1 2025</span>
                        </div>
                        <h4 className="text-white font-poppins font-bold text-lg leading-tight">Practical AI Workshop Series</h4>
                    </div>
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold text-navy shadow-lg border border-white/20">
                      ACADEMY
                    </div>
                  </div>
                );
              })}
           </div>
           
           <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
           <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Training Full View Modal */}
        {selectedPosterIndex !== null && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 backdrop-blur-md p-4 animate-in fade-in duration-300"
            onClick={closeTrainingModal}
          >
            <button 
              onClick={closeTrainingModal}
              className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-innovation-orange transition-all z-[110] border border-white/10"
            >
              <X size={32} />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); handleTrainingPrev(); }}
              className="absolute left-4 md:left-10 text-white bg-white/10 p-4 rounded-full hover:bg-innovation-blue transition-all z-[110] border border-white/10"
            >
              <ChevronLeft size={32} />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); handleTrainingNext(); }}
              className="absolute right-4 md:right-10 text-white bg-white/10 p-4 rounded-full hover:bg-innovation-blue transition-all z-[110] border border-white/10"
            >
              <ChevronRight size={32} />
            </button>

            <div className="relative max-w-7xl max-h-[85vh] flex flex-col items-center justify-center">
              <div className="relative overflow-hidden rounded-[40px] shadow-[0_0_60px_rgba(0,0,0,0.5)] border-4 border-white/10 animate-in zoom-in duration-300">
                <img 
                  src={trainingPosters[selectedPosterIndex]} 
                  alt="Training Poster Full View" 
                  className="max-w-full max-h-[75vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              
              <div className="mt-8 text-center animate-in slide-in-from-bottom-4 duration-500" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-center space-x-2 text-innovation-blue font-bold uppercase tracking-widest text-xs">
                  <span>{selectedPosterIndex + 1}</span>
                  <span className="opacity-30">/</span>
                  <span>{trainingPosters.length}</span>
                </div>
              </div>

              <div className="mt-6 text-white/30 text-[10px] font-medium uppercase tracking-widest">
                Arrows to navigate • ESC to close
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
           <div className="bg-navy rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-innovation-orange/5 rounded-br-full"></div>
              <div className="text-left relative z-10">
                <h3 className="text-white font-poppins font-bold text-2xl mb-2">Subscribe to Academy Updates</h3>
                <p className="text-gray-400 text-sm">Be the first to know when new training cohorts open for registration.</p>
              </div>
              <div className="flex w-full md:w-auto relative z-10">
                 <Link to="/careers/training" className="w-full md:w-auto bg-innovation-orange text-white px-10 py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-innovation-orange/20 transition-all flex items-center justify-center">
                   Enroll in a Program <ChevronRight className="ml-2" />
                 </Link>
              </div>
           </div>
        </div>

        <style>{`
          @keyframes training-ticker {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-training-ticker {
            animation: training-ticker 100s linear infinite;
          }
        `}</style>
      </section>

      {/* CTA Ready to Get Started */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-[40px] p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-innovation-blue/20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-white mb-6">Ready to Lead with AI?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                Join the ranks of forward-thinking enterprises across East Africa using Deep Shift AI to drive innovation and growth.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/contact" className="w-full sm:w-auto bg-innovation-orange text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-innovation-orange/20 transition-all">
                  Schedule a Consultation
                </Link>
                <Link to="/careers/training" className="text-white font-bold flex items-center hover:text-innovation-blue transition-colors">
                  Explore Training Programs <ChevronRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Image Carousel */}
      <ImageCarousel />

      {/* Tiktok Video Carousel */}
      <TiktokCarousel />
    </div>
  );
};

export default Home;