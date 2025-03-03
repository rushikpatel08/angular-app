import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerService } from './../customer.service';
import { NgForm } from '@angular/forms';
import { Customer } from './../customer.model';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  isCreateCustomer: boolean = true;

  customer: any;

  requirement: String[] = [];
  constructor(private CustomerService: CustomerService, private Router: Router, private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {

    this.customer = this.activatedRoute.snapshot.data['customer'];
    console.log(this.customer);
    if (this.customer && this.customer.id > 0) {
      this.isCreateCustomer = false;
      if (this.customer.skills != '') {
        this.requirement = [];
        this.requirement = this.customer.skills.split(',');
      }
    }
    else {
      this.isCreateCustomer = true;
    }
  }

  selectedGender(gender: string): void {
    this.customer.gender = gender;
  }

  onskillsChanges($event: any): void {

    if ($event.checked) {

      this.requirement.push($event.source.value);
    }
    else {
      this.requirement.forEach(
        (item, index) => {
          if (item === $event.source.value) {
            this.requirement.splice(index, 1);
          }
        }
      );
    }
    this.customer.skills = this.requirement.toString();
  }

  saveCustomer(customerForm: NgForm): void {
    if (this.isCreateCustomer) {
      this.customer.id = null; // Ensure the backend doesn't receive '0' or an invalid ID

      this.CustomerService.saveCustomer(this.customer).subscribe(
        {
          next: (res: Customer) => {

            //alert("Customer Saved Successfully");
            customerForm.reset();
            this.customer.gender = '';
            this.customer.skills = '';
            this.requirement = [];
            this.Router.navigate(['/customer-list']);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        }
      );
    }
    else {
      this.CustomerService.updateCustomer(this.customer).subscribe(
        {
          next: (res: Customer) => {
            this.Router.navigate(['/customer-list']);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        }
      );
    }

  }

  checkSkills(skill: string) {
    return this.customer.skills != null && this.customer.skills.includes(skill);
  }

  checkGender(genders: string) {
    return this.customer.gender != null && this.customer.gender == genders;
  }

}
