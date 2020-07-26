import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataPerPage } from '../models/DataDisplay';
@Injectable({
  providedIn: 'root'
})
export class HackerData {

  constructor(private httpClient: HttpClient) { }
  baseUrl = environment.getNewsUrl;
  tags = '(story,poll)';
  queryParam = 'hitsPerPage';
  getNews(dataPages) {
    return this.httpClient.get<DataPerPage>(`${this.baseUrl}?tags=${this.tags}&${this.queryParam}=40&page=${dataPages}`);
  }
}
