import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import slugify from "slugify";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getSingleBlog, updateBlog } from "@/api/blog.api";
import { getAllCategory } from "@/api/category.api";
import Loader from "@/components/Loader";
import MarkdownEditor from "@/components/MarkdownEditor";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PenIcon, PlusIcon } from "lucide-react";
import { RouteBlog } from "@/helper/RouteName";

const Editblog = () => {
  const { blogid } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [file, setFile] = useState(null);
  const [filePreview, setPreview] = useState(null);

  // Form schema
  const formSchema = z.object({
    category: z.string().min(1, "Please select a category"),
    title: z.string().min(4, "Title must be at least 4 characters"),
    slug: z.string().min(4, "Slug must be at least 4 characters"),
    blogContent: z
      .string()
      .min(4, "Blog content must be at least 4 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      slug: "",
      blogContent: "",
    },
  });

  // Fetch single blog
  const { data: singleBlogData, isLoading: blogLoading } = useQuery({
    queryKey: ["singleBlog", blogid],
    queryFn: () => getSingleBlog(blogid),
  });

  // Fetch categories
  const { data: categoriesData, isLoading: catLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
  });

  // Populate form when single blog loads
  useEffect(() => {
    if (singleBlogData?.singleBlog) {
      const blog = singleBlogData.singleBlog;
      setPreview(blog.featuredImage);
      form.setValue("category", blog.category._id);
      form.setValue("title", blog.title);
      form.setValue("slug", blog.slug);
      form.setValue("blogContent", blog.blogContent);
    }
  }, [singleBlogData]);

  // Auto-generate slug
  const titleName = form.watch("title");
  useEffect(() => {
    if (titleName) {
      form.setValue("slug", slugify(titleName, { lower: true }));
    }
  }, [titleName]);

  const handleFiles = (files) => {
    const file = files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Mutation to update blog
  const updateMutation = useMutation({
    mutationFn: ({ formData, blogid }) => updateBlog(formData, blogid),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["singleBlog", blogid] });
        navigate(RouteBlog);
      }
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update blog");
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("data", JSON.stringify(values));
    updateMutation.mutate({ formData, blogid });
  };

  if (blogLoading || catLoading) return <Loader />;

  return (
    <div>
      <Card className="max-w-screen-lg mx-auto p-5">
        <CardHeader className="text-center">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-bold mb-5">
            <PenIcon /> Edit Your Blog
          </h1>
          <p>Share Your Thoughts With The World.</p>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Select Category</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesData?.category?.map((cat) => (
                          <SelectItem key={cat._id} value={cat._id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slug */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Featured Image */}
            <FormField
              control={form.control}
              name="featuredImage"
              render={() => (
                <FormItem className="mb-3">
                  <FormLabel>Featured Image</FormLabel>
                  <Dropzone onDrop={handleFiles}>
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        className="relative group w-full mt-3"
                      >
                        <input {...getInputProps()} />
                        {filePreview ? (
                          <div className="flex cursor-pointer justify-center items-center w-full border-2 border-dashed rounded">
                            <img
                              className="w-full h-full object-contain"
                              src={filePreview}
                              alt="Preview"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col cursor-pointer justify-center items-center w-full h-36 border-2 border-dashed rounded">
                            <div className="p-6 rounded-full bg-primary border-2 hover:bg-transparent transition-all duration-200">
                              <PlusIcon />
                            </div>
                            <span>Select Image</span>
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Blog Content */}
            <FormField
              control={form.control}
              name="blogContent"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Content</FormLabel>
                  <MarkdownEditor
                    value={field.value}
                    onChange={field.onChange}
                    height={400}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={updateMutation.isPending}
              className="w-full cursor-pointer mt-5"
              type="submit"
            >
              {updateMutation.isPending ? "updating" : "Update Blog"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Editblog;
