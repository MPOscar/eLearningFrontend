import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
//
import { ConfirmDialogMessageComponent } from './components/confirm-dialog-message/confirm-dialog-message.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,    
    MatFormFieldModule,    
    MatInputModule,    
    TranslateModule.forChild(),    
  ],
  declarations: [
    ConfirmDialogMessageComponent
  ],
  exports: [
    ConfirmDialogMessageComponent
  ]
})
export class ConfirmDialogMessageModule {
}
