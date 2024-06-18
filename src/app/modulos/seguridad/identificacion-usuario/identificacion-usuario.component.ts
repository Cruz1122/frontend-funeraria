import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { MD5 } from 'crypto-js';
import { Router } from '@angular/router';
import { KEYS } from 'KEYS';

@Component({
  selector: 'app-identificacion-usuario',
  templateUrl: './identificacion-usuario.component.html',
  styleUrls: ['./identificacion-usuario.component.css'],
})
export class IdentificacionUsuarioComponent {
  fGroup: FormGroup = new FormGroup({});
  siteKey: string = KEYS.GOOGLERECAPTCHA_SECRET_KEY; 

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]],
      recaptcha: ['', Validators.required]
    });
  }

  isLoading = false;
  IdentificarUsuario() {
    this.isLoading = true;
    if (this.fGroup.invalid) {
      alert('Datos invalidos');
    } else {
      let usuario = this.obtenerFormGroup['usuario'].value;
      let clave = this.obtenerFormGroup['clave'].value;
      let claveCifrada = MD5(clave).toString();

      this.servicioSeguridad
        .IdentificarUsuario(usuario, claveCifrada)
        .subscribe({
          next: (datos: UsuarioModel) => {
            if (datos._id == undefined || datos._id == null) {
              this.isLoading = false;
              alert(
                'Credenciales incorrectas o falta la validación del correo electrónico'
              );
            } else {
              if (
                this.servicioSeguridad.AlmacenarDatosUsuarioIdentificado(datos)
              ) {
                console.log(datos);
                this.router.navigate(['/seguridad/2fa']);
              }
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.log(err);
          },
        });
    }
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }

  
}
