import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  /** Indicadores principales (KPI) */
  kpis = { totalHogares: 0, pobreExtremo: 0, pobre: 0, noPobre: 0 };
  cargando = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.simularCargaKpis();
    setTimeout(() => this.generarGraficos(), 1500);
  }

  /**
   * Simula la carga de KPIs desde el backend con retardo
   */
  private simularCargaKpis(): void {
    const datosPrueba = {
      totalHogares: 15000,
      pobreExtremo: 18.3,
      pobre: 30.0,
      noPobre: 51.7
    };

    of(datosPrueba)
      .pipe(delay(1000))
      .subscribe({
        next: data => {
          this.kpis = data;
          this.cargando = false;
        },
        error: err => {
          console.error('Error al simular backend:', err);
          this.cargando = false;
        }
      });
  }

  /**
   * Genera los gráficos principales del dashboard usando datos simulados
   */
  private generarGraficos(): void {
    this.graficoDistribucionCSE();
    this.graficoHogaresPorDistrito();
    this.graficoProgramasSociales();
  }

  /** Gráfico circular: Distribución por Clasificación Socioeconómica */
  private graficoDistribucionCSE(): void {
    const ctx = document.getElementById('chartCSE') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Pobre Extremo', 'Pobre', 'No Pobre'],
        datasets: [{
          data: [this.kpis.pobreExtremo, this.kpis.pobre, this.kpis.noPobre],
          backgroundColor: ['#dc2626', '#f59e0b', '#16a34a'],
          borderWidth: 1,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 15 } },
          title: { display: true, text: 'Distribución CSE', font: { size: 14, weight: 'bold' } }
        }
      }
    });
  }

  /** Gráfico de barras apiladas: Hogares por distrito y clasificación */
  private graficoHogaresPorDistrito(): void {
    const ctx = document.getElementById('chartDistrito') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Central', 'Norte', 'Sur', 'Este', 'Oeste'],
        datasets: [
          { label: 'Pobre Extremo', data: [80, 100, 60, 40, 50], backgroundColor: '#dc2626' },
          { label: 'Pobre', data: [120, 90, 80, 60, 50], backgroundColor: '#f59e0b' },
          { label: 'No Pobre', data: [200, 160, 130, 110, 120], backgroundColor: '#16a34a' }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 15 } },
          title: { display: true, text: 'Hogares por Distrito y Clasificación', font: { size: 14, weight: 'bold' } }
        },
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: { stacked: true, beginAtZero: true }
        }
      }
    });
  }

  /** Gráfico horizontal: Número de hogares beneficiarios por programa social */
  private graficoProgramasSociales(): void {
    const ctx = document.getElementById('chartProgramas') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['JUNTOS', 'Pensión 65', 'Qali Warma', 'Contigo', 'FISE', 'Beca 18'],
        datasets: [{
          label: 'Hogares beneficiarios',
          data: [1250, 980, 1130, 760, 430, 350],
          backgroundColor: ['#2563eb', '#10b981', '#f59e0b', '#a855f7', '#ef4444', '#0ea5e9'],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Hogares beneficiarios por programa social', font: { size: 14, weight: 'bold' } }
        },
        scales: {
          x: { beginAtZero: true },
          y: { ticks: { font: { size: 13 } } }
        }
      }
    });
  }
}

