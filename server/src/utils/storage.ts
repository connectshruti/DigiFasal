import { 
  users, 
  products, 
  services, 
  orders, 
  reviews, 
  testimonials, 
  type User, 
  type InsertUser, 
  type Product, 
  type InsertProduct,
  type Service,
  type InsertService,
  type Order,
  type InsertOrder,
  type Review,
  type InsertReview,
  type Testimonial,
  type InsertTestimonial,
  userRoleEnum,
  productCategoryEnum,
  serviceTypeEnum,
  orderStatusEnum
} from "../shared/schema";
import { db } from "./db";
import { eq, like, and, or, desc, SQL, sql } from "drizzle-orm";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  getUsersByRole(role: string): Promise<User[]>;
  
  // Product methods
  createProduct(product: InsertProduct): Promise<Product>;
  getProduct(id: number): Promise<Product | undefined>;
  getProducts(options?: { limit?: number, category?: string, searchTerm?: string }): Promise<Product[]>;
  getProductsByFarmer(farmerId: number): Promise<Product[]>;
  updateProduct(id: number, product: Partial<Product>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Service methods
  createService(service: InsertService): Promise<Service>;
  getService(id: number): Promise<Service | undefined>;
  getServices(options?: { limit?: number, type?: string }): Promise<Service[]>;
  getServicesByProvider(providerId: number): Promise<Service[]>;
  updateService(id: number, service: Partial<Service>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;
  
  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrdersByBuyer(buyerId: number): Promise<Order[]>;
  getOrdersByFarmer(farmerId: number): Promise<Order[]>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Review methods
  createReview(review: InsertReview): Promise<Review>;
  getReviewsForProduct(productId: number): Promise<Review[]>;
  getReviewsForService(serviceId: number): Promise<Review[]>;
  
  // Testimonial methods
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getApprovedTestimonials(): Promise<Testimonial[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private services: Map<number, Service>;
  private orders: Map<number, Order>;
  private reviews: Map<number, Review>;
  private testimonials: Map<number, Testimonial>;
  
  private userId: number;
  private productId: number;
  private serviceId: number;
  private orderId: number;
  private reviewId: number;
  private testimonialId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.services = new Map();
    this.orders = new Map();
    this.reviews = new Map();
    this.testimonials = new Map();
    
    this.userId = 1;
    this.productId = 1;
    this.serviceId = 1;
    this.orderId = 1;
    this.reviewId = 1;
    this.testimonialId = 1;
    
    // Initialize with some data
    this.initializeData();
  }

  private initializeData() {
    // Add sample users
    const farmer1: InsertUser = {
      username: "sharma_farms",
      password: "password123", // In production, this would be hashed
      email: "sharma@example.com",
      phone: "9876543210",
      fullName: "Sharma Organic Farms",
      role: "farmer",
      address: "123 Farm Road",
      city: "Mumbai",
      state: "Maharashtra",
      bio: "Growing organic vegetables since 1995"
    };
    
    const farmer2: InsertUser = {
      username: "singh_family",
      password: "password123",
      email: "singh@example.com",
      phone: "9876543211",
      fullName: "Singh Family Farms",
      role: "farmer",
      address: "456 Wheat Field",
      city: "Amritsar",
      state: "Punjab",
      bio: "Premium wheat growers"
    };
    
    const farmer3: InsertUser = {
      username: "himalayan_orchards",
      password: "password123",
      email: "himalayan@example.com",
      phone: "9876543212",
      fullName: "Himalayan Orchards",
      role: "farmer",
      address: "789 Mountain Road",
      city: "Shimla",
      state: "Himachal Pradesh",
      bio: "Fresh mountain fruits"
    };
    
    const provider1: InsertUser = {
      username: "fast_logistics",
      password: "password123",
      email: "logistics@example.com",
      phone: "9876543213",
      fullName: "Fast Logistics",
      role: "service_provider",
      address: "101 Transport Nagar",
      city: "Delhi",
      state: "Delhi",
      bio: "Reliable transport services"
    };
    
    this.createUser(farmer1);
    this.createUser(farmer2);
    this.createUser(farmer3);
    this.createUser(provider1);
    
    // Add sample products
    const tomatoes: InsertProduct = {
      farmerId: 1,
      title: "Fresh Tomatoes",
      description: "Organically grown, rich in flavor and nutrients",
      category: "vegetables",
      price: "45",
      unit: "kg",
      quantity: "500",
      location: "Mumbai, Maharashtra",
      isCertified: true,
      isOrganic: true,
      isPremium: true,
      rating: "4.8",
      images: ["https://images.unsplash.com/photo-1603048719539-9ecb1b68901a"]
    };
    
    const wheat: InsertProduct = {
      farmerId: 2,
      title: "Organic Wheat",
      description: "Premium quality wheat grown without pesticides",
      category: "grains",
      price: "32",
      unit: "kg",
      quantity: "1000",
      location: "Amritsar, Punjab",
      isCertified: true,
      isOrganic: true,
      isPremium: false,
      rating: "4.6",
      images: ["https://images.unsplash.com/photo-1619566636858-adf3ef46400b"]
    };
    
    const apples: InsertProduct = {
      farmerId: 3,
      title: "Himalayan Apples",
      description: "Sweet and juicy apples from the Himalayan orchards",
      category: "fruits",
      price: "120",
      unit: "kg",
      quantity: "300",
      location: "Shimla, Himachal Pradesh",
      isCertified: false,
      isOrganic: false,
      isPremium: false,
      rating: "4.9",
      images: ["https://images.unsplash.com/photo-1550258987-190a2d41a8ba"]
    };
    
    const rice: InsertProduct = {
      farmerId: 2,
      title: "Basmati Rice",
      description: "Aromatic long-grain basmati rice",
      category: "grains",
      price: "85",
      unit: "kg",
      quantity: "800",
      location: "Amritsar, Punjab",
      isCertified: false,
      isOrganic: false,
      isPremium: false,
      rating: "4.7",
      images: ["https://images.unsplash.com/photo-1601493700625-9256e9af8fbd"]
    };
    
    this.createProduct(tomatoes);
    this.createProduct(wheat);
    this.createProduct(apples);
    this.createProduct(rice);
    
    // Add sample services
    const transport: InsertService = {
      providerId: 4,
      title: "Fast Transport Services",
      description: "Reliable and quick transportation of agricultural products",
      serviceType: "transportation",
      price: "1500",
      pricingUnit: "per trip",
      location: "Delhi",
      availability: "Monday to Saturday",
      rating: "4.5"
    };
    
    this.createService(transport);
    
    // Add sample testimonials
    const testimonial1: InsertTestimonial = {
      userId: 1,
      content: "Before Digi Fasal, I had to rely on middlemen who took most of my profits. Now I sell directly to buyers and have increased my income by 40%. The platform is easy to use even for someone like me who isn't tech-savvy.",
      rating: 5,
      isApproved: true
    };
    
    const testimonial2: InsertTestimonial = {
      userId: 4,
      content: "I registered my transport service on Digi Fasal and now my trucks are always booked. The platform has simplified finding clients and managing schedules. My business has grown 25% in just six months.",
      rating: 5,
      isApproved: true
    };
    
    this.createTestimonial(testimonial1);
    this.createTestimonial(testimonial2);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async getUsersByRole(role: string): Promise<User[]> {
    return Array.from(this.users.values()).filter(
      (user) => user.role === role
    );
  }
  
  // Product methods
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt: new Date() 
    };
    this.products.set(id, product);
    return product;
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProducts(options?: { limit?: number, category?: string, searchTerm?: string }): Promise<Product[]> {
    let products = Array.from(this.products.values());
    
    // Apply category filter
    if (options?.category) {
      products = products.filter(p => p.category === options.category);
    }
    
    // Apply search term filter
    if (options?.searchTerm) {
      const searchLower = options.searchTerm.toLowerCase();
      products = products.filter(p => 
        p.title.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply limit
    if (options?.limit) {
      products = products.slice(0, options.limit);
    }
    
    return products;
  }
  
  async getProductsByFarmer(farmerId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.farmerId === farmerId
    );
  }
  
  async updateProduct(id: number, productData: Partial<Product>): Promise<Product | undefined> {
    const product = await this.getProduct(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, ...productData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }
  
  // Service methods
  async createService(insertService: InsertService): Promise<Service> {
    const id = this.serviceId++;
    const service: Service = { 
      ...insertService, 
      id, 
      createdAt: new Date() 
    };
    this.services.set(id, service);
    return service;
  }
  
  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }
  
  async getServices(options?: { limit?: number, type?: string }): Promise<Service[]> {
    let services = Array.from(this.services.values());
    
    // Apply type filter
    if (options?.type) {
      services = services.filter(s => s.serviceType === options.type);
    }
    
    // Apply limit
    if (options?.limit) {
      services = services.slice(0, options.limit);
    }
    
    return services;
  }
  
  async getServicesByProvider(providerId: number): Promise<Service[]> {
    return Array.from(this.services.values()).filter(
      (service) => service.providerId === providerId
    );
  }
  
  async updateService(id: number, serviceData: Partial<Service>): Promise<Service | undefined> {
    const service = await this.getService(id);
    if (!service) return undefined;
    
    const updatedService = { ...service, ...serviceData };
    this.services.set(id, updatedService);
    return updatedService;
  }
  
  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
  }
  
  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderId++;
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: new Date() 
    };
    this.orders.set(id, order);
    return order;
  }
  
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async getOrdersByBuyer(buyerId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.buyerId === buyerId
    );
  }
  
  async getOrdersByFarmer(farmerId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.farmerId === farmerId
    );
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = await this.getOrder(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, status: status as any };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
  
  // Review methods
  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.reviewId++;
    const review: Review = { 
      ...insertReview, 
      id, 
      createdAt: new Date() 
    };
    this.reviews.set(id, review);
    return review;
  }
  
  async getReviewsForProduct(productId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.productId === productId
    );
  }
  
  async getReviewsForService(serviceId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.serviceId === serviceId
    );
  }
  
  // Testimonial methods
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialId++;
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id, 
      createdAt: new Date() 
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  async getApprovedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(
      (testimonial) => testimonial.isApproved
    );
  }
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser || undefined;
  }
  
  async getUsersByRole(role: string): Promise<User[]> {
    return db.select().from(users).where(eq(users.role, role as any));
  }
  
  // Product methods
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }
  
  async getProducts(options?: { limit?: number, category?: string, searchTerm?: string }): Promise<Product[]> {
    let query = db.select().from(products);
    
    // Apply filters
    const conditions: SQL[] = [];
    
    // Apply category filter
    if (options?.category) {
      conditions.push(eq(products.category, options.category as any));
    }
    
    // Apply search term filter
    if (options?.searchTerm) {
      conditions.push(
        or(
          like(products.title, `%${options.searchTerm}%`),
          like(products.description, `%${options.searchTerm}%`)
        )
      );
    }
    
    // Apply all conditions if any
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    // Apply limit
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    return query.orderBy(desc(products.createdAt));
  }
  
  async getProductsByFarmer(farmerId: number): Promise<Product[]> {
    return db
      .select()
      .from(products)
      .where(eq(products.farmerId, farmerId))
      .orderBy(desc(products.createdAt));
  }
  
  async updateProduct(id: number, productData: Partial<Product>): Promise<Product | undefined> {
    const [updatedProduct] = await db
      .update(products)
      .set(productData)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct || undefined;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    const result = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    return result.length > 0;
  }
  
  // Service methods
  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db.insert(services).values(insertService).returning();
    return service;
  }
  
  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }
  
  async getServices(options?: { limit?: number, type?: string }): Promise<Service[]> {
    let query = db.select().from(services);
    
    // Apply type filter
    if (options?.type) {
      query = query.where(eq(services.serviceType, options.type as any));
    }
    
    // Apply limit
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    return query.orderBy(desc(services.createdAt));
  }
  
  async getServicesByProvider(providerId: number): Promise<Service[]> {
    return db
      .select()
      .from(services)
      .where(eq(services.providerId, providerId))
      .orderBy(desc(services.createdAt));
  }
  
  async updateService(id: number, serviceData: Partial<Service>): Promise<Service | undefined> {
    const [updatedService] = await db
      .update(services)
      .set(serviceData)
      .where(eq(services.id, id))
      .returning();
    return updatedService || undefined;
  }
  
  async deleteService(id: number): Promise<boolean> {
    const result = await db
      .delete(services)
      .where(eq(services.id, id))
      .returning();
    return result.length > 0;
  }
  
  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }
  
  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }
  
  async getOrdersByBuyer(buyerId: number): Promise<Order[]> {
    return db
      .select()
      .from(orders)
      .where(eq(orders.buyerId, buyerId))
      .orderBy(desc(orders.createdAt));
  }
  
  async getOrdersByFarmer(farmerId: number): Promise<Order[]> {
    return db
      .select()
      .from(orders)
      .where(eq(orders.farmerId, farmerId))
      .orderBy(desc(orders.createdAt));
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const [updatedOrder] = await db
      .update(orders)
      .set({ status: status as any })
      .where(eq(orders.id, id))
      .returning();
    return updatedOrder || undefined;
  }
  
  // Review methods
  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db.insert(reviews).values(insertReview).returning();
    return review;
  }
  
  async getReviewsForProduct(productId: number): Promise<Review[]> {
    return db
      .select()
      .from(reviews)
      .where(eq(reviews.productId, productId))
      .orderBy(desc(reviews.createdAt));
  }
  
  async getReviewsForService(serviceId: number): Promise<Review[]> {
    return db
      .select()
      .from(reviews)
      .where(eq(reviews.serviceId, serviceId))
      .orderBy(desc(reviews.createdAt));
  }
  
  // Testimonial methods
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }
  
  async getApprovedTestimonials(): Promise<Testimonial[]> {
    return db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isApproved, true))
      .orderBy(desc(testimonials.createdAt));
  }
}

// Use DatabaseStorage instead of MemStorage
export const storage = new DatabaseStorage();
