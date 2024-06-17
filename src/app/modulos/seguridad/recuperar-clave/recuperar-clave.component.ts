import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css'],
})
export class RecuperarClaveComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fGroup = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  isLoading = false;
  RecuperarClave() {
    this.isLoading = true;
    if (this.fGroup.invalid) {
      alert('Debe ingresar un correo válido');
      this.isLoading = false;
    } else {
      let correo = this.obtenerFormGroup['correo'].value;
      this.servicioSeguridad.RecuperarClavePorUsuario(correo).subscribe({
        next: (datos: UsuarioModel) => {
          alert(
            'Se ha enviado una nueva contraseña como mensaje de texto al número ' +
              datos.telefono +
              ' y al correo ' +
              datos.correo
          );
          this.router.navigate(['/seguridad/identificar-usuario']);
        },
        error: (err) => {
          alert('Ha ocurrido un error enviando la nueva contraseña');
          this.isLoading = false;
        },
      });
    }
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}
