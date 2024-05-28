import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogicaService } from 'src/app/servicios/logica.service';
import { PagoModel } from 'src/app/modelos/pago.model';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
})
export class PagoComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private servicioLogica: LogicaService) {}

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario() {
    this.fb.group({
      numeroTarjeta: ['', [Validators.required, this.validarTarjeta]],
      nombreTitular: ['', [Validators.required]],
      mes: ['', [Validators.required]],
      ano: ['', [Validators.required]],
      cvc: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      plan: ['', [Validators.required]]
    });
  }

  RealizarPago() {}

  validarTarjeta(cardNumber: string): boolean {
    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));

      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 == 0;
  }
}
