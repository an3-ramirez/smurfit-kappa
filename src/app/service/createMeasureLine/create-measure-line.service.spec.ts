import { TestBed } from '@angular/core/testing';

import { CreateMeasureLineServiceService } from './create-measure-line.service';

describe('CreateMeasureLineServiceService', () => {
  let service: CreateMeasureLineServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateMeasureLineServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
