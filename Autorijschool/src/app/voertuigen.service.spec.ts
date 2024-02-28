import { TestBed } from '@angular/core/testing';
import { VoertuigenService } from './voertuigen.service';

describe('VoertuigenService', () => {
  let service: VoertuigenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoertuigenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
