import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interfaz Ficha usada por todas las fases del proceso.
 */
export interface Ficha {
  numero_fsu: string;
  departamento: string;
  provincia: string;
  distrito: string;

  tipo_via: string;
  nombre_via: string;
  num_puerta: string;

  informante: string;

  total_personas: number;
  total_hombres: number;
  total_mujeres: number;

  // Datos llenados en Fase 2
  d100?: string;
  cse?: string;
  completada?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FichasService {

  private apiUrl = 'http://127.0.0.1:8000/api/v1';

  constructor(private http: HttpClient) {}

  /**
   * Guarda en el backend la información de una ficha completada.
   */
  guardarFicha(data: {
    numero_fsu: string;
    d100: string;
    cse: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/guardar-ficha`, data);
  }
}
