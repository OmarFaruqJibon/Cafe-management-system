import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BillService } from 'src/app/services/bill.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { globalConstant } from 'src/app/shared/global-constant';
import { ViewBillProductsComponent } from '../dialog/view-bill-products/view-bill-products.component';

@Component({
  selector: 'app-manage-bills',
  templateUrl: './manage-bills.component.html',
  styleUrls: ['./manage-bills.component.scss'],
})
export class ManageBillsComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'contactNumber',
    'paymentMethod',
    'total',
    'view',
  ];
  dataSource: any;
  responseMessage: any;

  constructor(
    private billService: BillService,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this.billService.getBills().subscribe(
      (resp: any) => {
        this.dataSource = new MatTableDataSource(resp.data);
        console.log(resp.data);
      },
      (error) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = globalConstant.generelError;
        }
        this.snackbar.openSnackBar(this.responseMessage, globalConstant.error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleViewAction(value: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data: value,
    };
    dialogConfig.width = '100%';

    const dialogRef = this.dialog.open(ViewBillProductsComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }

  downloadReportAction(value: any) {}

  handleDeleteAction(value: any) {}
}
