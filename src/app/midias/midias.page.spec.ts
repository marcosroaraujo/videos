import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiasPage } from './midias.page';

describe('MidiasPage', () => {
  let component: MidiasPage;
  let fixture: ComponentFixture<MidiasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidiasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
