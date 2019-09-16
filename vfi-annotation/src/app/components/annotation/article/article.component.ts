import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../backend/article.service';
import { ArticleModel } from '../../../backend/article.model'
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { AnnotationModel } from 'src/app/backend/annotation.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AnnotateDialog } from '../../annotation/annotate-dialog.interface';
import { AuthenticationService } from '../../../backend/authentication.service';


@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.less']
})

/** 
 * ArticleComponent for displaying the article content.
 */
export class ArticleComponent implements OnInit {
    article: ArticleModel;
    words: string[];

    annotatedWordIndexes: number[] = [];

    /**
     * Initializes a new instance of ArticleComponent component.
     */
    constructor(private articleService: ArticleService, private authService: AuthenticationService,
        public dialog: MatDialog) { }

    /**
     * OnInit life cycle hook. Called after constructor and the first OnChanges hook.
     */
    ngOnInit() {
        this.composeHtmlFromArticleString();
    }


    private composeHtmlFromArticleString() {
        this.articleService.resetDatabase();
        this.article = this.articleService.readArticle('lorem-ipsum');        
        this.words = this.article.body.split(' ');
        
        this.article.annotations.forEach((annotation, index) => {
            for(let i = annotation.startIndex; i <= annotation.finalIndex; i++) {                             
                this.annotatedWordIndexes.push(i);
            }
        });
    }

    openDialog() {

        let selection: Selection = window.getSelection();
        
        /** Not valid selection */
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

        /** Already Annotated */
        if (this.annotatedWordIndexes.some(r=> selectedIndexes.includes(r))) {

            return;
        }

        let highlightedText: string = window.getSelection().toString();

        if (start === final) {
            highlightedText = startElement.innerText;
        }
        else {
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
            tag: ''
        };

        let dialogData: AnnotateDialog = {
            annotation: annotation,
            highlightedText: highlightedText
        };

        const returnValue = this.dialog.open(ContextMenuComponent, {
            data: dialogData
        });

        returnValue.afterClosed().subscribe((result: AnnotateDialog) => {
            if (result) {
                // TODO: save annotation to db
                // TODO: refresh page
                console.log(result.annotation.id);
            }            
          });
      }


}
