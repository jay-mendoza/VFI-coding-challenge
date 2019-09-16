import { ArticleModel } from './article.model';

/**
 * Model class 'ArticlesModel' for all articles.
 */
export class ArticlesModel {

    /** Collection of ArticleModel objects. */
    public articles: ArticleModel[];

    /**
     * Initializes a new instance of ArticlesModel object.
     * @param {Partial<ArticlesModel>} init Used in assigning instantiation values.
     */
    public constructor(init?: Partial<ArticlesModel>) {
        Object.assign(this, init);
    }
}
