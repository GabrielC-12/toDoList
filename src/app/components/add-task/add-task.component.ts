import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  task: Task = {
    title: '',
    description: '',
    responsible: '',
    email: '',
    isComplete: false,
    published: false
  };
  submitted = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  saveTask(): void {
    const data = {
      title: this.task.title,
      description: this.task.description,
      responsible: this.task.responsible,
      email: this.task.email,
      isComplete: this.task.isComplete
    };

    this.taskService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTask(): void {
    this.submitted = false;
    this.task = {
      title: '',
      description: '',
      responsible: '',
      email: '',
      isComplete: false,
      published: false
    };
  }

}
