/* eslint-disable react-hooks/exhaustive-deps */
import { editCategory, singleCategory } from "@/api/category.api";
import Loader from "@/components/Loader";
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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import z from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const EditCategory = () => {
  const { category_id } = useParams();
  const queryClient = useQueryClient();

  /** -------------------------
   * Fetch Single Category
   * ------------------------- */
  const { data: categoryData, isLoading } = useQuery({
    queryKey: ["category", category_id],
    queryFn: () => singleCategory(category_id),
  });

  const formSchema = z.object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    slug: z.string().min(4, "Slug must be at least 4 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  /** -------------------------
   * Auto-generate slug from name
   * ------------------------- */
  const categoryName = form.watch("name");
  useEffect(() => {
    if (categoryName) {
      const slug = slugify(categoryName, { lower: true });
      form.setValue("slug", slug);
    }
  }, [categoryName]);

  /** -------------------------
   * Set form values after fetching category
   * ------------------------- */
  useEffect(() => {
    if (categoryData) {
      form.setValue("name", categoryData.name);
      form.setValue("slug", categoryData.slug);
    }
  }, [categoryData]);

  /** -------------------------
   * Update Category Mutation
   * ------------------------- */
  const mutation = useMutation({
    mutationFn: (values) => editCategory(values, category_id),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        queryClient.invalidateQueries(["category", category_id]);
      } else {
        toast.error(res.message);
      }
    },
    onError: () => {
      toast.error("Failed to update category. Try again.");
    },
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <Card className={"max-w-screen-sm mx-auto p-5"}>
        <CardHeader>
          <h1 className="text-2xl font-bold mb-5 text-center">Edit Category</h1>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <div className="mt-5">
              <Button
                disabled={mutation.isPending}
                className={"w-full"}
                type="submit"
              >
                {mutation.isPending ? "Updating" : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default EditCategory;
