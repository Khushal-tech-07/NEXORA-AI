export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Laptops' | 'Smart Glasses' | 'Robots' | 'Smart Home' | 'Headphones' | 'Smartwatches' | 'Drones' | 'Smart Earbuds';
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
  modelType: 'laptop' | 'glasses' | 'robot' | 'hub' | 'headphones' | 'watch' | 'drone' | 'earbuds';
  image: string;
  colors: { name: string; hex: string }[];
  description: string;
  longDescription: string;
  keySpecs: string[];
  specs: {
    label: string;
    value: string;
  }[];
  features: {
    title: string;
    description: string;
  }[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  items: {
    productName: string;
    price: number;
    quantity: number;
    color: string;
    image: string;
  }[];
  total: number;
  status: 'Delivered' | 'Shipped' | 'Processing';
  trackingNumber: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  recommendations?: Product[];
  checkpoints?: string[];
  followUps?: string[];
}
