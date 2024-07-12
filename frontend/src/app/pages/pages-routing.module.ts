import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ViewStatsComponent } from './view-stats/view-stats.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
const routes: Routes = [
  {
    path:"",
    component:DashboardComponent,
  },
  {
    path:"users",
    component:UsersComponent
  },
  {
    path:"questions",
    loadChildren:()=>import("./questions/questions.module").then((m)=>m.QuestionsModule)
  },
  {
    path:"quiz",
    loadChildren:()=>import("./quiz/quiz.module").then((m)=>m.QuizModule)
  },
  {
    path:"view-stats",
    component:ViewStatsComponent  
  },
  {
    path:"profile",
    component:ProfileSettingsComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
