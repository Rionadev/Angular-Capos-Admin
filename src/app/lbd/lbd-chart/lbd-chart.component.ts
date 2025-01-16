import { Component, Input, OnInit, AfterViewInit, ChangeDetectionStrategy, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import * as Chartist from 'chartist';

export interface LegendItem {
  title: string;
  imageClass: string;
}

export enum ChartType {
  Pie,
  Line,
  Bar
}

@Component({
  selector: 'lbd-chart',
  templateUrl: './lbd-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LbdChartComponent implements OnInit, AfterViewInit {
  static currentId = 1;

  @Input()
  public title: string;

  @Input()
  public subtitle: string;

  @Input()
  public chartClass: string;

  @Input()
  public chartType: ChartType;

  @Input()
  public chartData: any;

  @Input()
  public chartOptions: any;

  @Input()
  public chartResponsive: any[];

  @Input()
  public footerIconClass: string;

  @Input()
  public footerText: string;

  @Input()
  public legendItems: LegendItem[];

  @Input()
  public withHr: boolean;

  public chartId: string;

  private chart: any; // Store reference to the chart instance

  @ViewChild('chartContainer', { static: false }) chartContainer: ElementRef;

  constructor() {}

  public ngOnInit(): void {
    this.chartId = `lbd-chart-${LbdChartComponent.currentId++}`;
  }

  public ngAfterViewInit(): void {
    this.initChart();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.chartData || changes.chartOptions) {
      this.initChart();
    }
  }

  private initChart(): void {
    if (!this.chartContainer?.nativeElement) {
      return; // Ensure the container is ready
    }

    switch (this.chartType) {
      case ChartType.Pie:
        this.chart = new Chartist.Pie(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
      case ChartType.Line:
        this.chart = new Chartist.Line(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
      case ChartType.Bar:
        this.chart = new Chartist.Bar(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
    }
  }
}

/* import {Component, Input, OnInit, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import * as Chartist from 'chartist';

export interface LegendItem {
  title: string;
  imageClass: string;
}

export enum ChartType {
  Pie,
  Line,
  Bar
}

@Component({
  selector: 'lbd-chart',
  templateUrl: './lbd-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LbdChartComponent implements OnInit, AfterViewInit {
  static currentId = 1;

  @Input()
  public title: string;

  @Input()
  public subtitle: string;

  @Input()
  public chartClass: string;

  @Input()
  public chartType: ChartType;

  @Input()
  public chartData: any;

  @Input()
  public chartOptions: any;

  @Input()
  public chartResponsive: any[];

  @Input()
  public footerIconClass: string;

  @Input()
  public footerText: string;

  @Input()
  public legendItems: LegendItem[];

  @Input()
  public withHr: boolean;

  public chartId: string;

  constructor() {
  }

  public ngOnInit(): void {
    this.chartId = `lbd-chart-${LbdChartComponent.currentId++}`;
  }

  public ngAfterViewInit(): void {

    switch (this.chartType) {
      case ChartType.Pie:
        new Chartist.Pie(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
      case ChartType.Line:
        new Chartist.Line(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
      case ChartType.Bar:
        new Chartist.Bar(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
    }
  }
}
 */