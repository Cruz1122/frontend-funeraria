import { Component } from '@angular/core';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { UsuarioValidadoModel } from 'src/app/modelos/usuario.validado.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css'],
})
export class EncabezadoComponent {
  constructor(private servicioSeguridad: SeguridadService) {}
  sesionActiva: boolean = false;
  admin: boolean = false;

  ngOnInit() {
    this.ValidarSesion();
  }

  ValidarSesion() {
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
      next: (datos: UsuarioValidadoModel) => {
        if (datos.token != '') {
          this.sesionActiva = true;
          this.VerificarPrivilegios();
        } else {
          this.sesionActiva = false;
        }
      },
      error: (err: any) => {},
    });
  }

  VerificarPrivilegios() {
    let idAdministrador = ConfiguracionRutasBackend.idAdministrador.toString();
    let idRolUsuario = this.servicioSeguridad.ObtenerUsuarioRol().toString();

    console.log(idRolUsuario + '/' + idAdministrador);
    
    if (idRolUsuario == idAdministrador) {
      console.log("Funciona");
      this.admin = true;
      return
    } else {
      console.log('No funciona');
      this.admin = false;
      return;
    }
  }
}
