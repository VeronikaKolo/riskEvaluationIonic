import { TestBed } from '@angular/core/testing';

import { ExportPDFService } from './export-pdf.service';

describe('ExportPDFService', () => {
  let service: ExportPDFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportPDFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
