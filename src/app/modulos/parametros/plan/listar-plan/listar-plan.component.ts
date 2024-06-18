import { Component } from '@angular/core';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { PlanModel } from 'src/app/modelos/plan.model';
import { ParametrosService } from 'src/app/servicios/parametros/plan.service';

@Component({
  selector: 'app-listar-plan',
  templateUrl: './listar-plan.component.html',
  styleUrls: ['./listar-plan.component.css']
})
export class ListarPlanComponent {
  listarPlanes: PlanModel[] = [];
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;
  BASE_URL: String = ConfiguracionRutasBackend.urlLogica;


  constructor(
    private servicioPlan: ParametrosService
  ) { 

  }

  ngOnInit(){
    this.ListarRegistros();
  }

  ListarRegistros() {
    this.servicioPlan.listarPlanesTodosPaginados(this.pag).subscribe({
      next:(datos) => {
        this.listarPlanes = datos.registros;
        this.total = datos.totalRegistros;
      },
      error:(err) => {
        alert('Error leyendo la informacion de los planes.');
      }
    })
  }
}
