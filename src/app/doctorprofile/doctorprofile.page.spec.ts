import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorprofilePage } from './doctorprofile.page';

describe('DoctorprofilePage', () => {
  let component: DoctorprofilePage;
  let fixture: ComponentFixture<DoctorprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorprofilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
