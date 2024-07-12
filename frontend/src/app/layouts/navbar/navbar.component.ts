import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService, StorageService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  constructor(private router: Router,private service:StorageService,private sharedService:SharedService) { }
  ngOnInit(): void {
    this.sharedService.getChange().asObservable().subscribe({
      next:(response)=>{
        this.url = `http://localhost:8000/${localStorage.getItem("profile")}`
        this.user = this.service.getName()
        console.log(this.url,this.user);
      }
    })
  }

  url = `http://localhost:8000/${localStorage.getItem("profile")}`
  user = this.service.getName()
  logout() {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "logout successfull",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(()=>{
          this.service.clear();
          this.router.navigateByUrl("/auth")
        });
      }
    });

  }
}
