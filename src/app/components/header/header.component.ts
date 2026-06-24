import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header-card">
      <h1 class="header-title">Listado de Empleados Angular</h1>
      <span class="component-tag">Componente</span>
    </header>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {}
