
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft, Share2, X, ChevronLeft, ChevronRight, Zap, Globe } from 'lucide-react';
import { INITIAL_NEWS_POSTS } from '../constants';

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

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showFullImage, setShowFullImage] = useState(false);

  useEffect(() => {
    const savedNews = localStorage.getItem('ds_news');
    const allPosts: NewsPost[] = savedNews ? JSON.parse(savedNews) : (INITIAL_NEWS_POSTS as NewsPost[]);
    const foundPost = allPosts.find(p => p.id === id);
    
    if (foundPost) {
      setPost(foundPost);
    } else {
      // Fallback if not found
      setPost(null);
    }
  }, [id]);

  if (!post) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Zap className="w-16 h-16 text-innovation-orange mx-auto mb-6" />
          <h2 className="text-3xl font-poppins font-bold text-navy mb-4">Post Not Found</h2>
          <p className="text-gray-500 mb-8">The story you're looking for doesn't exist or has been removed.</p>
          <Link to="/news-events" className="inline-flex items-center bg-navy text-white px-8 py-3 rounded-2xl font-bold hover:bg-innovation-blue transition-all">
            <ArrowLeft size={18} className="mr-2" /> Back to News
          </Link>
        </div>
      </div>
    );
  }

  const images = post.images && post.images.length > 0 ? post.images : ["https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"];
  const displayContent = post.content || post.desc;

  return (
    <div className="pt-24 bg-white min-h-screen">
      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-50 mb-12">
        <div className="flex items-center justify-between">
          <Link to="/news-events" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-innovation-orange transition-colors">
            <ArrowLeft size={16} className="mr-2" /> All News & Events
          </Link>
          <button className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-navy transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Gallery Side */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] md:aspect-[16/10] bg-gray-100 rounded-[40px] overflow-hidden shadow-2xl group border-4 border-white">
              <img 
                src={images[activeImageIndex]} 
                alt={post.title} 
                className="w-full h-full object-cover transition-all duration-700 cursor-zoom-in"
                onClick={() => setShowFullImage(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent pointer-events-none"></div>
              
              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImageIndex(prev => (prev - 1 + images.length) % images.length)}
                    className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={() => setActiveImageIndex(prev => (prev + 1) % images.length)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`shrink-0 w-24 aspect-square rounded-2xl overflow-hidden border-4 transition-all ${activeImageIndex === idx ? 'border-innovation-orange scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content Side */}
          <div className="lg:py-6">
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-innovation-blue/10 text-innovation-blue px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{post.tag}</span>
              <div className="flex items-center text-gray-400 text-sm font-medium">
                <Calendar className="w-4 h-4 mr-2 text-innovation-orange" /> {post.date}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-navy mb-8 leading-tight">{post.title}</h1>
            
            <div className="flex items-center text-sm font-bold text-gray-500 uppercase tracking-widest mb-10 pb-10 border-b border-gray-100">
              <MapPin className="w-4 h-4 mr-2 text-innovation-blue" /> {post.loc}
            </div>

            <div className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed space-y-6">
               {displayContent.split('\n').map((para, i) => (
                 <p key={i}>{para}</p>
               ))}
            </div>

            {/* Post CTA */}
            <div className="mt-12 p-8 bg-gray-50 rounded-[40px] border border-gray-100">
              <h3 className="font-poppins font-bold text-navy mb-4">Want to learn more?</h3>
              <p className="text-sm text-gray-500 mb-6">Get in touch with our team for more details about this initiative or partnership opportunities.</p>
              <Link to="/contact" className="inline-flex items-center bg-navy text-white px-8 py-3 rounded-2xl font-bold hover:bg-innovation-orange transition-all">
                Contact Our Lab <ArrowLeft size={18} className="ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Full Image Modal Overlay */}
      {showFullImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/98 backdrop-blur-xl p-4 animate-in fade-in duration-300"
          onClick={() => setShowFullImage(false)}
        >
          <button 
            onClick={() => setShowFullImage(false)}
            className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-innovation-orange transition-all z-[110]"
          >
            <X size={32} />
          </button>
          <div className="relative max-w-7xl max-h-[90vh] flex items-center justify-center">
            <img 
              src={images[activeImageIndex]} 
              alt="Full View" 
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl animate-in zoom-in duration-300"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Modal Nav */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => (prev - 1 + images.length) % images.length); }}
                  className="absolute left-4 md:left-10 p-4 bg-white/10 rounded-full text-white hover:bg-innovation-blue transition-all"
                >
                  <ChevronLeft size={40} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => (prev + 1) % images.length); }}
                  className="absolute right-4 md:right-10 p-4 bg-white/10 rounded-full text-white hover:bg-innovation-blue transition-all"
                >
                  <ChevronRight size={40} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsDetail;
