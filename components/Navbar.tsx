
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="https://i.postimg.cc/Mpsm3pDq/21.png" 
                alt="Icon" 
                className="h-10 w-auto object-contain transition-all duration-300 filter-blue-on-hover"
              />
              <img 
                src="https://i.postimg.cc/0QRZQSk5/DEEP-SHIFT-LOGOOO.png" 
                alt="Deep Shift AI Logo" 
                className="h-10 w-auto object-contain hidden xs:block"
              />
              <div className="flex items-center space-x-2 border-l border-gray-200 pl-4 ml-1 hidden lg:flex">
                <span className="font-poppins font-bold text-2xl tracking-tight">
                  <span className="text-black">Deep Shift</span> <span className="text-innovation-orange">AI</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-5 lg:space-x-6" ref={dropdownRef}>
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative group">
                {link.subLinks ? (
                  <div className="flex items-center">
                    <button
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      className={`flex items-center text-xs lg:text-sm font-bold transition-colors ${
                        location.pathname.startsWith(link.path) ? 'text-innovation-orange' : 'text-gray-600 hover:text-navy'
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className="ml-1" />
                    </button>
                    {activeDropdown === link.label && (
                      <div 
                        className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-100 shadow-xl rounded-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className={`block px-5 py-2.5 text-xs font-semibold hover:bg-gray-50 transition-colors ${
                              location.pathname === sub.path ? 'text-innovation-orange' : 'text-gray-600'
                            }`}
                            onClick={() => setActiveDropdown(null)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`text-xs lg:text-sm font-bold transition-colors ${
                      location.pathname === link.path ? 'text-innovation-orange' : 'text-gray-600 hover:text-navy'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              to="/contact"
              className="bg-navy text-white px-5 lg:px-6 py-2.5 rounded-full text-xs lg:text-sm font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-navy p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-4 px-6 space-y-2 absolute top-20 left-0 w-full shadow-2xl animate-in slide-in-from-top duration-300">
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              {link.subLinks ? (
                <div className="space-y-2">
                  <div className="text-lg font-bold text-gray-400 uppercase tracking-widest px-2 pt-2 border-b border-gray-50">{link.label}</div>
                  {link.subLinks.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between text-lg font-medium text-gray-700 hover:text-innovation-orange py-2"
                    >
                      {sub.label}
                      <ChevronRight size={18} />
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-lg font-medium text-gray-700 hover:text-innovation-orange py-2"
                >
                  {link.label}
                  <ChevronRight size={18} />
                </Link>
              )}
            </div>
          ))}
          <div className="pt-4 border-t border-gray-50">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-navy text-white py-4 rounded-xl font-bold shadow-lg"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
