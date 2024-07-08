import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataExchangeService, UserService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(private service: UserService,private exchangeService:DataExchangeService,private router:Router) { }
  userData!: any[]
  ngOnInit(): void {
    this.getUsers()
  }
  getUsers() {
    this.service.getAllUsers().subscribe({
      next: (response: any) => {
        // console.log(response);
        this.userData = response.data
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  onDelete(user: any) {
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
        this.service.deleteUser(user._id).subscribe({
          next: (response) => {
            console.log(response);
            Swal.fire({
              title: "Deleted!",
              text: "the user has been deleted.",
              icon: "success"
            });
            this.getUsers()
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
    });
  }
  viewStats(user: any) {
    this.exchangeService.setData(user)
    this.router.navigateByUrl("/view-stats")

  }

}
