import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';
import { ViewResultComponent } from './view-result/view-result.component';
import { QuizHistoryComponent } from './quiz-history/quiz-history.component';

const routes: Routes = [
  {
    path:"play",
    component:PlayQuizComponent
  },
  {
    path:"result",
    component:ViewResultComponent
  },
  {
    path:"history",
    component:QuizHistoryComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
