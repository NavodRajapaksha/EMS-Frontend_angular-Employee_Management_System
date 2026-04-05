# EMS Frontend — Employee Management System

A responsive Angular frontend for an Employee Management System, connected to a Spring Boot backend API for seamless employee data management.

## 🛠️ Built With

- Angular 21
- TypeScript
- Bootstrap 5
- Bootstrap Icons
- SweetAlert2
- RxJS

## ✨ Features

- View all employees in a searchable table
- Add new employees via a form
- Edit employee details with an inline modal
- Delete employees with confirmation dialog
- SweetAlert2 notifications for all actions
- Responsive navbar with active route highlighting

## 📋 Prerequisites

- Node.js
- npm
- Angular CLI
- EMS Spring Boot backend running on `http://localhost:8080`

## ⚙️ Setup & Installation

1. Clone the repository
```bash
   git clone https://github.com/NavodRajapaksha/EMS-Frontend_angular-Employee_Management_System.git
```

2. Install dependencies
```bash
   npm install
```

3. Run the development server
```bash
   ng serve
```

4. Open your browser at `http://localhost:4200`

## 📡 API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employee/all` | Get all employees |
| POST | `/employee/save-obj` | Add a new employee |
| PUT | `/employee/update` | Update an employee |
| DELETE | `/employee/by-id/{id}` | Delete an employee |

## 🔗 Backend Repository

[EMS Spring Boot Backend](https://github.com/NavodRajapaksha/EMS_Springboot-simple_Employee_management_System)

## 📬 Contact

- LinkedIn: [Navod Rajapaksha](https://www.linkedin.com/in/navod-rajapaksha/)
- GitHub: [NavodRajapaksha](https://github.com/NavodRajapaksha)
