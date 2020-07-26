import { TestBed } from '@angular/core/testing';

import { HackerData } from './hacker-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HackerData', () => {
  let service: HackerData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HackerData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
