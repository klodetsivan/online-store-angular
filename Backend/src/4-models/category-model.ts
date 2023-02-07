import mongoose from "mongoose";

//1.interface

export interface ICategoryModel extends mongoose.Document {
    //id exist by default
    name: string;
}

//2.schema

export const CategorySchema = new mongoose.Schema<ICategoryModel>({
    name: {
        type: String,
        required: [true, "missing name"],
        minlength: [2, "name must be at least 3 chars"],
        maxlength: [20, "name cant be longer then 20 chars"],
        trim: true,
        unique: true
    }
  
},{
    versionKey: false
});


//3.model

export const CategoryModel = mongoose.model<ICategoryModel>("CategoryModel", CategorySchema, "categories")
