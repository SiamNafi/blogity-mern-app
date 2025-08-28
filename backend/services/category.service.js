import {
  createCategory,
  findCategoryBySlug,
  fetchAllCategory,
  fetchSingleCategoryById,
  findAndUpdateCategory,
  deleteCategoryById,
} from "../dao/category.dao.js";
import { createError } from "../utils/erroHandler.js";

const saveCategory = async (name, slug) => {
  const exist = await findCategoryBySlug(slug);
  if (exist) {
    throw createError(409, "Category already Exist");
  }
  const category = await createCategory(name, slug);
  return category;
};

const getAllCategory = async () => {
  const categories = await fetchAllCategory();
  return categories;
};

const singleCategory = async (id) => {
  const category = await fetchSingleCategoryById(id);
  return category;
};

const updateCategory = async (data, id) => {
  const updated = await findAndUpdateCategory(data, id);
  return updated;
};

const removeCategory = async (id) => {
  const deletedCategory = await deleteCategoryById(id);
  return deletedCategory;
};

export {
  saveCategory,
  getAllCategory,
  singleCategory,
  updateCategory,
  removeCategory,
};
