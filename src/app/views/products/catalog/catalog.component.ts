import { Component, OnInit } from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  products: ProductType[] = [];

  constructor(private productService: ProductService,
              private router: Router,) {
  }

  ngOnInit(): void {
    // this.loading = true;
    this.productService.getProducts()
      .subscribe(
        {
          next: data => {
            this.products = data;
          },
          error: err => {
            console.log(err);
            this.router.navigate(['/']);
          }
        })
  }
}
