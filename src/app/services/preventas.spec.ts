import { TestBed } from '@angular/core/testing';

import { Preventas } from './preventas';

describe('Preventas', () => {
  let service: Preventas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Preventas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
