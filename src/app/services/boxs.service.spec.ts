import { TestBed } from '@angular/core/testing';

import { BoxsService } from './boxs.service';

describe('BoxsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoxsService = TestBed.get(BoxsService);
    expect(service).toBeTruthy();
  });
});
