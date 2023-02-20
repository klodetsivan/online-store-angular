import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { appConfig } from 'src/app/utils/app-config';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

    @Input() // React's Props
    public product: ProductModel;

    public imageSource: string;

    public constructor(private productsService: ProductsService) { }

    public ngOnInit(): void {
        this.imageSource = appConfig.productsUrl + "images/" + this.product.imageName;
    }

    public async onSelectAmount() {
        try {
           const amount = +prompt("please choose amount");
           console.log(amount);
           
        }
        catch(err: any) {
            alert(err.message);
        }
    }

    public async deleteMe() {
        try {
            if(!window.confirm("Are you sure?")) return;
            await this.productsService.deleteProduct(this.product.id);
            alert("Product has been deleted");
        }
        catch(err: any) {
            alert(err.message);
        }
    }
}
