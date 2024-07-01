import { Customer } from './customer.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient:HttpClient) { }

  api="http://localhost:8080";
  public saveCustomer(customer:Customer):Observable<Customer>
  {
    return this.httpClient.post<Customer>(`${this.api}/insert`,customer);
  }

  public displayCustomers():Observable<Customer[]>
  {
    return this.httpClient.get<Customer[]>(`${this.api}/display`);
  }

  public deleteCustomer(id:number)
  {
    return this.httpClient.delete(`${this.api}/delete/${id}`);
  }

  public displayCustomerById(id:number){
    return this.httpClient.get<Customer>(`${this.api}/display/${id}`);
  }

  public updateCustomer(customer:Customer)
  {
    return this.httpClient.put<Customer>(`${this.api}/update`,customer);
  }

  public searchCustomersByName(name: string): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.api}/query`, { params: { name: name } });
  }
}
