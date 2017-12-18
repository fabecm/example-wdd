import './toBeMonitored.style.scss';
import { ToBeMonitoredController } from './toBeMonitored.controller';
import ToBeMonitoredTemplate from './toBeMonitored.template.html';

export const stateConfig = {
    url: '/to-be-monitored',
    params: {},
    requiredAuthorization: [],
    template: ToBeMonitoredTemplate,
    controller: ToBeMonitoredController,
    controllerAs: 'vm'
};
