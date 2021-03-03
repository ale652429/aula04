import { TestBed } from '@angular/core/testing';

import { MgService } from './mg.service';

describe('MgService', () => {
  let service: MgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
