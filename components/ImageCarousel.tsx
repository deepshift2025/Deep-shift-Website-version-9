import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface CarouselImage {
  url: string;
  caption: string;
}

const CAROUSEL_IMAGES: CarouselImage[] = [
  {
    url: "https://i.postimg.cc/1XQD6LY3/Whats_App_Image_2025_12_31_at_12_03_09_AMdds.jpg",
    caption: "Regional AI Strategy Session"
  },
  {
    url: "https://i.postimg.cc/ZnS631Dt/Whats_App_Image_2025_12_31_at_12_03_10_AMsad.jpg",
    caption: "Enterprise Automation Workshop"
  },
  {
    url: "https://i.postimg.cc/j2byNGkx/Whats_App_Image_2025_12_31_at_12_03_09_AMwwee.jpg",
    caption: "Next-Gen NLP Research"
  },
  {
    url: "https://i.postimg.cc/MHS1Rh3g/Whats_App_Image_2025_12_31_at_12_03_11_AMasadsdffd.jpg",
    caption: "Collaboration at Nakawa Hub"
  },
  {
    url: "https://i.postimg.cc/90hyTvgk/Whats_App_Image_2025_12_31_at_12_03_11_AMdsdsa.jpg",
    caption: "Agentic AI Development"
  },
  {
    url: "https://i.postimg.cc/6qXCRD1s/Whats_App_Image_2025_12_31_at_12_03_11_AMsads.jpg",
    caption: "Tech Leadership Summit"
  },
  {
    url: "https://i.postimg.cc/KzLn1Zfs/Whats_App_Image_2025_12_31_at_12_03_13_AMasadde.jpg",
    caption: "AI Training & Education"
  },
  {
    url: "https://i.postimg.cc/9MTGDWb8/Whats_App_Image_2025_12_31_at_12_03_13_AMdsfd.jpg",
    caption: "Local Language Data Mining"
  },
  {
    url: "https://i.postimg.cc/TwmrKR0J/Whats_App_Image_2025_12_31_at_12_03_14_AMsasads.jpg",
    caption: "Strategic Partnership Meeting"
  },
  {
    url: "https://i.postimg.cc/V6MjJYgg/Whats_App_Image_2025_12_31_at_12_03_16_AMsds.jpg",
    caption: "Innovative Workspace"
  },
  {
    url: "https://i.postimg.cc/RFfcWMd7/Whats_App_Image_2025_12_31_at_12_03_17_AM.jpg",
    caption: "Corporate AI Integration"
  },
  {
    url: "https://i.postimg.cc/Ss8Wnydj/Whats_App_Image_2025_12_31_at_12_03_17_AMs.jpg",
    caption: "Data Science Team"
  },
  {
    url: "https://i.postimg.cc/YST6246v/Whats_App_Image_2025_12_31_at_12_03_18_AMasddsd.jpg",
    caption: "AI Solution Architecture"
  },
  {
    url: "https://i.postimg.cc/mrP3G3FK/Whats_App_Image_2025_12_31_at_12_03_22_AMsdsds.jpg",
    caption: "Machine Learning Engineering"
  },
  {
    url: "https://i.postimg.cc/N0K8w8rS/Whats_App_Image_2025_12_31_at_12_03_22_AMsdsdsds.jpg",
    caption: "Digital Transformation Hub"
  },
  {
    url: "https://i.postimg.cc/hty8wZh3/Whats_App_Image_2025_12_31_at_12_03_23_AMsdsas.jpg",
    caption: "Linguistic Tech Lab"
  },
  {
    url: "https://i.postimg.cc/Gp4P1Psx/Whats_App_Image_2025_12_31_at_12_03_23_AMsdsdsd.jpg",
    caption: "Uganda's Tech Future"
  },
  {
    url: "https://i.postimg.cc/Gm7PNg9q/Whats_App_Image_2025_12_31_at_12_03_24_AMasad.jpg",
    caption: "AI Agent Monitoring"
  },
  {
    url: "https://i.postimg.cc/y8Qh5pWf/Whats_App_Image_2025_12_31_at_12_03_24_AMdsdsa.jpg",
    caption: "Custom LLM Fine-tuning"
  },
  {
    url: "https://i.postimg.cc/sg6P8H19/Whats_App_Image_2025_12_31_at_12_03_24_AMdsdsawedssas.jpg",
    caption: "Innovation Hub Gathering"
  },
  {
    url: "https://i.postimg.cc/cL97jk67/Whats_App_Image_2025_12_31_at_12_03_25_AMasdsfdfdvcfgfg.jpg",
    caption: "Deep Tech Research"
  },
  {
    url: "https://i.postimg.cc/K8q7Vp4g/Whats_App_Image_2025_12_31_at_12_03_25_AMsdsdsdsa.jpg",
    caption: "Workflow Automation Demo"
  },
  {
    url: "https://i.postimg.cc/3xSj6fWR/Whats_App_Image_2025_12_31_at_12_10_09_AMsdsds.jpg",
    caption: "Regional Ecosystem Growth"
  },
  {
    url: "https://i.postimg.cc/9QFtLHXC/Whats_App_Image_2025_12_31_at_12_10_14_AMssdsd.jpg",
    caption: "AI Empowerment Seminar"
  },
  {
    url: "https://i.postimg.cc/sDK5QHYT/Whats_App_Image_2025_12_30_at_11_48_29_PMsd.jpg",
    caption: "Building Local Intelligence"
  },
  {
    url: "https://i.postimg.cc/J4KjDY3V/Whats_App_Image_2025_12_30_at_11_48_26_PMse.jpg",
    caption: "Tech Talent Pipeline"
  },
  {
    url: "https://i.postimg.cc/zXpTb2C4/Whats_App_Image_2025_12_30_at_11_48_26_PMes.jpg",
    caption: "East African Innovation"
  },
  {
    url: "https://i.postimg.cc/MKt1M308/Whats_App_Image_2025_12_30_at_11_48_25_PMhj.jpg",
    caption: "Deep Shift AI Community"
  },
  {
    url: "https://i.postimg.cc/HkxXQ03G/Whats_App_Image_2025_12_30_at_11_48_23_PMdd.jpg",
    caption: "Agentic AI Prototype"
  },
  {
    url: "https://i.postimg.cc/mgDCQ3Vs/Whats_App_Image_2025_12_30_at_11_48_22_PMa.jpg",
    caption: "Corporate Milestone"
  },
  {
    url: "https://i.postimg.cc/mZYYRgtZ/Whats_App_Image_2025_12_30_at_11_48_41_PMss.jpg",
    caption: "Technical Advisory"
  },
  {
    url: "https://i.postimg.cc/66rrwpyG/Whats_App_Image_2025_12_30_at_11_48_40_PMdc.jpg",
    caption: "Scaling AI Solutions"
  },
  {
    url: "https://i.postimg.cc/Dy7qz3XZ/Whats_App_Image_2025_12_30_at_11_48_38_PMgg.jpg",
    caption: "NLP Domain Excellence"
  },
  {
    url: "https://i.postimg.cc/dtJ80cy6/Whats_App_Image_2025_12_30_at_11_48_32_PMee.jpg",
    caption: "Modern Tech Infrastructure"
  },
  {
    url: "https://i.postimg.cc/rFqSp2rZ/Whats_App_Image_2025_12_30_at_11_48_32_PMas.jpg",
    caption: "Future of Work Seminar"
  },
  {
    url: "https://i.postimg.cc/xT9KdVzg/Whats_App_Image_2025_12_30_at_11_48_32_PMwww.jpg",
    caption: "Digital Economy Insights"
  },
  {
    url: "https://i.postimg.cc/02Z7MXYd/Whats_App_Image_2025_12_30_at_11_48_31_PMdd.jpg",
    caption: "AI Implementation Team"
  },
  {
    url: "https://i.postimg.cc/vHX5g2r3/Whats_App_Image_2025_12_30_at_11_48_29_PMssd.jpg",
    caption: "Kampala Tech Leaders"
  },
  {
    url: "https://i.postimg.cc/QCJ1q0Rm/Whats_App_Image_2025_12_30_at_11_48_46_PMaaq.jpg",
    caption: "Bespoke Model Training"
  },
  {
    url: "https://i.postimg.cc/v8rrMZDp/Whats_App_Image_2025_12_30_at_11_48_45_PMaaa.jpg",
    caption: "Empowering Local Businesses"
  }
];

const ImageCarousel: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length));
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % CAROUSEL_IMAGES.length));
  }, [selectedIndex]);

  const closeFullscreen = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') closeFullscreen();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext, closeFullscreen]);

  // Double the images to create a seamless infinite scroll effect for the background ticker
  const displayImages = [...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES];

  return (
    <div className="py-20 bg-white overflow-hidden border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <h2 className="text-navy font-poppins font-bold text-3xl md:text-4xl">Innovation in Action</h2>
        <p className="text-gray-500 mt-4">Visualizing the future of East Africa's digital landscape.</p>
        <div className="mt-2 inline-flex items-center text-xs font-semibold text-innovation-blue uppercase tracking-widest">
          <Maximize2 size={12} className="mr-2" /> Double click for full view
        </div>
      </div>

      <div className="relative w-full overflow-hidden group/carousel">
        {/* Infinite Ticker Container */}
        <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused] transition-all">
          {displayImages.map((image, idx) => {
            const originalIndex = idx % CAROUSEL_IMAGES.length;
            return (
              <div 
                key={idx} 
                onDoubleClick={() => setSelectedIndex(originalIndex)}
                className="relative w-[300px] md:w-[450px] aspect-video mx-4 rounded-[32px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer group shadow-lg border-4 border-white"
              >
                <img 
                  src={image.url} 
                  alt={image.caption} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>

        {/* Gradient Fades for Smooth Edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* Full View Modal Overlay */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={closeFullscreen}
        >
          {/* Close Button */}
          <button 
            onClick={closeFullscreen}
            className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-innovation-orange transition-all z-[110] border border-white/10"
          >
            <X size={32} />
          </button>

          {/* Navigation Controls */}
          <button 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 md:left-10 text-white bg-white/10 p-4 rounded-full hover:bg-innovation-blue transition-all z-[110] border border-white/10"
          >
            <ChevronLeft size={32} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 md:right-10 text-white bg-white/10 p-4 rounded-full hover:bg-innovation-blue transition-all z-[110] border border-white/10"
          >
            <ChevronRight size={32} />
          </button>

          {/* Image Container */}
          <div className="relative max-w-7xl max-h-[80vh] flex flex-col items-center justify-center">
            <div className="relative overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-white/10 animate-in zoom-in duration-300">
              <img 
                src={CAROUSEL_IMAGES[selectedIndex].url} 
                alt={CAROUSEL_IMAGES[selectedIndex].caption} 
                className="max-w-full max-h-[70vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            {/* Metadata */}
            <div className="mt-8 text-center animate-in slide-in-from-bottom-4 duration-500" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-center space-x-2 text-innovation-blue font-bold uppercase tracking-widest text-xs">
                <span>{selectedIndex + 1}</span>
                <span className="opacity-30">/</span>
                <span>{CAROUSEL_IMAGES.length}</span>
              </div>
            </div>

            <div className="mt-6 text-white/30 text-[10px] font-medium uppercase tracking-widest">
              Use arrow keys or click buttons to navigate • ESC to close
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 120s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;