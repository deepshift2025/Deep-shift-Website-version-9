
import React from 'react';
import { X, Search, ArrowRight, Loader2, Info, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  title: string;
  snippet: string;
  type: string;
  path: string;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  results: SearchResult[];
  query: string;
  isLoading: boolean;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, results, query, isLoading }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center bg-navy/98 backdrop-blur-xl p-4 md:p-12 animate-in fade-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all"
      >
        <X size={32} />
      </button>

      <div className="w-full max-w-4xl pt-12">
        <div className="flex items-center space-x-4 mb-12 border-b border-white/10 pb-6">
          <Search className="text-innovation-orange w-8 h-8" />
          <h2 className="text-2xl md:text-4xl font-poppins font-bold text-white">
            Results for: <span className="text-innovation-blue">"{query}"</span>
          </h2>
        </div>

        <div className="custom-scrollbar max-h-[70vh] overflow-y-auto pr-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/40">
              <Loader2 className="w-12 h-12 animate-spin mb-4 text-innovation-orange" />
              <p className="font-bold uppercase tracking-widest text-xs">AI is indexing knowledge base...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((res, i) => (
                <div 
                  key={i}
                  onClick={() => {
                    navigate(res.path);
                    onClose();
                  }}
                  className="bg-white/5 border border-white/10 p-6 rounded-[32px] hover:bg-white/10 transition-all cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={16} className="text-innovation-blue" />
                  </div>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-innovation-orange/20 text-innovation-orange text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border border-innovation-orange/20">
                      {res.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-innovation-blue transition-colors">{res.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{res.snippet}</p>
                  <div className="mt-4 flex items-center text-xs font-bold text-innovation-blue uppercase tracking-tighter group-hover:translate-x-1 transition-transform">
                    View Details <ArrowRight size={14} className="ml-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/5 rounded-[40px] border border-dashed border-white/10">
              <Info className="text-gray-500 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-2">No direct matches found</h3>
              <p className="text-gray-400 max-w-xs mx-auto text-sm mb-8">Try adjusting your keywords or contact our experts directly for specific inquiries.</p>
              <button 
                onClick={onClose}
                className="bg-innovation-orange text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
           <div className="flex items-center space-x-2">
              <img src="https://i.postimg.cc/Mpsm3pDq/21.png" className="w-5 h-5 object-contain opacity-50" alt="DS" />
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Powered by Deep Shift AI Search Engine v4.0</span>
           </div>
           <div className="hidden sm:flex space-x-4">
              <span className="text-[10px] text-gray-600 font-bold uppercase">ESC to close</span>
              <span className="text-[10px] text-gray-600 font-bold uppercase">Click outside to return</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
