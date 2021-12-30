import { TestBed } from '@angular/core/testing';

import { CreateRectServiceService } from './create-rect.service';

describe('CreateRectServiceService', () => {
  let service: CreateRectServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateRectServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
