import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VotesIDGraphComponent } from './Votes-ID-Graph.component';

describe('VotesIDGraphComponent', () => {
  let component: VotesIDGraphComponent;
  let fixture: ComponentFixture<VotesIDGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotesIDGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesIDGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('it should show graph x-axis label headings', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.x-axis-label').textContent).toContain('ID');
  });

  it('it should show graph y-axis label headings', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.y-axis-label').textContent).toContain('VOTES');
  });

  it('it should display the canvas graph', () => {
    const debugElement = fixture.debugElement.query(By.css('#canvas'));
    expect(debugElement).toBeTruthy();
  });

});
