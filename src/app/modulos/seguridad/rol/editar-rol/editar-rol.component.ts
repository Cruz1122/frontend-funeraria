import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RolModel } from 'src/app/modelos/rol.model';
import { RolService } from 'src/app/servicios/parametros/rol.service';

@Component({
  selector: 'app-editar-rol',
  templateUrl: './editar-rol.component.html',
  styleUrls: ['./editar-rol.component.css']
})
export class EditarRolComponent {
  fGroup: FormGroup = new FormGroup({});
  recordId: string = "";

  constructor(
    private fb: FormBuilder,
    private servicio: RolService,
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
      next: (datos: RolModel) => {
        this.obtenerFgDatos["id"].setValue(datos._id);
        this.obtenerFgDatos["nombre"].setValue(datos.nombre);
        this.obtenerFgDatos["comentarios"].setValue(datos.comentarios);
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
      comentarios: ['', [Validators.required]],
    });
  }

  EditarRegistro() {
    if (this.fGroup.invalid) {
      alert("Debe diligenciar todo el formulario.");
    } else {
      let model = this.obtenerRegistro();
      console.log(model);
      this.servicio.EditarRegistro(model).subscribe({
        next: (data: RolModel) => {
          alert("Información modificada correctamente");
          this.router.navigate(['/seguridad/rol-listar']);
        },
        error: (err: any) => {
          alert("Ha ocurrido un error");
        }
      })
    }
  }

  obtenerRegistro(): RolModel {
    let model = new RolModel();
    model._id = this.obtenerFgDatos["id"].value;
    model.nombre = this.obtenerFgDatos["nombre"].value;
    model.comentarios = this.obtenerFgDatos["comentarios"].value;
    return model;
}

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}
