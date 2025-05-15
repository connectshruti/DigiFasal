import { pgTable, text, serial, integer, boolean, numeric, timestamp, uuid, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Enum definitions
export const userRoleEnum = pgEnum('user_role', ['farmer', 'buyer', 'service_provider']);
export const productCategoryEnum = pgEnum('product_category', ['vegetables', 'fruits', 'grains', 'organic']);
export const serviceTypeEnum = pgEnum('service_type', ['transportation', 'equipment_rental', 'advisory']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']);

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  fullName: text("full_name").notNull(),
  role: userRoleEnum("role").notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  profileImage: text("profile_image"),
  bio: text("bio"),
});

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  farmerId: integer("farmer_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: productCategoryEnum("category").notNull(),
  price: numeric("price").notNull(),
  unit: text("unit").notNull(),
  quantity: numeric("quantity").notNull(),
  images: text("images").array(),
  location: text("location"),
  isCertified: boolean("is_certified").default(false),
  isOrganic: boolean("is_organic").default(false),
  isPremium: boolean("is_premium").default(false),
  rating: numeric("rating"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Services table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  providerId: integer("provider_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  serviceType: serviceTypeEnum("service_type").notNull(),
  price: numeric("price"),
  pricingUnit: text("pricing_unit"),
  location: text("location"),
  availability: text("availability"),
  rating: numeric("rating"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Orders table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  buyerId: integer("buyer_id").notNull().references(() => users.id),
  farmerId: integer("farmer_id").notNull().references(() => users.id),
  productId: integer("product_id").notNull().references(() => products.id),
  quantity: numeric("quantity").notNull(),
  totalPrice: numeric("total_price").notNull(),
  status: orderStatusEnum("status").default("pending"),
  paymentStatus: boolean("payment_status").default(false),
  shippingAddress: text("shipping_address").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Reviews table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  productId: integer("product_id").references(() => products.id),
  serviceId: integer("service_id").references(() => services.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  isApproved: boolean("is_approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
  services: many(services),
  reviews: many(reviews),
  testimonials: many(testimonials),
  buyerOrders: many(orders, { relationName: 'buyer' }),
  farmerOrders: many(orders, { relationName: 'farmer' }),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  farmer: one(users, {
    fields: [products.farmerId],
    references: [users.id],
  }),
  orders: many(orders),
  reviews: many(reviews),
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
  provider: one(users, {
    fields: [services.providerId],
    references: [users.id],
  }),
  reviews: many(reviews),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  buyer: one(users, {
    fields: [orders.buyerId],
    references: [users.id],
    relationName: 'buyer',
  }),
  farmer: one(users, {
    fields: [orders.farmerId],
    references: [users.id],
    relationName: 'farmer',
  }),
  product: one(products, {
    fields: [orders.productId],
    references: [products.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
  service: one(services, {
    fields: [reviews.serviceId],
    references: [services.id],
  }),
}));

export const testimonialsRelations = relations(testimonials, ({ one }) => ({
  user: one(users, {
    fields: [testimonials.userId],
    references: [users.id],
  }),
}));

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
