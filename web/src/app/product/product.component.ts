import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  addProductForm !: FormGroup;
  editProductForm !: FormGroup;
  products: any = [];

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.addProductForm = this.formBuilder.group({
        inputName: ['', Validators.required],
        inputPrice: ['', Validators.required]
      });
      this.editProductForm = this.formBuilder.group({
        editInputId: ['', Validators.required],
        editInputName: ['', Validators.required],
        editInputPrice: ['', Validators.required]
      });
      this.getProducts();
    }

    getProducts() {
      this.api.getProducts().subscribe({
        next: (response: any) => {
          console.log(response);
          this.products = response;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    editProduct(product: any) {
      this.editProductForm.patchValue({editInputId: product.productId});
      this.editProductForm.patchValue({editInputName: product.productName});
      this.editProductForm.patchValue({editInputPrice: product.productPrice});
    }

    updateProduct() {
      let data = {
        productId: this.editProductForm.value.editInputId,
        productName: this.editProductForm.value.editInputName,
        ProductPrice: this.editProductForm.value.editInputPrice
      };
      this.api.updateProduct(data).subscribe({
        next: (res) => {
          this.getProducts();
        },
        error: (err) => {
          console.log(err);
        }
      });
  
    }

    onClick() {
      this.addProduct();
    }

    addProduct() {
      let data = {
        productName: this.addProductForm.value.inputName,
        productPrice: this.addProductForm.value.inputPrice
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

    deleteProduct(productId: number) {
      this.api.deleteProduct(productId).subscribe({
        next: (response) => {
          console.log(response);
          this.getProducts();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

    clearField() {
      this.addProductForm.patchValue({
          inputName: '', 
          inputPrice: ''
        });
    }
}
