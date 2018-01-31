import './errorPage.style.scss';
import { ErrorPageController } from './errorPage.controller';
import ErrorPageTemplate from './errorPage.template.html';

export const stateConfig = {
    url: '/error-page',
    template: ErrorPageTemplate,
    controller: ErrorPageController,
    controllerAs: 'vm'
};
