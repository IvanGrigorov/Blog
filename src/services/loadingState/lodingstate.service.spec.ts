import { TestBed } from '@angular/core/testing';

import { LodingstateService } from './lodingstate.service';

describe('LodingstateService', () => {
  let service: LodingstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LodingstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
