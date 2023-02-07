import mongoose, { ObjectId } from "mongoose";
import RoleModel from "./role-model";

// 1.interface describing our model

export interface IClientModel extends mongoose.Document {
    //id exist by default , no need to specify it
    name: string
    lastName: string
    username: string
    idNumber: string
    password: string
    city: string
    street: string
    roleModel: RoleModel
}

// 2.schema object from the above interface, containing additional configuration

export const clientSchema = new mongoose.Schema<IClientModel>({
    name: {
        type: String,  // js string
        required: [true, "missing name"],
        trim: true,
        unique: true
    },
    lastName: {
        type: String,  // js string
        required: [true, "missing lastName"],
        trim: true,
        unique: true
    },
    username: {
        type: String,  // js string
        required: [true, "missing username"],
        trim: true,
        unique: true
    },
    idNumber: {
        type: String,  // js string
        required: [true, "missing idNumber"],
        trim: true,
        unique: true
    },
    password: {
        type: String,  // js string
        required: [true, "missing password"],
        trim: true,
        unique: true
    },
    city: {
        type: String,  // js string
        required: [true, "missing city"],
        trim: true,
        unique: true
    },
    street: {
        type: String,  // js string
        required: [true, "missing street"],
        trim: true,
        unique: true
    },
 

}, {
    versionKey: false,  // don't add __v to added document 
    toJSON: { virtuals: true },  // support virtual's fields when returning json
    id: false // don't add id field when returning virtual's 
});

// //adding virtual fields:
// clientSchema.virtual("client", {
//     ref: ClientModel, // model class, not a string
//     localField: "clientId", // in productModel- what is the relation field name
//     foreignField: "_id", // in categoryModel - what is the relation field name
//     justOne: true // category field is an object and not an array
// })

// 3.model from the above interface anf schema

export const ClientModel = mongoose.model<IClientModel>("ClientModel", clientSchema, "clients") // model name, schema, db collection name