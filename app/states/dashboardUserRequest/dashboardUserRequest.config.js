import './dashboardUserRequest.style.scss';
import { DashboardUserRequestController } from './dashboardUserRequest.controller';
import DashboardUserRequestTemplate from './dashboardUserRequest.template.html';

export const stateConfig = {
    url: '/dashboard-user-request',
    params: {},
    requiredAuthorization: [],
    template: DashboardUserRequestTemplate,
    controller: DashboardUserRequestController,
    controllerAs: 'vm'
};
