import { TestBed } from '@angular/core/testing';

import { Moneda } from './moneda';

describe('Moneda', () => {
  let service: Moneda;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Moneda);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
