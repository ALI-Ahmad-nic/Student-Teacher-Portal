import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StComponent } from './st.component';

describe('StComponent', () => {
  let component: StComponent;
  let fixture: ComponentFixture<StComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
