import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  signup(){
    const dialogbox = new MatDialogConfig();
    dialogbox.width = "600px";
    this.dialog.open(SignupComponent, dialogbox)
  };

  login() {
    const dialogbox = new MatDialogConfig();
    dialogbox.width = "600px";
    this.dialog.open(LoginComponent, dialogbox)
  };



  
}
