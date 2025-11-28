import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SUBIR_ARCHIVO_ROUTES } from './subir-archivo.routes';

// COMPONENTE PADRE
import { SubirArchivoHomeComponent } from './pages/subir-archivo-home/subir-archivo-home.component';

// FASES
import { Fase1UploadComponent } from './pages/fase1-upload/fase1-upload.component';
import { Fase2FichasComponent } from './pages/fase2-fichas/fase2-fichas.component';
import { Fase3FinalizarComponent } from './pages/fase3-finalizar/fase3-finalizar.component';

@NgModule({
  declarations: [
    SubirArchivoHomeComponent,
    Fase1UploadComponent,
    Fase2FichasComponent,
    Fase3FinalizarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(SUBIR_ARCHIVO_ROUTES)
  ]
})
export class SubirArchivoModule {}
