import { TestBed } from '@angular/core/testing';

import { PrintmeService } from './printme.service';

describe('PrintmeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrintmeService = TestBed.get(PrintmeService);
    expect(service).toBeTruthy();
  });
});
