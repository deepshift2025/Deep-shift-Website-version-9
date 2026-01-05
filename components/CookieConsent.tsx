
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X, Settings, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('ds_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem('ds_cookie_consent', JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    const allDeclined = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem('ds_cookie_consent', JSON.stringify(allDeclined));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('ds_cookie_consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-in slide-in-from-bottom duration-700">
      <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-xl rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden">
        {!showPreferences ? (
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start space-x-5 flex-1">
              <div className="w-12 h-12 bg-innovation-blue/10 rounded-2xl flex items-center justify-center shrink-0 text-innovation-blue">
                <Cookie size={28} />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-navy text-lg mb-1">Your Privacy Matters</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                  We use cookies to improve your experience, analyze site traffic, and deliver personalized content. By clicking "Accept All", you agree to our use of cookies as described in our <Link to="/privacy-policy" className="text-innovation-blue font-semibold hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button 
                onClick={() => setShowPreferences(true)}
                className="px-6 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-navy hover:bg-gray-50 transition-all flex items-center"
              >
                <Settings size={16} className="mr-2" /> Manage
              </button>
              <button 
                onClick={handleDeclineAll}
                className="px-6 py-3 rounded-xl text-sm font-bold text-navy bg-gray-100 hover:bg-gray-200 transition-all"
              >
                Reject All
              </button>
              <button 
                onClick={handleAcceptAll}
                className="px-8 py-3 rounded-xl text-sm font-bold text-white bg-navy hover:bg-innovation-blue transition-all shadow-lg shadow-navy/10"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="text-innovation-orange" />
                <h3 className="font-poppins font-bold text-xl text-navy">Cookie Preferences</h3>
              </div>
              <button 
                onClick={() => setShowPreferences(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-gray-50 p-6 rounded-[24px] border border-gray-100 opacity-70 relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Necessary</span>
                  <div className="w-10 h-5 bg-navy rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <h4 className="font-bold text-navy mb-2">Always Active</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed">Essential for the website to function properly. These cannot be disabled.</p>
              </div>

              <div 
                className={`p-6 rounded-[24px] border transition-all cursor-pointer ${preferences.analytics ? 'bg-innovation-blue/5 border-innovation-blue/20 shadow-sm' : 'bg-white border-gray-100'}`}
                onClick={() => setPreferences({...preferences, analytics: !preferences.analytics})}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-innovation-blue uppercase tracking-widest">Analytics</span>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${preferences.analytics ? 'bg-innovation-blue' : 'bg-gray-200'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${preferences.analytics ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </div>
                <h4 className="font-bold text-navy mb-2">Performance Tracking</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed">Helps us understand how visitors interact with our lab's digital presence.</p>
              </div>

              <div 
                className={`p-6 rounded-[24px] border transition-all cursor-pointer ${preferences.marketing ? 'bg-innovation-orange/5 border-innovation-orange/20 shadow-sm' : 'bg-white border-gray-100'}`}
                onClick={() => setPreferences({...preferences, marketing: !preferences.marketing})}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-innovation-orange uppercase tracking-widest">Marketing</span>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${preferences.marketing ? 'bg-innovation-orange' : 'bg-gray-200'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${preferences.marketing ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </div>
                <h4 className="font-bold text-navy mb-2">Personalization</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed">Enables us to show you relevant case studies and AI insights across the web.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-100 pt-8">
              <p className="text-xs text-gray-400 max-w-md">
                Your choices are stored for 12 months. You can change these at any time via the link in the footer.
              </p>
              <div className="flex items-center space-x-4 w-full md:w-auto">
                <button 
                  onClick={() => setShowPreferences(false)}
                  className="flex-1 md:flex-none px-6 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-navy transition-all"
                >
                  Back
                </button>
                <button 
                  onClick={handleSavePreferences}
                  className="flex-1 md:flex-none px-8 py-3 rounded-xl text-sm font-bold text-white bg-navy hover:bg-innovation-orange transition-all flex items-center justify-center shadow-lg"
                >
                  Save Choices <CheckCircle2 size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
