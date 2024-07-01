import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  searchCustomer(): void {
    if (this.search.trim()) {
      this.customerService.searchCustomersByName(this.search).subscribe(
        (res: Customer[]) => {
          this.dataSource = res;
          this.noRecordsFound = this.dataSource.length === 0;
        },
        (err: HttpErrorResponse) => {
          console.error('Error searching customers:', err);
          this.noRecordsFound = true; // Display "Not Found" message on error
        }
      );
    } else {
      this.displayCustomer();
    }
  }

  updateCustomer(id: number):void {
    this.router.navigate(['/customer',{id:id}]);
    
}


  deleteCustomer(id:number):void {
    console.log(id);
    this.customerService.deleteCustomer(id).subscribe(
      {
        next:(res)=>{
          this.displayCustomer();
        },
        error:(err:HttpErrorResponse) => {
          console.log(err);
        }
      });

    }


  dataSource:Customer[]=[];
  displayedColumns: string[] = ['id','email', 'name', 'phone', 'address', 'gender', 'department', 'skills','edit','delete'];

  search: string = '';
noRecordsFound: boolean = false;
  constructor(private customerService:CustomerService,private router:Router)
  {
    this.displayCustomer();
  }
  ngOnInit(): void 
  {
    
  }

  displayCustomer():void{
    this.customerService.displayCustomers().subscribe(
      {
        next:(res:Customer[]) => {
          this.dataSource=res;
        },
        error:(err:HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }
}
