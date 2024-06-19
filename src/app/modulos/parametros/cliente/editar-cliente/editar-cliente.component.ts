import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/parametros/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent {
  fGroup: FormGroup = new FormGroup({});
  recordId: number = 0;

  constructor(
    private fb: FormBuilder,
    private servicio: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recordId = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.ConstruirFormularioDatos();
    this.BuscarRegistro();
  }

  BuscarRegistro(){
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (datos: ClienteModel) => {
        this.obtenerFgDatos["id"].setValue(datos.id);
        this.obtenerFgDatos["nombre"].setValue(datos.nombre);
        this.obtenerFgDatos["apellidos"].setValue(datos.apellidos);
        this.obtenerFgDatos["documento"].setValue(datos.documento);
        this.obtenerFgDatos["estado"].setValue(datos.estado);
      },
      error: (err: any) => {
        alert("El registro no existe.");
      }
    })
  }

  ConstruirFormularioDatos() {
    this.fGroup = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });
  }

  EditarRegistro() {
    if (this.fGroup.invalid) {
      alert("Debe diligenciar todo el formulario.");
    } else {
      let model = this.obtenerRegistro();
      console.log(model);
      this.servicio.EditarRegistro(model).subscribe({
        next: (data: ClienteModel) => {
          alert("Información modificada correctamente");
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
    model.id = parseInt(this.obtenerFgDatos["id"].value);
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
