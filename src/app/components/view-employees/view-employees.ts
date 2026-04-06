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
  private allEmployees: any[] = []; // Temporary storage for all records to support frontend filtering
  public showModal = signal(false);
  public selectedEmployee: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  // Fetch all employees from backend
  fetchEmployees(): void {
    this.http.get('http://localhost:8080/employee/all').subscribe((data) => {
      const employees = data as any[];
      this.allEmployees = employees; // Store original data
      this.employeeArray.set(employees); // Set data for the table view
    });
  }

  // Frontend search logic (Filters as you type)
  searchByEmail(searchText: string): void {
    const term = searchText.toLowerCase().trim();

    if (!term) {
      // If search is empty, restore the original list
      this.employeeArray.set(this.allEmployees);
      return;
    }

    // Filter local array based on name or email
    const filtered = this.allEmployees.filter(emp => 
      emp.email.toLowerCase().includes(term) || 
      emp.name.toLowerCase().includes(term)
    );

    this.employeeArray.set(filtered);
  }

  // Open Edit Modal
  openEditModal(employee: any): void {
    this.selectedEmployee = { ...employee }; // Create a shallow copy to avoid direct mutation
    this.showModal.set(true);
  }

  // Close Modal
  closeModal(): void {
    this.showModal.set(false);
    this.selectedEmployee = {};
  }

  // Update employee details
  updateEmployee(): void {
    this.http.put('http://localhost:8080/employee/update', this.selectedEmployee).subscribe({
      next: () => {
        // Update both the display signal and the original storage array
        const updatedList = this.allEmployees.map(emp =>
          emp.id === this.selectedEmployee.id ? { ...this.selectedEmployee } : emp
        );
        this.allEmployees = updatedList;
        this.employeeArray.set(updatedList);
        
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

  // Delete employee from database and UI
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
              // Filter out the deleted employee from both arrays
              this.allEmployees = this.allEmployees.filter(emp => emp.id !== id);
              this.employeeArray.set(this.allEmployees);

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