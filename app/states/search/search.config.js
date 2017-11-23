import './search.style.scss';
import { SearchController } from './search.controller';
import SearchTemplate from './search.template.html';

export const stateConfig = {
    url: '/search-main',
    params: {},
    template: SearchTemplate,
    controller: SearchController,
    controllerAs: 'vm'
};