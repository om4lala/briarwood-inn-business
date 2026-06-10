import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { Room } from '../types';
import { ImageSlider } from './ImageSlider';
import { ImageLightbox } from './ImageLightbox';

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const phoneNumber = "tel:+16188423667";
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Fallback to single string image if images array is not defined or is empty
  const roomImages = room.images && room.images.length > 0 ? room.images : [room.image];

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div id={`room-card-${room.id}`} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* Image Section - Standard Height */}
      <div className="h-64 overflow-hidden relative">
        <ImageSlider 
          images={roomImages} 
          alt={room.name} 
          onImageClick={handleOpenLightbox}
        />
        <div className="absolute bottom-4 left-4 bg-brand-900/95 text-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm z-20 backdrop-blur-sm shadow-md pointer-events-none select-none">
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
            {room.features.slice(0, 6).map((feature, i) => (
              <li key={i} className="text-sm text-brand-600 flex items-center">
                <span className="w-1.5 h-1.5 bg-brand-400 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <a 
          href={phoneNumber} 
          id={`book-now-${room.id}`}
          className="w-full block text-center bg-brand-900 text-white py-3 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-brand-700 transition-colors focus:ring-2 focus:ring-brand-300"
        >
          Call to Book
        </a>
      </div>

      {/* Lightbox Modal */}
      <ImageLightbox
        images={roomImages}
        initialIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title={room.name}
      />
    </div>
  );
};

export default RoomCard;