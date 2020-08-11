import { TestBed } from '@angular/core/testing';

import { LoadingstateService } from './loadingstate.service';

describe('LodingstateService', () => {
  let service: LoadingstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
