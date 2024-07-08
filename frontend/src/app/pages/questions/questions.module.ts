import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { GetQuestionComponent } from './get-question/get-question.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GetQuestionComponent,
    AddQuestionComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    TableModule,
    ReactiveFormsModule
  ]
})
export class QuestionsModule { }
