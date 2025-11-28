import { Component } from '@angular/core';
import { Ficha } from '../../../../services/fichas.service';

@Component({
  selector: 'app-subir-archivo-home',
  templateUrl: './subir-archivo-home.component.html',
  styleUrls: ['./subir-archivo-home.component.scss']
})
export class SubirArchivoHomeComponent {

  // Fase del proceso
  faseActual: number = 1; 
  // 1 = subir archivo
  // 2 = completar fichas
  // 3 = finalizar proceso

  // Datos recibidos tras procesar el archivo
  fichas: Ficha[] = [];
  loteId: string = '';  // lo usaremos cuando integremos backend

  constructor() {}

  // =============================
  // MÉTODOS PARA CAMBIO DE FASES
  // =============================

  irAFase2(resultado: { fichas: Ficha[], loteId: string }) {
    this.fichas = resultado.fichas;
    this.loteId = resultado.loteId;
    this.faseActual = 2;
  }

  irAFase3() {
    this.faseActual = 3;
  }

  reiniciarProceso() {
  this.faseActual = 1;     // volvemos al inicio
  this.fichas = [];        // vaciar fichas
  this.loteId = '';        // limpiar lote
  }


}
