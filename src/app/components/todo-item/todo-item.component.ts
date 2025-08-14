import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
  @Output() updateTitle = new EventEmitter<{ id: string; title: string }>();

  editing = false;
  draft = '';

  startEdit() {
    this.draft = this.todo.title;
    this.editing = true;
    // tip: có thể dùng setTimeout + focus nếu muốn auto focus input
  }

  save() {
    this.editing = false;
    if (this.draft !== this.todo.title) {
      this.updateTitle.emit({ id: this.todo._id, title: this.draft });
    }
  }
}
