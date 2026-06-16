import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterModule.forRoot([])],
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the login screen', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.login-screen')).toBeTruthy();
  });

  it('should display the user name', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.username')?.textContent?.trim()).toBe('Breiner Gonzalez Machado');
  });

  it('should display the brand text', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const brandText = compiled.querySelector('.brand-text')?.textContent?.trim();
    expect(brandText).toContain('Breiner');
    expect(brandText).toContain('Personal Edition');
  });

  it('should show user card initially and not loading', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.user-card')).toBeTruthy();
    expect(compiled.querySelector('.loading-container')).toBeFalsy();
  });

  it('should show loading state after clicking user', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    fixture.componentInstance.selectUser();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.user-card')).toBeFalsy();
    expect(compiled.querySelector('.loading-container')).toBeTruthy();
    expect(compiled.querySelector('.loading-text')?.textContent?.trim()).toBe('Iniciando...');
  });

  it('should change text to "Preparando el escritorio..." after 1.5s', fakeAsync(() => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    fixture.componentInstance.selectUser();
    tick(1500);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading-text')?.textContent?.trim()).toBe('Preparando el escritorio...');
  }));

  it('should navigate to /desktop after 3s', fakeAsync(() => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    spyOn(router, 'navigate');
    fixture.componentInstance.selectUser();
    tick(3000);
    expect(router.navigate).toHaveBeenCalledWith(['/desktop']);
  }));

  it('should toggle power menu', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    const event = new Event('click');
    app.togglePowerMenu(event);
    expect(app.showPowerMenu).toBeTrue();
    app.togglePowerMenu(event);
    expect(app.showPowerMenu).toBeFalse();
  });

  it('should select language', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    app.selectLanguage({ code: 'EN', name: 'Inglés' });
    expect(app.selectedLanguage).toBe('EN');
    expect(app.showLanguageMenu).toBeFalse();
  });
});
