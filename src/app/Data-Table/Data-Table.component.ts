import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HackerData } from '../services/hacker-data.service';
import { DataDisplay, DataPerPage } from '../models/DataDisplay';
import { VotesIDGraphComponent } from '../Graph/Votes-ID-Graph.component';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-Data-Table',
  templateUrl: './Data-Table.component.html',
  styleUrls: ['./Data-Table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit {

  graphDataShow = Array<DataDisplay>();
  dataPages = 0;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(private HackerData: HackerData, private spinner: NgxSpinnerService) { }
  @ViewChild('dataGraphShow') chartComponent: VotesIDGraphComponent;
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    const url =  window.location.href;
    this.dataPages = +url.substr(url.indexOf('=') + 1, url.length) || 0;
    if (!localStorage.getItem('pageData')) {
      this.HackerData.getNews(this.dataPages).subscribe( data => {
          this.dataCount(data);
          localStorage.setItem('pageData', JSON.stringify(data.hits));
          localStorage.setItem('dataPages', `${data.page}`);
        }
      );
    }  else {
      if (this.dataPages === +localStorage.getItem('dataPages')) {
        this.graphDataShow = JSON.parse(localStorage.getItem('pageData'));
        this.dataPages = +localStorage.getItem('dataPages');
      } else {
        this.HackerData.getNews(this.dataPages).subscribe( data => {
          this.dataCount(data);
          localStorage.setItem('pageData', JSON.stringify(data.hits));
          localStorage.setItem('dataPages', `${data.page}`);
        }
      );
      }
    }
  }

  dataCount(data: DataPerPage) {
    this.graphDataShow = data.hits;
    this.dataPages = data.page;
  }
  listData(updatedData) {
    for (let index = 0; index < this.graphDataShow.length; index ++) {
      if (updatedData.action === 'upvote' && this.graphDataShow[index].objectID === updatedData.newsId) {
        this.graphDataShow[index].points ++;
        break;
      } else if (updatedData.action === 'hide' && this.graphDataShow[index].objectID === updatedData.newsId) {
        this.graphDataShow.splice(index, 1);
        break;
      }
    }
    this.chartComponent.graphProj(this.graphDataShow);
    localStorage.setItem('pageData', JSON.stringify(this.graphDataShow));
  }
  updateData(updatedPageNum): void {
    localStorage.clear();
    this.HackerData.getNews(updatedPageNum).subscribe( data => {
      this.dataCount(data);
      localStorage.setItem('pageData', JSON.stringify(data.hits));
      localStorage.setItem('dataPages', `${data.page}`);
    });
  }

}
