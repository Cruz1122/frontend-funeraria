import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KEYS } from 'KEYS';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/servicios/shared.service';

@Component({
  selector: 'app-registro-publico-usuarios',
  templateUrl: './registro-publico-usuarios.component.html',
  styleUrls: ['./registro-publico-usuarios.component.css'],
})
export class RegistroPublicoUsuariosComponent {
  fGroup: FormGroup = new FormGroup({});
  siteKey: string = KEYS.GOOGLERECAPTCHA_SECRET_KEY; 


  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.ConstruirFormulario();
  }

  /**
   * Construccion del formulario con los controles
   */
  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      primerNombre: ['', [Validators.required, Validators.minLength(2)]],
      segundoNombre: ['', [Validators.minLength(2)]],
      primerApellido: ['', [Validators.required, Validators.minLength(2)]],
      segundoApellido: ['', [Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.email]],
      lugarResidencia: ['', [Validators.required]],
      telefono: ['', [Validators.minLength(9)]],
      modoRecuperacionCuenta: ['', [Validators.required]],
      recaptcha: ['', Validators.required]
    });
  }

  /**
   * Funcion de registro publico
   */
  Registrarse() {
    let campos = this.ObtenerFormGroup;
    let datos = {
      primerNombre: campos['primerNombre'].value,
      segundoNombre: campos['segundoNombre'].value,
      primerApellido: campos['primerApellido'].value,
      segundoApellido: campos['segundoApellido'].value,
      lugarResidencia: campos['lugarResidencia'].value,
      correo: campos['correo'].value,
      telefono: campos['telefono'].value,
      fechaCreacion: new Date(),
      modoRecuperacionCuenta: campos['modoRecuperacionCuenta'].value,
    };
    this.servicioSeguridad.RegistrarUsuarioPublico(datos).subscribe({
      next: (respuesta: UsuarioModel) => {
        console.log(datos);
        this.sharedService.changeData(datos);
        this.router.navigate(['/logica-de-negocio/pago']);
      },
      error: (err) => {
        alert('Se ha producido un error en el registro.');
      },
    });
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }
}
