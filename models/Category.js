import { model, Schema } from "mongoose";

const CategorySchema = new Schema({
  name: String,
  mainColor: String,
});

const Category = model("Category", CategorySchema);

export default Category;
