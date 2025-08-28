/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { getUser, updateUser } from "@/api/user.api";
import Loader from "@/components/Loader";
import { CameraIcon } from "lucide-react";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { setUser } from "@/redux/user/user.slice";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import userLogo from "@/assets/user.png";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Profile = () => {
  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // form validation schema
  const formSchema = z.object({
    name: z.string().min(4, "Name must be atleast 4 characters"),
    email: z.string().email("Invalid email address"),
    bio: z.string().optional(),
    password: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  // Fetch user with useQuery
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  // Populate form when user data loads
  useEffect(() => {
    if (data && data.success) {
      form.reset({
        name: data.user.name,
        email: data.user.email,
        bio: data.user.bio || "",
        password: "",
      });
    }
  }, [data]);

  // File drop handler
  const handleFiles = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
  };

  // Mutation for updating user
  const mutation = useMutation({
    mutationFn: async (values) => {
      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("data", JSON.stringify(values));
      return await updateUser(formData);
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        dispatch(setUser(response.user));
        queryClient.invalidateQueries(["user"]); // refresh user data
      }
    },
    onError: () => {
      toast.error("Failed to update profile. Try again!");
    },
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-screen-md mx-auto flex items-center">
      <Card className="w-full">
        <CardContent>
          <div className="flex justify-center items-center mt-10">
            <Dropzone onDrop={(acceptedFiles) => handleFiles(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Avatar className="w-28 h-28 group">
                    <AvatarImage
                      src={
                        filePreview
                          ? filePreview
                          : data?.user?.avatar || userLogo
                      }
                    />
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="bg-black opacity-80 border-2 border-primary rounded-full absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center group-hover:flex hidden cursor-pointer">
                          <CameraIcon className="text-primary" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Change Avatar</TooltipContent>
                    </Tooltip>
                  </Avatar>
                </div>
              )}
            </Dropzone>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name here" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your bio here"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Change Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                className="w-full"
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
