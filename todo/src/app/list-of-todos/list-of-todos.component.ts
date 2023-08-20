import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo {
  constructor(
    public id : number,
    public description : string,
    public done : boolean,
    public targetDate : Date
  ) {

  }
}

@Component({
  selector: 'app-list-of-todos',
  templateUrl: './list-of-todos.component.html',
  styleUrls: ['./list-of-todos.component.css']
})
export class ListOfTodosComponent implements OnInit {

   message : string
   todos = []
  //   new Todo(1, 'visit temple', false, new Date()),
  //   new Todo(2, 'go to mall', false, new Date()),
  //   new Todo(3, 'visit doctor', false, new Date()),

    // {'id': 1, 'description':'visit temple' },
    // {'id': 2, 'description':'go to mall' },
    // {'id': 3, 'description':'visit doctor' },
  //]
  constructor(private todoService: TodoDataService,
    private router : Router) { }

  ngOnInit() {
   this.refreshTodos()
  }

  refreshTodos() {
    this.todoService.retrieveAllTodosForUser("in28minutes").subscribe(
      response => {
        console.log("response ", response)
        this.todos = response
      }
    )
  }

  deleteTodo(id) {
    console.log('delete todo', id)
    this.todoService.deleteTodo("in28minutes", id).subscribe(
      response => {
        console.log("user deleted ", response)
        this.message  = "deleted successfully"
        this.refreshTodos()
      }
    )
  }

  updateTodo(id) {
    console.log('update todo', id)
    this.router.navigate(['todo', id])
  }

  addTodo() {
    console.log('add todo')
    this.router.navigate(['todo', 0])
  }

}
