import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  showTaskForm = false;
  showTasksModal = false;
  taskForm: FormGroup;
  tasks: any[] = [];
  username: string | null = null; // Username property

  constructor(
    private fb: FormBuilder,
    private appService: AppService
  ) {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Load username from localStorage
    this.username = localStorage.getItem('name');

    // Check if username is present and load tasks
    if (this.username) {
      this.loadTasks();
    } else {
      console.error('Username not found');
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid && this.username) {
      const taskData = { ...this.taskForm.value, username: this.username };
      this.appService.addTask(taskData).subscribe(response => {
        if (response) {
          this.loadTasks();
          this.showTaskForm = false;
          this.taskForm.reset();
        } else {
          console.error('Task not added');
        }
      }, error => {
        console.error('Error adding task: ', error);
      });
    } else {
      console.error('Task form is invalid or username is missing');
    }
  }

  loadTasks(): void {
    if (this.username) {
      this.appService.getTasksByUsername(this.username).subscribe(tasks => {
        this.tasks = tasks;
      }, error => {
        console.error('Error fetching tasks: ', error);
      });
    } else {
      console.error('Username is missing');
    }
  }

  showTasks(): void {
    this.loadTasks();
    this.showTasksModal = true;
  }

  deleteTask(taskId: string): void {
    this.appService.deleteTask(taskId).subscribe(() => {
      this.loadTasks(); // Reload tasks after deletion
    });
  }
}
