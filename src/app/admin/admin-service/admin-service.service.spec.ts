import { TestBed, inject } from '@angular/core/testing';

import { AdminService } from './admin-service.service';

describe('AdminServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminService]
    });
  });

  it('should be created', inject([AdminService], (service: AdminService) => {
    expect(service).toBeTruthy();
  }));
});
