import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fase3-finalizar',
  templateUrl: './fase3-finalizar.component.html',
  styleUrls: ['./fase3-finalizar.component.scss']
})
export class Fase3FinalizarComponent {

  @Input() loteId: string = '';

  @Output() procesoFinalizado = new EventEmitter<void>();

  mensaje = '';
  finalizado = false;
  cargando = false;

  constructor() {}

  finalizarProceso() {
  this.cargando = true;
  this.mensaje = '';

  setTimeout(() => {
    // 1) Mostrar mensaje final exitoso
    this.cargando = false;
    this.finalizado = true;
    this.mensaje = '✔ El proceso se ha registrado correctamente.';

    // 2) Esperar 2 segundos antes de volver al inicio
    setTimeout(() => {
      this.procesoFinalizado.emit();
    }, 2000);

  }, 1200);
}


}
