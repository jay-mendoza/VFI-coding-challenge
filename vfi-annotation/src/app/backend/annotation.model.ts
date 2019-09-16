/**
 * Model class 'ArticleModel' for article in localStorage.
 */
export class AnnotationModel {

    /** ID of the Annotation */
    public id: string;

    /** Author (username) of the Annotation */
    public author: string;

    /** Annotation comment. No comment means no annotation */
    public comment: string; 

    /** Start index word of the annotation. */
    public startIndex: number;

    /** Final indexw ord of the annotation. */
    public finalIndex: number;

    /** Tag of the annotation. */
    public tag: string[];

    /**
     * Initializes a new instance of AnnotationModel object.
     * @param {Partial<AnnotationModel>} init Used in assigning instantiation values.
     */
    public constructor(init?: Partial<AnnotationModel>) {
        Object.assign(this, init);
    }
}
