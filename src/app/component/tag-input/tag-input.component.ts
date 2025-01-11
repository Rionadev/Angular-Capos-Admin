import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss'],
})
export class TagInputComponent {
  @Input() tags: string[] = []; // Receive initial tags from parent
  @Output() tagsChange = new EventEmitter<string[]>(); // Emit updated tags to parent
  tagInput: string = '';

  addTag(event: KeyboardEvent) {
    event.preventDefault();
    if (this.tagInput.trim() && !this.tags.includes(this.tagInput)) {
      this.tags.push(this.tagInput.trim());
      this.tagInput = '';
    }
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  removeLastTag() {
    if (!this.tagInput && this.tags.length) {
      this.tags.pop();
    }
  }
}

/* <app-tag-input [(tags)]="currentRow.tag" (tagsChange)="currentRow.tag = $event"></app-tag-input> */