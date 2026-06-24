import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoomCard from './components/RoomCard';
import Amenities from './components/Amenities';
import PropertyGallery from './components/PropertyGallery';
import Footer from './components/Footer';
import { Room } from './types';
import { Phone } from 'lucide-react';

const App: React.FC = () => {
  const [activeExploreTab, setActiveExploreTab] = React.useState<'rooms' | 'property'>('rooms');

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#gallery') {
        setActiveExploreTab('property');
      } else if (hash === '#rooms') {
        setActiveExploreTab('rooms');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // run once on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const rooms: Room[] = [
    {
      id: 'double',
      name: 'Double Room',
      description: 'Perfect for families or friends sharing travel. Features two comfortable double beds, a private bathroom, and a spacious vanity area.',
      price: '$75.99',
      image: '/rooms/double_bed_bedroom.jpg',
      images: [
        '/rooms/double_bed_bedroom.jpg',
        '/rooms/vanity.jpg',
        '/rooms/hotel_bathroom.jpg'
      ],
      features: ['Two Double Beds', 'Private Bathroom', 'Vanity Counter', 'Cable TV', 'Work Desk', 'Free Wi-Fi']
    },
    {
      id: 'king',
      name: 'King Room',
      description: 'A spacious room featuring one large King bed. Ideal for couples looking for a comfortable and relaxing stay.',
      price: '$65.99',
      image: '/rooms/king_bedroom.jpg',
      images: [
        '/rooms/king_bedroom.jpg',
        '/rooms/vanity.jpg',
        '/rooms/hotel_bathroom2.jpg'
      ],
      features: ['One King Bed', 'Lounge Chair', 'Cable TV', 'Mini Fridge']
    },
    {
      id: 'suite',
      name: 'Family Suite',
      description: 'Our largest option with extra space to spread out. Includes a kitchenette and a small living area.',
      price: '$139.99',
      image: '/rooms/suite_bedroom.jpg',
      images: [
        '/rooms/suite_bedroom.jpg',
        '/rooms/suite_living_room.jpg',
        '/rooms/suite_kitchenette.jpg',
        '/rooms/suite_vanity.jpg'
      ],
      features: ['King Bed + Sofa', 'Kitchenette', 'Dining Area', 'Large Bath']
    }
  ];

  return (
    <div className="min-h-screen bg-brand-50">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Explore the Inn Section (Accommodations vs Property Gallery Switcher) */}
        <section id="explore" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
          <div className="text-center mb-12">
            <span className="text-brand-500 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Discover Briarwood Inn</span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-900 mb-6">Explore Our Property</h2>
            <div className="w-16 h-1 bg-brand-200 mx-auto mb-8"></div>
            
            {/* Toggle tabs to let users view either first */}
            <div className="inline-flex p-1 bg-brand-100 rounded-full border border-brand-200/60 shadow-inner">
              <button
                onClick={() => {
                  setActiveExploreTab('rooms');
                  window.location.hash = '#rooms';
                }}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeExploreTab === 'rooms'
                    ? 'bg-brand-900 text-white shadow-sm'
                    : 'text-brand-700 hover:text-brand-900 hover:bg-brand-50/50'
                }`}
              >
                Guest Rooms
              </button>
              <button
                onClick={() => {
                  setActiveExploreTab('property');
                  window.location.hash = '#gallery';
                }}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeExploreTab === 'property'
                    ? 'bg-brand-900 text-white shadow-md'
                    : 'text-brand-700 hover:text-brand-900 hover:bg-brand-50/50'
                }`}
              >
                Property & Grounds
              </button>
            </div>
          </div>

          {activeExploreTab === 'rooms' ? (
            <div className="space-y-12 transition-all duration-500">
              {/* Call-In Rate Disclaimer Banner */}
              <div className="max-w-3xl mx-auto bg-brand-100/60 border border-brand-200 rounded-lg p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-sm">
                <div className="p-3 bg-white rounded-full text-brand-900 shadow-sm flex-shrink-0">
                  <Phone className="h-6 w-6 text-brand-900 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-brand-900 font-bold text-base mb-1 font-serif">Special Call-In Only Rates</h3>
                  <p className="text-sm text-brand-700 font-light leading-relaxed">
                    The room rates shown below are exclusive discounts available <strong className="font-semibold text-brand-900">only for reservations made directly by telephone</strong>. Call us today to lock in these special rates!
                  </p>
                </div>
              </div>
              
              {/* Guest Rooms Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            </div>
          ) : (
            <div className="transition-all duration-500">
              <PropertyGallery />
            </div>
          )}
        </section>

        <Amenities />

        {/* Minimalist Call to Action */}
        <section className="relative py-32 px-4 bg-brand-900 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
             <img 
               src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80" 
               className="w-full h-full object-cover" 
               alt="A peaceful flat rural road winding through Midwestern fields in Fairfield, Illinois" 
               referrerPolicy="no-referrer"
             />
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