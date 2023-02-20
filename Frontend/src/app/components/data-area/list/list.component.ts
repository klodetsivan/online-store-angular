import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public products: ProductModel[];

  public constructor(private productsService: ProductsService) { }

  async ngOnInit(): Promise<void> {
      try {
          this.products = await this.productsService.getAllProducts();
      }
      catch(err: any) {
          alert(err.message);
      }
  }

}
