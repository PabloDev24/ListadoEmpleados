import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, EmployeeFormComponent, EmployeeListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
