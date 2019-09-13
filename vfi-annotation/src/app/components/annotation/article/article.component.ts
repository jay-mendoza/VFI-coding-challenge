import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../backend/article.service'
import { ArticleModel } from '../../../backend/article.model'

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.less']
})

/** 
 * ArticleComponent for displaying the article content.
 */
export class ArticleComponent implements OnInit {
    htmlArticle: string;
    article: ArticleModel;

    /**
     * Initializes a new instance of ArticleComponent component.
     */
    constructor(private articleService: ArticleService) { }

    /**
     * OnInit life cycle hook. Called after constructor and the first OnChanges hook.
     */
    ngOnInit() {
    }

    private composeHtmlFromArticleString() {
        this.article = this.articleService.getArticle();
        let words: string[] = this.article.body.split(" ");
        words.map(word => `<span>${word}&nbps;</span>`);

        // TODO: add highlights and annotations based on word indexes
        // TODO: use for loop instead of the above "map"

        this.htmlArticle = words.join('');
    }


}
