import Category from "../models/categoryModel.js";
import CatchAsync from "../utils/CatchAsync.js";

export const createCategory = CatchAsync(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.json({ error: "Name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({ error: "Category already exists" });
    }

    const newCategory = await new Category({ name }).save();
    res
      .status(201)
      .json({ message: "Category created successfully", data: newCategory });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});
export const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error reading category",
    });
  }
};
export const updateCategory = CatchAsync(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      category.name = req.body.name || category.name;

      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404);
      throw new Error("category not found");
    }
  } catch (error) {
    console.log(error);
    throw new Error("category not found, error updating category");
  }
});
export const deletecategoryById = CatchAsync(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      const deletedcategory = await Category.deleteOne({ _id: category._id });
      res.json(deletedcategory);
    }else{
        res.json({message:'category not found'})
    }
  } catch (error) {
    console.log(error);
    throw new Error("category not found by admin");
  }
});
