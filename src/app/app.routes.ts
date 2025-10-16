import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'subir-archivo',
    loadChildren: () =>
      import('./modules/subir-archivo/subir-archivo.module').then(m => m.SubirArchivoModule)
  },
  {
    path: 'registros',
    loadChildren: () =>
      import('./modules/registros/registros.module').then(m => m.RegistrosModule)
  }
];
