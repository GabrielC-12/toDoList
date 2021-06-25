import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskServiceEmail } from 'src/app/services-email/task.services.email';
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
  isEmailValid?: boolean;

  constructor(private taskService: TaskService, private taskServiceEmail: TaskServiceEmail) { }

  ngOnInit(): void {
  }

  validateTask(data: any): void {
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

  saveTask(): void {
    this.isEmailValid = false;
    const data = {
      title: this.task.title,
      description: this.task.description,
      responsible: this.task.responsible,
      email: this.task.email,
      isComplete: this.task.isComplete
    };

    if (data.title !== '' && data.description !== '' 
    && data.responsible !== '' && data.email != '') {

    this.taskServiceEmail.checkEmail(data.email).subscribe(
      response => {
        console.log(response);
        if (response.hasOwnProperty('format_valid')) {
          this.submitted = true;
          this.validateTask(data);
        }
        else {
          alert('Email Invalid.');
        }
      },
      error => {
        console.log(error);
        alert('Email Invalid.');
      });
    }

    
      else alert('Complete all the fields.');
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
