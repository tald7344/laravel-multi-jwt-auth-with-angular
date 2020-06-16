import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegisterService } from '../../service/login/register.service';
import { TokenService } from 'src/app/admin/client-service/token/token.service';
import { AuthService } from 'src/app/admin/client-service/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  errors = [];
  error = null;
  public form = {
    email: null,
    password: null
  };
  process = false;


  constructor(
    private registerService: RegisterService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router) { }

  public ngOnInit() {
    window.dispatchEvent( new Event( 'resize' ) );
    document.body.className = 'hold-transition login-page';
  }

  public ngOnDestroy() {
    document.body.className = '';
  }

  onSubmit() {
    this.process = true;
    this.registerService.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.process = false;
    this.tokenService.handle(data.token);
    this.authService.changeAuthStatus(true);
    this.router.navigateByUrl('/dashboard');
  }

  handleError(error: HttpErrorResponse) {
    this.process = false;
    if (error.error.error) {
      this.error = error.error.error;
    } else if (error.error.errors) {
      this.errors = error.error.errors;
    }
  }

}
