import { TestBed } from '@angular/core/testing';

import { TableAuditDataFieldService } from './table-audit-data-field.service';

describe('TableAuditDataFieldService', () => {
  let service: TableAuditDataFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableAuditDataFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
