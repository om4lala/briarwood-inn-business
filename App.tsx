import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoomCard from './components/RoomCard';
import Amenities from './components/Amenities';
import Footer from './components/Footer';
import { Room } from './types';
import { Phone } from 'lucide-react';

const App: React.FC = () => {
  const rooms: Room[] = [
    {
      id: 'double',
      name: 'Double Room',
      description: 'Perfect for families or friends sharing travel. Features two comfortable double beds and a cozy sitting area.',
      price: '$79.99',
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      features: ['Two Double Beds', 'Cable TV', 'Work Desk', 'Free Wi-Fi']
    },
    {
      id: 'king',
      name: 'King Room',
      description: 'A spacious room featuring one large King bed. Ideal for couples looking for a comfortable and relaxing stay.',
      price: '$75.99',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      features: ['One King Bed', 'Lounge Chair', 'Cable TV', 'Mini Fridge']
    },
    {
      id: 'suite',
      name: 'Family Suite',
      description: 'Our largest option with extra space to spread out. Includes a kitchenette and a small living area.',
      price: '$149',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      features: ['King Bed + Sofa', 'Kitchenette', 'Dining Area', 'Large Bath']
    }
  ];

  return (
    <div className="min-h-screen bg-brand-50">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Rooms Section */}
        <section id="rooms" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-500 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Accommodations</span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-900 mb-6">Our Rooms</h2>
            <div className="w-16 h-1 bg-brand-200 mx-auto mb-6"></div>
            <p className="text-lg text-brand-700 max-w-2xl mx-auto font-light leading-relaxed">
              Clean, comfortable, and affordable rooms for your stay in Fairfield.
            </p>
          </div>
          
          {/* Changed to Grid for simpler layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>

        <Amenities />

        {/* Minimalist Call to Action */}
        <section className="relative py-32 px-4 bg-brand-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
             <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover grayscale" alt="texture" />
          </div>
          <div className="relative max-w-4xl mx-auto text-center z-10">
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
              Book your stay today
            </h2>
            <a href="tel:+16188423667" className="inline-flex items-center gap-2 bg-transparent border border-white/30 text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-brand-900 transition-all duration-300">
              <Phone className="h-4 w-4" />
              Call to Book Now
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;