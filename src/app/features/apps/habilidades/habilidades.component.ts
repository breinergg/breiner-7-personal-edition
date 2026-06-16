import { Component } from '@angular/core';

export type HabilidadesSheet = 'habilidades' | 'tecnologias';

export interface ChartSkill {
  technology: string;
  value: number;
  barTone: 'aspnet' | 'spring' | 'postgres' | 'angular' | 'flutter';
}

export interface TechnologyRow {
  category: string;
  technology: string;
  level: string;
  experience: string;
}

@Component({
  selector: 'app-habilidades',
  standalone: true,
  templateUrl: './habilidades.component.html',
  styleUrl: './habilidades.component.css'
})
export class HabilidadesComponent {
  readonly columnLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  readonly rowNumbers = Array.from({ length: 22 }, (_, index) => index + 1);

  readonly chartSkills: ChartSkill[] = [
    { technology: 'ASP.NET Core', value: 80, barTone: 'aspnet' },
    { technology: 'Spring Boot', value: 55, barTone: 'spring' },
    { technology: 'PostgreSQL', value: 50, barTone: 'postgres' },
    { technology: 'Angular', value: 60, barTone: 'angular' },
    { technology: 'Flutter', value: 55, barTone: 'flutter' }
  ];

  readonly technologyRows: TechnologyRow[] = [
    { category: 'Lenguaje', technology: 'Java', level: 'Intermedio', experience: '1 año' },
    { category: 'Lenguaje', technology: 'C#', level: 'Intermedio Avanzado', experience: '1 año' },
    { category: 'Lenguaje', technology: 'JavaScript', level: 'Intermedio', experience: '2 años' },
    { category: 'Lenguaje', technology: 'Dart', level: 'Intermedio', experience: '6 meses' },
    { category: 'Lenguaje', technology: 'SQL', level: 'Intermedio', experience: '2 años' },
    { category: 'Lenguaje', technology: 'HTML', level: 'Intermedio', experience: '2 años' },
    { category: 'Lenguaje', technology: 'CSS', level: 'Intermedio', experience: '2 años' },
    { category: 'Lenguaje', technology: 'C', level: 'Básico', experience: '6 meses' },
    { category: 'Lenguaje', technology: 'C++', level: 'Básico', experience: '1 año' },
    { category: 'Framework', technology: 'Spring Boot', level: 'Intermedio', experience: '1 año' },
    { category: 'Framework', technology: 'ASP.NET Core', level: 'Intermedio Avanzado', experience: '1 año' },
    { category: 'Framework', technology: 'Angular', level: 'Intermedio', experience: '6 meses' },
    { category: 'Framework', technology: 'Flutter', level: 'Intermedio', experience: '6 meses' },
    { category: 'Plataforma', technology: '.NET', level: 'Intermedio Avanzado', experience: '1 año' },
    { category: 'Base de Datos', technology: 'PostgreSQL', level: 'Intermedio', experience: '2 años' }
  ];

  activeSheet: HabilidadesSheet = 'habilidades';

  selectSheet(sheet: HabilidadesSheet) {
    this.activeSheet = sheet;
  }

  get formulaBarText(): string {
    return this.activeSheet === 'habilidades'
      ? 'Tecnologías principales'
      : 'Tecnologías';
  }

  barWidthPercent(value: number): number {
    return Math.max(0, Math.min(100, value));
  }

  getCellValue(row: number, col: number): string {
    if (this.activeSheet !== 'tecnologias') {
      return '';
    }

    if (row === 1) {
      if (col === 1) return 'Categoría';
      if (col === 2) return 'Tecnología';
      if (col === 3) return 'Nivel';
      if (col === 4) return 'Experiencia';
      return '';
    }

    const rowIndex = row - 2;
    if (rowIndex < 0 || rowIndex >= this.technologyRows.length) {
      return '';
    }

    const entry = this.technologyRows[rowIndex];
    if (col === 1) return entry.category;
    if (col === 2) return entry.technology;
    if (col === 3) return entry.level;
    if (col === 4) return entry.experience;
    return '';
  }

  isHeaderCell(row: number): boolean {
    return this.activeSheet === 'tecnologias' && row === 1;
  }

  getTecnologiasColumnClass(colIndex: number): string | null {
    if (this.activeSheet !== 'tecnologias' || colIndex > 3) {
      return null;
    }

    return ['excel-col--a', 'excel-col--b', 'excel-col--c', 'excel-col--d'][colIndex];
  }
}
