import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-registro-publico-usuarios',
  templateUrl: './registro-publico-usuarios.component.html',
  styleUrls: ['./registro-publico-usuarios.component.css']
})
export class RegistroPublicoUsuariosComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ) {
   }

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
        modoRecuperacionCuenta: ['', [Validators.required]]
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
        modoRecuperacionCuenta: campos['modoRecuperacionCuenta'].value
      };
      this.servicioSeguridad.RegistrarUsuarioPublico(datos).subscribe({        
        next: (respuesta:UsuarioModel) => {
          console.log(datos);
          alert("Registro correcto, se ha enviado un mensaje para validar su direccion de correo electronico")
        },
        error: (err) => {
          alert("Se ha producido un error en el registro.")
        }
        }); 
    }


    get ObtenerFormGroup() {
      return this.fGroup.controls;
    }
  }
