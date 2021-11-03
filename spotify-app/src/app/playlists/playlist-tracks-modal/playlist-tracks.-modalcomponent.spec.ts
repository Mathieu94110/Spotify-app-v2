import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistTracksModalComponent } from './playlist-tracks-modal.component';

describe('ModalPlaylistTracksComponent', () => {
  let component: PlaylistTracksModalComponent;
  let fixture: ComponentFixture<PlaylistTracksModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistTracksModalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistTracksModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
