import './dataLineage.style.scss';
import { DataLineageController } from './dataLineage.controller';
import DataLineageTemplate from './dataLineage.template.html';

export const stateConfig = {
    url: '/data-lineage?id&type&isDraft',
    stateRoot: 'search',
    template: DataLineageTemplate,
    controller: DataLineageController,
    controllerAs: 'vm'
};
