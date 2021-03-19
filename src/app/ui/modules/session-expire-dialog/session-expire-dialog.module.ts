import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
//
import { SessionExpireDialogComponent } from './components/session-expire-dialog/session-expire-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        TranslateModule.forChild()
    ],
    declarations: [
        SessionExpireDialogComponent
    ],
    exports: [
        SessionExpireDialogComponent
    ]
})
export class SessionExpireDialogModule {}
