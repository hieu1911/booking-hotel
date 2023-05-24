import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailcontactComponent } from './mailcontact.component';

describe('MailcontactComponent', () => {
  let component: MailcontactComponent;
  let fixture: ComponentFixture<MailcontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailcontactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
