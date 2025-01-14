import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../component/toast/toast.component';

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule],
  exports: [ToastComponent] // Export it for use in other modules
})
export class SharedModule {}