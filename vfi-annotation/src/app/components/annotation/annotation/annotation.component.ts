import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService} from '../../../backend/authentication.service';
import { AnnotationModel } from '../../../backend/annotation.model';

@Component({
    selector: 'app-annotation',
    templateUrl: './annotation.component.html',
    styleUrls: ['./annotation.component.less']
})

export class AnnotationComponent implements OnInit {

    /** ID of the annotation */
    @Input() id: string;

    @Input() text: string;

    @Input() isAnnotated: boolean;

    constructor(private authService: AuthenticationService) { }

    ngOnInit() {
    }


}
