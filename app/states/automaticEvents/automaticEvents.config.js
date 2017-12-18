import './automaticEvents.style.scss';
import { AutomaticEventsController } from './automaticEvents.controller';
import AutomaticEventsTemplate from './automaticEvents.template.html';

export const stateConfig = {
    url: '/automatic-events',
    params: {},
    requiredAuthorization: [],
    template: AutomaticEventsTemplate,
    controller: AutomaticEventsController,
    controllerAs: 'vm'
};
