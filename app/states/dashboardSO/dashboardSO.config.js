import './dashboardSO.style.scss';
import { DashboardSOController } from './dashboardSO.controller';
import DashboardSOTemplate from './dashboardSO.template.html';

export const stateConfig = {
    url: '/dashboardSO',
    params: {},
    template: DashboardSOTemplate,
    controller: DashboardSOController,
    controllerAs: 'vm',
    pageId: 'DSBOARD_SO'
};
