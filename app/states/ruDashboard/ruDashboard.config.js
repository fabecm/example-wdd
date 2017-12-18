import './ruDashboard.style.scss';
import { RuDashboardController } from './ruDashboard.controller';
import RuDashboardTemplate from './ruDashboard.template.html';

export const stateConfig = {
    url: '/ru-dashboard',
    params: {},
    requiredAuthorization: [],
    template: RuDashboardTemplate,
    controller: RuDashboardController,
    controllerAs: 'vm'
};
