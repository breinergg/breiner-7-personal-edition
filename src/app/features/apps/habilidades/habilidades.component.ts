import { Component } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';

export type HabilidadesSheet = 'habilidades' | 'tecnologias';

export interface ChartSkill {
  technology: string;
  value: number;
  barTone: 'aspnet' | 'spring' | 'postgres' | 'angular' | 'flutter';
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

  activeSheet: HabilidadesSheet = 'habilidades';

  constructor(readonly lang: LanguageService) {}

  selectSheet(sheet: HabilidadesSheet) {
    this.activeSheet = sheet;
  }

  get formulaBarText(): string {
    const copy = this.lang.apps.habilidades;
    return this.activeSheet === 'habilidades' ? copy.mainTechnologies : copy.technologies;
  }

  barWidthPercent(value: number): number {
    return Math.max(0, Math.min(100, value));
  }

  getCellValue(row: number, col: number): string {
    if (this.activeSheet !== 'tecnologias') {
      return '';
    }

    const { columns, technologyRows } = this.lang.apps.habilidades;

    if (row === 1) {
      if (col === 1) return columns.category;
      if (col === 2) return columns.technology;
      if (col === 3) return columns.level;
      if (col === 4) return columns.experience;
      return '';
    }

    const dataRow = technologyRows[row - 2];
    if (!dataRow) {
      return '';
    }

    if (col === 1) return dataRow.category;
    if (col === 2) return dataRow.technology;
    if (col === 3) return dataRow.level;
    if (col === 4) return dataRow.experience;
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
