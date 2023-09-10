import { Component, AfterViewInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { globalConstant } from '../shared/global-constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  responseMessage: any;
  data: any;
  ngAfterViewInit() {}

  constructor(
    private dashboardService: DashboardService,
    private snackBar: SnackbarService
  ) {
    this.dashboardData();
  }

  dashboardData() {
    this.dashboardService.getDetails().subscribe(
      (resp: any) => {
        this.data = resp.data;
      },
      (error: any) => {
        console.log(error);
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
