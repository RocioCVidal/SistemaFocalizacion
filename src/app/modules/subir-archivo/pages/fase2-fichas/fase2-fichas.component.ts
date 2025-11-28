import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ficha } from '../../../../services/fichas.service';

@Component({
  selector: 'app-fase2-fichas',
  templateUrl: './fase2-fichas.component.html',
  styleUrls: ['./fase2-fichas.component.scss']
})
export class Fase2FichasComponent {

  @Input() fichas: Ficha[] = [];
  @Output() fichasCompletadas = new EventEmitter<void>();

  indiceActual = 0;

  // Campos del formulario
  d100 = '';
  cse = '';

  fichaGuardada = false;

  constructor() {}

  get fichaActual(): Ficha {
    return this.fichas[this.indiceActual];
  }

  guardarFicha() {
    if (!this.d100 || !this.cse) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Guardamos datos en la ficha actual
    (this.fichaActual as any).d100 = this.d100;
    (this.fichaActual as any).cse = this.cse;
    (this.fichaActual as any).completada = true;

    this.fichaGuardada = true;

    // 📌 Si esta es la última ficha → pasamos a Fase 3 automáticamente
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
