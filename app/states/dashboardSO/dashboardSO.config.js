import './dashboardSO.style.scss';
import { DashboardSOController } from './dashboardSO.controller';
import DashboardSOTemplate from './dashboardSO.template.html';

export const stateConfig = {
    url: '/dashboardSO',
    params: {},
    requiredAuthorization: [],
    template: DashboardSOTemplate,
    controller: DashboardSOController,
    controllerAs: 'vm'
};
