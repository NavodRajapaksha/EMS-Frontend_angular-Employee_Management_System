import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavBar } from "../nav-bar/nav-bar";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-employees',
  imports: [NavBar, RouterLink, CommonModule, FormsModule],
  templateUrl: './view-employees.html',
  styleUrl: './view-employees.css',
})
export class ViewEmployees implements OnInit {

  public employeeArray = signal<any[]>([]);
  public showModal = signal(false);
  public selectedEmployee: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:8080/employee/all').subscribe((data) => {
      this.employeeArray.set(data as any[]);
    });
  }

  // Modal open 
  openEditModal(employee: any): void {
    this.selectedEmployee = { ...employee }; // copy කරනවා
    this.showModal.set(true);
  }

  //Modal close
  closeModal(): void {
    this.showModal.set(false);
    this.selectedEmployee = {};
  }

  // Update function
  updateEmployee(): void {
    this.http.put('http://localhost:8080/employee/update', this.selectedEmployee).subscribe({
      next: (response: any) => {
        // Array \update and refresh
        this.employeeArray.set(
          this.employeeArray().map(emp =>
            emp.id === this.selectedEmployee.id ? this.selectedEmployee : emp
          )
        );
        this.closeModal();
        Swal.fire({
          title: 'Updated!',
          text: 'Employee updated successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: () => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update employee.',
          icon: 'error'
        });
      }
    });
  }

  // delete function 
  deleteEmployee(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This employee will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:8080/employee/by-id/${id}`, { responseType: 'text' }).subscribe({
          next: (response: any) => {
            if (!response.includes('not found')) {
              this.employeeArray.set(
                this.employeeArray().filter(emp => emp.id !== id)
              );
              Swal.fire({
                title: 'Deleted!',
                text: 'Employee has been deleted.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
              });
            } else {
              Swal.fire({
                title: 'Not Found!',
                text: 'Employee not found in database.',
                icon: 'error'
              });
            }
          },
          error: () => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete employee.',
              icon: 'error'
            });
          }
        });
      }
    });
  }
}