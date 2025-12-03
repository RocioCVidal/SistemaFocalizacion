import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ficha, FichasService } from '../../../../services/fichas.service';

@Component({
  selector: 'app-fase2-fichas',
  templateUrl: './fase2-fichas.component.html',
  styleUrls: ['./fase2-fichas.component.scss']
})
export class Fase2FichasComponent {

  @Input() fichas: Ficha[] = [];
  @Output() fichasCompletadas = new EventEmitter<void>();

  indiceActual = 0;

  d100 = '';
  cse = '';
  fichaGuardada = false;

  constructor(private fichasService: FichasService) {}

  get fichaActual(): Ficha {
    return this.fichas[this.indiceActual];
  }

  validarD100(valor: string): boolean {
    return /^[0-9]{7}$/.test(valor);
  }

  guardarFicha() {

    if (!this.d100 || !this.cse) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (!this.validarD100(this.d100)) {
      alert("El D100 debe tener exactamente 7 dígitos numéricos.");
      return;
    }

    const payload = {
      numero_fsu: this.fichaActual.numero_fsu,
      d100: this.d100,
      cse: this.cse
    };

    // Llamada al backend para guardar en SQL Server
    this.fichasService.guardarFicha(payload).subscribe({
      next: () => {
        // Guardamos datos localmente
        this.fichaActual.d100 = this.d100;
        this.fichaActual.cse = this.cse;
        this.fichaActual.completada = true;

        this.fichaGuardada = true;
      },
      error: (err) => {
        console.error(err);
        alert("Error al guardar en la base de datos.");
      }
    });

    // Si es la última ficha, pasamos a la fase final
    const esUltima = this.indiceActual === this.fichas.length - 1;
    if (esUltima) {
      this.fichasCompletadas.emit();
    }
  }

  siguienteFicha() {
    if (!this.fichaGuardada) return;

    this.indiceActual++;

    this.d100 = '';
    this.cse = '';
    this.fichaGuardada = false;
  }
}
