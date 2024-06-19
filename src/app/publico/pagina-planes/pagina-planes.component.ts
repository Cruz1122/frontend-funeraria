import { Component } from '@angular/core';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { PlanModel } from 'src/app/modelos/plan.model';
import { UsuarioValidadoModel } from 'src/app/modelos/usuario.validado.model';
import { ParametrosService } from 'src/app/servicios/parametros/plan.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-pagina-planes',
  templateUrl: './pagina-planes.component.html',
  styleUrls: ['./pagina-planes.component.css'],
})
export class PaginaPlanesComponent {
  listaPlanes: PlanModel[] = [];
  BASE_URL: String = ConfiguracionRutasBackend.urlLogica;

  constructor(
    private servicioParametrizacion: ParametrosService,
    private servicioSeguridad: SeguridadService
  ) {}
  sesionActiva: boolean = false;

  ngOnInit() {
    this.servicioParametrizacion.listarPlanesTodos().subscribe({
      next: (datos) => {
        this.listaPlanes = datos;
      },
      error: (error) => {},
    });
    this.ValidarSesion();
  }

  ValidarSesion() {
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
      next: (datos: UsuarioValidadoModel) => {
        if (datos.token != '') {
          this.sesionActiva = true;
        } else {
          this.sesionActiva = false;
        }
      },
      error: (err: any) => {},
    });
  }
}
