import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { forkJoin } from 'rxjs';
import {
  DashboardService,
  CseItem,
  SexoItem,
  ServiciosBasicos,
  ProgramaItem
} from '../../../../services/dashboard.service';

import {
  Chart,
  ChartConfiguration,
  ChartType,
  registerables
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit, AfterViewInit {

  // Referencias a los canvas
  @ViewChild('cseChartCanvas') cseChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('sexoChartCanvas') sexoChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('serviciosChartCanvas') serviciosChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('programasChartCanvas') programasChartCanvas!: ElementRef<HTMLCanvasElement>;

  // Datos
  cseData: CseItem[] = [];
  sexoData: SexoItem[] = [];
  serviciosData!: ServiciosBasicos;
  programasData: ProgramaItem[] = [];

  // KPI
  totalHogares = 0;
  porcentajePobre = 0;
  porcentajeNoPobre = 0;
  porcentajePobreExtremo = 0;

  // Estado
  cargando = false;
  error = '';

  // Para asegurarnos que la vista está lista
  private viewReady = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.cargarDatosDashboard();
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
  }

  private cargarDatosDashboard(): void {
    this.cargando = true;
    this.error = '';

    forkJoin({
      cse: this.dashboardService.obtenerCSE(),
      sexo: this.dashboardService.obtenerPersonasPorSexo(),
      servicios: this.dashboardService.obtenerServiciosBasicos(),
      programas: this.dashboardService.obtenerBeneficiariosProgramas()
    }).subscribe({
      next: (resp) => {
        this.cseData = resp.cse.data;
        this.sexoData = resp.sexo.data;
        this.serviciosData = resp.servicios.data;
        this.programasData = resp.programas.data;

        this.calcularKpis();
        this.intentarConstruirGraficos();

        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando dashboard', err);
        this.error = 'No se pudieron cargar los datos del dashboard.';
        this.cargando = false;
      }
    });
  }

  private calcularKpis(): void {
    this.totalHogares = this.cseData.reduce((acc, item) => acc + item.total, 0);

    const getTotal = (label: string) =>
      this.cseData.find(i => i.nivel_socioeconomico.toUpperCase() === label)?.total || 0;

    const totalPobre = getTotal('POBRE');
    const totalNoPobre = getTotal('NO POBRE');
    const totalPobreExtremo = getTotal('POBRE EXTREMO');

    if (this.totalHogares > 0) {
      this.porcentajePobre = (totalPobre / this.totalHogares) * 100;
      this.porcentajeNoPobre = (totalNoPobre / this.totalHogares) * 100;
      this.porcentajePobreExtremo = (totalPobreExtremo / this.totalHogares) * 100;
    } else {
      this.porcentajePobre = 0;
      this.porcentajeNoPobre = 0;
      this.porcentajePobreExtremo = 0;
    }
  }

  private intentarConstruirGraficos(): void {
    // Esperamos un pequeño delay para asegurarnos que los canvas existen
    setTimeout(() => {
      if (!this.viewReady) return;
      this.construirGraficoCSE();
      this.construirGraficoSexo();
      this.construirGraficoServicios();
      this.construirGraficoProgramas();
    }, 0);
  }

  // ----------------- Gráfico CSE - Doughnut -----------------
  private construirGraficoCSE(): void {
    if (!this.cseChartCanvas) return;

    const labels = this.cseData.map(d => d.nivel_socioeconomico);
    const valores = this.cseData.map(d => d.total);

    const ctx = this.cseChartCanvas.nativeElement.getContext('2d');
    if (!ctx) { return; }

    new Chart(ctx, {
      type: 'doughnut' as ChartType,
      data: {
        labels,
        datasets: [
          {
            label: 'Hogares',
            data: valores
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    } as ChartConfiguration);
  }

  // ----------------- Gráfico Sexo - Barra -----------------
  private construirGraficoSexo(): void {
    if (!this.sexoChartCanvas) return;

    const labels = this.sexoData.map(d => d.sexo);
    const valores = this.sexoData.map(d => d.total);

    const ctx = this.sexoChartCanvas.nativeElement.getContext('2d');
    if (!ctx) { return; }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Personas',
            data: valores
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      }
    } as ChartConfiguration);
  }

  // ----------------- Gráfico Servicios Básicos - Barra -----------------
  private construirGraficoServicios(): void {
    if (!this.serviciosChartCanvas || !this.serviciosData) return;

    const labels = ['Agua', 'Alumbrado', 'Desagüe'];
    const valores = [
      this.serviciosData.agua,
      this.serviciosData.alumbrado,
      this.serviciosData.desague
    ];

    const ctx = this.serviciosChartCanvas.nativeElement.getContext('2d');
    if (!ctx) { return; }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Hogares con servicio',
            data: valores
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      }
    } as ChartConfiguration);
  }

  // ----------------- Gráfico Programas Sociales - Barra Horizontal -----------------
  private construirGraficoProgramas(): void {
    if (!this.programasChartCanvas) return;

    const activos = this.programasData.filter(p => p.beneficiarios > 0);
    const dataSource = activos.length > 0 ? activos : this.programasData;

    const labels = dataSource.map(p => p.programa);
    const valores = dataSource.map(p => p.beneficiarios);

    const ctx = this.programasChartCanvas.nativeElement.getContext('2d');
    if (!ctx) { return; }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Beneficiarios',
            data: valores
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            beginAtZero: true,
            precision: 0
          }
        }
      }
    } as ChartConfiguration);
  }

  redondear(valor: number): string {
    return valor.toFixed(1);
  }
}
