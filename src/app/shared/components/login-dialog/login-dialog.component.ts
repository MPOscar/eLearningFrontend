import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Router} from '@angular/router';

import {AuthenticationService} from '../../services/authentication.service';
import {AuthGuardService} from '../../services/auth-guard.service';
import {ShowProgressService} from '../../services/show-progress.service';
import {TitleService} from '../../services/title.service';
import {TranslateService} from '@ngx-translate/core';
import { TranslatableSnackBarService } from "../../services/translatable-snack-bar.service";

@Component({
  selector: "app-login-dialog",
  templateUrl: "./login-dialog.component.html",
  styleUrls: ["./login-dialog.component.scss"],
})
export class LoginDialogComponent implements OnInit {

  loginForm: FormGroup;

  hidePassword = true;

  error = '';

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackBar: TranslatableSnackBarService,
    private router: Router,
    private authGuard: AuthGuardService,
    private authenticationService: AuthenticationService,
    private showProgress: ShowProgressService,
    private formBuilder: FormBuilder,
    private titleService: TitleService,
    private translate: TranslateService
  ) {
    this.loginForm = this.fb.group({
      usuario: ["", Validators.required],
      contrasena: ["", Validators.required],
    });
  }

  ngOnInit() {
	this.generateForm();
  }

  logOut() {
    this.dialogRef.close();
    //this.data.next(null);
  }

  login() {
	this.showProgress.toggleLoadingGlobal(true);
    this.loading = true;
    this.loginForm.value.email = this.loginForm.value.email.replace(/\s/g, '').toLowerCase();
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).then(
      () => {

        if (this.authGuard.redirectUrl) {
          this.router.navigate([this.authGuard.redirectUrl])
            .then(() => this.authGuard.redirectUrl = null)
            .catch(e => this.router.navigate(['/']));
        } else {
          this.router.navigate(['/']);
        }
        this.showProgress.toggleLoadingGlobal(false);
        this.loading = false;

		this.snackBar.open('auth.login.success');
		this.dialogRef.close();
      })
      .catch(response => {
        this.showProgress.toggleLoadingGlobal(false);
        this.loading = false;

        this.snackBar.open('auth.login.failed.' + response.error.message);
      });
  }

  generateForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
