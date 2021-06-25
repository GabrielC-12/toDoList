import { TestBed } from '@angular/core/testing';

import { TaskServiceDog } from './task.service.dog';

describe('TaskService', () => {
  let service: TaskServiceDog;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskServiceDog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
