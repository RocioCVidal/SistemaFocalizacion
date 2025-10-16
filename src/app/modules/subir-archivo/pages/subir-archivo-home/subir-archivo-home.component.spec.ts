import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirArchivoHomeComponent } from './subir-archivo-home.component';

describe('SubirArchivoHomeComponent', () => {
  let component: SubirArchivoHomeComponent;
  let fixture: ComponentFixture<SubirArchivoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirArchivoHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirArchivoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
