import mongoose, { ObjectId } from "mongoose";
import { CategoryModel } from "./category-model";

// 1.interface describing our model

export interface IOrderModel extends mongoose.Document {
    //id exist by default , no need to specify it
    clientId: mongoose.Schema.Types.ObjectId // foreign key to clients collection
    cartId: mongoose.Schema.Types.ObjectId // foreign key to carts collection
    finalPrice: number
    city: string
    street: string
    dateForDelivery: string
    payment: string

}

// 2.schema object from the above interface, containing additional configuration

export const orderSchema = new mongoose.Schema<IOrderModel>({
    finalPrice: {
        type: Number,  // js string
        required: [true, "missing finalPrice"],
        min: [0, "finalPrice cant be negative"],
        max: [10000, "finalPrice cant be larger then 10000"],
        trim: true,
        unique: true
    },
    city: {
        type: String,
        required: [true, "missing city"],
        minlength: [2, "city must be minimum 2 chars"],
        maxlength: [100, "city cant exceed 100 chars"]
    },
    street: {
        type: String,
        required: [true, "missing street"],
        minlength: [2, "street must be minimum 2 chars"],
        maxlength: [100, "street cant exceed 100 chars"]
    },
    dateForDelivery: {
        type: String,
        required: [true, "missing dateForDelivery"]
    },
    payment: {
        type: String,
        required: [true, "missing payment"],
        minlength: [16, "payment must be minimum 16 chars"],
        maxlength: [16, "payment cant exceed 16 chars"]
    },
    clientId: mongoose.Schema.Types.ObjectId,
    cartId: mongoose.Schema.Types.ObjectId


}, {
    versionKey: false,  // don't add __v to added document 
    toJSON: { virtuals: true },  // support virtual's fields when returning json
    id: false // don't add id field when returning virtual's 
});

//adding virtual fields:
orderSchema.virtual("category", {
    ref: CategoryModel, // model class, not a string
    localField: "categoryId", // in productModel- what is the relation field name
    foreignField: "_id", // in categoryModel - what is the relation field name
    justOne: true // category field is an object and not an array
})

// 3.model from the above interface anf schema

export const ProductModel = mongoose.model<IOrderModel>("OrderModel", orderSchema, "orders") // model name, schema, db collection name