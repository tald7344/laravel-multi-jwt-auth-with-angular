import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'src/app/Config';
import { LoginRequest } from '../entity/login-request';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }


  login(data): Observable<LoginRequest> {
    return this.httpClient.post<LoginRequest>(Config.loginAPI, data);
  }

}
