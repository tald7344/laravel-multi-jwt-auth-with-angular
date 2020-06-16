import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../service/register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../../../client-service/token/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/client/client-service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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

  ngOnInit(): void {
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
    this.router.navigateByUrl('/');
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
