import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GenericDialogComponent } from '../components/generic-dialog/generic-dialog.component';
import { DialogData } from '../models/DialogData/DialogData';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DialogLoginService {
	constructor(public dialog: MatDialog) {}

	open(dialogData: DialogData) {
		return this.dialog.open(GenericDialogComponent, { width: dialogData.width, data: dialogData, autoFocus: false });
	}

	openLogin(loginData) {
		return this.dialog.open(LoginDialogComponent, {
			data: loginData,
			closeOnNavigation: false,
			hasBackdrop: true,
            disableClose: true,
            autoFocus: false
		});
	}

	openFromComponent(component, width, dialogData?: Subject<any>) {
		return this.dialog.open(component, { width: width, data: dialogData, autoFocus: false });
	}
}
