import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarClasesComponent } from './registar-clases.component';

describe('RegistarClasesComponent', () => {
  let component: RegistarClasesComponent;
  let fixture: ComponentFixture<RegistarClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistarClasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistarClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
