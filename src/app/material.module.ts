import { NgModule } from '@angular/core';
import { MatProgressBarModule, MatListModule, MatIconModule, MatCardModule } from '@angular/material';

@NgModule({
  exports: [
    MatProgressBarModule,
    MatIconModule,
    MatCardModule
  ]
})
export class MaterialModule { }
