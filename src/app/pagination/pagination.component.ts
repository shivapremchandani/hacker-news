import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }
  @Input() dataPages = 0;
  @Output() datadataPages = new EventEmitter<number>();

  ngOnInit(): void { }

  changePage( type = 'next') {
    type === 'next' ? this.dataPages++ : this.dataPages--;
    this.router.navigate([], {
     relativeTo: this.route,
     queryParams: {
       page: this.dataPages
     },
    });
    this.datadataPages.emit(this.dataPages);
  }

}
