import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.scss']
})
export class ViewResultComponent implements OnInit {
  quizData!: any[]
  userAnswers!: any[]
  ngOnInit(): void {
    this.quizData = JSON.parse(sessionStorage.getItem("quiz") || "").quiz.questions;
    this.userAnswers = JSON.parse(sessionStorage.getItem("quiz") || "").userAnswers;
    sessionStorage.removeItem("quiz")
  }

}
