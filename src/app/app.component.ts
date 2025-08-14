import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from './models/todo.model';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { FiltersComponent } from './components/filters/filters.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoService } from './services/todo-service/todo.service';
import { HttpClientModule } from '@angular/common/http';

type Filter = 'all' | 'active' | 'completed';
@Component({
  selector: 'app-root',
    standalone: true,
  imports: [
    CommonModule,
    TodoInputComponent,
    FiltersComponent,
    TodoListComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  todos: Todo[] = [];
  filter: Filter = 'all';
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((data) => (this.todos = data));
  }

  filteredTodos() {
    if (this.filter === 'active') return this.todos.filter(t => !t.completed);
    if (this.filter === 'completed') return this.todos.filter(t => t.completed);
    return this.todos;
  }

  addTodo(title: string) {
    this.todoService.addTodo(title).subscribe(newTodo => this.todos.unshift(newTodo));
  }

  toggleTodo(id: string) {
    const todo = this.todos.find(t => t._id === id || t._id === id);
    if (!todo) return;
    this.todoService.updateTodo(id, { completed: !todo.completed }).subscribe(updated => {
      this.todos = this.todos.map(t => t._id === id ? updated : t);
    });
  }

  removeTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(t => t._id !== id);
    });
  }

  updateTitle(id: string, title: string) {
    this.todoService.updateTodo(id, { title }).subscribe(updated => {
      this.todos = this.todos.map(t => t._id === id ? updated : t);
    });
  }

  setFilter(f: Filter) {
    this.filter = f;
  }
}
