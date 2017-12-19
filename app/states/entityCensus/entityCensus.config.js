import './entityCensus.style.scss';
import { EntityCensusController } from './entityCensus.controller';
import EntityCensusTemplate from './entityCensus.template.html';

export const stateConfig = {
    url: '/entity-census',
    params: {},
    template: EntityCensusTemplate,
    controller: EntityCensusController,
    controllerAs: 'vm'
};
