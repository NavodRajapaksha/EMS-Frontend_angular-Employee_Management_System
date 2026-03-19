import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ViewEmployees } from './components/view-employees/view-employees';
import { AddEmployees } from './components/add-employees/add-employees';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home'
    },
    {
        path: 'home',
        component: Home,
        title: 'Home'
    },
    {
        path: 'view-employees',
        component: ViewEmployees,
        title: 'View Employees'
    },
    {
        path: 'add-employees',
        component: AddEmployees,
        title: 'Add Employee'
    }
];
