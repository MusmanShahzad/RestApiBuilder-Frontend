/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComboBoxDataService } from './comboBoxData.service';

describe('Service: ComboBoxData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComboBoxDataService]
    });
  });

  it('should ...', inject([ComboBoxDataService], (service: ComboBoxDataService) => {
    expect(service).toBeTruthy();
  }));
});
