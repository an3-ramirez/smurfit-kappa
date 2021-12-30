import { TestBed } from '@angular/core/testing';

import { CreateFoldService } from './create-fold.service';

describe('CreateFoldService', () => {
  let service: CreateFoldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateFoldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
