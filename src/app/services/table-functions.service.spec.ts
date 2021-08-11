import { TestBed } from '@angular/core/testing';

import { TableFunctionsService } from './table-functions.service';

describe('TableFunctionsService', () => {
  let service: TableFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
