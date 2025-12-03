import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* ============================================================
   ✨ MODELO PARA LA LISTA DE FICHAS
   ============================================================ */
export interface FichaResumen {
  numero_fsu: string;
  informante: string;
  codigo_D100: string;
  nivel_socioeconomico: string;
}

/* ============================================================
   ✨ MODELO PARA INTEGRANTES DE LA FICHA
   ============================================================ */
export interface Integrante {
  numero_fsu: string;
  codigo: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombres: string;

  fecha_nacimiento: string | null;
  edad: number | null;
  meses: number | null;

  tipo_documento: string | null;
  nro_documento: string | null;

  parentesco: string | null;
  nro_nucleo_familiar: string | null;

  sexo: string | null;
  gestante: string | null;
  estado_civil: string | null;

  tiene_seguro: string | null;
  seguro_essalud: string | null;
  seguro_ffaa_pnp: string | null;
  seguro_sis: string | null;
  seguro_privado: string | null;
  seguro_otro: string | null;

  idioma_inicial: string | null;
  sabe_leer_escribir: string | null;
  nivel_educativo: string | null;
  ultimo_grado_aprobado: string | null;

  ocupacion_ult_mes: string | null;
  sector_desempena: string | null;

  presenta_discapacidad: string | null;
  discapacidad_visual: string | null;
  discapacidad_auditiva: string | null;
  discapacidad_habla: string | null;
  discapacidad_motora: string | null;
  discapacidad_mental: string | null;

  beneficiario_programa: string | null;
  prog_vaso_leche: string | null;
  prog_comedor_popular: string | null;
  prog_desayuno_almuerzo: string | null;
  prog_pacfo: string | null;
  prog_panf: string | null;
  prog_juntos: string | null;
  prog_techo_propio: string | null;
  prog_pension65: string | null;
  prog_cuna_mas: string | null;
  prog_otro: string | null;

  // 👇 NECESARIO PARA EL ACORDEÓN EN EL FRONT
  _open?: boolean;
}

/* ============================================================
   ✨ MODELO COMPLETO DE LA FICHA (FULL BACKEND)
   ============================================================ */
export interface FichaCompleta {

  numero_fsu: string;
  numero_s100: string;

  cod_departamento: string;
  departamento: string;
  cod_provincia: string;
  provincia: string;
  cod_distrito: string;
  distrito: string;

  centro_poblado: string;
  cod_centro_poblado: string;
  categoria_centro_poblado: string;

  nucleo_urbano: string;
  cat_nuclo_urbano: string;

  nro_conglomerado: string | null;
  nro_zona: string | null;
  nro_manzana: string | null;
  nro_frente_manzana: string | null;
  nro_vivienda: string | null;

  nro_hogar: string;
  hogar: string;

  informante: string;
  nro_orden: string;

  tipo_via: string | null;
  nombre_via: string | null;
  num_puerta: string | null;

  block: string | null;
  piso: string | null;
  interior: string | null;
  mz: string | null;
  lote: string | null;
  km: string | null;
  parcela: string | null;

  telefono1: string | null;
  telefono2: string | null;

  tipo_doc_responsable: string | null;
  nro_doc_responsable: string | null;

  tipo_doc_digitador: string | null;
  nro_doc_digitador: string | null;

  visita1_empadronador_fecha: string | null;
  visita1_empadronador_resultado: string | null;

  visita2_empadronador_fecha: string | null;
  visita2_empadronador_resultado: string | null;

  visita3_empadronador_fecha: string | null;
  visita3_empadronador_resultado: string | null;

  visita1_jefebrigada_fecha: string | null;
  visita1_jefebrigada_resultado: string | null;

  visita2_jefebrigada_fecha: string | null;
  visita2_jefebrigada_resultado: string | null;

  visita3_jefebrigada_fecha: string | null;
  visita3_jefebrigada_resultado: string | null;

  visita1_revisor_fecha: string | null;
  visita1_revisor_resultado: string | null;

  visita2_revisor_fecha: string | null;
  visita2_revisor_resultado: string | null;

  visita3_revisor_fecha: string | null;
  visita3_revisor_resultado: string | null;

  resultado_final_fecha: string | null;

  reside_permanente: string | null;

  nro_pisos: number | null;
  color_vivienda: string | null;

  firma_informante1: string | null;
  motivo_no_firma1: string | null;

  fecha_digitacion: string | null;
  hora_digitacion: string | null;

  nombre_empadronador: string | null;
  apellido_paterno_empadronador: string | null;
  apellido_materno_empadronador: string | null;

  nombre_digitador: string | null;
  apellido_paterno_digitador: string | null;
  apellido_materno_digitador: string | null;

  tipo_vivienda: string | null;
  condicion_vivienda: string | null;

  material_paredes: string | null;
  material_techo: string | null;
  material_piso: string | null;

  tipo_alumbrado: string | null;
  abastecimiento_agua: string | null;
  servicio_higienico: string | null;

  horas_capital: string | null;
  horas_exactas: string | null;

  nro_habitaciones: number | null;

  combustible_cocina: string | null;

  tiene_bienes: string | null;

  bienes_equipo_sonido: string | null;
  bienes_televisor: string | null;
  bienes_dvd: string | null;
  bienes_licuadora: string | null;
  bienes_refrigerador: string | null;
  bienes_cocina_gas: string | null;
  bienes_telefono_fijo: string | null;
  bienes_plancha: string | null;
  bienes_lavadora: string | null;
  bienes_computadora: string | null;
  bienes_microondas: string | null;
  bienes_internet: string | null;
  bienes_cable: string | null;
  bienes_celular: string | null;

  suministro_luz_agua: string | null;
  numero_suministro: string | null;

  total_personas: number;
  total_hombres: number;
  total_mujeres: number;

  firma_informante: string | null;
  motivo_no_firma_informante: string | null;

  firma_digitador: string | null;
  motivo_no_firma_digitador: string | null;

  codigo_D100: string;
  nivel_socioeconomico: string;

  integrantes: Integrante[];
}

/* ============================================================
   ✨ SERVICIO DE ACCESO AL BACKEND
   ============================================================ */
@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  private baseUrl = 'http://127.0.0.1:8000/api/v1';

  constructor(private http: HttpClient) {}

  obtenerRegistros(): Observable<{ status: string; data: FichaResumen[] }> {
    return this.http.get<{ status: string; data: FichaResumen[] }>(
      `${this.baseUrl}/listar-fichas`
    );
  }

  obtenerFichaCompleta(numeroFsu: string): Observable<{ status: string; data: FichaCompleta }> {
    return this.http.get<{ status: string; data: FichaCompleta }>(
      `${this.baseUrl}/ficha-completa/${numeroFsu}`
    );
  }
}
