import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToRooms = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('rooms');
    
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
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Fixed Position for Parallax feel */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Fairfield Countryside"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-12 animate-fade-in-up">
        <h2 className="text-white/90 text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-6">
          Welcome to the Countryside
        </h2>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-none tracking-tight">
          Briarwood Inn
        </h1>
        <div className="w-24 h-px bg-white/60 mx-auto mb-8"></div>
        <p className="text-white/90 text-lg md:text-2xl font-light mb-12 max-w-2xl mx-auto font-sans leading-relaxed">
          A cozy, single-story sanctuary where comfort meets tradition. <br className="hidden md:block"/>
          Your quiet home away from home in Fairfield, IL.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="#rooms"
            onClick={scrollToRooms}
            className="px-10 py-4 bg-white text-brand-900 text-sm font-bold uppercase tracking-widest hover:bg-brand-50 transition-colors duration-300 cursor-pointer"
          >
            View Rooms
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
        <ChevronDown size={32} strokeWidth={1} />
      </div>
    </div>
  );
};

export default Hero;