import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';
import { QuizHistoryComponent } from './quiz-history/quiz-history.component';
import { ViewResultComponent } from './view-result/view-result.component';


@NgModule({
  declarations: [
    PlayQuizComponent,
    QuizHistoryComponent,
    ViewResultComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule
  ]
})
export class QuizModule { }
