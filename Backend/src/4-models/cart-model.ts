import mongoose, { ObjectId } from "mongoose";
import { ClientModel } from "./client-model";

// 1.interface describing our model

export interface ICartModel extends mongoose.Document {
    //id exist by default , no need to specify it
    clientId: mongoose.Schema.Types.ObjectId // foreign key to categories collection
    orderDate: string

}

// 2.schema object from the above interface, containing additional configuration

export const cartSchema = new mongoose.Schema<ICartModel>({
    orderDate: {
        type: String,  // js string
        required: [true, "missing orderDate"],
        trim: true,
        unique: true
    },
    clientId: mongoose.Schema.Types.ObjectId

}, {
    versionKey: false,  // don't add __v to added document 
    toJSON: { virtuals: true },  // support virtual's fields when returning json
    id: false // don't add id field when returning virtual's 
});

//adding virtual fields:
cartSchema.virtual("client", {
    ref: ClientModel, // model class, not a string
    localField: "clientId", // in productModel- what is the relation field name
    foreignField: "_id", // in categoryModel - what is the relation field name
    justOne: true // category field is an object and not an array
})

// 3.model from the above interface anf schema

export const CartModel = mongoose.model<ICartModel>("CartModel", cartSchema, "carts") // model name, schema, db collection name