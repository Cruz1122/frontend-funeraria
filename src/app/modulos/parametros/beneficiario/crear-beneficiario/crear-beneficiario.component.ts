import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BeneficiarioModel } from 'src/app/modelos/beneficiario.model';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { BeneficiarioService } from 'src/app/servicios/parametros/beneficiario.service';

@Component({
  selector: 'app-crear-beneficiario',
  templateUrl: './crear-beneficiario.component.html',
  styleUrls: ['./crear-beneficiario.component.css']
})
export class CrearBeneficiarioComponent {
  fGroup: FormGroup = new FormGroup({});
  idCliente: number = 0;
  
  datosUsuario: UsuarioModel = new UsuarioModel();
  cliente: ClienteModel = new ClienteModel();

  constructor(
    private fb: FormBuilder,
    private servicio: BeneficiarioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.datosUsuario = this.getDatosUsuario();
    console.log(this.datosUsuario.correo);
    this.idCliente = this.obtenerIdCliente(this.datosUsuario.correo);
    this.ConstruirFormularioDatos();
    
  }

  ConstruirFormularioDatos() {
    this.fGroup = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required]],
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert("Debe diligenciar todo el formulario.");
    } else {
      let model = this.obtenerRegistro();
      console.log(model);
      this.servicio.AgregarRegistro(model).subscribe({
        next: (data: BeneficiarioModel) => {
          alert("Información almacenada correctamente");
          this.router.navigate(['/parametros/beneficiario-listar']);
        },
        error: (err: any) => {
          alert("Ha ocurrido un error");
        }
      })
    }
  }

  obtenerRegistro(): BeneficiarioModel {
    let model = new BeneficiarioModel();
    model.nombres = this.obtenerFgDatos["nombres"].value;
    model.apellidos = this.obtenerFgDatos["apellidos"].value;
    model.numeroDocumento = this.obtenerFgDatos["numeroDocumento"].value;
    model.idCliente = 201
    model.idEstadoBeneficiario = 1
    let fecha = new Date();
    let fechaFormato = fecha.getFullYear() + '-' + 
        ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + 
        ('0' + fecha.getDate()).slice(-2) + ' ' + 
        ('0' + fecha.getHours()).slice(-2) + ':' + 
        ('0' + fecha.getMinutes()).slice(-2) + ':' + 
        ('0' + fecha.getSeconds()).slice(-2);

    model.fechaRegistro = fechaFormato;
    return model;
}

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }

  getDatosUsuario() {
    const datosUsuario = localStorage.getItem('datos-usuario');
    return datosUsuario ? JSON.parse(datosUsuario) : null;
  }

  obtenerIdCliente(correo: string | undefined): number {
    if (correo) {
      this.servicio.ObtenerIdCliente(correo).subscribe({
        next:(datos) => {
          this.cliente = datos;
          console.log(this.cliente.id);
          return this.cliente.id;
        },
        error:(err) => {
          alert('Error leyendo la informacion del Cliente.');
        }
      })
    }
    console.log("Entro");
    return 0;
  }
}