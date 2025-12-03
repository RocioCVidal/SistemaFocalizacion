import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Ficha } from '../../../../services/fichas.service';
import { UploadService } from '../../../../services/upload.service';
import { UploadResponse } from '../../../../modules/upload-response.model';

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

  constructor(private uploadService: UploadService) {}

  validarExtension(file: File): boolean {
    return file.name.toLowerCase().endsWith('.dat');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

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
    if (this.fileInput) this.fileInput.nativeElement.value = '';
  }

  procesarArchivo() {
    if (!this.archivo) {
      this.mensaje = 'Debe seleccionar un archivo antes de continuar.';
      return;
    }

    this.cargando = true;
    this.mensaje = 'Procesando archivo...';

    const formData = new FormData();
    formData.append('file', this.archivo);

    this.uploadService.subirArchivo(formData).subscribe({
      next: (resp: UploadResponse) => {
        this.cargando = false;
        this.mensaje = resp.message;

        this.archivoProcesado.emit({
          fichas: resp.resultados,
          loteId: '' 
        });
      },
      error: () => {
        this.cargando = false;
        this.mensaje = '❌ Error al procesar el archivo.';
      }
    });
  }
}
