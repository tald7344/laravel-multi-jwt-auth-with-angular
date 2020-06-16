import { Injectable } from '@angular/core';
import { AdminConfig } from '../../AdminConfig';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login: AdminConfig.loginAPI
    // signup: Config.signupAPI
  };

  constructor() { }

  handle(token) {
    this.setToken(token);
    console.log(this.loggedIn());
  }

  // Store The Token In The Cookie
  setToken(token) {
    localStorage.setItem('token', token);
  }

    // GET The Token From The Cookie
  getToken() {
    return localStorage.getItem('token');
  }

    // Delete The Token From The Cookie
  deleteToken() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      // Here We Sayed That Any value from this Object (this.iss) is matches to the value in (payload.iss) 
      return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
    }
    return false;
  }

  payload(token) {
    /*
      The Token IS : eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU4OTY1NTAxMiwiZXhwIjoxNTg5NjU4NjEyLCJuYmYiOjE1ODk2NTUwMTIsImp0aSI6ImJ1S2paTWUyRnFRbHhRb1AiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.QCjXiyfQyNhq3ISzqmrY-Hp1mcqG2h3Mgs2DeMH39Uks
      SO we need the middle one between two dots which is (eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU4OTY1NTAxMiwiZXhwIjoxNTg5NjU4NjEyLCJuYmYiOjE1ODk2NTUwMTIsImp0aSI6ImJ1S2paTWUyRnFRbHhRb1AiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ)
      Because the middle one is contain the information we need after decode it 
    */
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  // decode the token to fetch the data from it
  decode(payload) {
    /*
      the Code Is 'base46' decoded
      After DEcode the Token The Result WIll Be as Following Which will need the (iss):
      {
        exp: 1589659017
        iat: 1589655417
        iss: "http://127.0.0.1:8000/api/login"
        jti: "4uB9Woj0WifmHTLF"
        nbf: 1589655417
        prv: "87e0af1ef9fd15812fdec97153a14e0b047546aa"
        sub: 1
      }
    */
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}