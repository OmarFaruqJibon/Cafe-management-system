import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { globalConstant } from 'src/app/shared/global-constant';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss'],
})
export class ManageOrderComponent implements OnInit {
  manageOrderForm: any = FormGroup;
  displayedColumns: string[] = [
    'name',
    'category',
    'price',
    'quantity',
    'total',
    'edit',
  ];
  dataSource: any = [];
  categorys: any = [];
  products: any = [];
  price: any;
  totalAmount: number = 0;
  responseMessage: any;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private snackBar: SnackbarService,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    this.getCategories();

    this.manageOrderForm = this.fb.group({
      name: [
        null,
        [Validators.required, Validators.pattern(globalConstant.nameError)],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(globalConstant.emailError)],
      ],
      contactNumber: [
        null,
        [
          Validators.required,
          Validators.pattern(globalConstant.contactNumberError),
        ],
      ],

      paymentMethod: [null, [Validators.required]],
      product: [null, [Validators.required]],
      category: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      price: [null, [Validators.required]],
      total: [0, [Validators.required]],
    });
  }

  getCategories() {
    this.categoryService.getCategory().subscribe(
      (resp: any) => {
        this.categorys = resp.data;
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

  getProductsByCategory(value: any) {
    this.productService.getProductsByCategory(value.id).subscribe(
      (resp: any) => {
        // console.log(resp);
        this.products = resp;
        this.manageOrderForm.controls['price'].setValue('');
        this.manageOrderForm.controls['quantity'].setValue('');
        this.manageOrderForm.controls['total'].setValue(0);
        console.log('total ' + this.manageOrderForm.controls['total'].value);
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

  getProductDetails(value: any) {
    this.productService.getById(value.id).subscribe(
      (resp: any) => {
        console.log('details ' + resp.price);
        this.price = resp.price;
        this.manageOrderForm.controls['price'].setValue(resp.price);
        this.manageOrderForm.controls['quantity'].setValue('1');
        this.manageOrderForm.controls['total'].setValue(this.price * 1);
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

  setQuantity(value: any) {
    let temp = this.manageOrderForm.controls['quantity'].value;
    if (temp > 0) {
      this.manageOrderForm.controls['total'].setValue(
        this.manageOrderForm.controls['quantity'].value *
          this.manageOrderForm.controls['price'].value
      );
    } else if (temp != '') {
      this.manageOrderForm.controls['quantity'].setValue('1');
      this.manageOrderForm.controls['total'].setValue(
        this.manageOrderForm.controls['quantity'].value *
          this.manageOrderForm.controls['price'].value
      );
    }
  }

  validateProductAdd() {
    if (
      this.manageOrderForm.controls['total'].value === 0 ||
      this.manageOrderForm.controls['total'].value === null ||
      this.manageOrderForm.controls['quantity'].value <= 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  validateSubmit() {
    if (
      this.totalAmount === 0 ||
      this.manageOrderForm.controls.name.value === null ||
      this.manageOrderForm.controls.email.value === null ||
      this.manageOrderForm.controls.contactNumber.value === null ||
      this.manageOrderForm.controls.paymentMethod.value === null ||
      !this.manageOrderForm.controls.contactNumber.valid ||
      !this.manageOrderForm.controls.email.valid
    ) {
      return true;
    } else {
      return false;
    }
  }

  add() {
    let formData = this.manageOrderForm.value;
    let productName = this.dataSource.find(
      (e: { id: number }) => e.id == formData.product.id
    );
    if (productName === undefined) {
      this.totalAmount += formData.total;
      this.dataSource.push({
        id: formData.product.id,
        name: formData.product.name,
        category: formData.category.name,
        quantity: formData.quantity,
        price: formData.price,
        total: formData.total,
      });

      this.dataSource = [...this.dataSource];
      this.snackBar.openSnackBar(globalConstant.generelError, 'success');
    } else {
      this.snackBar.openSnackBar(
        globalConstant.generelError,
        globalConstant.error
      );
    }
  }

  handleDeletAction(value: any, element: any) {
    this.totalAmount -= element.total;
    this.dataSource.splice(value, 1);
    this.dataSource = [...this.dataSource];
  }

  submitAction() {
    let formData = this.manageOrderForm.value;
    let data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      paymentMethod: formData.paymentMethod,
      totalAmount: this.totalAmount,
      productDetails: JSON.stringify(this.dataSource),
    };

    this.billService.generateReport(data).subscribe(
      (resp: any) => {
        this.downloadFile(resp?.uuid);
        this.manageOrderForm.reset();
        this.dataSource = [];
        this.totalAmount = 0;
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

  downloadFile(fileName: any) {
    let data = {
      uuid: fileName,
    };

    this.billService.getPDF(data).subscribe((resp: any) => {
      saveAs(resp, fileName + '.pdf');
    });
  }
}
