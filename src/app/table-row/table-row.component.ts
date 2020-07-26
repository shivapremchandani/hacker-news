import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { DataDisplay } from '../models/DataDisplay';
import { isPlatformBrowser } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableRowComponent implements OnInit {

  @Input() rowData: DataDisplay;
  modifiedURL: string;
  @Output() listDataCall = new EventEmitter();
  URLupdate: boolean;
  constructor(@Inject(PLATFORM_ID) formID) {
    this.URLupdate = isPlatformBrowser(formID);
  }
  hackerDataDays = {
    years: 0,
    months: 0,
    days: 0
  };

  ngOnInit(): void {
    let url ;
    const today = moment();
    this.hackerDataDays =  {
      years: today.diff(this.rowData.created_at, 'years'),
      months: today.diff(this.rowData.created_at, 'months'),
      days: today.diff(this.rowData.created_at, 'day')
    };
    if (this.rowData.url === '' || this.rowData.url === null) {
      this.modifiedURL = '-';
    } else {
      if (this.URLupdate) {
         url = new window.URL(this.rowData.url);
         this.modifiedURL = url.hostname;
         if (this.modifiedURL.indexOf('www.') > -1) {
            this.modifiedURL = this.modifiedURL.substr(4, this.modifiedURL.length);
          }
      }
    }
  }

  updateRow(action: string) {
    const emitData = {
      newsId: this.rowData.objectID,
      action
    };
    this.listDataCall.emit(emitData);
  }

}
