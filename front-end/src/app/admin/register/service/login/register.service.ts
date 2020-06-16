import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../../entity/login-request';
import { AdminConfig } from 'src/app/admin/AdminConfig';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  login(data): Observable<LoginRequest> {
    return this.httpClient.post<LoginRequest>(AdminConfig.loginAPI, data);
  }

}
