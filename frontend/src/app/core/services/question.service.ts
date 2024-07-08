import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuestion } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private api= "http://localhost:8000/api/v1/question"
  constructor(private http:HttpClient) { }

  getQuestion(){
    return this.http.get(this.api)
  }
  addQuestion(question:IQuestion){
    return this.http.post(this.api,question)
  }
  deleteQuestion(id:string){
    return this.http.delete(this.api+`/${id}`)
  }
  updateQuestion(id:string,question:IQuestion){
    return this.http.put(this.api+`/${id}`,question)
  }

}
