import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  // ============================
  // DASHBOARD (Lazy Loading)
  // ============================
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module')
        .then(m => m.DashboardModule)
  },

  // ============================
  // SUBIR ARCHIVO (Lazy Loading)
  // ============================
  {
    path: 'subir-archivo',
    loadChildren: () =>
      import('./modules/subir-archivo/subir-archivo.module')
        .then(m => m.SubirArchivoModule)
  },

  // ============================
  // REGISTROS (Lazy Loading)
  // ============================
  {
    path: 'registros',
    loadChildren: () =>
      import('./modules/registros/registros.module')
        .then(m => m.RegistrosModule)
  },

  // ============================
  // RUTA WILDCARD (404)
  // ============================
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
