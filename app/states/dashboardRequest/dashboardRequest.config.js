import './dashboardRequest.style.scss';
import { DashboardRequestController } from './dashboardRequest.controller';
import DashboardRequestTemplate from './dashboardRequest.template.html';

export const stateConfig = {
    url: '/dashboardRequest',
    params: {},
    requiredAuthorization: [],
    template: DashboardRequestTemplate,
    controller: DashboardRequestController,
    controllerAs: 'vm'
};
