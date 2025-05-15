import React from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Link }from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../hooks/use-toast";
import { apiRequest } from "../lib/queryClient";
import { useContext, useState } from "react";
import { AuthContext } from "../App";
import { Helmet } from "react-helmet";
import { User } from "../types";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Leaf, LogIn } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });
  const loginMutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await apiRequest("POST", `${import.meta.env.VITE_SERVER_PATH}/api/users/login`, data);
      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.message || "Invalid credentials");
      }
      return res.json() as Promise<User>;
    },
    onSuccess: (userData) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast({
        title: "Login successful!",
        description: `Welcome back, ${userData.fullName}`,
      });
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      await loginMutation.mutateAsync({
        username: data.username,
        password: data.password,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Helmet>
        <title>Login | Digi Fasal</title>
        <meta name="description" content="Access your agricultural marketplace account" />
      </Helmet>

      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-green-800 text-center">Digi Fasal</h1>
            <p className="text-gray-600 mt-2 text-center">Connecting farmers, buyers, and service providers</p>
          </div>

          <Card className="border border-green-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="text-center space-y-1">
              <div className="flex justify-center">
                <LogIn className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-800">Welcome Back</CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to access your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Username</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter your username" className="focus:ring-green-500 focus:border-green-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} placeholder="••••••••" className="focus:ring-green-500 focus:border-green-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal text-gray-600 cursor-pointer">
                            Remember me
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700 hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white shadow-sm"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <LogIn className="h-4 w-4" />
                        Sign In
                      </span>
                    )}
                  </Button>

                  <div className="text-center pt-2">
                    <p className="text-sm text-gray-600">
                      Don’t have an account?{" "}
                      <Link to="/register" className="font-medium text-green-600 hover:text-green-700 hover:underline">
                        Create one
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}