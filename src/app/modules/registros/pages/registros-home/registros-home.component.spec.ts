import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosHomeComponent } from './registros-home.component';

describe('RegistrosHomeComponent', () => {
  let component: RegistrosHomeComponent;
  let fixture: ComponentFixture<RegistrosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrosHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
