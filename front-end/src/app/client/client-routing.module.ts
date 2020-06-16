import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './register/components/login/login.component';
import { AfterLoginService } from './client-service/guard/after-login.service';
import { BeforeLoginService } from './client-service/guard/before-login.service';


const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: '', component: HomeComponent, canActivate: [AfterLoginService] },
      { path: 'login', component: LoginComponent, canActivate: [BeforeLoginService] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
