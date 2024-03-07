import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  addProductForm!: FormGroup;
  editProductForm!: FormGroup;
  products: any = [];

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

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

  onAddProductSubmit() {
    if (this.addProductForm.invalid) {
      this.toastr.error('Please fill out all required fields.', 'Error', { timeOut: 3000, progressBar: true });
    } else {
      this.toastr.success('Product added successfully!', 'Success', { timeOut: 3000, progressBar: true });
      this.addProduct();
      this.clearField();
    }
  }

  onEditProductSubmit() {
    const editInputId = this.editProductForm.get('editInputId')?.value;
    const editInputName = this.editProductForm.get('editInputName')?.value;
    const editInputPrice = this.editProductForm.get('editInputPrice')?.value;

    if (!editInputId || !editInputName || !editInputPrice) {
      this.toastr.error('Please fill out all required fields before editing.', 'Error', { timeOut: 3000, progressBar: true });
      return;
    }

    this.toastr.success('Product edited successfully!', 'Success', { timeOut: 3000, progressBar: true });
    this.updateProduct();
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
    const productId = product.productId;
    const productName = product.productName;
    const productPrice = product.productPrice;

    if (!productId || !productName || !productPrice) {
      this.toastr.error('Please fill out all fields before editing.', 'Error', { timeOut: 3000, progressBar: true });
      return;
    }

    this.editProductForm.patchValue({ editInputId: productId });
    this.editProductForm.patchValue({ editInputName: productName });
    this.editProductForm.patchValue({ editInputPrice: productPrice });
  }

  updateProduct() {
    let data = {
      productId: this.editProductForm.value.editInputId,
      productName: this.editProductForm.value.editInputName,
      productPrice: this.editProductForm.value.editInputPrice
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

    this.api.addProduct(data).subscribe({
      next: (data: any) => {
        this.getProducts();
        this.clearField();
      },
      error: (err: any) => {
        console.log('Hiba! A termék felvétele sikertelen!');
      }
    });
  }

  deleteProduct(productId: number) {
    this.api.deleteProduct(productId).subscribe({
      next: (response) => {
        console.log(response);

        if (response) {
          this.toastr.success('Product deleted successfully!', 'Success', { timeOut: 3000, progressBar: true });
        } else {
          this.toastr.error('Failed to delete product. Product not found.', 'Error', { timeOut: 3000, progressBar: true });
        }

        this.getProducts();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to delete product. Please try again.', 'Error', { timeOut: 3000, progressBar: true });
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
