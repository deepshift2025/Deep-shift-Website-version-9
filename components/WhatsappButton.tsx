
import React, { useState, useEffect } from 'react';

const WhatsappButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercentage = (scrolled / scrollHeight) * 100;

      if (scrollPercentage >= 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case the page is already scrolled
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="https://wa.me/256761440460"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 left-6 z-[60] group transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Contact us on WhatsApp"
    >
      <div className="relative">
        {/* Pulsing Outer Ring */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping-slow opacity-40"></div>
        
        {/* Soft Shadow Pulse */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-pulse-soft"></div>
        
        {/* Main Button Container */}
        <div className="relative bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:bg-[#20ba5a] transition-all transform hover:scale-110 flex items-center justify-center border-2 border-white/10 active:scale-95">
          <svg 
            viewBox="0 0 24 24" 
            className="w-7 h-7 fill-current" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        
        {/* Label Tooltip */}
        <div className="absolute bottom-full left-0 mb-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
          <div className="bg-navy text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-xl whitespace-nowrap shadow-2xl border border-white/10">
            Chat with us
          </div>
          {/* Tooltip arrow */}
          <div className="w-2 h-2 bg-navy border-r border-b border-white/10 absolute left-4 -bottom-1 rotate-45"></div>
        </div>
      </div>

      <style>{`
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes pulse-soft {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-pulse-soft {
          animation: pulse-soft 2s infinite;
        }
      `}</style>
    </a>
  );
};

export default WhatsappButton;
