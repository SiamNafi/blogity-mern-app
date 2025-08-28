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
import { Card, CardHeader } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import { useMutation } from "@tanstack/react-query";
import GoogleLogin from "@/components/GoogleLogin";
import { Separator } from "@/components/ui/separator";
import { RouteIndex, RouteSignIn } from "@/helper/RouteName";
import { registerUser } from "@/api/user.api";

const formSchema = z
  .object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // UseMutation for registering user
  const signupMutation = useMutation({
    mutationFn: (values) => registerUser(values),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        dispatch(setUser(data.user));
        navigate(RouteIndex);
        form.reset();
      } else {
        toast.error(data.message || "Signup failed. Please try again.");
      }
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const onSubmit = (values) => {
    signupMutation.mutate(values);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[400px] p-5">
        <CardHeader>
          <h1 className="text-2xl font-bold mb-2 text-center">
            Create Your Account
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Join us today! It only takes a minute to create your account.
          </p>
        </CardHeader>

        {/* Google Login */}
        <div className="mb-4">
          <GoogleLogin />
        </div>

        {/* OR Separator */}
        <div className="flex items-center mb-4">
          <Separator className="flex-1" />
          <span className="px-3 text-sm text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>

        {/* Signup Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
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
                      placeholder="Enter a strong password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground mt-1">
                    Must be at least 6 characters.
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Re-enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full mt-2"
              type="submit"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending
                ? "Creating Account..."
                : "Create Account"}
            </Button>

            <div className="flex items-center mt-4 gap-1 text-sm justify-center">
              <p>Already have an account?</p>
              <Link className="text-blue-500 hover:underline" to={RouteSignIn}>
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
