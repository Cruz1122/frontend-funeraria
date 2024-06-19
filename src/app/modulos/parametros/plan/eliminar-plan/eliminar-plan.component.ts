import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { PlanModel } from 'src/app/modelos/plan.model';
import { ParametrosService } from 'src/app/servicios/parametros/plan.service';

@Component({
  selector: 'app-eliminar-plan',
  templateUrl: './eliminar-plan.component.html',
  styleUrls: ['./eliminar-plan.component.css'],
})
export class EliminarPlanComponent {
  BASE_URL: String = ConfiguracionRutasBackend.urlLogica;
  recordId: number = 0;
  nombre: String = '';
  cantidadBeneficiarios: number = 0;
  detalles: String = '';
  precio: number = 0;
  foto: String = '';

  constructor(
    private servicio: ParametrosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recordId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.BuscarRegistro();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (datos: PlanModel) => {
        this.recordId = datos.id!;
        this.nombre = datos.nombre!;
        this.cantidadBeneficiarios = datos.cantidadBeneficiarios!;
        this.detalles = datos.detalles!;
        this.precio = datos.precio!;
        this.foto = datos.foto!;
      },
      error: (err: any) => {
        alert('El registro no existe.');
      },
    });
  }

  EliminarRegistro() {
    this.servicio.EliminarRegistro(this.recordId).subscribe({
      next: (data: any) => {
        alert('Información eliminada correctamente');
        this.router.navigate(['/parametros/plan-listar']);
      },
      error: (err: any) => {
        alert(
          'Ha ocurrido un error eliminando el registro. Comprueba que no esté enlazado en otras partes.'
        );
      },
    });
  }
}
