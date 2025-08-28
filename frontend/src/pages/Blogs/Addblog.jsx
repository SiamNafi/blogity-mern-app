import { getAllCategory } from "@/api/category.api";
import { postBlog } from "@/api/blog.api";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Dropzone from "react-dropzone";
import { PenIcon, PlusIcon } from "lucide-react";
import MarkdownEditor from "@/components/MarkdownEditor";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import slugify from "slugify";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RouteBlog } from "@/helper/RouteName";
import { useQuery, useMutation } from "@tanstack/react-query";

const Addblog = () => {
  const [file, setFile] = useState();
  const [filePreview, setPreview] = useState();
  const navigate = useNavigate();

  // Fetch categories using useQuery
  const { data: categoriesData, isLoading: catLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
  });

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

  // Auto-generate slug from title
  const titleName = form.watch("title");
  useEffect(() => {
    if (titleName) {
      const slug = slugify(titleName, { lower: true });
      form.setValue("slug", slug);
    }
  }, [titleName]);

  const handleFiles = (files) => {
    const file = files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFile(file);
      setPreview(preview);
    }
  };

  // useMutation to post a blog
  const postBlogMutation = useMutation({
    mutationFn: (formData) => postBlog(formData),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        navigate(RouteBlog);
        form.reset();
        setFile(null);
        setPreview(null);
      }
    },
    onError: () => {
      toast.error("Failed to post blog!");
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(values));
    postBlogMutation.mutate(formData);
  };

  if (catLoading) return <div>Loading Categories...</div>;

  return (
    <div>
      <Card className="max-w-screen-lg mx-auto p-5">
        <CardHeader className={"text-center"}>
          <h1 className="flex items-center justify-center gap-2 text-2xl font-bold mb-5">
            <PenIcon /> Post A Blog
          </h1>
          <p>Share Your Thoughts With The World.</p>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Category */}
            <div className="mb-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Category</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoriesData?.category?.length > 0 &&
                            categoriesData.category.map((category) => (
                              <SelectItem
                                key={category._id}
                                value={category._id}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Title */}
            <div className="mb-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Blog title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Slug */}
            <div className="mb-3">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Featured Image */}
            <div className="mb-3">
              <FormField
                control={form.control}
                name="featuredImage"
                render={() => (
                  <FormItem>
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
            </div>

            {/* Blog Content */}
            <div className="mb-3">
              <FormField
                control={form.control}
                name="blogContent"
                render={({ field }) => (
                  <FormItem>
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
            </div>

            {/* Submit */}
            <div className="mt-5">
              <Button
                className="w-full cursor-pointer"
                type="submit"
                disabled={postBlogMutation.isPending}
              >
                {postBlogMutation.isPending ? "Posting..." : "Post Blog"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Addblog;
