import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../modelos/usuario.model';
import { NgxCaptchaModule } from 'ngx-captcha';
import { KEYS } from 'KEYS';

@Component({
  selector: 'app-componente-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxCaptchaModule,
  ],
  templateUrl: './componente-chat.component.html',
  styleUrls: ['./componente-chat.component.css'],
})
export class ComponenteChatComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  siteKey: string = KEYS.GOOGLERECAPTCHA_SECRET_KEY;

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) {}

  captchaSiteKey = this.servicioSeguridad.captchaSiteKey;

  ngOnInit() {
    this.ConstruirFormulario();
  }

  /**
   * Construcción del formulario
   */
  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(2)]],
      codigo: ['', [Validators.minLength(5)]],
      recaptcha: ['', Validators.required],
    });
  }

  /**
   * Función de acceso a la sala
   */
  Registrarse() {
    if (this.fGroup.invalid) {
      alert('Debe completar todos los campos requeridos.');
      return;
    }
    let campos = this.ObtenerFormGroup;
    let datos = {
      nombreUsuario: campos['nombreUsuario'].value,
      codigo: campos['codigo'].value,
    };

    this.servicioSeguridad.VerificarSalaChat(datos.codigo).subscribe(
      (response) => {
        if (response.exists == true) {
          // Store the data in the local storage
          this.servicioSeguridad.AlmacenarDatosChat(
            datos.codigo,
            datos.nombreUsuario
          );
          alert('Bienvenido a la sala de chat');
          this.router.navigate(['/chat/entradamensaje']);
        } else {
          alert('El código de la sala de chat no existe.');
        }
      },
      (error) => {
        console.error('Error al verificar la sala de chat:', error);
        alert(
          'Error al verificar la sala de chat. Inténtelo de nuevo más tarde.'
        );
      }
    );
  }

  handleReset() {
    console.log('reCAPTCHA reset');
  }

  handleExpire() {
    console.log('reCAPTCHA expired');
  }

  handleLoad() {
    console.log('reCAPTCHA loaded');
  }

  handleSuccess(token: string) {
    this.fGroup.get('recaptcha')!.setValue(token);
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }
}
