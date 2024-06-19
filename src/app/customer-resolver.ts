import { inject } from '@angular/core';
import { CustomerService } from './customer.service';
import { ActivatedRouteSnapshot,ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from 'rxjs';
import { Customer } from './customer.model';

export const customerResolver:ResolveFn<any>=
(route:ActivatedRouteSnapshot,state:RouterStateSnapshot,customerService:CustomerService
    =inject(CustomerService)):Observable<Customer>=>{
        const id=route.paramMap.get('id');
        if(id) {
            return customerService.displayCustomerById(Number(id));
        }
        else{
           const customer: Customer = {
                id: 0,
                name: '',
                email: '',
                phone: '',
                address: '',
                gender: '',
                department: '',
                skills: ''
              }

              return of(customer);
        }
}