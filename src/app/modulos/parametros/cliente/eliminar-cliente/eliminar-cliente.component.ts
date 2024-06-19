import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/parametros/cliente.service';

@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.css']
})
export class EliminarClienteComponent {
  recordId: number = 0;
  nombre: String = '';
  apellidos: String = '';
  estado: String = '';

  constructor(
    private servicio: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recordId = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.BuscarRegistro();
  }

  BuscarRegistro(){
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (datos: ClienteModel) => {
        this.recordId = datos.id!;
        this.nombre = datos.nombre!;
        this.apellidos = datos.apellidos!;
        this.estado = datos.estado!;
      },
      error: (err: any) => {
        alert("El registro no existe.");
      }
    })
  }

  EliminarRegistro(){
    this.servicio.EliminarRegistro(this.recordId).subscribe({
      next: (data: any) => {
        alert("Información eliminada correctamente.");
        this.router.navigate(["/parametros/cliente-listar"]);
      },
      error: (err: any) => {
        alert("Ha ocurrido un error eliminando el registro.");
      }
    })
  }
}
