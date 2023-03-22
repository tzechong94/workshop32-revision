import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Task } from 'src/app/models';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnChanges {

  todoForm!: FormGroup

  constructor(private fb: FormBuilder) {}

  @Input()
  editTaskData!: Task

  @Output()
  taskData = new Subject<Task>

  @Output()
  editedTask = new Subject<Task>

  @Input()
  isEditing: boolean = false

  ngOnInit(): void {
     this.todoForm = this.createForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes, " changes")
      if (this.editTaskData && changes['editTaskData']) {
        if (changes['editTaskData'].currentValue != changes['editTaskData'].previousValue) {
          const selectedTask = changes['editTaskData'].currentValue
          this.todoForm.get('description')?.setValue(selectedTask.description)
          this.todoForm.get('due')?.setValue(selectedTask.due)
          this.todoForm.get('priority')?.setValue(selectedTask.priority)
          console.log("HELLO")
        }
      }
  }

  createForm(): FormGroup {
    return this.fb.group({
      description: this.fb.control<string>('', [Validators.required]),
      priority: this.fb.control<string>('', [Validators.required]),
      due: this.fb.control<Date>(new Date, [Validators.required]),
    })
  }

  addTask() {
    const task = this.todoForm.value as Task
    console.log("task ", task)
    // this.taskList.push(task)
    this.taskData.next(task)
    this.todoForm.reset()
  }

  finishEdit(){
    this.editedTask.next(this.todoForm.value as Task)
    this.todoForm.reset()
  }

}
