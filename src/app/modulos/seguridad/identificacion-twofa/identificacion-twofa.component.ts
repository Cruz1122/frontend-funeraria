import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UsuarioValidadoModel } from 'src/app/modelos/usuario.validado.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-identificacion-twofa',
  templateUrl: './identificacion-twofa.component.html',
  styleUrls: ['./identificacion-twofa.component.css'],
})
export class IdentificacionTwofaComponent {
  idUsuario: string = '';
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private servicioSeguridad: SeguridadService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit() {
    let datos = this.servicioSeguridad.ObternetDatosUsuarioLS();
    if (datos != null) {
      this.idUsuario = datos._id!;
      this.construirFormulario();
    } else {
      this.router.navigate(['/seguridad/identificar-usuario']);
    }
  }

  construirFormulario() {
    this.fGroup = this.fb.group({
      codigo: ['', [Validators.required]],
    });
  }

  ValidarCodigo2fa() {
    if (this.fGroup.invalid) {
      alert('Debe ingresar el código');
    } else {
      let codigo2fa = this.obtenerFormGroup['codigo'].value;
      this.servicioSeguridad
        .ValidarCodigo2FA(this.idUsuario, codigo2fa)
        .subscribe({
          next: (datos: UsuarioValidadoModel) => {
            console.log(datos);
            if (datos.user) {
              this.servicioSeguridad.AlmacenarDatosUsuarioValidado(datos);
              this.router.navigate(['']);
            } else {
              alert('Código incorrecto');
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}
