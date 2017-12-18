import './documentationRequests.style.scss';
import { DocumentationRequestsController } from './documentationRequests.controller';
import DocumentationRequestsTemplate from './documentationRequests.template.html';

export const stateConfig = {
    url: '/documentation-requests',
    params: {},
    requiredAuthorization: [],
    template: DocumentationRequestsTemplate,
    controller: DocumentationRequestsController,
    controllerAs: 'vm'
};
