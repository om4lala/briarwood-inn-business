import React from 'react';
import { Phone } from 'lucide-react';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const phoneNumber = "tel:+16188423667";

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Image Section - Standard Height */}
      <div className="h-64 overflow-hidden relative">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 bg-brand-900 text-white px-4 py-2 text-sm font-bold">
           {room.price} / night
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-serif text-brand-900 mb-3">
          {room.name}
        </h3>
        
        <p className="text-brand-700 font-light text-base mb-6 flex-grow">
          {room.description}
        </p>

        <div className="border-t border-brand-100 pt-4 mb-6">
          <ul className="grid grid-cols-2 gap-2">
            {room.features.slice(0, 4).map((feature, i) => (
              <li key={i} className="text-sm text-brand-600 flex items-center">
                <span className="w-1.5 h-1.5 bg-brand-400 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <a 
          href={phoneNumber} 
          className="w-full block text-center bg-brand-900 text-white py-3 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-brand-700 transition-colors"
        >
          Call to Book
        </a>
      </div>
    </div>
  );
};

export default RoomCard;