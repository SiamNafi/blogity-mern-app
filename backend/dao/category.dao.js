import Category from "../models/category.model.js";
import { findUserById } from "./user.dao.js";

const findCategoryBySlug = async (slug) => {
  const exist = await Category.findOne({ slug });
  return exist;
};

const createCategory = async (name, slug) => {
  const newCategory = new Category({
    name,
    slug,
  });
  await newCategory.save();
  return newCategory;
};

const fetchAllCategory = async () => {
  return await Category.find().sort({ name: -1 }).lean().exec();
};
const fetchSingleCategoryById = async (id) => {
  const data = await Category.findById(id);
  return data;
};

const findAndUpdateCategory = async (data, id) => {
  const { name, slug } = data;

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { name, slug },
    { new: true, runValidators: true }
  );
  return updatedCategory;
};

const deleteCategoryById = async (id) => {
  const deletededCategory = await Category.findByIdAndDelete(id);
  return deletededCategory;
};

export {
  findCategoryBySlug,
  createCategory,
  fetchAllCategory,
  fetchSingleCategoryById,
  findAndUpdateCategory,
  deleteCategoryById,
};
