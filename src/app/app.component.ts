import { Component } from '@angular/core';
import { EditedTask, Task } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workshop32-revision';

  tasks: Task[] = []

  selectedTask!: Task
  currentIndex!: number

  newTaskData(task: Task) {
    this.tasks.push(task)
  }

  editingTask(idx: number) {
    this.selectedTask = this.tasks[idx]
    this.currentIndex = idx
  }

  editedTaskData(task: Task) {
    this.tasks[this.currentIndex] = task
  }
}
