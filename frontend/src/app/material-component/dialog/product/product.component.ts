import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { globalConstant } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm: any = UntypedFormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any;
  categories: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: UntypedFormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<ProductComponent>,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [
        null,
        [Validators.required, Validators.pattern(globalConstant.nameError)],
      ],
      categoryId: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.productForm.patchValue(this.dialogData.data);
    }

    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategory().subscribe(
      (resp: any) => {
        this.categories = resp.data;
      },
      (error) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = globalConstant.generelError;
        }
        this.snackBar.openSnackBar(this.responseMessage, globalConstant.error);
      }
    );
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else if (this.dialogAction === 'Add') {
      this.add();
    }
  }

  add() {
    let formData = this.productForm.value;
    let data = {
      name: formData.name,
      categoryID: formData.categoryId,
      price: formData.price,
      description: formData.description,
    };

    this.productService.addProduct(data).subscribe(
      (resp: any) => {
        this.dialogRef.close();
        this.onAddProduct.emit();
        this.responseMessage = resp.message;
        this.snackBar.openSnackBar(this.responseMessage, 'success');
      },
      (error) => {
        this.dialogRef.close();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = globalConstant.generelError;
        }
        this.snackBar.openSnackBar(this.responseMessage, globalConstant.error);
      }
    );
  }

  edit() {
    let formData = this.productForm.value;
    let data = {
      id: this.dialogData.data.id,
      name: formData.name,
      categoryID: formData.categoryId,
      price: formData.price,
      description: formData.description,
    };

    this.productService.updateProduct(data).subscribe(
      (resp: any) => {
        this.dialogRef.close();
        this.onEditProduct.emit();
        this.responseMessage = resp.message;
        this.snackBar.openSnackBar(this.responseMessage, 'success');
      },
      (error) => {
        this.dialogRef.close();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = globalConstant.generelError;
        }
        this.snackBar.openSnackBar(this.responseMessage, globalConstant.error);
      }
    );
  }

  delete() {}
}
