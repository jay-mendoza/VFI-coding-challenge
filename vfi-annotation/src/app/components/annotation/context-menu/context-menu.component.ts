import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AnnotateDialog } from '../../annotation/annotate-dialog.interface';

@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.less']
})
export class ContextMenuComponent {

    comment: string;

    constructor(public dialogRef: MatDialogRef<ContextMenuComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AnnotateDialog) {
    }

    onNoClick(): void {
        this.dialogRef.close();
      }

}

    
