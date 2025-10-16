import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ROUTES } from './dashboard.routes';

@NgModule({
  imports: [RouterModule.forChild(DASHBOARD_ROUTES)],
})
export class DashboardModule {}
