import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.css',
})
export class TodoInputComponent {
  @Output() add = new EventEmitter<string>();
  title = '';

  submit() {
    const value = this.title.trim();
    if (value) {
      this.add.emit(value);
      this.title = '';
    }
  }
}
