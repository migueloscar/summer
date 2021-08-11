import { TestBed } from '@angular/core/testing';

import { TableDataFieldService } from './table-data-field.service';

describe('TableDataFieldService', () => {
  let service: TableDataFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableDataFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
