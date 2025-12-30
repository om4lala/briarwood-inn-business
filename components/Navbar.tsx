import React, { useState, useEffect } from 'react';
import { Menu, X, Hotel, Phone } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Rooms', href: '#rooms' },
    { name: 'Amenities', href: '#amenities' },
  ];

  const phoneNumber = "tel:+16188423667";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 100; // Account for fixed header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled || isOpen ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={scrollToTop}>
            <div className={`p-2 rounded-sm transition-colors ${scrolled || isOpen ? 'text-brand-900' : 'text-white'}`}>
               <Hotel className="h-6 w-6" />
            </div>
            <span className={`font-serif text-2xl font-semibold tracking-wide transition-colors duration-300 ${scrolled || isOpen ? 'text-brand-900' : 'text-white'}`}>
              Briarwood
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${
                  scrolled ? 'text-brand-700 hover:text-brand-900' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href={phoneNumber}
              className={`flex items-center gap-2 px-8 py-3 rounded-sm text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              scrolled 
                ? 'bg-brand-900 text-white hover:bg-brand-700' 
                : 'bg-white text-brand-900 hover:bg-brand-50'
            }`}>
              <Phone className="h-3 w-3" />
              Call to Book
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none transition-colors ${scrolled || isOpen ? 'text-brand-900' : 'text-white'}`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-brand-100 transition-all duration-300 ease-in-out origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0 overflow-hidden'}`}>
        <div className="px-6 py-8 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-brand-800 block text-lg font-serif italic cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          <a href={phoneNumber} className="w-full mt-6 bg-brand-900 text-white py-4 rounded-sm text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <Phone className="h-4 w-4" />
            Call to Book
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;