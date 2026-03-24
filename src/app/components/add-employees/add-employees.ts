import { Component } from '@angular/core';
import { NavBar } from "../nav-bar/nav-bar";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employees',
  imports: [NavBar, FormsModule, RouterLink],
  templateUrl: './add-employees.html',
  styleUrl: './add-employees.css',
})
export class AddEmployees {

  public employee = {
    name: '',
    email: '',
    age: null,
  };

  constructor(private http: HttpClient) {}

  saveEmployee() {
    this.http.post('http://localhost:8080/employee/save-obj', this.employee).subscribe({
      next: (response) => {
        console.log('Employee added successfully:', response);
        this.employee = { name: '', email: '', age: null };
        Swal.fire({
          title: 'Success!',
          text: 'Employee added successfully!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (error) => {
        console.error('Error adding employee:', error);
        Swal.fire({
          title: 'Error!',
          text: error.error?.Message || 'Failed to add employee. Please try again.',
          icon: 'error'
        });
      }
    });
  }
}