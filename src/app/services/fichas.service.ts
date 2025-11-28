import { Injectable } from '@angular/core';

/**
 * Interfaz Ficha usada por todas las fases del proceso.
 * Esta es una versión reducida con los campos esenciales
 * que mostramos en el frontend.
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

  // Campos agregados durante el proceso
  d100?: string;
  cse?: string;
  completada?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FichasService {

  constructor() {}

}
