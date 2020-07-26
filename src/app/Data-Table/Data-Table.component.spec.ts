import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataTableComponent } from './Data-Table.component';
import { HackerData } from '../services/hacker-data.service';

describe('DataTable', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableComponent ],
      imports: [HttpClientTestingModule],
      providers: [HackerData]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the comments in table header', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.d-flex .hacker-news-comments').textContent).toContain('Comments');
  });

  it('should have the vote count in table header', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.d-flex .hacker-news-votes').textContent).toContain('Vote Count');
  });

  it('should have the upvote count in table header', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.d-flex .hacker-detail--upvote').textContent).toContain('UpVote');
  });

  it('should have the News Details count in table header', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.d-flex .hacker-news').textContent).toContain('News Details');
  });

});
