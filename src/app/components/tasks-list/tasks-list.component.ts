import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskServiceDog } from 'src/app/services-dog/task.service.dog';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  taskRandom: Task = {
    title: 'Random Dog Fact ',
    description: '',
    responsible: 'Eu',
    email: 'eu@me.com',
    isComplete: false,
    published: false
  };

  tasks?: Task[];
  completedTasks?: Task[];
  currentTask: Task = {};
  currentIndex = -1;
  title = '';
  listSelect = -1;
  pass = '';
  count = 0;
  // count2 = 0;
  // randomTask: Task = {};

  constructor(private taskService: TaskService, private taskServiceDog: TaskServiceDog) {}

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

  saveRandomTask(t: number, msg: string): void {
    const data = {
      title: this.taskRandom.title + t.toString(),
      description: msg,
      responsible: this.taskRandom.responsible,
      email: this.taskRandom.email,
      isComplete: this.taskRandom.isComplete
    };
    // console.log(data);
    this.createTasks(data);
    this.refreshList();
  }

  createTasks(data: Task): void {
      this.taskService.create(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  addRandomTasks(): void {
    this.taskServiceDog.getDogTask('dog', 3).subscribe(
      response => {
        for (var i = 0; i < 3; i++) {
          this.saveRandomTask(i, response[i].text);
        }
      },
      error => {
        console.log(error);
      });
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
