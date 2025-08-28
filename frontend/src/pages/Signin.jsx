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
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { RouteIndex, RouteSignUp } from "@/helper/RouteName";
import { loginUser } from "@/api/user.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import GoogleLogin from "@/components/GoogleLogin";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /** -------------------------
   * Login Mutation
   * ------------------------- */
  const mutation = useMutation({
    mutationFn: (values) => loginUser(values),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        dispatch(setUser(data.user));
        navigate(RouteIndex);
      } else {
        toast.error(data.message);
      }
    },
    onError: () => {
      toast.error("Login failed. Please try again.");
    },
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[400px] p-6 shadow-lg rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
          <p className="text-sm text-muted-foreground">
            Log in to continue to your account
          </p>

          <div className="flex justify-center mt-3">
            <Link to={RouteIndex}>
              <motion.div
                whileHover={{ x: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-blue-600 font-medium group"
              >
                <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
                <span className="underline-offset-4 group-hover:underline">
                  Go Back Home
                </span>
              </motion.div>
            </Link>
          </div>
        </CardHeader>

        {/* Social Login */}
        <div className="mb-4">
          <GoogleLogin />
        </div>

        {/* OR Separator */}
        <div className="flex items-center mb-4">
          <Separator className="flex-1" />
          <span className="px-3 text-sm text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>

        {/* Email/Password Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    Use the same email you registered with.
                  </p>
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
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    Minimum 6 characters. Keep it secure.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Login button */}
            <Button
              className="w-full mt-2"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Logging in..." : "Log in"}
            </Button>

            <p className="text-xs text-muted-foreground mt-2 text-center">
              Trouble logging in? Double-check your credentials.
            </p>

            {/* Sign up link */}
            <div className="flex items-center justify-center mt-4 gap-1 text-sm">
              <p>Don&apos;t have an account?</p>
              <Link
                className="text-blue-500 hover:underline font-medium"
                to={RouteSignUp}
              >
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Signin;
