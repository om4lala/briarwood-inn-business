export interface Room {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  features: string[];
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}