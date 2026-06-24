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
            @for (emp of svc.employees(); track emp.numEmpleado) {
              <tr [class.editing-row]="svc.editingEmployee()?.numEmpleado === emp.numEmpleado">
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
                <td class="actions-cell">
                  <button class="btn-edit" (click)="edit(emp)"
                          [disabled]="svc.editingEmployee()?.numEmpleado === emp.numEmpleado">
                    Editar
                  </button>
                  <button class="btn-del" (click)="delete(emp.numEmpleado)"
                          [disabled]="!!svc.editingEmployee()">
                    Eliminar
                  </button>
                </td>
              </tr>
            }
            @if (svc.employees().length === 0) {
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
  public svc = inject(EmployeeService);

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y?.slice(2)}`;
  }

  edit(emp: Employee) {
    this.svc.startEditing(emp);
    // Scroll suave al formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  delete(numEmpleado: string) {
    this.svc.deleteEmployee(numEmpleado);
  }
}
