import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
// import { TasksListCompleteComponent } from './components/tasks-complete-list/tasks-complete-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksListComponent },
  { path: 'tasks/:id', component: TaskDetailsComponent },
  { path: 'add', component: AddTaskComponent },
  // { path: 'complete', component: TasksListCompleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
