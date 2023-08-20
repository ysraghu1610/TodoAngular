import { Component, OnInit } from '@angular/core';
import { Todo } from '../list-of-todos/list-of-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number
  todo: Todo
  username : string

  constructor(private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router : Router) { }

  ngOnInit() {
    this.id  = this.route.snapshot.params['id']

    this.todo = new Todo(this.id, "text", false, new Date )

    if(this.id != -1) {
      console.log("getting data fro todo id ", this.id)
      this.todoService.retrieveTodo(this.username, this.id).subscribe(
        data => this.todo = data
      )
    }
  }

  saveTodo(username) {
    var newId  = this.route.snapshot.params['id']
    this.username = sessionStorage.getItem('authenticateUser')
    console.log("yogi reached saveTOdo and id is ", newId)
    console.log("yogi reached saveTOdo and todo is ", this.todo)
    console.log("yogi reached saveTOdo and username is ", this.username)

    if(newId === '0') {
      console.log("add todo")
      this.todoService.addTodo(this.username, this.todo).subscribe(
        response => console.log(response)
      )
    } else {
      console.log("update todo")
      this.todoService.saveTodo(this.username, this.id, this.todo).subscribe(
        response => console.log(response)
      )
    }
    this.router.navigate(['todos'])

  }

}
