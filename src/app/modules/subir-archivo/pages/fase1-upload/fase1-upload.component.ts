import { Component, EventEmitter, Output } from '@angular/core';
import { Ficha } from '../../../../services/fichas.service';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-fase1-upload',
  templateUrl: './fase1-upload.component.html',
  styleUrls: ['./fase1-upload.component.scss']
})
export class Fase1UploadComponent {

  archivo: File | null = null;
  cargando = false;
  mensaje = '';

  @Output() archivoProcesado = new EventEmitter<{ fichas: Ficha[], loteId: string }>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;


  constructor() {}

  // ===============================
  // MANEJO DE ARCHIVO
  // ===============================

  validarExtension(file: File): boolean {
    const extension = file.name.split('.').pop()?.toLowerCase();
    return extension === 'dat';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    if (!this.validarExtension(file)) {
      this.mensaje = '❌ Solo se permiten archivos .DAT';
      this.archivo = null;
      return;
    }

    this.archivo = file;
    this.mensaje = '';
  }

  eliminarArchivo() {
  this.archivo = null;
  this.mensaje = 'Archivo eliminado.';

    if (this.fileInput) {
     this.fileInput.nativeElement.value = '';
  }
}


  // ===============================
  // PROCESAR (SIMULADO)
  // ===============================

  procesarArchivo() {
    if (!this.archivo) {
      this.mensaje = 'Debe seleccionar un archivo antes de continuar.';
      return;
    }

    this.cargando = true;
    this.mensaje = 'Procesando archivo...';

    // Simulamos un retraso de procesamiento
    setTimeout(() => {
      this.cargando = false;
      this.mensaje = 'Archivo procesado correctamente.';

      // ============================
      // DATOS SIMULADOS DE FICHAS
      // ============================
      const fichasSimuladas: Ficha[] = [
        {
          numero_fsu: '10239487',
          departamento: 'La Libertad',
          provincia: 'Trujillo',
          distrito: 'El Porvenir',
          tipo_via: 'JR',
          nombre_via: 'Los Olivos',
          num_puerta: '234',
          informante: 'JUAN PEREZ GARCÍA',
          total_personas: 4,
          total_hombres: 2,
          total_mujeres: 2,
        },
        {
          numero_fsu: '10239488',
          departamento: 'La Libertad',
          provincia: 'Trujillo',
          distrito: 'Florencia de Mora',
          tipo_via: 'AV',
          nombre_via: 'Túpac Amaru',
          num_puerta: '580',
          informante: 'MARIA VELÁSQUEZ',
          total_personas: 3,
          total_hombres: 1,
          total_mujeres: 2,
        }
      ];

      const loteId = 'LOTE_SIMULADO_001';

      this.archivoProcesado.emit({
        fichas: fichasSimuladas,
        loteId: loteId
      });

    }, 2000);
  }

}
