import { Component } from '@angular/core';
import { NavBar } from "../nav-bar/nav-bar";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-employees',
  imports: [NavBar, FormsModule],
  templateUrl: './add-employees.html',
  styleUrl: './add-employees.css',
})
export class AddEmployees {
  
  // Employee properties
  public employee = {
    name: '',
    email: '',
    age: null,
  };

  constructor(private http: HttpClient) {}

  // save function to send employee data to the backend
  saveEmployee() {
    console.log('Saving employee:', this.employee);

    this.http.post('http://localhost:8080/employee/save-obj', this.employee).subscribe({
      next : (response) => {
        console.log('Employee added successfully:', response);
        
        alert('Employee added successfully!');
        // Clear the form after successful submission
        this.employee = {
          name: '',
          email: '',
          age: null,
        };
      },
      error: (error) => {
        console.error('Error adding employee:', error);
        alert('Failed to add employee. Please try again.');
      }
    })
    }
}
