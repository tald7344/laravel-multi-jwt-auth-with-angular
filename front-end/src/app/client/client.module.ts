import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ClientComponent } from './client.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './register/components/login/login.component';
import { RegisterService } from './register/service/register.service';
import { AfterLoginService } from './client-service/guard/after-login.service';
import { BeforeLoginService } from './client-service/guard/before-login.service';



@NgModule({
  declarations: [
    ClientComponent, 
    HeaderComponent, 
    LoginComponent, 
    HomeComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    RegisterService,
    AfterLoginService,
    BeforeLoginService
  ],
})
export class ClientModule { }
