import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/core/services';

@Component({
  selector: 'app-quiz-history',
  templateUrl: './quiz-history.component.html',
  styleUrls: ['./quiz-history.component.scss']
})
export class QuizHistoryComponent implements OnInit{
  constructor(private service :QuizService){}
  Data!:any
  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.service.getHistory().subscribe({
      next:(response:any)=>{
        // console.log(response)
        this.Data=response.data
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

}
