import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-identificacion-twofa',
  templateUrl: './identificacion-twofa.component.html',
  styleUrls: ['./identificacion-twofa.component.css']
})
export class IdentificacionTwofaComponent {

  idUsuario: string = '';
  fGroup: FormGroup = new FormGroup({});


  constructor(
    private servicioSeguridad: SeguridadService,
    private fb: FormBuilder,
  ) {

  }
  ngOnInit() {
    let datos = this.servicioSeguridad.ObternetDatosUsuarioLS();
    if (datos != null) {
      this.idUsuario = datos._id!;
      this.construirFormulario();
    }
  }

  construirFormulario() {
    this.fGroup = this.fb.group({
      codigo: ['', [Validators.required]]
    });
  }

  ValidarCodigo2fa() {
    if (this.fGroup.invalid) {
      alert('Debe ingresar el código');
    } else {
      let codigo2fa = this.obtenerFormGroup['codigo'].value;
      this.servicioSeguridad.ValidarCodigo2FA(this.idUsuario, codigo2fa).subscribe({
        next: (datos:object) => {
          console.log(datos);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }

}
