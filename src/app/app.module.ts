import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { ModalComponent } from './components/modal/modal.component';
// import { TasksListCompleteComponent } from './components/tasks-complete-list/tasks-complete-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    TaskDetailsComponent,
    TasksListComponent,
    ModalComponent,
    // TasksListCompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
