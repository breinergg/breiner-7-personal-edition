import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { DesktopComponent } from './desktop.component';

describe('DesktopComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the desktop screen', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.desktop-screen')).toBeTruthy();
  });

  it('should render the taskbar', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.taskbar')).toBeTruthy();
    expect(compiled.querySelectorAll('.taskbar-app').length).toBe(3);
  });

  it('should render desktop icons', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const icons = compiled.querySelectorAll('.desktop-icon');
    expect(icons.length).toBe(10);
  });

  it('should render the start button with BGM7 logo only', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const startButton = compiled.querySelector('.start-button');
    expect(startButton).toBeTruthy();
    expect(startButton?.querySelector('.start-logo')).toBeTruthy();
    expect(startButton?.querySelector('.start-text')).toBeFalsy();
  });

  it('should update time and date on init', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    
    expect(component.currentTime).toBeTruthy();
    expect(component.currentDate).toBeTruthy();
    expect(component.currentTime).toMatch(/^\d{2}:\d{2}$/); // HH:MM format
    expect(component.currentDate).toMatch(/^\d{2}\/\d{2}\/\d{4}$/); // DD/MM/YYYY format
  });

  it('should display current time in the clock', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const clockTime = compiled.querySelector('.clock-time');
    expect(clockTime).toBeTruthy();
    expect(clockTime?.textContent).toMatch(/^\d{2}:\d{2}$/);
  });

  it('should display current date in the clock', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const clockDate = compiled.querySelector('.clock-date');
    expect(clockDate).toBeTruthy();
    expect(clockDate?.textContent).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });

  it('should clear interval on destroy', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    
    spyOn(window, 'clearInterval');
    component.ngOnDestroy();
    expect(clearInterval).toHaveBeenCalled();
  });

  it('should render draggable desktop icons with pointer handlers', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const icon = compiled.querySelector('.desktop-icon') as HTMLElement;
    expect(icon).toBeTruthy();
    expect(compiled.querySelector('.desktop-icons')).toBeTruthy();
  });

  it('should snap icon to grid and persist positions', () => {
    localStorage.removeItem('breiner7-desktop-icon-positions');
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const icon = component.desktopIcons[0];
    const mockTarget = {
      setPointerCapture: jasmine.createSpy('setPointerCapture'),
      releasePointerCapture: jasmine.createSpy('releasePointerCapture')
    };

    component.onIconPointerDown({
      button: 0,
      clientX: 50,
      clientY: 50,
      pointerId: 1,
      currentTarget: mockTarget,
      preventDefault: () => undefined
    } as unknown as PointerEvent, icon);

    component.onIconPointerMove({
      clientX: 250,
      clientY: 250,
      currentTarget: mockTarget
    } as unknown as PointerEvent, icon);

    component.onIconPointerUp({
      pointerId: 1,
      currentTarget: mockTarget
    } as unknown as PointerEvent, icon);

    expect(icon.left % 96).toBe(16);
    expect(icon.top % 96).toBe(16);
    expect(JSON.parse(localStorage.getItem('breiner7-desktop-icon-positions') ?? '{}')[icon.id]).toEqual({
      left: icon.left,
      top: icon.top
    });
  });

  it('should open Mi Historia window on doc icon double click', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const docIcon = component.desktopIcons.find(icon => icon.type === 'doc');

    expect(docIcon).toBeTruthy();
    expect(component.historiaWindow.isOpen).toBeFalse();

    component.onIconDoubleClick({ preventDefault: () => undefined, stopPropagation: () => undefined } as MouseEvent, docIcon!);

    expect(component.historiaWindow.isOpen).toBeTrue();
    expect(component.historiaWindow.isMinimized).toBeFalse();

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-win7-window')).toBeTruthy();
    expect(compiled.querySelector('.word-title')?.textContent?.trim()).toBe('Mi Historia');
  });

  it('should open Mi Historia window on mobile single tap', () => {
    spyOn(window, 'matchMedia').and.returnValue({
      matches: true,
      media: '',
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false
    } as MediaQueryList);

    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const docIcon = component.desktopIcons.find(icon => icon.type === 'doc');

    const tapEvent = {
      button: 0,
      pointerType: 'touch',
      clientX: 40,
      clientY: 40,
      preventDefault: () => undefined,
      stopPropagation: () => undefined,
      currentTarget: {
        setPointerCapture: () => undefined,
        releasePointerCapture: () => undefined
      }
    } as unknown as PointerEvent;

    component.onIconPointerDown(tapEvent, docIcon!);
    component.onIconPointerUp(tapEvent, docIcon!);
    expect(component.historiaWindow.isOpen).toBeTrue();
  });

  it('should open Contacto window on msg icon double click', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const contactIcon = component.desktopIcons.find(icon => icon.type === 'msg');

    expect(contactIcon).toBeTruthy();
    expect(component.contactoWindow.isOpen).toBeFalse();

    component.onIconDoubleClick({ preventDefault: () => undefined, stopPropagation: () => undefined } as MouseEvent, contactIcon!);

    expect(component.contactoWindow.isOpen).toBeTrue();

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-contacto')).toBeTruthy();
    expect(compiled.textContent).toContain('Breiner Gonzalez Machado');
    expect(compiled.textContent).toContain('breinerftwyts@gmail.com');
  });

  it('should open file explorer at disco local from taskbar', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    expect(component.explorerWindow.isOpen).toBeFalse();

    const explorerBtn = fixture.nativeElement.querySelector('.taskbar-app-icon--explorer')?.closest('button') as HTMLButtonElement;
    explorerBtn.click();
    fixture.detectChanges();

    expect(component.explorerWindow.isOpen).toBeTrue();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Disco local (C:)');
    expect(compiled.textContent).toContain('555 GB');
    expect(compiled.textContent).toContain('Usuarios');
  });

  it('should open Proyectos FullStack window on folder icon double click', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const folderIcon = component.desktopIcons.find(icon => icon.type === 'folder');

    expect(folderIcon?.label).toBe('Proyectos FullStack');
    expect(component.proyectosWindow.isOpen).toBeFalse();

    component.onIconDoubleClick({ preventDefault: () => undefined, stopPropagation: () => undefined } as MouseEvent, folderIcon!);

    expect(component.proyectosWindow.isOpen).toBeTrue();

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-proyectos-fullstack')).toBeTruthy();
    expect(compiled.textContent).toContain('PreviDocs.docx');
    expect(compiled.textContent).toContain('Gonzai.docx');
  });

  it('should open PreviDocs document window from explorer double click', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    component.onExplorerDocumentOpen('previdocs');
    fixture.detectChanges();

    expect(component.previdocsWindow.isOpen).toBeTrue();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-previdocs')).toBeTruthy();
    expect(compiled.textContent).toContain('PreviDocs — Sistema Especializado de Gestión de Historias Clínicas');
    expect(compiled.textContent).toContain('Imágenes de demostración');
  });

  it('should open Gonzai document window from explorer double click', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const folderIcon = component.desktopIcons.find(icon => icon.type === 'folder');

    component.onIconDoubleClick({ preventDefault: () => undefined, stopPropagation: () => undefined } as MouseEvent, folderIcon!);
    fixture.detectChanges();

    component.onExplorerDocumentOpen('gonzai');
    fixture.detectChanges();

    expect(component.gonzaiWindow.isOpen).toBeTrue();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-gonzai')).toBeTruthy();
    expect(compiled.textContent).toContain('GonzAI — Sistema Inteligente de Gestión Empresarial');
    expect(compiled.textContent).toContain('Imágenes de demostración');
  });

  it('should show desktop items when Escritorio is selected in explorer', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const folderIcon = component.desktopIcons.find(icon => icon.type === 'folder');

    component.onIconDoubleClick({ preventDefault: () => undefined, stopPropagation: () => undefined } as MouseEvent, folderIcon!);
    fixture.detectChanges();

    const explorer = fixture.nativeElement.querySelector('app-proyectos-fullstack') as HTMLElement;
    expect(explorer.textContent).toContain('Gonzai.docx');
    expect(explorer.textContent).toContain('PreviDocs.docx');

    const navItems = explorer.querySelectorAll('.explorer-nav-item');
    (navItems[0] as HTMLElement).click();
    fixture.detectChanges();

    expect(explorer.textContent).toContain('Mi Historia.docx');
    expect(explorer.textContent).toContain('Contacto');
    expect(explorer.textContent).toContain('Galería');
    expect(explorer.textContent).toContain('Habilidades.xlsx');
    expect(explorer.textContent).toContain('Papelera de reciclaje');
  });

  it('should show empty Documentos and sample Imagenes in explorer', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const folderIcon = component.desktopIcons.find(icon => icon.type === 'folder');

    component.onIconDoubleClick({ preventDefault: () => undefined, stopPropagation: () => undefined } as MouseEvent, folderIcon!);
    fixture.detectChanges();

    const explorer = fixture.nativeElement.querySelector('app-proyectos-fullstack') as HTMLElement;
    const navItems = explorer.querySelectorAll('.explorer-nav-item');

    (navItems[2] as HTMLElement).click();
    fixture.detectChanges();
    expect(explorer.textContent).toContain('Esta carpeta está vacía');

    (navItems[3] as HTMLElement).click();
    fixture.detectChanges();
    expect(explorer.textContent).toContain('semillero.webp');
    expect(explorer.textContent).toContain('EL-TEAM-A.webp');

    (navItems[4] as HTMLElement).click();
    fixture.detectChanges();
    expect(explorer.textContent).toContain('555 GB');
    expect(explorer.textContent).toContain('445 GB disponibles');
  });

  it('should open Habilidades window on xls icon double click', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const xlsIcon = component.desktopIcons.find(icon => icon.type === 'xls');

    expect(xlsIcon?.label).toBe('Habilidades.xlsx');
    component.onIconDoubleClick({ preventDefault: () => undefined, stopPropagation: () => undefined } as MouseEvent, xlsIcon!);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-habilidades')).toBeTruthy();
    expect(compiled.textContent).toContain('Tecnologías principales');
    expect(compiled.textContent).toContain('ASP.NET Core');
    expect(compiled.textContent).toContain('PostgreSQL');

    const tabs = compiled.querySelectorAll('.excel-sheet-tab');
    (tabs[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(compiled.textContent).toContain('Tecnologías');
    expect(compiled.textContent).toContain('Base de Datos');
    expect(compiled.textContent).toContain('Intermedio Avanzado');
  });

  it('should open Galeria window on img icon double click', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const imgIcon = component.desktopIcons.find(icon => icon.type === 'img');

    expect(imgIcon?.label).toBe('Galería');
    component.onIconDoubleClick({ preventDefault: () => undefined, stopPropagation: () => undefined } as MouseEvent, imgIcon!);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-galeria')).toBeTruthy();
    expect(compiled.textContent).toContain('Semillero GIDSYC');
    expect(compiled.textContent).toContain('El Team A');
    expect(compiled.textContent).toContain('Inicios en la U');
  });

  it('should open CV pdf in new tab on pdf icon double click', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const pdfIcon = component.desktopIcons.find(icon => icon.type === 'pdf');

    expect(pdfIcon?.label).toBe('Hoja de Vida.pdf');
    spyOn(window, 'open');

    component.onIconDoubleClick({ preventDefault: () => undefined, stopPropagation: () => undefined } as MouseEvent, pdfIcon!);

    expect(window.open).toHaveBeenCalledWith('/hv/HOJA-DE-VIDA.pdf', '_blank', 'noopener,noreferrer');
  });

  it('should open GitHub profile from taskbar', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    spyOn(window, 'open');

    const githubBtn = fixture.nativeElement.querySelector('.taskbar-app-icon--github')?.closest('button') as HTMLButtonElement;
    githubBtn.click();

    expect(window.open).toHaveBeenCalledWith('https://github.com/breinergg', '_blank', 'noopener,noreferrer');
  });

  it('should open LinkedIn profile from taskbar', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    spyOn(window, 'open');

    const linkedInBtn = fixture.nativeElement.querySelector('.taskbar-app-icon--linkedin')?.closest('button') as HTMLButtonElement;
    linkedInBtn.click();

    expect(window.open).toHaveBeenCalledWith(
      'https://www.linkedin.com/in/breiner-gonzalez-machado-3a5961276',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('should open GitHub profile on desktop icon double click', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    spyOn(window, 'open');
    const githubIcon = component.desktopIcons.find(icon => icon.type === 'github');

    component.onIconDoubleClick({ preventDefault: () => undefined, stopPropagation: () => undefined } as MouseEvent, githubIcon!);

    expect(window.open).toHaveBeenCalledWith('https://github.com/breinergg', '_blank', 'noopener,noreferrer');
  });

  it('should open LinkedIn profile on desktop icon double click', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    spyOn(window, 'open');
    const linkedInIcon = component.desktopIcons.find(icon => icon.type === 'linkedin');

    component.onIconDoubleClick({ preventDefault: () => undefined, stopPropagation: () => undefined } as MouseEvent, linkedInIcon!);

    expect(window.open).toHaveBeenCalledWith(
      'https://www.linkedin.com/in/breiner-gonzalez-machado-3a5961276',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('should open Papelera window on bin icon double click', () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const binIcon = component.desktopIcons.find(icon => icon.type === 'bin');

    expect(binIcon?.label).toContain('Papelera');
    component.onIconDoubleClick({ preventDefault: () => undefined, stopPropagation: () => undefined } as MouseEvent, binIcon!);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-papelera')).toBeTruthy();
    expect(compiled.textContent).toContain('La papelera de reciclaje está vacía');
    expect(compiled.textContent).toContain('0 elementos');
  });

  it('should navigate to login after logout transition', fakeAsync(() => {
    const fixture = TestBed.createComponent(DesktopComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.logout();
    fixture.detectChanges();

    expect(component.isLoggingOut).toBeTrue();
    expect(fixture.nativeElement.querySelector('.logout-overlay')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.logout-text')?.textContent?.trim()).toBe('Cerrando sesión...');

    tick(1500);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.logout-text')?.textContent?.trim()).toBe('Preparando inicio de sesión...');

    tick(1200);
    expect(router.navigate).toHaveBeenCalledWith(['/'], { state: { fromLogout: true } });
  }));
});
