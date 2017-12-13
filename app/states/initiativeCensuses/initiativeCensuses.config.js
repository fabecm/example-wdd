import './initiativeCensuses.style.scss';
import { InitiativeCensusesController } from './initiativeCensuses.controller';
import InitiativeCensusesTemplate from './initiativeCensuses.template.html';

export const stateConfig = {
    url: '/initiative-censuses',
    params: {},
    template: InitiativeCensusesTemplate,
    controller: InitiativeCensusesController,
    controllerAs: 'vm'
};
