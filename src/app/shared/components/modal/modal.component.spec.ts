import { TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display title and message', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    fixture.componentInstance.titulo = 'Test Title';
    fixture.componentInstance.mensaje = 'Test Message';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-title')?.textContent).toBe('Test Title');
    expect(compiled.querySelector('.modal-message')?.textContent).toBe('Test Message');
  });

  it('should emit onAceptar when accept button is clicked', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    spyOn(fixture.componentInstance.onAceptar, 'emit');
    fixture.detectChanges();
    const btnAceptar = fixture.nativeElement.querySelector('.btn-primary') as HTMLButtonElement;
    btnAceptar.click();
    expect(fixture.componentInstance.onAceptar.emit).toHaveBeenCalled();
  });

  it('should emit onCancelar when cancel button is clicked', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    spyOn(fixture.componentInstance.onCancelar, 'emit');
    fixture.detectChanges();
    const btnCancelar = fixture.nativeElement.querySelector('.btn-secondary') as HTMLButtonElement;
    btnCancelar?.click();
    expect(fixture.componentInstance.onCancelar.emit).toHaveBeenCalled();
  });

  it('should emit onCancelar when close button is clicked', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    spyOn(fixture.componentInstance.onCancelar, 'emit');
    fixture.detectChanges();
    const btnClose = fixture.nativeElement.querySelector('.btn-close') as HTMLButtonElement;
    btnClose.click();
    expect(fixture.componentInstance.onCancelar.emit).toHaveBeenCalled();
  });

  it('should hide cancel button when mostrarCancelar is false', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    fixture.componentInstance.mostrarCancelar = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.btn-secondary')).toBeFalsy();
  });
});
