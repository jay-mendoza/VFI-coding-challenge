import { AnnotationModel } from '../../backend/annotation.model';

export interface AnnotateDialog {
    annotation: AnnotationModel;
    highlightedText: string;
  }