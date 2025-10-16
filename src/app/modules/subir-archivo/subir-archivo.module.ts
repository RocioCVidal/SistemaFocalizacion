import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 Asegúrate de que esté importado
import { RouterModule } from '@angular/router';
import { SUBIR_ARCHIVO_ROUTES } from './subir-archivo.routes';
import { SubirArchivoHomeComponent } from './pages/subir-archivo-home/subir-archivo-home.component';

@NgModule({
  declarations: [SubirArchivoHomeComponent],
  imports: [
    CommonModule,
    FormsModule, // ✅ Asegúrate de incluirlo también en imports[]
    RouterModule.forChild(SUBIR_ARCHIVO_ROUTES)
  ]
})
export class SubirArchivoModule {}
