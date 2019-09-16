import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AnnotateDialog } from '../../annotation/annotate-dialog.interface';

@Component({
    selector: 'app-annotation',
    templateUrl: './annotation.component.html',
    styleUrls: ['./annotation.component.less']
})

/** 
 * Annotation Component for displaying annotation form.
 */
export class AnnotationComponent implements OnInit {

    /** UI Element for Tag Input */
    @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;

    /** UI Element for Auto Complete */
    @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

    /**UI-bound model. Used in comment field.  */
    comment: string;

    /** UI component state. Shows or hides the text in current password field. */
    title: string;

    /** Flag to check if the current user is the author of the current annotation. */
    userIsAuthor: boolean;

    /** Flag to check if the annotation is read-only (user is not authorized to change). */
    isReadOnly: boolean;

    /** Observable collection of string values of filtered tags (for auto-complete). */
    filteredTags: Observable<string[]>;

    /** Form control for the tag input field. */
    tagControl: FormControl = new FormControl();

    /** Keys used when a tag is to be added to the list. */
    separatorKeysCodes: number[] = [ENTER, COMMA];

    /**
     * Initializes a new instance of AnnotationComponent component.
     * @param {MatDialogRef<AnnotationComponent>} dialogRef MatDialogRef for passing back data.
     * @param {AnnotateDialog} data Injects AnnotateDialog for passing two way data.
     */
    constructor(public dialogRef: MatDialogRef<AnnotationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AnnotateDialog) {
    }

    /**
     * OnInit life cycle hook. Called after constructor and the first OnChanges hook.
     */
    ngOnInit(): void {
        this.userIsAuthor = this.data.annotation.author === this.data.currentUser;
        this.isReadOnly = this.data.isExistingAnnotation && !this.userIsAuthor;
        this.title = this.isReadOnly ? `Annotation by: ${this.data.annotation.author}` : 'Save Annotation and/or Highlight';

        this.filteredTags = this.tagControl.valueChanges.pipe(
            startWith(null),
            map((tag: string | null) => tag ? this._filterTag(tag) : this.data.allUniqueTags.slice()));
    }

    /**
     * Helper method to filter tags in auto-complete.
     * @param {string} value Value of the string to filter/
     */
    private _filterTag(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.data.allUniqueTags.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }

    /**
     * Add a tag to the input list. Also used in UI rendering.
     * @param {MatChipInputEvent} event Event caller.
     */
    add(event: MatChipInputEvent): void {
        if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;

            if ((value || '').trim()) { this.data.annotation.tag.push(value.trim()); }

            if (input) { input.value = ''; }

            this.tagControl.setValue(null);
        }
    }

    /**
     * Remove a tag from the input list.
     * @param {string} tag Tag to remove from the list.
     */
    remove(tag: string): void {
        const index = this.data.annotation.tag.indexOf(tag);
        if (index >= 0) { this.data.annotation.tag.splice(index, 1); }
    }

    /**
     * Function to call when a value is selected from the auto-complete list.
     * @param {MatAutocompleteSelectedEvent} event Event Caller.
     */
    selected(event: MatAutocompleteSelectedEvent): void {
        if (!this.data.annotation.tag.includes(event.option.viewValue)) {
            this.data.annotation.tag.push(event.option.viewValue);
        }
        this.tagInput.nativeElement.value = '';
        this.tagControl.setValue(null);
    }

    /**
     * Closes the dialog without saving changes.
     */
    onNoClick(): void {
        this.dialogRef.close();
    }

    /**
     * Closes the dialog with delete flag. Deletes the annotation.
     */
    onDelete(): void {
        this.data.delete = true;
        this.dialogRef.close(this.data);
    }
}
