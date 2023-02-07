import mongoose, { ObjectId } from "mongoose";
import { CartModel } from "./cart-model";
import { ClientModel } from "./client-model";
import { ProductModel } from "./product-model";

// 1.interface describing our model

export interface ICartItemModel extends mongoose.Document {
    //id exist by default , no need to specify it
    amount: number
    totalPrice: number
    productId: mongoose.Schema.Types.ObjectId // foreign key to categories collection
    cartId: mongoose.Schema.Types.ObjectId

}

// 2.schema object from the above interface, containing additional configuration

export const cartItemSchema = new mongoose.Schema<ICartItemModel>({
    amount: {
        type: Number,  // js string
        required: [true, "missing amount"],
        trim: true,
        unique: true
    },
    totalPrice: {
        type: Number,  // js string
        required: [true, "missing totalPrice"],
    },
    productId: mongoose.Schema.Types.ObjectId,
    cartId: mongoose.Schema.Types.ObjectId


}, {
    versionKey: false,  // don't add __v to added document 
    toJSON: { virtuals: true },  // support virtual's fields when returning json
    id: false // don't add id field when returning virtual's 
});

//adding virtual fields:
cartItemSchema.virtual("products", {
    ref: ProductModel, // model class, not a string
    localField: "productId", // in productModel- what is the relation field name
    foreignField: "_id", // in categoryModel - what is the relation field name
    justOne: true // category field is an object and not an array
}),
//adding virtual fields:
cartItemSchema.virtual("cart", {
    ref: CartModel, // model class, not a string
    localField: "cartId", // in productModel- what is the relation field name
    foreignField: "_id", // in categoryModel - what is the relation field name
    justOne: true // category field is an object and not an array
})

// 3.model from the above interface anf schema

export const CartItemModel = mongoose.model<ICartItemModel>("CartItemModel", cartItemSchema, "cartItems") // model name, schema, db collection name