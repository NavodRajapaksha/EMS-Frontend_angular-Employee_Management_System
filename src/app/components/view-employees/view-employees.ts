import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavBar } from "../nav-bar/nav-bar";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-employees',
  imports: [NavBar, RouterLink, CommonModule],
  templateUrl: './view-employees.html',
  styleUrl: './view-employees.css',
})
export class ViewEmployees implements OnInit {

  public employeeArray = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:8080/employee/all').subscribe((data) => {
      this.employeeArray.set(data as any[]);
      console.log('Employee data fetched:', this.employeeArray());
    });
  }
}