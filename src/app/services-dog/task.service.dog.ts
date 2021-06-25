import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

const baseUrl = 'https://cat-fact.herokuapp.com/facts';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceDog {

  constructor(private http: HttpClient) { }

  getDogTask(animal: string, count: number): Observable<any> {
    return this.http.get(`${baseUrl}/random?animal_type=${animal}&amount=${count}`);
  }
}
