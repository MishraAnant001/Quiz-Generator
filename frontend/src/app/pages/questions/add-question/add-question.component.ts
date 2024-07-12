import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataExchangeService, QuestionService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit,OnDestroy {
  constructor(private service: QuestionService, private fb: FormBuilder, private exchangeService: DataExchangeService) { }
  form!: FormGroup
  question: any
  edited = false
  submitted: boolean = false
  ngOnInit(): void {

    this.form = this.fb.group({
      text: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      answer: ['', Validators.required],
      difficulty: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
    })
    if (this.exchangeService.getData()) {
      this.question = this.exchangeService.getData()
      this.edited = true
      this.form.patchValue({
        text: this.question.text,
        option1: this.question.options[0],
        option2: this.question.options[1],
        option3:this.question.options[2],
        option4: this.question.options[3],
        answer: this.question.answer,
        difficulty: this.question.difficulty,
      })
    }
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }
    const data = {
      text: this.f['text'].value,
      options: [
        this.f['option1'].value,
        this.f['option2'].value,
        this.f['option3'].value,
        this.f['option4'].value,
      ],
      answer: this.f['answer'].value,
      difficulty: this.f['difficulty'].value
    }
    if(this.edited){
      this.service.updateQuestion(this.question._id,data).subscribe({
        next: (response) => {
          // console.log(response)
          Swal.fire({
            icon: "success",
            title: "question updated successfully",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.submitted = false
            this.form.reset()
            this.exchangeService.reset()
            this.edited=false
          })
        },
        error: (error) => {
          console.log(error)
        }
      })
    }else{

      this.service.addQuestion(data).subscribe({
        next: (response) => {
          // console.log(response)
          Swal.fire({
            icon: "success",
            title: "question added successfully",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.submitted = false
            this.form.reset()
          })
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }

  get f() {
    return this.form.controls
  }
  resetForm() {
    this.submitted = false
    this.form.reset()
  }

  ngOnDestroy(): void {
      this.exchangeService.reset()
  }


}
