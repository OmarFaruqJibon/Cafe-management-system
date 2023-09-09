import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { globalConstant } from '../shared/global-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any = FormGroup;
  responseMessage!:any;

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbar: SnackbarService,
    private dialogRef: MatDialogRef<LoginComponent>,

    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(globalConstant.emailError)]],
      password: ['', [Validators.required]]
    });
  }

  handleSubmit(){
    const formData = this.loginForm.value;
    const data = {
      email: formData.email,
      password: formData.password
    }
    console.log(data);

    this.userService.login(data).subscribe(
      (resp: any) => {
        this.dialogRef.close();
        this.responseMessage = resp?.message;
        localStorage.setItem('token', resp?.token)
        this.snackbar.openSnackBar(this.responseMessage, '');
        this.router.navigate(['/cafe/dashboard']);
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
}
