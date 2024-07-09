import { CustomerService } from './../customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-list-ngfor',
  templateUrl: './customer-list-ngfor.component.html',
  styleUrls: ['./customer-list-ngfor.component.css']
})

export class CustomerListNgforComponent implements OnInit {
  customers: any[] = [];

  constructor(private customerService: CustomerService) { }
  ngOnInit(): void {
    this.displayCustomer();
  }

  displayCustomer():void {
    this.customerService.displayCustomers().subscribe((res: any) => {
      this.customers = res;
    });
  }
}