import { Component } from '@angular/core';
import { NavBar } from "../nav-bar/nav-bar";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router'; // Added Router to navigate after saving
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

  // Injecting Router to redirect user after successful save
  constructor(private http: HttpClient, private router: Router) {}

  saveEmployee() {
    // 1. Email validation regex pattern
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    // 2. Check if the email field matches the pattern
    if (!this.employee.email || !emailPattern.test(this.employee.email.toLowerCase())) {
      Swal.fire({
        title: 'Invalid Email!',
        text: 'Please enter a valid email address (e.g., user@example.com)',
        icon: 'warning'
      });
      return; // Stop execution if email is invalid
    }

    // 3. Send data to backend only if validation passes
    this.http.post('http://localhost:8080/employee/save-obj', this.employee).subscribe({
      next: (response) => {
        console.log('Employee added successfully:', response);
        
        // Reset form fields
        this.employee = { name: '', email: '', age: null };

        Swal.fire({
          title: 'Success!',
          text: 'Employee added successfully!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });

        // Optional: Navigate back to the employee list
        this.router.navigate(['/view-employees']);
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