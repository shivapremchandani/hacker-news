import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DataDisplay, DataGraph } from '../models/DataDisplay';
import * as Chart from 'chart.js';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-Votes-ID-Graph',
  templateUrl: './Votes-ID-Graph.component.html',
  styleUrls: ['./Votes-ID-Graph.component.scss'],
})
export class VotesIDGraphComponent implements OnInit, OnChanges {
  @Input() graphDataShow: Array<DataDisplay>;
  graphProjAxis: DataGraph = {x: [], y: []};
  graphData = [];

  constructor() {}

  ngOnInit(): void {

  }
  ngOnChanges(): void {
    this.graphProj(this.graphDataShow);
  }
  graphProj(graphDataShow) {
    this.graphData = [];
    this.graphProjAxis.x = [];
    this.graphProjAxis.y = [];
    graphDataShow.map((el) => {
      this.graphProjAxis.x.push(el.objectID);
      this.graphProjAxis.y.push(el.points);
    });
    this.graphData = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.graphProjAxis.x,
        datasets: [
          {
            data: this.graphProjAxis.y,
            borderColor: '#2f5496',
            fill: false
          }
        ]
      },
      options: {
        animation: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: true,
            },
          ],
          yAxes: [
            {
              display: true,
            },
          ],
        },
      },
    });
  }
}
