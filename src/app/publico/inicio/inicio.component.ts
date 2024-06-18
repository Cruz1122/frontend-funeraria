import { Component } from '@angular/core';
import { PlanModel } from 'src/app/modelos/plan.model';
import { ParametrosService } from 'src/app/servicios/parametros/plan.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  listaPlanes: PlanModel[] = [];

  constructor(
    private servicio: ParametrosService,
  ) {

  }

  ngOnInit(){
    this.servicio.listarPlanes().subscribe({
      next: (datos) => {
        this.listaPlanes = datos;
      },
      error: (error) => {
        
      }
    });
  }
}
