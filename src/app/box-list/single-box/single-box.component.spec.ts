import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBoxComponent } from './single-box.component';

describe('SingleBoxComponent', () => {
  let component: SingleBoxComponent;
  let fixture: ComponentFixture<SingleBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
