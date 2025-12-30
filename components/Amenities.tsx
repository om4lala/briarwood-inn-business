import React from 'react';
import { Coffee, Waves, Snowflake, Refrigerator } from 'lucide-react';

const amenities = [
  {
    icon: <Refrigerator strokeWidth={1.5} />,
    title: "Vending Machines",
    description: "Snacks and drinks available 24/7 in the lobby."
  },
  {
    icon: <Snowflake strokeWidth={1.5} />,
    title: "Ice Machine",
    description: "Conveniently located in the central guest corridor."
  },
  {
    icon: <Coffee strokeWidth={1.5} />,
    title: "Morning Coffee",
    description: "Freshly brewed coffee, tea, and light refreshments served daily."
  },
  {
    icon: <Waves strokeWidth={1.5} />,
    title: "Swimming Pool",
    description: "Our outdoor pool is currently undergoing maintenance.",
    status: "Closed"
  }
];

const Amenities: React.FC = () => {
  return (
    <section id="amenities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-brand-100 pb-12">
          <div className="max-w-2xl">
            <span className="text-brand-500 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Facilities</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-900 leading-tight">
              On-Site Amenities
            </h2>
          </div>
          <p className="mt-6 md:mt-0 text-brand-600 max-w-md text-right font-light">
             Enjoy our curated selection of essential services during your stay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {amenities.map((item, index) => (
            <div key={index} className="flex flex-col gap-6 items-start group">
              <div className="p-4 bg-brand-50 text-brand-800 rounded-sm group-hover:bg-brand-900 group-hover:text-white transition-colors duration-500 relative">
                {/* Cast to ReactElement<any> to allow className prop injection via cloneElement */}
                {React.cloneElement(item.icon as React.ReactElement<any>, { className: "h-8 w-8" })}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-serif font-medium text-brand-900">{item.title}</h4>
                    {item.status && (
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${item.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {item.status}
                        </span>
                    )}
                </div>
                <p className="text-sm text-brand-600 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;