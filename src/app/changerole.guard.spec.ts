import { TestBed, async, inject } from '@angular/core/testing';

import { ChangeroleGuard } from './changerole.guard';

describe('ChangeroleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangeroleGuard]
    });
  });

  it('should ...', inject([ChangeroleGuard], (guard: ChangeroleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
