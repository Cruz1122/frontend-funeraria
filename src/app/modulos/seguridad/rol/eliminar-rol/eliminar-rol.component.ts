import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolModel } from 'src/app/modelos/rol.model';
import { RolService } from 'src/app/servicios/parametros/rol.service';

@Component({
  selector: 'app-eliminar-rol',
  templateUrl: './eliminar-rol.component.html',
  styleUrls: ['./eliminar-rol.component.css']
})
export class EliminarRolComponent {
  recordId: string = "";
  nombre: String = '';
  comentarios: String = '';

  constructor(
    private servicio: RolService,
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
      next: (datos: RolModel) => {
        this.recordId = datos._id!;
        this.nombre = datos.nombre!;
        this.comentarios = datos.comentarios!;
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
        this.router.navigate(["/seguridad/rol-listar"]);
      },
      error: (err: any) => {
        alert("Ha ocurrido un error eliminando el registro.");
      }
    })
  }
}

