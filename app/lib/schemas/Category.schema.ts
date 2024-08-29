"use server";

import mongoose, {  Schema } from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require: false
    },
    color: {
      type: String,
      require: false
    }
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Category;