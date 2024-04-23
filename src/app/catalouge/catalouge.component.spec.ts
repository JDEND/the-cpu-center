import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalougeComponent } from './catalouge.component';

describe('CatalougeComponent', () => {
  let component: CatalougeComponent;
  let fixture: ComponentFixture<CatalougeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CatalougeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalougeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
