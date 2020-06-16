import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../client-service/auth/auth.service';
import { TokenService } from '../../client-service/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn;
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit() {
    this.authService.authStatus.subscribe(
      loggedInResponse => this.loggedIn = loggedInResponse
    );
  }

  logout(e: MouseEvent) {
    e.preventDefault();
    this.tokenService.deleteToken();
    this.authService.changeAuthStatus(false);
    this.router.navigateByUrl('/dashboard/login');
  }

}
