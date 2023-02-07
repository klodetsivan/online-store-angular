import mongoose, { ObjectId } from "mongoose";
import { CategoryModel } from "./category-model";

// 1.interface describing our model

export interface IProductModel extends mongoose.Document {
    //id exist by default , no need to specify it
    name: string;
    price: number;
    categoryId: mongoose.Schema.Types.ObjectId // foreign key to categories collection
    image: FileList;
}

// 2.schema object from the above interface, containing additional configuration

export const productSchema = new mongoose.Schema<IProductModel>({
    name: {
        type: String,  // js string
        required: [true, "missing name"],
        minlength: [2, "name must be minimum 2 chars"],
        maxlength: [100, "name cant exceed 100 chars"],
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        required: [true, "missing price"],
        min: [0, "price cant be negative"],
        man: [1000, "price cant be larger then 1000"],
    },
    image: {
        type: FileList,
        required: [true, "missing image"]
    },
    categoryId: mongoose.Schema.Types.ObjectId

}, {
    versionKey: false,  // don't add __v to added document 
    toJSON: { virtuals: true },  // support virtual's fields when returning json
    id: false // don't add id field when returning virtual's 
});

//adding virtual fields:
productSchema.virtual("category", {
    ref: CategoryModel, // model class, not a string
    localField: "categoryId", // in productModel- what is the relation field name
    foreignField: "_id", // in categoryModel - what is the relation field name
    justOne: true // category field is an object and not an array
})

// 3.model from the above interface anf schema

export const ProductModel = mongoose.model<IProductModel>("ProductModel", productSchema, "products") // model name, schema, db collection name