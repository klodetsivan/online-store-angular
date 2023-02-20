import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ProductModel } from "../models/product.model";
import { appConfig } from "../utils/app-config";

@Injectable({
    providedIn: "root"
})
export class ProductsService {

    // DI 
    public constructor(private http: HttpClient) { }

    public async getAllProducts(): Promise<ProductModel[]> {

        // Observable - משהו ממש מגניב
        const observable = this.http.get<ProductModel[]>(appConfig.productsUrl);
        console.log(observable);

        // Convert observable to promise:
        const products = await firstValueFrom(observable);
        console.log(products);

        return products;
    }

    public async addProduct(product: ProductModel): Promise<void> {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        // formData.append("stock", product.stock.toString());
        formData.append("image", product.image);
        const observable = this.http.post<ProductModel>(appConfig.productsUrl, formData);
        const addedProduct = await firstValueFrom(observable);
    }

    public async deleteProduct(id: number): Promise<void> {
        const observable = this.http.delete(appConfig.productsUrl + id);
        await firstValueFrom(observable);
    }

}


