import {
  saveCategory,
  getAllCategory,
  singleCategory,
  updateCategory,
  removeCategory,
} from "../services/category.service.js";
import controllerWrapper from "../utils/controllerWrapper.js";

//add category
const addCategory = controllerWrapper(async (req, res) => {
  const { name, slug } = req.body;
  const category = await saveCategory(name, slug);
  res.status(200).json({ success: true, message: "Category created" });
});

// show all category
const showCategory = controllerWrapper(async (req, res) => {
  const allCategory = await getAllCategory();
  res.status(200).json({ category: allCategory, success: true });
});

//get single category
const getSingleCategory = controllerWrapper(async (req, res) => {
  const id = req.params.id;
  const category = await singleCategory(id);

  res.status(200).json(category);
});

//edit category
const editCategory = controllerWrapper(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await updateCategory(data, id);
  res.status(200).json({ success: true, message: "Categery edited" });
});

// delete category
const deleteCategory = controllerWrapper(async (req, res) => {
  const id = req.params.id;
  const deleted = await removeCategory(id);
  res.status(200).json({ success: true, message: "Category Deleted" });
});

export {
  addCategory,
  showCategory,
  editCategory,
  deleteCategory,
  getSingleCategory,
};
