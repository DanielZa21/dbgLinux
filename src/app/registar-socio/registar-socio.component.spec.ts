import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarSocioComponent } from './registar-socio.component';

describe('RegistarSocioComponent', () => {
  let component: RegistarSocioComponent;
  let fixture: ComponentFixture<RegistarSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistarSocioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistarSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
