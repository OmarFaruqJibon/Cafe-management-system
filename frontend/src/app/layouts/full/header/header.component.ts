import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class AppHeaderComponent {
  role: any;
  constructor(private router: Router, private dialog: MatDialog) {}

  logout() {
    let confrimation = 'Want to Logout?';
    if (confirm(confrimation) == true) {
      localStorage.clear();
      this.router.navigate(['/']);
    } else {
    }
  }
}
