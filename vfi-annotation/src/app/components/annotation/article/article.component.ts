import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../../../backend/article.service';
import { AuthenticationService } from '../../../backend/authentication.service';

import { ArticleModel } from '../../../backend/article.model'
import { AnnotationModel } from '../../../backend/annotation.model';

import { AnnotationComponent } from '../annotation/annotation.component';
import { AnnotateDialog } from '../../annotation/annotate-dialog.interface';

import { MatButtonToggleChange } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';

export interface Word {
    word: string;
    isAnnotated: boolean;
    annotationId: string;
    isTagged: boolean;
}

export interface AnnotatedIndex {
    id: string;
    index: number;
    tags: string[];
}

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.less']
})

/** 
 * Article Component for displaying the article content.
 */
export class ArticleComponent implements OnInit {
    /** ArticleModel instance of this page. */
    article: ArticleModel;

    /** Collection of Words for storing words in an article. */
    words: Word[] = [];

    /** Collection of AnnotatedIndexes for storing all index numbers that are annotated. */
    annotatedIndexes: AnnotatedIndex[] = [];

    /** Collection of string for storing all unique tag names. */
    allUniqueTags: string[] = [];    

    /** Used to store selected tag name for filtering by tag. */
    selectedTag: string;

    /** String value used if no tag is selected from the Button Toggle. */
    noTag: string = "(show all)";

    /**
     * Initializes a new instance of ArticleComponent component.
     * @param articleService 
     * @param authService Injects AuthenticationService instance for authentication functions.
     * @param dialog 
     */
    constructor(private articleService: ArticleService, private authService: AuthenticationService,
        public dialog: MatDialog) { }

    /**
     * OnInit life cycle hook. Called after constructor and the first OnChanges hook.
     */
    ngOnInit() {
        this.selectedTag = this.noTag;
        this.renderArticle();
    }

    /**
     * Re-renders the article filtered by tag name.
     * @param {MatButtonToggleChange} event Event caller.
     */
    tagSelectionChange(event: MatButtonToggleChange): void {
        this.selectedTag = event.value;
        this.renderArticle();
    }

    /**
     * Renders the article. Also initializes all unique tags.
     */
    renderArticle(): void {
        //this.articleService.resetDatabase();
        this.article = this.articleService.readArticle('lorem-ipsum');

        let allTags: string[] = [];

        this.article.annotations.forEach((annotation: AnnotationModel) => {
            for (let i = annotation.startIndex; i <= annotation.finalIndex; i++) {
                this.annotatedIndexes.push({ index: i, id: annotation.id, tags: annotation.tag });
            }
            allTags.push(...annotation.tag);
        });

        this.allUniqueTags = [...new Set(allTags)];

        this.article.body.split(' ').forEach((word: string, index: number) => {
            let aIndex: AnnotatedIndex = this.annotatedIndexes.find((x: AnnotatedIndex) => x.index === index);

            if (aIndex) {
                this.words[index] = {
                    isAnnotated: true,
                    word: word,
                    annotationId: aIndex.id,
                    isTagged: aIndex.tags.includes(this.selectedTag) || this.selectedTag == this.noTag
                }
            } else {
                this.words[index] = {
                    isAnnotated: false,
                    word: word,
                    annotationId: '',
                    isTagged: false
                }
            }
        });
    }

    /**
     * Opens the AnnotationComponent Dialog.
     */
    openDialog(): void {
        let selection: Selection = window.getSelection();

        /** If selection is invalid, do nothing */
        if (selection.focusNode.parentElement.tagName.toUpperCase() !== 'SPAN') {
            return;
        }

        let startElement: HTMLElement = selection.anchorNode.parentElement;
        let finalElement: HTMLElement = selection.focusNode.parentElement;

        let start: number = parseInt(startElement.id.substring(3));
        let final: number = parseInt(finalElement.id.substring(3));

        let selectedIndexes: number[] = [];
        for (let i = start; i <= final; i++) {
            selectedIndexes.push(i);
        }

        let aIndex: AnnotatedIndex = this.annotatedIndexes.find((x: AnnotatedIndex) => selectedIndexes.includes(x.index));

        /** IF selected is already annotated. */
        if (aIndex) {

            let selectedAnnotation: AnnotationModel = this.article.annotations.find((a: AnnotationModel) => a.id == aIndex.id);

            let words: string[] = [];

            for (let i: number = selectedAnnotation.startIndex; i <= selectedAnnotation.finalIndex; i++) {
                words.push(this.words[i].word);
            }

            let selecteDialogData: AnnotateDialog = {
                annotation: selectedAnnotation,
                highlightedText: words.join('\xa0'),
                currentUser: this.authService.retrieveUsername(),
                isExistingAnnotation: true,
                allUniqueTags: this.allUniqueTags,
                delete: false
            };

            const selectedReturnValue = this.dialog.open(AnnotationComponent, {
                data: selecteDialogData
            });

            selectedReturnValue.afterClosed().subscribe((result: AnnotateDialog) => {
                if (result) {
                    if (result.delete === true) {
                        this.articleService.deleteAnnotation(this.article.id, result.annotation.id);
                    } else {
                        this.articleService.updateAnnotation(this.article.id, result.annotation);
                    }

                    window.location.reload();
                }
            });

            return;
        }

        /** ELSE, if selected is NOT annotated, ask for annotation */

        let highlightedText: string = window.getSelection().toString();

        if (start === final) {
            highlightedText = startElement.innerText;
        } else {
            highlightedText = startElement.innerText
                + highlightedText.substring(highlightedText.indexOf('\xa0'), highlightedText.lastIndexOf('\xa0') + 1)
                + finalElement.innerText;
        }

        let annotation: AnnotationModel = {
            id: `${start}-${final}`,
            author: this.authService.retrieveUsername(),
            comment: '',
            startIndex: start,
            finalIndex: final,
            tag: []
        };

        let dialogData: AnnotateDialog = {
            annotation: annotation,
            highlightedText: highlightedText,
            currentUser: this.authService.retrieveUsername(),
            isExistingAnnotation: false,
            allUniqueTags: this.allUniqueTags,
            delete: false
        };

        const returnValue = this.dialog.open(AnnotationComponent, {
            data: dialogData
        });

        returnValue.afterClosed().subscribe((result: AnnotateDialog) => {
            if (result) {
                this.articleService.addAnnotation(this.article.id, result.annotation);
                window.location.reload();
            }
        });
    }
}
