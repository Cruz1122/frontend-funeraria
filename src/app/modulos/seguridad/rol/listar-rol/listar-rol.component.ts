import { Component } from '@angular/core';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { RolModel } from 'src/app/modelos/rol.model';
import { RolService } from 'src/app/servicios/parametros/rol.service';

@Component({
  selector: 'app-listar-rol',
  templateUrl: './listar-rol.component.html',
  styleUrls: ['./listar-rol.component.css']
})
export class ListarRolComponent {
  listarRoles: RolModel[] = [];
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;
  
  constructor(
    private servicio: RolService
  ) {

  }

  ngOnInit() {
    this.ListarRegistros();
  }

  ListarRegistros() {
    this.servicio.listarRegistro().subscribe({
      next: (datos) => {
        this.listarRoles = datos;
        console.log(this.listarRoles);
      },
      error: (err) => {
        alert('Error leyendo la informacion de los roles.');
      }
    })
  }
}
