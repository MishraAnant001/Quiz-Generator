import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces';
import { SharedService, UserService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  user!:IUser
  url!:string
  username!:string
  file?:File
  constructor(private service :UserService,private location :Location,private router:Router,private sharedService:SharedService){}
  ngOnInit(): void {
    this.getUser()
  }
  getUser(){
    const userid = localStorage.getItem("_id")
    if(!userid){
      this.location.back()
    }else{
      this.service.getUserById(userid).subscribe({
        next:(response:any)=>{
          console.log(response);
          this.user=response.data
          this.username=response.data.name
          this.url=`http://localhost:8000/${response.data.profilephoto}`
          localStorage.setItem("profile",response.data.profilephoto)
          localStorage.setItem("name",response.data.name)
          this.sharedService.setChange()
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }
  }
  onUpdate(name:string){
    const formdata = new FormData()
    if(name==""){
      Swal.fire({
        icon:'info',
        text:'please provide valid name'
      })
      return;
    }
    if(this.file){
      formdata.append('file',this.file)
    }
    formdata.append('name',name)
    this.service.updateUser(this.user._id!,formdata).subscribe({
      next:(response)=>{
        // console.log(response);
        Swal.fire({
          icon:'success',
          title:"profile updated successfully",
          showConfirmButton:false,
          timer:1000
        }).then(()=>{
          // this.getUser()
          this.getUser()
          // window.location.reload()
          // this.sharedService.setChange()
          // this.router.navigateByUrl("/")
        })
        
      },
      error:(error)=>{
        console.log(error);
      }
    })

    
  }
  onSelectfile(event:any){
    // console.log(event);
    const file = event.target.files[0]
    if(file){
      // console.log(file);
      this.file=file
      const reader = new FileReader()
      reader.readAsDataURL(file)
      // console.log(reader);
      reader.onload =(event)=>{
        this.url=reader.result as string
      }
    }
  }
}
