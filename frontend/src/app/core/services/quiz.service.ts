import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private api = "http://localhost:8000/api/v1/quiz/"
  constructor(private http:HttpClient) { }

  generateQuiz(){
    return this.http.get(this.api+"generate")
  }

  submitQuiz(quizid:string,data:Array<string>){
    return this.http.post(this.api+"result/"+quizid,{answers:data},{observe:"response"})
  }

  getHistory(){
    return this.http.get(this.api+"history")
  }
}
