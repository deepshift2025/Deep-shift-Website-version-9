
import React, { useState, useEffect } from 'react';
import { Calendar, Globe, MapPin, Zap, X, Maximize2, Image as ImageIcon, MousePointer2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_NEWS_POSTS, INITIAL_GALLERY_IMAGES } from '../constants';

interface NewsPost {
  id: string;
  title: string;
  date: string;
  loc: string;
  desc: string;
  content: string;
  tag: string;
  images?: string[];
}

const NewsEvents: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [news, setNews] = useState<NewsPost[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedNews = localStorage.getItem('ds_news');
    const savedGallery = localStorage.getItem('ds_gallery');
    
    // Merge or prioritize initial posts if none in storage
    setNews(savedNews ? JSON.parse(savedNews) : (INITIAL_NEWS_POSTS as NewsPost[]));
    setGallery(savedGallery ? JSON.parse(savedGallery) : INITIAL_GALLERY_IMAGES);
  }, []);

  // Split the list for two gallery carousels
  const row1Images = gallery.slice(0, Math.ceil(gallery.length / 2));
  const row2Images = gallery.slice(Math.ceil(gallery.length / 2));

  // Branded fallback image URL
  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000";

  return (
    <div className="pt-24 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-navy rounded-[40px] p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-innovation-orange/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-innovation-blue/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6">News & Events</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Stay up to date with the latest technological shifts, corporate milestones, and regional AI summits across East Africa.
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="mb-10 flex items-center justify-between">
           <h2 className="text-2xl font-poppins font-bold text-navy">Corporate Highlights</h2>
           <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
             <MousePointer2 size={12} className="mr-2 text-innovation-orange" /> Double click for full details
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.length === 0 && <p className="col-span-full text-center text-gray-400 italic py-10">Check back soon for latest news.</p>}
          {news.map((item, i) => {
            const hasImages = item.images && item.images.length > 0;
            const displayImages = hasImages ? item.images! : [FALLBACK_IMAGE];

            return (
              <div 
                key={item.id || i} 
                onDoubleClick={() => navigate(`/news-events/${item.id}`)}
                className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full cursor-pointer select-none"
              >
                {/* Visual Media Header */}
                <div className="relative p-3 pb-0">
                  <div className={`grid gap-2 overflow-hidden rounded-[24px] ${displayImages.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {displayImages.slice(0, 4).map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`relative overflow-hidden cursor-pointer bg-gray-100 ${displayImages.length === 1 ? 'aspect-video' : (displayImages.length === 3 && idx === 0 ? 'col-span-2 aspect-[21/9]' : 'aspect-square')}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(img);
                        }}
                      >
                        <img 
                          src={img} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          alt="" 
                        />
                        {/* More images count overlay */}
                        {idx === 3 && displayImages.length > 4 && (
                          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm flex items-center justify-center text-white font-bold">
                            +{displayImages.length - 4}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 pt-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-innovation-blue/10 text-innovation-blue px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{item.tag}</span>
                    <span className="text-xs text-gray-400 flex items-center font-medium"><Calendar className="w-3.5 h-3.5 mr-1 text-innovation-orange" /> {item.date}</span>
                  </div>

                  <h3 className="text-xl font-poppins font-bold text-navy mb-4 group-hover:text-innovation-orange transition-colors leading-tight">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed line-clamp-3">{item.desc}</p>
                  
                  <div className="mt-auto flex items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest border-t border-gray-50 pt-5">
                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-innovation-blue" /> {item.loc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-navy overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center space-x-4 mb-6">
            <Globe className="text-innovation-orange w-8 h-8" />
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white tracking-tight">Community Gallery</h2>
          </div>
          <p className="text-gray-400 max-w-2xl text-lg">
            Capturing the human side of the AI revolution—from our engineering labs at Nakawa Hub to community workshops across the region.
          </p>
          <div className="mt-4 inline-flex items-center text-xs font-semibold text-innovation-blue uppercase tracking-widest">
            <Maximize2 size={12} className="mr-2" /> Double click any image for full view
          </div>
        </div>

        {gallery.length > 0 ? (
          <div className="space-y-8">
            <div className="relative group/r1">
              <div className="flex w-max animate-gallery-scroll-left hover:[animation-play-state:paused] transition-all duration-300">
                {(row1Images.length > 0 ? [...row1Images, ...row1Images] : []).map((img, idx) => (
                  <div 
                    key={idx} 
                    onDoubleClick={() => setSelectedImage(img)}
                    className="w-[300px] md:w-[450px] aspect-[16/10] mx-4 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer shadow-2xl border-2 border-white/5 bg-gray-900 group"
                  >
                    <img src={img} alt={`Gallery img ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group/r2">
              <div className="flex w-max animate-gallery-scroll-right hover:[animation-play-state:paused] transition-all duration-300">
                {(row2Images.length > 0 ? [...row2Images, ...row2Images] : []).map((img, idx) => (
                  <div 
                    key={idx} 
                    onDoubleClick={() => setSelectedImage(img)}
                    className="w-[300px] md:w-[450px] aspect-[16/10] mx-4 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer shadow-2xl border-2 border-white/5 bg-gray-900 group"
                  >
                    <img src={img} alt={`Gallery img ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 italic">No images currently in gallery.</div>
        )}
      </section>

      {/* Newsletter / CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Zap className="w-12 h-12 text-innovation-orange mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-navy mb-6">Stay Shifted</h2>
          <p className="text-gray-500 mb-10 text-lg leading-relaxed">
            Get monthly deep dives into the state of AI in East Africa, product announcements, and event invitations delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 bg-gray-100 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-innovation-blue" />
            <button className="bg-navy text-white px-8 py-4 rounded-2xl font-bold hover:bg-innovation-blue transition-all whitespace-nowrap">Subscribe Now</button>
          </form>
        </div>
      </section>

      {/* Full View Modal Overlay */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button onClick={() => setSelectedImage(null)} className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-innovation-orange transition-all z-[110] border border-white/10">
            <X size={32} />
          </button>
          <div className="relative max-w-7xl max-h-[85vh] flex items-center justify-center">
            <img src={selectedImage} alt="Full View" className="max-w-full max-h-full object-contain rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-white/10 animate-in zoom-in duration-300" onClick={(e) => e.stopPropagation()} />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-xs font-medium uppercase tracking-widest font-bold">Click anywhere or press ESC to close</div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes gallery-scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes gallery-scroll-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .animate-gallery-scroll-left { animation: gallery-scroll-left 180s linear infinite; }
        .animate-gallery-scroll-right { animation: gallery-scroll-right 180s linear infinite; }
      `}</style>
    </div>
  );
};

export default NewsEvents;
