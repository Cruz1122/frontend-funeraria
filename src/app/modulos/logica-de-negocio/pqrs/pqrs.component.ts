import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PqrsModel } from 'src/app/modelos/pqrs.model';
import { LogicaService } from 'src/app/servicios/logica.service';

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrls: ['./pqrs.component.css'],
})
export class PqrsComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private servicioLogica: LogicaService) {}

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      tipoUsuario: ['', [Validators.required]],
      documento: [
        '',
        [
          Validators.minLength(6),
          Validators.maxLength(10),
          Validators.required,
        ],
      ],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.minLength(9)]],
      asunto: ['', [Validators.required]],
      mensaje: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(300),
        ],
      ],
    });
  }

  EnviarPQRS() {
    let campos = this.ObtenerFormGroup;
    let datos = {
      tipoUsuario: campos['tipoUsuario'].value,
      documento: campos['documento'].value,
      nombres: campos['nombres'].value,
      apellidos: campos['apellidos'].value,
      email: campos['email'].value,
      telefono: campos['telefono'].value,
      asunto: campos['asunto'].value,
      mensaje: campos['mensaje'].value,
    };

    if (this.fGroup.invalid) {
      alert('Por favor, complete todos los campos');
      return;
    }
    
    this.servicioLogica.EnviarPQRS(datos).subscribe({
      next: (respuesta: PqrsModel) => {
        alert('PQRS enviada correctamente');
        this.fGroup.reset();
      },
      error: (err) => {
        alert('Se ha producido un error en el envío de la PQRS');
      },
    });
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }
}
