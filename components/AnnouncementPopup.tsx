import React, { useState, useEffect, useCallback } from 'react';
import { X, ArrowRight, Megaphone, Zap, Sparkles, Calendar, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Announcement {
  id: string;
  title: string;
  message: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  isActive: boolean;
  type: 'info' | 'promotion' | 'event';
  triggerType: 'timer' | 'scroll' | 'exit';
  triggerValue: number;
  frequency: 'once' | 'session' | 'daily';
}

const AnnouncementPopup: React.FC = () => {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const checkEligibility = useCallback((active: Announcement) => {
    try {
      // 1. Permanent Lifetime Check
      if (active.frequency === 'once') {
        if (localStorage.getItem(`ds_announcement_permanent_${active.id}`)) return false;
      }
      
      // 2. Daily Frequency Check
      if (active.frequency === 'daily') {
        const lastShown = localStorage.getItem(`ds_announcement_daily_${active.id}`);
        if (lastShown) {
          const diff = Date.now() - parseInt(lastShown);
          if (diff < 24 * 60 * 60 * 1000) return false;
        }
      }

      // 3. Session Check
      if (active.frequency === 'session') {
        if (sessionStorage.getItem(`ds_announcement_dismissed_${active.id}`)) return false;
      }

      return true;
    } catch (e) {
      return true; // Fallback to showing if checks fail
    }
  }, []);

  const triggerPopup = useCallback(() => {
    setIsVisible(true);
    if (announcement?.id && announcement.frequency === 'daily') {
      localStorage.setItem(`ds_announcement_daily_${announcement.id}`, Date.now().toString());
    }
  }, [announcement]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ds_announcements');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const active = parsed.find(a => a.isActive);
          
          if (active && checkEligibility(active)) {
            setAnnouncement(active);

            // TRIGGER LOGIC
            if (active.triggerType === 'timer') {
              const timer = setTimeout(() => setIsVisible(true), (active.triggerValue || 3) * 1000);
              return () => clearTimeout(timer);
            }

            if (active.triggerType === 'scroll') {
              const handleScroll = () => {
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                if (scrollHeight <= 0) return;
                const scrollPercent = (window.scrollY / scrollHeight) * 100;
                if (scrollPercent >= (active.triggerValue || 50)) {
                  triggerPopup();
                  window.removeEventListener('scroll', handleScroll);
                }
              };
              window.addEventListener('scroll', handleScroll);
              return () => window.removeEventListener('scroll', handleScroll);
            }

            if (active.triggerType === 'exit') {
              const handleExit = (e: MouseEvent) => {
                if (e.clientY < 15) { 
                  triggerPopup();
                  window.removeEventListener('mouseleave', handleExit);
                }
              };
              window.addEventListener('mouseleave', handleExit);
              return () => window.removeEventListener('mouseleave', handleExit);
            }
          }
        }
      }
    } catch (err) {
      console.error("Popup initialization error:", err);
    }
  }, [checkEligibility, triggerPopup]);

  const handleClose = () => {
    setIsVisible(false);
    if (announcement) {
      if (announcement.frequency === 'session') {
        sessionStorage.setItem(`ds_announcement_dismissed_${announcement.id}`, 'true');
      }
      if (announcement.frequency === 'once') {
        localStorage.setItem(`ds_announcement_permanent_${announcement.id}`, 'true');
      }
    }
  };

  const handleCTA = () => {
    if (announcement?.ctaLink) {
      if (announcement.ctaLink.startsWith('http')) {
        window.open(announcement.ctaLink, '_blank');
      } else {
        navigate(announcement.ctaLink);
      }
      handleClose();
    }
  };

  if (!announcement || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-navy/40 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="relative w-full max-w-lg bg-white rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-500 border border-white/50">
        
        <button 
          onClick={handleClose}
          className="absolute top-5 right-5 z-20 p-2 bg-gray-100 hover:bg-innovation-orange hover:text-white rounded-full transition-all active:scale-90"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col">
          <div className="relative h-48 sm:h-56 bg-navy overflow-hidden">
            {announcement.image ? (
              <img src={announcement.image} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy via-navy to-innovation-blue/40">
                <div className="relative">
                  <div className="absolute inset-0 bg-innovation-blue/20 blur-3xl animate-pulse"></div>
                  <Megaphone className="text-white relative z-10 opacity-40" size={80} />
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            
            <div className="absolute top-6 left-6 flex items-center space-x-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-lg">
              {announcement.type === 'event' ? <Calendar size={14} className="text-innovation-orange" /> : <Sparkles size={14} className="text-innovation-blue" />}
              <span className="text-[10px] font-black uppercase tracking-widest text-navy">{announcement.type}</span>
            </div>
          </div>

          <div className="p-8 sm:p-10 pt-4 text-center">
            <h2 className="text-3xl font-poppins font-bold text-navy mb-4 tracking-tight leading-tight">
              {announcement.title}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
              {announcement.message}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {announcement.ctaLink && (
                <button 
                  onClick={handleCTA}
                  className="px-10 py-4 bg-navy text-white rounded-2xl font-bold text-sm hover:bg-innovation-blue transition-all shadow-xl shadow-navy/10 flex items-center justify-center group"
                >
                  {announcement.ctaText || 'Learn More'}
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
              <button 
                onClick={handleClose}
                className="px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center"
              >
                Close
              </button>
            </div>
            
            <button 
              onClick={() => {
                localStorage.setItem(`ds_announcement_permanent_${announcement.id}`, 'true');
                setIsVisible(false);
              }}
              className="mt-6 text-[10px] font-bold text-gray-300 hover:text-innovation-orange uppercase tracking-widest transition-colors flex items-center justify-center mx-auto"
            >
              <EyeOff size={12} className="mr-1.5" /> Don't show this again
            </button>

            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-center space-x-2">
               <img src="https://i.postimg.cc/Mpsm3pDq/21.png" className="h-4 w-auto opacity-40" alt="" />
               <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-300">Deep Shift AI Intelligence</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementPopup;