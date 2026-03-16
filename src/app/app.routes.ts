import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ViewEmployees } from './components/view-employees/view-employees';

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
    }
];
