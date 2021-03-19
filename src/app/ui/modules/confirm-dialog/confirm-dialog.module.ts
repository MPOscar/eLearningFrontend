import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { TranslateModule } from '@ngx-translate/core';
//
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [
    ConfirmDialogComponent
  ],
  exports: [
    ConfirmDialogComponent
  ]
})
export class ConfirmDialogModule {
}
