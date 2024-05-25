import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmEditorComponent } from './cm-editor.component';

describe('CmEditorComponent', () => {
  let component: CmEditorComponent;
  let fixture: ComponentFixture<CmEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
