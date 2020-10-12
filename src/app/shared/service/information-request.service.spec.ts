import { TestBed } from '@angular/core/testing';

import { InformationRequestService } from './information-request.service';

describe('InformationRequestService', () => {
  let service: InformationRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformationRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
