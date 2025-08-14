import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

type Filter = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-filters',
  imports: [CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  @Input() filter: Filter = 'all';
  @Output() filterChange = new EventEmitter<Filter>();

  onChange(f: Filter) {
    if (this.filter !== f) this.filterChange.emit(f);
  }
}
