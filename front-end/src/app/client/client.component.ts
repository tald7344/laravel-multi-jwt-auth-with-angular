import { Component, OnInit } from '@angular/core';
import { TokenService } from './client-service/token/token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    let loggedIn = this.tokenService.loggedIn();
    if (!loggedIn) {
      this.router.navigateByUrl('/login');
    }
  }

}
