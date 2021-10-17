import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStepsButtonsComponent } from './search-steps-buttons.component';

describe('SearchStepsButtonsComponent', () => {
  let component: SearchStepsButtonsComponent;
  let fixture: ComponentFixture<SearchStepsButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchStepsButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStepsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
