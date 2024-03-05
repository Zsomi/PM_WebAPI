import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  productForm !: FormGroup;
  products: any = [];

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.productForm = this.formBuilder.group({
        inputName: ['', Validators.required],
        inputPrice: ['', Validators.required]
      });
      this.getProducts();
    }

    getProducts() {
      this.api.getProducts().subscribe({
        next: (response: any) => {
          this.products = response.data;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    onClick() {
    }

    addProduct() {
      let data = {
        name: this.productForm.value.inputName,
        price: this.productForm.value.inputPrice
      };
      
      this.api.addProduct(data)
      .subscribe({
        next: (data: any) => {
          this.getProducts();
          this.clearField();
          const message = document.createElement('div');
        },
        error: (err: any) => {
          console.log('Hiba! A termék felévtele sikertelen!')
        }
      });
    }

    clearField() {
      this.productForm.patchValue({
          inputName: '', 
          inputPrice: ''
        });
    }
}
