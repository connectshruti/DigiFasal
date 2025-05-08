import { useState, useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { AuthContext, CartContext } from "@/App";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Check, 
  CreditCard, 
  MapPin, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Trash2,
  Leaf,
  Sprout,
  Truck
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

const checkoutSchema = z.object({
  shippingAddress: z.string().min(5, { message: "Please enter your complete shipping address" }),
  paymentMethod: z.enum(["razorpay", "cash_on_delivery", "upi"]),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const { user, isAuthenticated } = useContext(AuthContext);
  const { cart, addToCart, removeFromCart, clearCart, getTotalPrice } = useContext(CartContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderStep, setOrderStep] = useState<'review' | 'shipping' | 'payment' | 'confirmation'>('review');
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingAddress: user?.address ? `${user.address}, ${user.city}, ${user.state}` : "",
      paymentMethod: "cash_on_delivery",
      notes: "",
    },
  });
  
  useEffect(() => {
    if (user?.address) {
      form.setValue("shippingAddress", `${user.address}, ${user.city}, ${user.state}`);
    }
  }, [user, form]);
  
  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders/buyer/' + user?.id] });
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been placed and will be processed soon.",
        variant: "success"
      });
      setOrderStep('confirmation');
      clearCart();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to place order",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    },
  });
  
  const handlePlaceOrder = async (data: CheckoutFormValues) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to continue with your purchase.",
        variant: "destructive",
      });
      onClose();
      setLocation("/login");
      return;
    }
    
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add items before checkout.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    if (cart.length > 0 && user) {
      const firstItem = cart[0];
      const orderData = {
        buyerId: user.id,
        farmerId: firstItem.product.farmerId,
        productId: firstItem.product.id,
        quantity: String(firstItem.quantity),
        totalPrice: String(Number(firstItem.product.price) * firstItem.quantity),
        shippingAddress: data.shippingAddress,
        status: "pending",
        paymentStatus: data.paymentMethod === "cash_on_delivery" ? false : true,
      };
      
      await createOrderMutation.mutateAsync(orderData);
    }
  };
  
  const updateQuantity = (productId: number, newQuantity: number) => {
    const product = cart.find(item => item.product.id === productId)?.product;
    if (product) {
      if (newQuantity <= 0) {
        removeFromCart(productId);
      } else {
        removeFromCart(productId);
        addToCart(product, newQuantity);
      }
    }
  };
  
  const handleClose = () => {
    if (!isProcessing) {
      setOrderStep('review');
      onClose();
    }
  };
  
  const handleNextStep = () => {
    if (orderStep === 'review') {
      setOrderStep('shipping');
    } else if (orderStep === 'shipping') {
      setOrderStep('payment');
    } else if (orderStep === 'payment') {
      form.handleSubmit(handlePlaceOrder)();
    }
  };
  
  const handlePrevStep = () => {
    if (orderStep === 'shipping') {
      setOrderStep('review');
    } else if (orderStep === 'payment') {
      setOrderStep('shipping');
    }
  };
  
  const handleCompleteOrder = () => {
    setOrderStep('review');
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md sm:max-w-lg rounded-xl">
        {orderStep === 'review' && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <DialogTitle>Your Cart</DialogTitle>
              </div>
              <DialogDescription>
                Review your farm-fresh items before checkout
              </DialogDescription>
            </DialogHeader>
            
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                <h3 className="font-medium text-lg mb-1">Your cart is empty</h3>
                <p className="text-gray-500 mb-4">
                  Add fresh produce to your cart
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    onClose();
                    setLocation('/marketplace');
                  }}
                  className="border-green-200 hover:bg-green-50"
                >
                  Browse Farm Products
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-4 border-b border-gray-100 pb-4">
                      <div className="h-16 w-16 flex-shrink-0 bg-green-50 rounded-lg overflow-hidden">
                        {item.product.images && item.product.images.length > 0 ? (
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.title} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-green-600">
                            <Sprout className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product.title}</h4>
                        <p className="text-sm text-gray-500 mb-1">
                          ₹{item.product.price}/{item.product.unit}
                        </p>
                        <div className="flex items-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-gray-500 hover:text-green-600"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-2 text-sm">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-gray-500 hover:text-green-600"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{Number(item.product.price) * item.quantity}</p>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-500 hover:text-red-500"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span>₹50</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{getTotalPrice() + 50}</span>
                  </div>
                </div>
                
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={onClose}
                    disabled={isProcessing}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleNextStep}
                    disabled={cart.length === 0 || isProcessing}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Continue to Shipping
                  </Button>
                </div>
              </>
            )}
          </>
        )}
        
        {orderStep === 'shipping' && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-green-600" />
                <DialogTitle>Shipping Information</DialogTitle>
              </div>
              <DialogDescription>
                Enter your delivery details
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="shippingAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Address</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your complete address" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any special instructions for delivery" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-2 pt-2">
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                disabled={isProcessing}
                className="border-gray-300 hover:bg-gray-50"
              >
                Back to Cart
              </Button>
              <Button 
                onClick={handleNextStep}
                disabled={isProcessing || !form.getValues().shippingAddress}
                className="bg-green-600 hover:bg-green-700"
              >
                Continue to Payment
              </Button>
            </div>
          </>
        )}
        
        {orderStep === 'payment' && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                <DialogTitle>Payment Method</DialogTitle>
              </div>
              <DialogDescription>
                Choose your preferred payment option
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form className="space-y-4">
                <div className="space-y-3">
                  <div 
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      form.watch('paymentMethod') === 'cash_on_delivery' 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-200 hover:border-green-200'
                    }`}
                    onClick={() => form.setValue('paymentMethod', 'cash_on_delivery')}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 flex-shrink-0 ${
                      form.watch('paymentMethod') === 'cash_on_delivery' 
                        ? 'border-green-600 bg-green-600' 
                        : 'border-gray-300'
                    }`}>
                      {form.watch('paymentMethod') === 'cash_on_delivery' && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Pay when you receive your order</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      form.watch('paymentMethod') === 'upi' 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-200 hover:border-green-200'
                    }`}
                    onClick={() => form.setValue('paymentMethod', 'upi')}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 flex-shrink-0 ${
                      form.watch('paymentMethod') === 'upi' 
                        ? 'border-green-600 bg-green-600' 
                        : 'border-gray-300'
                    }`}>
                      {form.watch('paymentMethod') === 'upi' && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">UPI</p>
                      <p className="text-sm text-gray-500">Pay using UPI apps</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      form.watch('paymentMethod') === 'razorpay' 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-200 hover:border-green-200'
                    }`}
                    onClick={() => form.setValue('paymentMethod', 'razorpay')}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 flex-shrink-0 ${
                      form.watch('paymentMethod') === 'razorpay' 
                        ? 'border-green-600 bg-green-600' 
                        : 'border-gray-300'
                    }`}>
                      {form.watch('paymentMethod') === 'razorpay' && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Razorpay</p>
                      <p className="text-sm text-gray-500">Pay using credit/debit card</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    Order Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Items Total</span>
                      <span>₹{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Shipping</span>
                      <span>₹50</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium text-base">
                      <span>Total</span>
                      <span>₹{getTotalPrice() + 50}</span>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
            
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                disabled={isProcessing}
                className="border-gray-300 hover:bg-gray-50"
              >
                Back to Shipping
              </Button>
              <Button 
                onClick={handleNextStep}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Place Order"}
              </Button>
            </div>
          </>
        )}
        
        {orderStep === 'confirmation' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center">Order Confirmed!</DialogTitle>
            </DialogHeader>
            
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Thank You for Your Order</h3>
              <p className="text-gray-500 mb-6">
                Your farm-fresh order is confirmed and will be delivered soon.
              </p>
              
              <div className="bg-green-50 rounded-lg p-4 mb-6 max-w-xs mx-auto">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Order Total:</span>
                  <span className="font-medium">₹{getTotalPrice() + 50}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">
                    {form.getValues().paymentMethod === 'cash_on_delivery' 
                      ? 'Cash on Delivery' 
                      : form.getValues().paymentMethod === 'upi' 
                        ? 'UPI' 
                        : 'Card'}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <Button 
                  variant="outline"
                  className="flex items-center justify-center mx-auto border-green-200 hover:bg-green-50"
                  onClick={() => {
                    handleCompleteOrder();
                    setLocation('/dashboard/orders');
                  }}
                >
                  <MapPin className="h-4 w-4 mr-2 text-green-600" />
                  Track Your Order
                </Button>
                <Button 
                  onClick={handleCompleteOrder}
                  className="mx-auto bg-green-600 hover:bg-green-700"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}