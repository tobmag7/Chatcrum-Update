import { TestBed } from '@angular/core/testing';

import { ScrumdataService } from './scrumdata.service';

describe('ScrumdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScrumdataService = TestBed.get(ScrumdataService);
    expect(service).toBeTruthy();
  });
});
