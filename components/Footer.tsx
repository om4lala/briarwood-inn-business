import React from 'react';
import { Hotel, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const addressQuery = encodeURIComponent("116 Market Avenue Fairfield Illinois");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;

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
    }
  };

  return (
    <footer id="contact" className="bg-brand-900 text-brand-100 pt-20 pb-10 border-t border-brand-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-24 mb-20">
          
          {/* Brand */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl text-white">Briarwood Inn</span>
            </div>
            <p className="text-brand-200 text-lg font-light leading-relaxed max-w-md">
              A welcoming retreat in Fairfield. Experience hometown hospitality and comfortable living.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold tracking-widest text-xs uppercase mb-8">Contact</h4>
            <ul className="space-y-6 font-light text-brand-200">
              <li className="flex items-start gap-3">
                <a 
                  href={mapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white transition-colors group"
                >
                  <MapPin className="h-5 w-5 mt-0.5 text-brand-400 group-hover:text-white transition-colors" />
                  <span className="leading-relaxed border-b border-transparent group-hover:border-white transition-all">
                    116 Market Avenue,<br/>Fairfield, IL
                  </span>
                </a>
              </li>
              <li>
                <a href="tel:+16188423667" className="hover:text-white transition-colors block py-1 flex items-center gap-3">
                  <Phone className="h-4 w-4 text-brand-400" />
                  (618) 842-3667
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold tracking-widest text-xs uppercase mb-8">Menu</h4>
            <ul className="space-y-4 font-light text-brand-200">
              <li>
                <a 
                  href="#rooms" 
                  onClick={(e) => handleNavClick(e, '#rooms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Rooms
                </a>
              </li>
              <li>
                <a 
                  href="#amenities" 
                  onClick={(e) => handleNavClick(e, '#amenities')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Amenities
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-500 font-medium tracking-wide">
          <p>&copy; {new Date().getFullYear()} BRIARWOOD INN. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-brand-300 transition-colors uppercase">Privacy</a>
            <a href="#" className="hover:text-brand-300 transition-colors uppercase">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;