import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from 'src/app/list-of-todos/list-of-todos.component';
import { API_URL } from 'src/app/app.constants';
import { API_URL_JPA } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http: HttpClient
  ) { }

  public retrieveAllTodosForUser(username) {
    return this.http.get<Todo[]>(`${API_URL_JPA}/user/${username}/todos`)}

  public deleteTodo(username, id) {
    return this.http.delete(`${API_URL_JPA}/user/${username}/todos/${id}`)}

  public retrieveTodo(username, id) {
    return this.http.get<Todo>(`${API_URL_JPA}/user/${username}/todos/${id}`)}

  public saveTodo(username, id, todo) {
    return this.http.put(`${API_URL_JPA}/user/${username}/todos/${id}`, todo)
  }

  public addTodo(username, todo) {
    return this.http.post(`${API_URL_JPA}/user/${username}/todos`, todo)
  }
}
