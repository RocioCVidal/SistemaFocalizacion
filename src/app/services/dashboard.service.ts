import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CseItem {
  nivel_socioeconomico: string;
  total: number;
}

export interface SexoItem {
  sexo: string;
  total: number;
}

export interface ServiciosBasicos {
  agua: number;
  alumbrado: number;
  desague: number;
}

export interface ProgramaItem {
  programa: string;
  beneficiarios: number;
}

interface ApiResponse<T> {
  status: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // Ajusta si usas otra URL base
  private baseUrl = 'http://127.0.0.1:8000/api/dashboard';

  constructor(private http: HttpClient) {}

  obtenerCSE(): Observable<ApiResponse<CseItem[]>> {
    return this.http.get<ApiResponse<CseItem[]>>(`${this.baseUrl}/cse`);
  }

  obtenerPersonasPorSexo(): Observable<ApiResponse<SexoItem[]>> {
    return this.http.get<ApiResponse<SexoItem[]>>(`${this.baseUrl}/personas-por-sexo`);
  }

  obtenerServiciosBasicos(): Observable<ApiResponse<ServiciosBasicos>> {
    return this.http.get<ApiResponse<ServiciosBasicos>>(`${this.baseUrl}/servicios-basicos`);
  }

  obtenerBeneficiariosProgramas(): Observable<ApiResponse<ProgramaItem[]>> {
    return this.http.get<ApiResponse<ProgramaItem[]>>(`${this.baseUrl}/beneficiarios`);
  }
}
