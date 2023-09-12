import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { globalConstant } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'status'];
  dataSource: any;
  responseMessage: any;

  constructor(
    private userService: UserService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this.userService.getUsers().subscribe(
      (resp: any) => {
        this.dataSource = new MatTableDataSource(resp.data);
        // console.log(resp);
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

  handleChangeAction(status: any, id: any) {
    let data = {
      status: status.toString(),
      id: id,
    };

    this.userService.update(data).subscribe(
      (resp: any) => {
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
