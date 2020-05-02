import { TestBed, inject } from '@angular/core/testing';

import { HighchartsService } from './highcharts.service';

describe('HighchartsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighchartsService]
    });
  });

  it('should be created', inject([HighchartsService], (service: HighchartsService) => {
    expect(service).toBeTruthy();
  }));
});
