import { TestBed } from '@angular/core/testing';

import { HttploadinginterceptorService } from './httploadinginterceptor.service';

describe('HttploadinginterceptorService', () => {
  let service: HttploadinginterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttploadinginterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
