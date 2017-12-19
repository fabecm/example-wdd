import './entityApprovalRequest.style.scss';
import { EntityApprovalRequestController } from './entityApprovalRequest.controller';
import EntityApprovalRequestTemplate from './entityApprovalRequest.template.html';

export const stateConfig = {
    url: '/entity-approval-request',
    params: {},
    template: EntityApprovalRequestTemplate,
    controller: EntityApprovalRequestController,
    controllerAs: 'vm'
};

