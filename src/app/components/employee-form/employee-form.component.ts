import { Component, inject, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="fieldset-card" [class.edit-mode]="isEditing()">
      <!-- Legend-style label -->
      <span class="fieldset-legend">{{ isEditing() ? 'Editar Empleado' : 'Registro' }}</span>
      <span class="component-tag">Componente</span>

      <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">

        <div class="field">
          <label for="numEmpleado">Num. Empleado:</label>
          <input id="numEmpleado" type="text" formControlName="numEmpleado"
                 placeholder="Ej. 5"
                 [readonly]="isEditing()"
                 [class.readonly]="isEditing()"
                 [class.invalid]="isInvalid('numEmpleado')">
        </div>

        <div class="field">
          <label for="nombre">Nombre:</label>
          <input id="nombre" type="text" formControlName="nombre"
                 placeholder="Ej. Juan Pérez"
                 [class.invalid]="isInvalid('nombre')">
        </div>

        <div class="field">
          <label for="correo">Correo:</label>
          <input id="correo" type="email" formControlName="correo"
                 placeholder="Ej. juan@gmail.com"
                 [class.invalid]="isInvalid('correo')">
        </div>

        <div class="field">
          <label for="telefono">Teléfono:</label>
          <input id="telefono" type="tel" formControlName="telefono"
                 placeholder="Ej. 5551234567"
                 [class.invalid]="isInvalid('telefono')">
        </div>

        <div class="field">
          <label for="fechaNacimiento">Fecha de Nacimiento:</label>
          <input id="fechaNacimiento" type="date" formControlName="fechaNacimiento"
                 [class.invalid]="isInvalid('fechaNacimiento')">
        </div>

        <!-- Sexo + botones -->
        <div class="bottom-row">
          <div class="radio-group">
            <label class="radio-label-title">Sexo:</label>
            <div class="radio-opts">
              <label class="radio-opt">
                <input type="radio" formControlName="sexo" value="Masculino">
                <span class="radio-circle"></span>
                Masculino
              </label>
              <label class="radio-opt">
                <input type="radio" formControlName="sexo" value="Femenino">
                <span class="radio-circle"></span>
                Femenino
              </label>
            </div>
          </div>

          <div class="action-btns">
            @if (isEditing()) {
              <button type="button" class="btn-cancel" (click)="cancelEdit()">
                Cancelar
              </button>
            }
            <button type="submit" class="btn-add" [class.btn-save]="isEditing()"
                    [disabled]="employeeForm.invalid">
              {{ isEditing() ? 'Guardar' : 'Agregar' }}
            </button>
          </div>
        </div>

      </form>
    </section>
  `,
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  private fb = inject(FormBuilder);
  private svc = inject(EmployeeService);

  employeeForm: FormGroup = this.fb.group({
    numEmpleado:     ['', Validators.required],
    nombre:          ['', Validators.required],
    correo:          ['', [Validators.required, Validators.email]],
    telefono:        ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    sexo:            ['', Validators.required]
  });

  isEditing = this.svc.editingEmployee;

  constructor() {
    // Cuando el servicio emite un empleado a editar, rellenar el formulario
    effect(() => {
      const emp = this.svc.editingEmployee();
      if (emp) {
        this.employeeForm.setValue({
          numEmpleado:     emp.numEmpleado,
          nombre:          emp.nombre,
          correo:          emp.correo,
          telefono:        emp.telefono,
          fechaNacimiento: emp.fechaNacimiento,
          sexo:            emp.sexo
        });
      } else {
        this.employeeForm.reset();
      }
    });
  }

  isInvalid(field: string): boolean {
    const ctrl = this.employeeForm.get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }
    if (this.svc.editingEmployee()) {
      this.svc.updateEmployee(this.employeeForm.value);
    } else {
      this.svc.addEmployee(this.employeeForm.value);
      this.employeeForm.reset();
    }
  }

  cancelEdit() {
    this.svc.clearEditing();
  }
}
