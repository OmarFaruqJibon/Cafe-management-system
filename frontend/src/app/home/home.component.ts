import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.userService.checkToken().subscribe((res: any) => {
        this.router.navigate(['/cafe/dashboard']);
      });
    }
  }

  signup() {
    const dialogbox = new MatDialogConfig();
    dialogbox.width = '600px';
    this.dialog.open(SignupComponent, dialogbox);
  }

  login() {
    const dialogbox = new MatDialogConfig();
    dialogbox.width = '600px';
    this.dialog.open(LoginComponent, dialogbox);
  }
}
