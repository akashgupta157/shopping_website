import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheckBig } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").max(50),
  password: z.string().min(6, "Password must be at least 6 characters").max(50),
});

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://fakestoreapi.com/auth/login",
        values
      );
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data, username: values.username, auth: true })
      );
      toast.success("Login successful", {
        icon: <CircleCheckBig />,
        style: {
          backgroundColor: "#4caf50",
          color: "#fff",
        },
      });
      setLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast.error("Invalid credentials", {
        icon: <CircleAlert />,
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
        },
      });
      console.error("Error during login:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-md space-y-8 bg-card p-6 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Login to your account
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your credentials below
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter username"
                      {...field}
                      icon="user"
                    />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                      icon="lock"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
