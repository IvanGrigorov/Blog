import { TestBed } from '@angular/core/testing';

import { UserinfostoreService } from './userinfostore.service';

describe('UserinfostoreService', () => {
  let service: UserinfostoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserinfostoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
