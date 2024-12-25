import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  activePeriod: string = 'daily';

  public chartType: ChartType;
  public chartData: any;
  public chartOptions: any;
  public chartResponsive: any[];
  public chartLegendItems: LegendItem[];

  constructor() { }

  ngOnInit() {
      this.chartType = ChartType.Line;
      this.chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 795],
          [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
        ]
      };
      this.chartOptions = {
        low: 0,
        high: 800,
        showArea: false,
        height: '245px',
        axisX: {
          showGrid: false,
        },
        /* lineSmooth: Chartist.Interpolation.simple({
          divisor: 1
        }), */
        showLine: true,
        showPoint: true,
      };
      this.chartResponsive = [
        ['screen and (max-width: 640px)', {
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.chartLegendItems = [
        { title: 'Sales', imageClass: 'fa fa-circle text-info' },
        { title: 'Orders', imageClass: 'fa fa-circle text-danger' },
      ];

    }
  setActivePeriod(tab: string): void {
    this.activePeriod = tab;
  }

}
