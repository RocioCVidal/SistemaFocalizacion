import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RegistrosHomeComponent } from './pages/registros-home/registros-home.component';
import { REGISTROS_ROUTES } from './registros.routes';

@NgModule({
  declarations: [
    RegistrosHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(REGISTROS_ROUTES)
  ]
})
export class RegistrosModule {}
