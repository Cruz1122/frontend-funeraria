import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/parametros/cliente.service';
import { ParametrosService } from 'src/app/servicios/parametros/plan.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicio: ClienteService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.ConstruirFormularioDatos();
  }

  ConstruirFormularioDatos() {
    this.fGroup = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert("Debe diligenciar todo el formulario.");
    } else {
      let model = this.obtenerRegistro();
      console.log(model);
      this.servicio.AgregarRegistro(model).subscribe({
        next: (data: ClienteModel) => {
          alert("Información almacenada correctamente");
          this.router.navigate(['/parametros/cliente-listar']);
        },
        error: (err: any) => {
          alert("Ha ocurrido un error");
        }
      })
    }
  }

  obtenerRegistro(): ClienteModel {
    let model = new ClienteModel();
    model.nombre = this.obtenerFgDatos["nombre"].value;
    model.apellidos = this.obtenerFgDatos["apellidos"].value;
    model.documento = this.obtenerFgDatos["documento"].value;
    model.estado = this.obtenerFgDatos["estado"].value;

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
}
