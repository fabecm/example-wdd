import './approvalRequests.style.scss';
import { ApprovalRequestsController } from './approvalRequests.controller';
import ApprovalRequestsTemplate from './approvalRequests.template.html';

export const stateConfig = {
    url: '/approval-requests',
    params: {},
    template: ApprovalRequestsTemplate,
    controller: ApprovalRequestsController,
    controllerAs: 'vm'
};
