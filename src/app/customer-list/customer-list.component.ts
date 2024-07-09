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
    // Check if the search input is not empty
    if (this.search.trim()) {
      // Call the customerService's searchCustomersByName method with the search input
      this.customerService.searchCustomersByName(this.search).subscribe(
        // Successful response handling
        (res: Customer[]) => {
          // Update dataSource with the search results
          this.dataSource = res;
          // Check if any records were returned
          this.noRecordsFound = this.dataSource.length === 0;
        },
        // Error handling
        (err: HttpErrorResponse) => {
          console.error('Error searching customers:', err);
          // Set noRecordsFound to true to display "Not Found" message
          this.noRecordsFound = true; 
        }
      );
    } else {
      // If search input is empty, display all customers
      this.displayCustomer();
    }
  }

  
  onDepartmentChange():void{
    this.customerService.displayCustomersByDepartment(this.selectedDepartment).subscribe(
      (data)=>{
        this.dataSource=data;
        //this.noRecordsFound = this.dataSource.length === 0;
      },
      (err)=>{
        console.error('Error searching customers:', err);
          // Set noRecordsFound to true to display "Not Found" message
          //this.noRecordsFound = true; 
      }
    );
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
  selectedDepartment:string='';
noRecordsFound: boolean = false;

// Function to display all customers when page is loaded
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
