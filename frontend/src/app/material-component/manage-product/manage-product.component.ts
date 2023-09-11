import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { globalConstant } from 'src/app/shared/global-constant';
import { ProductComponent } from '../dialog/product/product.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
})
export class ManageProductComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'category',
    'description',
    'price',
    'edit',
  ];
  dataSource: any;
  responseMessage: any;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this.productService.getProduct().subscribe(
      (resp: any) => {
        this.dataSource = new MatTableDataSource(resp.data);
        console.log(resp);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddProduct.subscribe(
      (resp: any) => {
        this.tableData();
      }
    );
  }

  handleEditAction(value: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: value,
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditProduct.subscribe(
      (resp: any) => {
        this.tableData();
      }
    );
  }

  handleDeleteAction(value: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete ' + value.name + ' product',
    };

    let confrimation = 'Want to Delete?';
    if (confirm(confrimation) == true) {
      this.deleteProduct(value.id);
    }
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe(
      (resp: any) => {
        this.tableData();
        this.responseMessage = resp?.message;
        this.snackBar.openSnackBar(this.responseMessage, 'success');
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
}
