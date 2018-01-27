import './dashboardRequest.style.scss';
import { DashboardRequestController } from './dashboardRequest.controller';
import DashboardRequestTemplate from './dashboardRequest.template.html';

export const stateConfig = {
    url: '/dashboardRequest',
    params: {},
    template: DashboardRequestTemplate,
    controller: DashboardRequestController,
    controllerAs: 'vm',
    pageId: 'DSBOARD_DQ'
};
