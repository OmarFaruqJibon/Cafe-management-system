import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { globalConstant } from '../shared/global-constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: any = UntypedFormGroup;
  responseMessage!: string;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbar: SnackbarService,
    private dialogRef: MatDialogRef<SignupComponent>
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern(globalConstant.nameError)],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(globalConstant.emailError)],
      ],
      contactNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(globalConstant.contactNumberError),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  handleSubmit() {
    const formData = this.signupForm.value;
    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.contactNumber,
      password: formData.password,
    };

    console.log(data);

    this.userService.signup(data).subscribe(
      (resp: any) => {
        this.dialogRef.close();
        this.responseMessage = resp?.message;
        this.snackbar.openSnackBar(this.responseMessage, '');
        this.router.navigate(['/']);
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
