import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetQuestionComponent } from './get-question/get-question.component';
import { AddQuestionComponent } from './add-question/add-question.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"get-questions",
    pathMatch:"full"

  },{
    path:"get-questions",
    component:GetQuestionComponent
  },
  {
    path:"manage",
    component:AddQuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
