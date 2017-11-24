import './baseTabs.style.scss';
import { BaseTabsCtrl } from './baseTabs.controller';
import BaseTabsTemplate from './baseTabs.template.html';

export const stateConfig = {
    abstract: true,
    template: BaseTabsTemplate,
    controller: BaseTabsCtrl,
    controllerAs: 'vm'
};
