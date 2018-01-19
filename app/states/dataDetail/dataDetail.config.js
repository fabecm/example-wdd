import './dataDetail.style.scss';
import { DataDetailController } from './dataDetail.controller';
import DataDetailTemplate from './dataDetail.template.html';

export const stateConfig = {
    url: '/data-detail',
    params: {
        id: null,
        isDraft: null
    },
    template: DataDetailTemplate,
    controller: DataDetailController,
    controllerAs: 'vm'
};
