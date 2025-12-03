import { Component, OnInit } from '@angular/core';
import { 
  RegistrosService, 
  FichaResumen, 
  FichaCompleta 
} from '../../../../services/registros.service';

@Component({
  selector: 'app-registros-home',
  templateUrl: './registros-home.component.html',
  styleUrls: ['./registros-home.component.scss']
})
export class RegistrosHomeComponent implements OnInit {

  registros: FichaResumen[] = [];
  cargando = false;
  error = '';

  // 🔹 Variables para el modal
  mostrarModal = false;
  cargandoDetalle = false;
  fichaDetalle: FichaCompleta | null = null;
  fichaSeleccionadaFSU: string | null = null;
  errorDetalle = '';

  constructor(private registrosService: RegistrosService) {}

  ngOnInit(): void {
    this.cargarRegistros();
  }

  // ============================================================
  //   Cargar listado de fichas
  // ============================================================
  cargarRegistros(): void {
    this.cargando = true;
    this.error = '';

    this.registrosService.obtenerRegistros().subscribe({
      next: (resp) => {
        this.registros = resp.data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando registros', err);
        this.error = 'No se pudieron cargar los registros.';
        this.cargando = false;
      }
    });
  }

  // ============================================================
  //   Abrir modal y cargar ficha completa
  // ============================================================
  verDetalle(registro: FichaResumen): void {
    this.fichaSeleccionadaFSU = registro.numero_fsu;
    this.mostrarModal = true;
    this.cargandoDetalle = true;
    this.errorDetalle = '';
    this.fichaDetalle = null;

    this.registrosService.obtenerFichaCompleta(registro.numero_fsu)
      .subscribe({
        next: (resp) => {
          this.fichaDetalle = resp.data;

          // Añadir propiedad _open a cada integrante para el acordeón
          this.fichaDetalle.integrantes = this.fichaDetalle.integrantes.map(int => ({
            ...int,
            _open: false
          }));

          this.cargandoDetalle = false;
        },
        error: (err) => {
          console.error('Error cargando ficha completa', err);
          this.errorDetalle = 'No se pudo cargar el detalle de la ficha.';
          this.cargandoDetalle = false;
        }
      });
  }

  // ============================================================
  //   Cerrar modal
  // ============================================================
  cerrarModal(): void {
    this.mostrarModal = false;
    this.fichaDetalle = null;
    this.fichaSeleccionadaFSU = null;
    this.errorDetalle = '';
  }

  // ============================================================
  //   Abrir/cerrar acordeón de un integrante
  // ============================================================
  toggleIntegrante(index: number): void {
    if (!this.fichaDetalle) return;

    this.fichaDetalle.integrantes[index]._open =
      !this.fichaDetalle.integrantes[index]._open;
  }
}
