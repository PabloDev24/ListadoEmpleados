import { Injectable, signal } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesSignal = signal<Employee[]>([
    {
      numEmpleado: '1',
      nombre: 'Eduardo Contreras',
      correo: 'eduardo@gmail.com',
      telefono: '477837465',
      fechaNacimiento: '2000-03-12',
      sexo: 'Masculino'
    },
    {
      numEmpleado: '2',
      nombre: 'Ana Torres',
      correo: 'ana@gmail.com',
      telefono: '477093615',
      fechaNacimiento: '2003-02-10',
      sexo: 'Femenino'
    },
    {
      numEmpleado: '3',
      nombre: 'Diana Medina',
      correo: 'diana@gmail.com',
      telefono: '478937482',
      fechaNacimiento: '2002-06-03',
      sexo: 'Femenino'
    },
    {
      numEmpleado: '4',
      nombre: 'Fernando Platas',
      correo: 'fernando@gmail.com',
      telefono: '4770293847',
      fechaNacimiento: '2006-04-07',
      sexo: 'Masculino'
    }
  ]);

  private editingEmployeeSignal = signal<Employee | null>(null);

  get employees() {
    return this.employeesSignal.asReadonly();
  }

  get editingEmployee() {
    return this.editingEmployeeSignal.asReadonly();
  }

  addEmployee(employee: Employee) {
    this.employeesSignal.update(list => [...list, employee]);
  }

  updateEmployee(updated: Employee) {
    this.employeesSignal.update(list =>
      list.map(emp => emp.numEmpleado === updated.numEmpleado ? updated : emp)
    );
    this.clearEditing();
  }

  deleteEmployee(numEmpleado: string) {
    this.employeesSignal.update(list =>
      list.filter(emp => emp.numEmpleado !== numEmpleado)
    );
  }

  startEditing(employee: Employee) {
    this.editingEmployeeSignal.set(employee);
  }

  clearEditing() {
    this.editingEmployeeSignal.set(null);
  }
}
