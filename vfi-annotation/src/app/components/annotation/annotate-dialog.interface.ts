import { AnnotationModel } from '../../backend/annotation.model';

export interface AnnotateDialog {
    annotation: AnnotationModel;
    highlightedText: string;
    currentUser: string;
    isExistingAnnotation: boolean;
    allUniqueTags: string[];
    delete: boolean;
  }