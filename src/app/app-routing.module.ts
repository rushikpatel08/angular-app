import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { customerResolver } from './customer-resolver';
import { CustomerListNgforComponent } from './customer-list-ngfor/customer-list-ngfor.component';

const routes: Routes = [
  {path:'header', component: HeaderComponent},
  {path:'customer', component: CustomerComponent,resolve:{customer:customerResolver}},
  {path:'customer-list', component: CustomerListComponent},
  {path:'', component: HomeComponent},
  {path:'ngfor',component:CustomerListNgforComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
