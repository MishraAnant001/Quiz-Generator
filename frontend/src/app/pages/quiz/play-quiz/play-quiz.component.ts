import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit{
  QuizData:any
  available=false
  constructor(private service:QuizService,private router :Router){}
  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.service.generateQuiz().subscribe({
      next:(response:any)=>{
        console.log(response)
        this.available=true
        this.QuizData=response.data
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
  allAnswered: boolean = false;
  selectedOptions:{ [key: number]: string }  = {};

  selectOption(questionIndex: number, option: string) {
    this.selectedOptions[questionIndex] = option;
    this.checkAllAnswered();
  }
  checkAllAnswered() {
    this.allAnswered = this.QuizData.questions.every((_:any, index:number) => this.selectedOptions[index]);
    // console.log(this.allAnswered)
  }

  submitQuiz() {
    console.log(this.selectedOptions);
    const answers :string[]= Object.values(this.selectedOptions)
    console.log(answers)
    this.service.submitQuiz(this.QuizData.quizid,answers).subscribe({
      next:(response:any)=>{
        console.log(response)
        Swal.fire({
          icon: "success",
          title: "answers submitted successfully",
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          sessionStorage.setItem("quiz",JSON.stringify(response.body.data))
          this.router.navigateByUrl("/quiz/result")
        })

      },
      error:(error)=>{
        console.log(error)
      }
    })

  }

}
