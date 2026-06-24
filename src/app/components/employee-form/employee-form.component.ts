import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="fieldset-card">
      <!-- Legend-style label like the wireframe -->
      <span class="fieldset-legend">Registro</span>
      <span class="component-tag">Componente</span>

      <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">

        <div class="field">
          <label for="numEmpleado">Num. Empleado:</label>
          <input id="numEmpleado" type="text" formControlName="numEmpleado"
                 placeholder="Ej. 5"
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

        <!-- Sexo + Agregar button row -->
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

          <button type="submit" class="btn-add" [disabled]="employeeForm.invalid">
            Agregar
          </button>
        </div>

      </form>
    </section>
  `,
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);

  employeeForm: FormGroup = this.fb.group({
    numEmpleado: ['', Validators.required],
    nombre:      ['', Validators.required],
    correo:      ['', [Validators.required, Validators.email]],
    telefono:    ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    sexo: ['', Validators.required]
  });

  isInvalid(field: string): boolean {
    const ctrl = this.employeeForm.get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.employeeService.addEmployee(this.employeeForm.value);
      this.employeeForm.reset();
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }
}
