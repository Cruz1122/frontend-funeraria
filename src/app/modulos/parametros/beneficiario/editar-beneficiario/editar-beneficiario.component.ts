import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BeneficiarioModel } from 'src/app/modelos/beneficiario.model';
import { BeneficiarioService } from 'src/app/servicios/parametros/beneficiario.service';

@Component({
  selector: 'app-editar-beneficiario',
  templateUrl: './editar-beneficiario.component.html',
  styleUrls: ['./editar-beneficiario.component.css']
})
export class EditarBeneficiarioComponent {
  fGroup: FormGroup = new FormGroup({});
  recordId: number = 0;

  constructor(
    private fb: FormBuilder,
    private servicio: BeneficiarioService,
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
      next: (datos: BeneficiarioModel) => {
        this.obtenerFgDatos["id"].setValue(datos.id);
        this.obtenerFgDatos["nombres"].setValue(datos.nombres);
        this.obtenerFgDatos["apellidos"].setValue(datos.apellidos);
        this.obtenerFgDatos["numeroDocumento"].setValue(datos.numeroDocumento);
      },
      error: (err: any) => {
        alert("El registro no existe.");
      }
    })
  }

  ConstruirFormularioDatos() {
    this.fGroup = this.fb.group({
      id: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required]],
    });
  }

  EditarRegistro() {
    if (this.fGroup.invalid) {
      alert("Debe diligenciar todo el formulario.");
    } else {
      let model = this.obtenerRegistro();
      console.log(model);
      this.servicio.EditarRegistro(model).subscribe({
        next: (data: BeneficiarioModel) => {
          alert("Información modificada correctamente");
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
    model.id = parseInt(this.obtenerFgDatos["id"].value);
    model.nombres = this.obtenerFgDatos["nombres"].value;
    model.apellidos = this.obtenerFgDatos["apellidos"].value;
    model.numeroDocumento = this.obtenerFgDatos["numeroDocumento"].value;
    model.idEstadoBeneficiario = 1;
    model.idCliente = 201

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
