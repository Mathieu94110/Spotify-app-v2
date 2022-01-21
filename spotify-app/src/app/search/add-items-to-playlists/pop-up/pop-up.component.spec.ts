import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAddToPlaylistsComponent } from './pop-up.component';

describe('PopUpAddToPlaylistsComponent', () => {
  let component: PopUpAddToPlaylistsComponent;
  let fixture: ComponentFixture<PopUpAddToPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpAddToPlaylistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpAddToPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
