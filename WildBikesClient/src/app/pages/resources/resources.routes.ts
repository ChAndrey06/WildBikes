import { Route } from '@angular/router';
import { DocumentTemplateComponent } from './document-template';
import { ResourcesRoutingEnum } from './enums/resources-routing.enum';

export const RESOURCES_ROUTES: Route[] = [
  {
    path: ResourcesRoutingEnum.DocumentTemplate,
    component: DocumentTemplateComponent
  }
];