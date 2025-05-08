export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  fullName: string;
  role: 'farmer' | 'buyer' | 'service_provider';
  address?: string;
  city?: string;
  state?: string;
  profileImage?: string;
  bio?: string;
}

export interface Product {
  id: number;
  farmerId: number;
  title: string;
  description: string;
  category: 'vegetables' | 'fruits' | 'grains' | 'organic';
  price: string;
  unit: string;
  quantity: string;
  images?: string[];
  location?: string;
  isCertified: boolean;
  isOrganic: boolean;
  isPremium: boolean;
  rating?: string;
  createdAt: Date;
}

export interface Service {
  id: number;
  providerId: number;
  title: string;
  description: string;
  serviceType: 'transportation' | 'equipment_rental' | 'advisory';
  price?: string;
  pricingUnit?: string;
  location?: string;
  availability?: string;
  rating?: string;
  createdAt: Date;
}

export interface Order {
  id: number;
  buyerId: number;
  farmerId: number;
  productId: number;
  quantity: string;
  totalPrice: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: boolean;
  shippingAddress: string;
  createdAt: Date;
}

export interface Review {
  id: number;
  userId: number;
  productId?: number;
  serviceId?: number;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface Testimonial {
  id: number;
  userId: number;
  content: string;
  rating: number;
  isApproved: boolean;
  createdAt: Date;
}

export interface ProductWithFarmer extends Product {
  farmer?: User;
}

export interface ServiceWithProvider extends Service {
  provider?: User;
}

export interface TestimonialWithUser extends Testimonial {
  user?: User;
}

export interface FormError {
  message: string;
  field?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}
