import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { NotFoundComponent } from 'src/app/not-found/not-found/not-found.component';


const routes: Routes = [
  {path: '', loadChildren: () => import('../../client/client.module').then(m => m.ClientModule) },
  {path: 'dashboard', loadChildren: () => import('../../admin/admin.module').then(m => m.AdminModule)},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
