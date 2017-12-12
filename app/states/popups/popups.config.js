import './popups.style.scss';
import { PopupsController } from './popups.controller';
import PopupsTemplate from './popups.template.html';

export const stateConfig = {
    url: '/popups',
    params: {},
    template: PopupsTemplate,
    controller: PopupsController,
    controllerAs: 'vm'
};
