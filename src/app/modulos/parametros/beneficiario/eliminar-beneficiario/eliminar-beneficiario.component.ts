import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BeneficiarioModel } from 'src/app/modelos/beneficiario.model';
import { BeneficiarioService } from 'src/app/servicios/parametros/beneficiario.service';

@Component({
  selector: 'app-eliminar-beneficiario',
  templateUrl: './eliminar-beneficiario.component.html',
  styleUrls: ['./eliminar-beneficiario.component.css']
})
export class EliminarBeneficiarioComponent {
  recordId: number = 0;
  nombres: String = '';
  apellidos: String = '';
  numeroDocumento: String = '';

  constructor(
    private servicio: BeneficiarioService,
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
      next: (datos: BeneficiarioModel) => {
        this.recordId = datos.id!;
        this.nombres = datos.nombres!;
        this.apellidos = datos.apellidos!;
        this.numeroDocumento = datos.numeroDocumento!;
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
        this.router.navigate(["/parametros/beneficiario-listar"]);
      },
      error: (err: any) => {
        alert("Ha ocurrido un error eliminando el registro.");
      }
    })
  }
}
