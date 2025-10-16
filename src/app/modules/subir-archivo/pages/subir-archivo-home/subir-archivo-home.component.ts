import { Component } from '@angular/core';

@Component({
  selector: 'app-subir-archivo-home',
  templateUrl: './subir-archivo-home.component.html',
  styleUrls: ['./subir-archivo-home.component.scss']
})
export class SubirArchivoHomeComponent {
  /** Archivo seleccionado o arrastrado */
  archivo: File | null = null;

  /** Campos manuales */
  fsu = '';
  d100 = '';
  clasificacion = 'No Pobre';

  /** Mensaje informativo mostrado en pantalla */
  mensaje = '';

  /** Maneja la selección manual de un archivo desde el input */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivo = input.files[0];
      this.mensaje = '';
    }
  }

  /**
   * Permite arrastrar un archivo al área designada
   */
  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.archivo = files[0];
      this.mensaje = `Archivo "${this.archivo.name}" seleccionado correctamente.`;
    }
  }

  /**
   * Evita el comportamiento por defecto del navegador al arrastrar
   */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  /**
   * Guarda los datos temporalmente (simulación)
   */
  guardarBorrador(): void {
    this.mensaje = 'Borrador guardado temporalmente.';
  }

  /**
   * Procesa el archivo seleccionado (simulación con retardo)
   */
  procesarArchivo(): void {
    if (!this.archivo) {
      this.mensaje = 'Debe seleccionar o arrastrar un archivo .dat antes de continuar.';
      return;
    }

    this.mensaje = 'Procesando archivo...';
    setTimeout(() => {
      this.mensaje = `Archivo "${this.archivo?.name}" importado y procesado correctamente.`;
    }, 1500);
  }
}
