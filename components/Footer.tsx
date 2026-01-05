
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Linkedin, 
  Twitter, 
  Github, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone, 
  Settings as SettingsIcon,
  Search,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { performSiteSearch } from '../services/geminiService';
import SearchOverlay from './SearchOverlay';

const Footer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [lastQuery, setLastQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;

    setLastQuery(searchQuery);
    setIsSearching(true);
    setIsOverlayOpen(true);
    
    try {
      const results = await performSiteSearch(searchQuery);
      setSearchResults(results);
    } catch (err) {
      console.error(err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <footer className="bg-navy text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <img 
                  src="https://i.postimg.cc/QdjJRD6T/deep-shift-LOGO2.png" 
                  alt="Deep Shift AI" 
                  className="h-12 w-auto object-contain"
                />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                East Africa's leading provider of enterprise-grade AI solutions, agents, and local language technologies. Empowering businesses through innovation.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-innovation-orange transition-colors"><Linkedin size={18} /></a>
                <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-innovation-orange transition-colors"><Twitter size={18} /></a>
                <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-innovation-orange transition-colors"><Github size={18} /></a>
                <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-innovation-orange transition-colors"><Youtube size={18} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-poppins font-semibold text-lg mb-6">Explore</h3>
              <ul className="space-y-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="font-poppins font-semibold text-lg mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 group">
                  <MapPin className="text-innovation-orange shrink-0 mt-1" size={18} />
                  <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                    National ICT Innovation Hub,<br />Nakawa, Kampala, Uganda
                  </span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <Mail className="text-innovation-orange shrink-0" size={18} />
                  <span className="text-gray-400 text-sm group-hover:text-white transition-colors">info@deepshiftai.com</span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <Phone className="text-innovation-orange shrink-0" size={18} />
                  <span className="text-gray-400 text-sm group-hover:text-white transition-colors">+256 761 440460 / +256 709 250797</span>
                </li>
              </ul>
            </div>

            {/* Search & Newsletter */}
            <div>
              <h3 className="font-poppins font-semibold text-lg mb-6">Smart Search</h3>
              <p className="text-gray-400 text-sm mb-4">Find information across our labs and proprietary solutions.</p>
              
              <form onSubmit={handleSearch} className="relative mb-8">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 group-focus-within:text-innovation-orange transition-colors" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search the lab..." 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-12 py-3 text-sm focus:outline-none focus:border-innovation-orange focus:ring-4 focus:ring-innovation-orange/5 transition-all text-white placeholder-gray-500"
                  />
                  <button 
                    type="submit"
                    disabled={isSearching}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-innovation-orange p-1.5 rounded-lg transition-all text-white disabled:opacity-50"
                  >
                    {isSearching ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                  </button>
                </div>
              </form>

              <h3 className="font-poppins font-semibold text-lg mb-6">Stay Informed</h3>
              <form className="flex flex-col space-y-2">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-innovation-orange"
                />
                <button className="bg-innovation-orange text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">Subscribe</button>
              </form>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              <p>© 2025 Deep Shift AI. All rights reserved.</p>
              <Link 
                to="/admin" 
                className="opacity-10 hover:opacity-100 hover:text-innovation-orange transition-all duration-300 transform hover:rotate-90" 
                title="Console Management"
              >
                <SettingsIcon size={12} />
              </Link>
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <a href="#" className="hover:text-white transition-colors">Cookies Settings</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Full Screen Search Overlay */}
      <SearchOverlay 
        isOpen={isOverlayOpen} 
        onClose={() => setIsOverlayOpen(false)} 
        results={searchResults} 
        query={lastQuery}
        isLoading={isSearching}
      />
    </>
  );
};

export default Footer;
