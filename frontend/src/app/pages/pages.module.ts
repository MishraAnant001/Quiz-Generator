import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartModule } from 'primeng/chart';
import { UsersComponent } from './users/users.component';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewStatsComponent } from './view-stats/view-stats.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    ViewStatsComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ChartModule,
    TableModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
