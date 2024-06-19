import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogicaService } from 'src/app/servicios/logica.service';

@Component({
  selector: 'app-servicio-funerario',
  templateUrl: './servicio-funerario.component.html',
  styleUrls: ['./servicio-funerario.component.css'],
})
export class ServicioFunerarioComponent {
  constructor(private servicioLogica: LogicaService, private router: Router) {}

  ngOnInit() {}

  isLoading = false;
  solicitarServicio() {
    this.isLoading = true;
    setTimeout(() => {
      alert(
        'Servicio solicitado, revisa tu correo electrónico para ver más información'
      );
      this.isLoading = false;
      this.router.navigate(['/']);
    }, 3000);
  }

  generarNumeroAleatorioCuatroCifras(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }
}
