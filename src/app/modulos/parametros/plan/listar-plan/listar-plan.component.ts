import { Component } from '@angular/core';
import { PlanModel } from 'src/app/modelos/plan.model';
import { ParametrosService } from 'src/app/servicios/parametros/plan.service';

@Component({
  selector: 'app-listar-plan',
  templateUrl: './listar-plan.component.html',
  styleUrls: ['./listar-plan.component.css']
})
export class ListarPlanComponent {
listarPlanes: PlanModel[] = [];

  constructor(
    private servicioPlan: ParametrosService
  ) { 

  }

  ngOnInit(){
    this.servicioPlan.listarPlanesTodos().subscribe({
      next:(datos) => {
        this.listarPlanes = datos;
      },
      error:(err) => {
        alert('Error leyendo la informacion de los planes.');
      }
    })
  }
}
