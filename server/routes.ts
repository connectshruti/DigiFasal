import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { 
  insertUserSchema, 
  insertProductSchema,
  insertServiceSchema,
  insertOrderSchema,
  insertReviewSchema,
  users,
  products,
  services,
  orders,
  reviews,
  testimonials
} from "@shared/schema";
import { z } from "zod";

// Helper function to handle errors
const handleApiError = (res: Response, error: any, message: string) => {
  console.error(`API Error: ${message}`, error);
  res.status(500).json({ message });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/users/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }
      
      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      const user = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });
  
  app.post("/api/users/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to login" });
    }
  });
  
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(Number(req.params.id));
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });
  
  app.get("/api/users/role/all", async (req, res) => {
    try {
      // Fetch all users directly from the database
      const allUsers = await db.select().from(users);
      
      // Remove passwords from response
      const usersWithoutPassword = allUsers.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      
      res.json(usersWithoutPassword);
    } catch (error) {
      console.error("Error getting all users:", error);
      handleApiError(res, error, "Failed to get all users");
    }
  });
  
  app.get("/api/users/role/:role", async (req, res) => {
    try {
      const users = await storage.getUsersByRole(req.params.role);
      
      // Remove passwords from response
      const usersWithoutPassword = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      
      res.json(usersWithoutPassword);
    } catch (error) {
      console.error("Error getting users by role:", error);
      handleApiError(res, error, "Failed to get users by role");
    }
  });
  
  // Product routes
  app.post("/api/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });
  
  app.get("/api/products", async (req, res) => {
    try {
      const { limit, category, search } = req.query;
      
      const options: { limit?: number; category?: string; searchTerm?: string } = {};
      
      if (limit) {
        options.limit = Number(limit);
      }
      
      if (category) {
        options.category = category as string;
      }
      
      if (search) {
        options.searchTerm = search as string;
      }
      
      const products = await storage.getProducts(options);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to get products" });
    }
  });
  
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(Number(req.params.id));
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to get product" });
    }
  });
  
  app.get("/api/products/farmer/:farmerId", async (req, res) => {
    try {
      const products = await storage.getProductsByFarmer(Number(req.params.farmerId));
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to get farmer products" });
    }
  });
  
  app.put("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(Number(req.params.id));
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      const updatedProduct = await storage.updateProduct(Number(req.params.id), req.body);
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: "Failed to update product" });
    }
  });
  
  app.delete("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(Number(req.params.id));
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      await storage.deleteProduct(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });
  
  // Service routes
  app.post("/api/services", async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.status(201).json(service);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid service data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create service" });
    }
  });
  
  app.get("/api/services", async (req, res) => {
    try {
      const { limit, type } = req.query;
      
      const options: { limit?: number; type?: string } = {};
      
      if (limit) {
        options.limit = Number(limit);
      }
      
      if (type) {
        options.type = type as string;
      }
      
      const services = await storage.getServices(options);
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to get services" });
    }
  });
  
  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(Number(req.params.id));
      
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to get service" });
    }
  });
  
  app.get("/api/services/provider/:providerId", async (req, res) => {
    try {
      const services = await storage.getServicesByProvider(Number(req.params.providerId));
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to get provider services" });
    }
  });
  
  // Order routes
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });
  
  app.get("/api/orders/buyer/:buyerId", async (req, res) => {
    try {
      const orders = await storage.getOrdersByBuyer(Number(req.params.buyerId));
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to get buyer orders" });
    }
  });
  
  app.get("/api/orders/farmer/:farmerId", async (req, res) => {
    try {
      const orders = await storage.getOrdersByFarmer(Number(req.params.farmerId));
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to get farmer orders" });
    }
  });
  
  app.put("/api/orders/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const order = await storage.getOrder(Number(req.params.id));
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      const updatedOrder = await storage.updateOrderStatus(Number(req.params.id), status);
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order status" });
    }
  });
  
  // Review routes
  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });
  
  app.get("/api/reviews/product/:productId", async (req, res) => {
    try {
      const reviews = await storage.getReviewsForProduct(Number(req.params.productId));
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to get product reviews" });
    }
  });
  
  app.get("/api/reviews/service/:serviceId", async (req, res) => {
    try {
      const reviews = await storage.getReviewsForService(Number(req.params.serviceId));
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to get service reviews" });
    }
  });
  
  // Testimonial routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getApprovedTestimonials();
      res.json(testimonials);
    } catch (error) {
      handleApiError(res, error, "Failed to get testimonials");
    }
  });

  // Simple test endpoint to verify database connection
  app.get("/api/db-test", async (req, res) => {
    try {
      // Try to insert a test user
      const testUser = await storage.createUser({
        username: "test_user_" + Date.now(),
        password: "test_password",
        email: "test_" + Date.now() + "@example.com",
        phone: "1234567890",
        fullName: "Test User",
        role: "buyer"
      });
      
      // Retrieve all users
      const allUsers = await db.select().from(users);
      
      res.json({
        message: "Database connection successful",
        testUser,
        userCount: allUsers.length
      });
    } catch (error) {
      console.error("Database test error:", error);
      handleApiError(res, error, "Database connection test failed");
    }
  });

  // Seed data route for database initialization
  app.post("/api/seed", async (req, res) => {
    try {
      // Add sample users
      const farmer1 = await storage.createUser({
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
      });
      
      const farmer2 = await storage.createUser({
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
      });
      
      const farmer3 = await storage.createUser({
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
      });
      
      const provider1 = await storage.createUser({
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
      });
      
      // Add sample products
      const tomatoes = await storage.createProduct({
        farmerId: farmer1.id,
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
      });
      
      const wheat = await storage.createProduct({
        farmerId: farmer2.id,
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
      });
      
      const apples = await storage.createProduct({
        farmerId: farmer3.id,
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
      });
      
      const rice = await storage.createProduct({
        farmerId: farmer2.id,
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
      });
      
      // Add sample services
      const transport = await storage.createService({
        providerId: provider1.id,
        title: "Fast Transport Services",
        description: "Reliable and quick transportation of agricultural products",
        serviceType: "transportation",
        price: "1500",
        pricingUnit: "per trip",
        location: "Delhi",
        availability: "Monday to Saturday",
        rating: "4.5"
      });
      
      // Add sample testimonials
      const testimonial1 = await storage.createTestimonial({
        userId: farmer1.id,
        content: "Before Digi Fasal, I had to rely on middlemen who took most of my profits. Now I sell directly to buyers and have increased my income by 40%. The platform is easy to use even for someone like me who isn't tech-savvy.",
        rating: 5,
        isApproved: true
      });
      
      const testimonial2 = await storage.createTestimonial({
        userId: provider1.id,
        content: "I registered my transport service on Digi Fasal and now my trucks are always booked. The platform has simplified finding clients and managing schedules. My business has grown 25% in just six months.",
        rating: 5,
        isApproved: true
      });
      
      res.status(201).json({
        message: "Seed data created successfully",
        data: {
          users: [farmer1, farmer2, farmer3, provider1],
          products: [tomatoes, wheat, apples, rice],
          services: [transport],
          testimonials: [testimonial1, testimonial2]
        }
      });
    } catch (error) {
      console.error("Error seeding database:", error);
      handleApiError(res, error, "Failed to seed database");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
