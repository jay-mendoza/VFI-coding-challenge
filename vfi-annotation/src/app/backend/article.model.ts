import { AnnotationModel } from './annotation.model';

/**
 * Model class 'ArticleModel' for article in localStorage.
 */
export class ArticleModel {

    /** ID of the Article */
    public id: string;

    /** Title of the Article. */
    public title: string; 

    /** Body of the Article. */
    public body: string;

    /** Collection of AnnotationModel objects. */
    public annotations: AnnotationModel[];

    /**
     * Initializes a new instance of ArticleModel object.
     * @param {Partial<ArticleModel>} init Used in assigning instantiation values.
     */
    public constructor(init?: Partial<ArticleModel>) {
        Object.assign(this, init);
    }
}
