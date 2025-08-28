import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  showSuccessInfo = false;
  showOrderForm = true;
  showErrorMessage = false;
  private subscriptionOrder: Subscription | null = null;

  orderForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[а-яА-Я]+$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[а-яА-Я]+$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?\d{11}$/)]],
    country: ['', Validators.required],
    index: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    address: ['', [Validators.required, Validators.pattern(/^[А-Яа-я0-9 \/-]+$/)]],
    product: ['', Validators.required],
    comment: [''],
  })

  get name() { return this.orderForm.get('name'); }
  get lastName() { return this.orderForm.get('lastName'); }
  get phone() { return this.orderForm.get('phone'); }
  get country() { return this.orderForm.get('country'); }
  get index() { return this.orderForm.get('index'); }
  get address() { return this.orderForm.get('address'); }
  get product() { return this.orderForm.get('product'); }
  get comment() { return this.orderForm.get('comment'); }

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private productService: ProductService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['product']) {
        this.orderForm.patchValue({product: params['product']});
      }
    })
  }

  createOrder(): void {
    this.showErrorMessage = false;

    if (this.orderForm.valid) {
      this.subscriptionOrder = this.productService.createOrder({
        name: this.name?.value || '',
        last_name: this.lastName?.value || '',
        phone: this.phone?.value || '',
        country: this.country?.value || '',
        address: this.address?.value || '',
        zip: this.index?.value || '',
        product: this.product?.value || '',
        comment: this.comment?.value || '',
      })
        .subscribe(response => {
          if (response.success && !response.message) {
            this.showSuccessInfo = true;
            this.showOrderForm = false;
            this.orderForm.reset();
          } else {
            this.showErrorMessage = true;
          }
        });
    } else {
      this.orderForm.markAllAsTouched();
      console.log('Форма невалидна, проверьте поля');
    }
  }

  ngOnDestroy(): void {
    this.subscriptionOrder?.unsubscribe();
  }
}
