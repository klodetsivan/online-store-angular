
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import { IProductModel, ProductModel } from "../4-models/product-model";

// Get all products: 
function getAllProducts(): Promise<IProductModel[]> {
    // get all products without virtual fields
    // return ProductModel.find().exec();   

    // get all products with virtual fields
    return ProductModel.find().populate("category").exec();
}

// Get one product: 
async function getOneProduct(_id: string): Promise<IProductModel> {
    const product = await ProductModel.findById(_id).exec();
    if (!product) throw new ResourceNotFoundErrorModel(_id);
    return product;
}

// Add new product: 
function addProduct(product: IProductModel): Promise<IProductModel> {
    const errors = product.validateSync();
    if (errors) throw new ValidationErrorModel(errors.message);
    return product.save();
}

// Update existing product: 
async function updateProduct(product: IProductModel): Promise<IProductModel> {
    const errors = product.validateSync();
    if (errors) throw new ValidationErrorModel(errors.message);
    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).exec();
    if (!updatedProduct) throw new ResourceNotFoundErrorModel(product._id);
    return updatedProduct
}

// Delete product:
async function deleteProduct(_id: string): Promise<void> {
    const deletedProduct = await ProductModel.findByIdAndDelete(_id).exec();
    if (!deletedProduct) throw new ResourceNotFoundErrorModel(_id);
}

// //testing mongodb query language
// function getProducts(): Promise<IProductModel[]> {

//     // SELECT _id,name,price FROM products WHERE price = 10
//     //if no WHERE => use empty obj
//     // return ProductModel.find({ price: 10 }, ["name", "price"]).exec();

//     // SELECT _id,name,price FROM products WHERE price >= 10 AND price <= 20 ORDER BY price
//     // ASC
//     // return ProductModel.find({ price: {$gte: 10, lte: 20} }, ["name", "price"], {sort: "price"}).exec();

//     // SELECT _id,name,price FROM products WHERE price >= 10 AND price <= 20 ORDER BY price DEC
//     // DEC
//     return ProductModel.find({ price: { $gte: 10, lte: 20 } }, ["name", "price"], { sort: { price: -1 } }).exec();

// }

function getProductsByCategory(categoryId: string): Promise<IProductModel[]> {
    return ProductModel.find({ categoryId }).populate("category").exec() 
}

export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    // getProducts,
    getProductsByCategory

};



