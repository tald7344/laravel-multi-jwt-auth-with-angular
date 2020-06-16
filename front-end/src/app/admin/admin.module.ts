import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './register/components/login/login.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { AuthService } from '../client/client-service/auth/auth.service';
import { AfterLoginService } from '../client/client-service/guard/after-login.service';
import { BeforeLoginService } from '../client/client-service/guard/before-login.service';
import { TokenService } from '../client/client-service/token/token.service';
import { RegisterService } from './register/service/login/register.service';
import { SidebarComponent } from './sidebar/components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    DashboardComponent, 
    LoginComponent, 
    NavbarComponent, SidebarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    AfterLoginService,
    BeforeLoginService,
    TokenService,
    RegisterService
  ]
})
export class AdminModule { }
