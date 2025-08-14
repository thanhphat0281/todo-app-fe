import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {



  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.apiUrl);
  }

  addTodo(title: string): Observable<Todo> {
    return this.http.post<Todo>(environment.apiUrl, { title });
  }

  updateTodo(id: string, update: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${environment.apiUrl}/${id}`, update);
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${id}`);
  }

}
