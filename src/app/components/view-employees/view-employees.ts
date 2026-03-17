import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavBar } from "../nav-bar/nav-bar";

@Component({
  selector: 'app-view-employees',
  imports: [NavBar],
  templateUrl: './view-employees.html',
  styleUrl: './view-employees.css',
})
export class ViewEmployees implements OnInit {

  public employeeArray: any[] = [];

  constructor(private http: HttpClient) {
    console.log('ViewEmployees component initialized');
   }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/employee/all').subscribe((data) =>{
      this.employeeArray = data as any[];
      console.log('Employee data fetched:', this.employeeArray);
    })
  }

}
