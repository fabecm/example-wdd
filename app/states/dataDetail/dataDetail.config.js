import './dataDetail.style.scss';
import { DataDetailController } from './dataDetail.controller';
import DataDetailTemplate from './dataDetail.template.html';

export const stateConfig = {
    url: '/data-detail',
    params: {},
    template: DataDetailTemplate,
    controller: DataDetailController,
    controllerAs: 'vm'
};
