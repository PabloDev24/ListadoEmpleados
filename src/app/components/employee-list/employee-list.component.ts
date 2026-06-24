import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="list-card">
      <div class="table-wrap">
        <table class="emp-table">
          <thead>
            <tr>
              <th class="col-num">Num <span class="arr">▲</span></th>
              <th>Nombre <span class="arr">▲</span></th>
              <th>Correo <span class="arr">▲</span></th>
              <th>Teléfono <span class="arr">▲</span></th>
              <th>Fecha Nacimiento <span class="arr">▲</span></th>
              <th>Sexo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (emp of employeeService.employees(); track emp.numEmpleado) {
              <tr>
                <td class="col-num">{{ emp.numEmpleado }}</td>
                <td class="fw-medium">{{ emp.nombre }}</td>
                <td class="muted">{{ emp.correo }}</td>
                <td>{{ emp.telefono }}</td>
                <td>{{ formatDate(emp.fechaNacimiento) }}</td>
                <td>
                  <span class="gender-pill"
                    [class.male]="emp.sexo === 'Masculino'"
                    [class.female]="emp.sexo === 'Femenino'">
                    {{ emp.sexo }}
                  </span>
                </td>
                <td>
                  <button class="btn-del" (click)="delete(emp.numEmpleado)">
                    Eliminar
                  </button>
                </td>
              </tr>
            }
            @if (employeeService.employees().length === 0) {
              <tr>
                <td colspan="7" class="empty-row">Sin empleados registrados.</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <div class="card-footer">
        <span class="component-tag">Componente</span>
      </div>
    </div>
  `,
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  public employeeService = inject(EmployeeService);

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y?.slice(2)}`;
  }

  delete(numEmpleado: string) {
    this.employeeService.deleteEmployee(numEmpleado);
  }
}
