import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import * as $ from 'jquery';
import { of } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  tasks?: Task[];
  completedTasks?: Task[];
  currentTask: Task = {};
  currentIndex = -1;
  title = '';
  listSelect = -1;
  pass = '';
  count = 0;
  count2 = 0;
  randomTask: Task = {};

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.retrieveTasks();
  }

  retrieveTasks(): void {
    this.taskService.getAll()
      .subscribe(
        data => {
          this.tasks = data.filter(d => !d.isComplete);
          this.completedTasks = data.filter(d=> d.isComplete);
          console.log(this.tasks);
          console.log(this.completedTasks);
        },
        error => {
          console.log(error);
        });
  }

  filterList(data: any[]): void {
    this.tasks = data.filter(d => !d.isComplete);
    this.completedTasks = data.filter(d=> d.isComplete);
  }

  refreshList(): void {
    this.retrieveTasks();
    this.currentTask = {};
    this.currentIndex = -1;
  }

  setActiveTask(task: Task, index: number, isFirstList: boolean): void {
    this.listSelect = isFirstList ? 0 : 1;
    this.currentTask = task;
    this.currentIndex = index;
  }

  addRandomTasks(): void {
    $.ajax({
      url: "https://cat-fact.herokuapp.com/facts",
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
        function getRandomInt(min: number, max: number): number {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
        }
          var randomT = res[getRandomInt(0, 5)].text

          this.randomTask = {
            "title": "Random Task" + this.count2,
            "description": randomT,
            "responsible": "Eu",
            "email": "eu@me.com"
          }
          console.log(this.randomTask);
          this.count2++;
      }
  });
  this.saveBack(this.randomTask);
  }

  searchTitle(): void {
    this.currentTask = {};
    this.currentIndex = -1;

    this.taskService.findByTitle(this.title)
      .subscribe(
        data => {
          this.tasks = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  saveBack(data: Task): void {
    this.taskService.update(this.currentTask.id, data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  onComplete(task: Task): void {
    task.isComplete = true;

    this.saveBack(task);

    this.tasks?.map((taskToUpdate, index)=> { 
      if(taskToUpdate===task) {
        this.completedTasks?.push(task);
        this.tasks?.splice(index, 1);
      }});
    console.log(this.tasks);
    this.currentTask = {};
    this.currentIndex = -1;
  }

  checkPwd(): void {
    var pwd = (<HTMLInputElement>document.getElementById("pass")).value;
    var passCorrect = (pwd === "TrabalheNaSaipos")
    if (passCorrect) {
      this.count++;
      this.unCheck(this.currentTask);
    }
  }

  unCheck(task: Task): void {
    task.isComplete = false;

      this.saveBack(task);

    this.completedTasks?.map((taskToUpdate, index)=> { 
      if(taskToUpdate===task) {
        this.tasks?.push(task);
        this.completedTasks?.splice(index, 1);
      }});
    console.log(this.completedTasks);
    this.currentTask = {};
    this.currentIndex = -1;
  }

}
