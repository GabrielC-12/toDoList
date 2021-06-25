import { TestBed } from '@angular/core/testing';

import { TaskServiceEmail } from './task.services.email';

describe('TaskService', () => {
  let service: TaskServiceEmail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskServiceEmail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
