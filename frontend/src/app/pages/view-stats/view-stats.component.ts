import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataExchangeService } from 'src/app/core/services';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-view-stats',
  templateUrl: './view-stats.component.html',
  styleUrls: ['./view-stats.component.scss']
})
export class ViewStatsComponent implements OnInit {
  data: any;
  user: any
  options: any;
  isAdmin!: boolean
  constructor(private service: DashboardService, private exchangeService: DataExchangeService, private router: Router) { }
  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
    this.user = this.exchangeService.getData()
    if (!this.user) {
      this.router.navigateByUrl("/users")
      return
    }
    this.service.getDataById(this.user._id).subscribe({
      next: (response: any) => {
        // console.log(response);
        this.exchangeService.reset()
        const keys = Object.keys(response.data)
        const values = Object.values(response.data)
        // console.log(keys);
        this.data = {
          labels: keys,
          datasets: [
            {
              data: values,
              backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
            }
          ]
        };
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
