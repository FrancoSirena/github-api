import { NgModule } from '@angular/core';
import {
  MatProgressBarModule, MatListModule, MatIconModule, MatCardModule, MatSnackBarModule,
  MatTooltipModule, MatButtonModule
} from '@angular/material';

@NgModule({
  exports: [
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatButtonModule,
    MatListModule
  ]
})
export class MaterialModule { }
