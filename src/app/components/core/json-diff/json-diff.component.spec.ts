import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonDiffComponent } from './json-diff.component';

describe('JsonDiffComponent', () => {
  let component: JsonDiffComponent;
  let fixture: ComponentFixture<JsonDiffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonDiffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JsonDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
