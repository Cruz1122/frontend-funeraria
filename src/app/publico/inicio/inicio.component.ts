import { Component } from '@angular/core';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { PlanModel } from 'src/app/modelos/plan.model';
import { ParametrosService } from 'src/app/servicios/parametros/plan.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  listaPlanes: PlanModel[] = [];
  BASE_URL: String = ConfiguracionRutasBackend.urlLogica;

  constructor(private servicio: ParametrosService) {}

  ngOnInit() {
    this.servicio.listarPlanes().subscribe({
      next: (datos) => {
        this.listaPlanes = datos;
      },
      error: (error) => {},
    });
  }
}
