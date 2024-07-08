import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQuestion } from 'src/app/core/interfaces';
import { DataExchangeService, QuestionService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-question',
  templateUrl: './get-question.component.html',
  styleUrls: ['./get-question.component.scss']
})
export class GetQuestionComponent implements OnInit {
  questionData!:IQuestion[]
  constructor(private service:QuestionService,private exchangeService :DataExchangeService,private router :Router){}
  ngOnInit(): void {
    this.getQuestions()
  }
  getQuestions(){
    this.service.getQuestion().subscribe({
      next:(response:any)=>{
        // console.log(response)
        this.questionData=response.data
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
  onDelete(question:any){
    // console.log(question);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteQuestion(question._id).subscribe({
          next: (response) => {
            console.log(response);
            Swal.fire({
              title: "Deleted!",
              text: "the question has been removed.",
              icon: "success"
            });
            this.getQuestions()
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
    });
  }

  onEdit(question:any){
    // console.log(question);
    this.exchangeService.setData(question)
    this.router.navigateByUrl("/questions/manage")

  }


}
