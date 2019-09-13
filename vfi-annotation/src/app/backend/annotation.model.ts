/**
 * Model class 'ArticleModel' for article in localStorage.
 */
export class AnnotationModel {

    /** Author (username) of the Annotation */
    public author: string;

    /** Annotation comment. No comment means no annotation */
    public comment: string; 

    /** Start index word of the annotation. */
    public startWord: number;

    /** Number of words in the annotation. */
    public wordCount: number;

    /** Tag of the annotation. */
    public tag: string;

    /**
     * Initializes a new instance of AnnotationModel object.
     * @param {Partial<AnnotationModel>} init Used in assigning instantiation values.
     */
    public constructor(init?: Partial<AnnotationModel>) {
        Object.assign(this, init);
    }
}
