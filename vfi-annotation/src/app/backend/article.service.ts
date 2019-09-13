import { Injectable } from '@angular/core';
import { ArticleModel } from './article.model';

@Injectable({ providedIn: 'root' })
/**
 * Article Service class used in managing localStorage database.
 */
export class ArticleService {

    /**
     * Initializes a new instance of ArticleService class.
     */
    constructor() { }

    getArticle(id?: string): ArticleModel {
        return new ArticleModel();
    }
}
