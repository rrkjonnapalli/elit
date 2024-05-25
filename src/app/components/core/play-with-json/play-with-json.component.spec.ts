import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayWithJsonComponent } from './play-with-json.component';

describe('PlayWithJsonComponent', () => {
  let component: PlayWithJsonComponent;
  let fixture: ComponentFixture<PlayWithJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayWithJsonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayWithJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
