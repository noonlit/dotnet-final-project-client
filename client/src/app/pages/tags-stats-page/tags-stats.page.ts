import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Tag } from '../../models/tag.model';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-tags-stats',
  templateUrl: 'tags-stats.page.html',
  styleUrls: ['tags-stats.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TagsStatsPage implements OnInit {
  bars: any;
  tagsLabels: [] = [];
  tagsData: [] = [];
  colorArray: any;
  @ViewChild('barChart') barChart;

  constructor(private apiSvc: ApiService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.createBarChart();
  }

  createBarChart() {
    this.apiSvc.get('api/Stats/PopularTags').subscribe((response) => {
      let data = [];
      let labels = [];
      for (let item of response) {
        data.push(parseInt(item.usageCount));
        labels.push(item.tagName);
      }

      this.bars = new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Count',
            data: data,
            backgroundColor: 'rgb(38, 194, 129, .5)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129, .5)',// array should have same number of elements as number of dataset
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 1
              }
            }]
          }
        }
      });
    });
  }

  public loadStats() {
    this.apiSvc.get('api/Stats/PopularTags').subscribe((response) => {
      for (let item of response) {
        if (this.bars.data) {
          this.bars.data.datasets[0].data.push(parseInt(item.usageCount));
          this.bars.data.labels.push(item.tagName);
        }
      }

      this.cd.detectChanges();
    });
  }
}
