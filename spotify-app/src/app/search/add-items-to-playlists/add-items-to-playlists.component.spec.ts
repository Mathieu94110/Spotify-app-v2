import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemsToPlaylistsComponent } from './add-items-to-playlists.component';

describe('AddItemsToPlaylistsComponent', () => {
  let component: AddItemsToPlaylistsComponent;
  let fixture: ComponentFixture<AddItemsToPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemsToPlaylistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemsToPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
