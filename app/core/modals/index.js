import { NewWorkspaceController } from './templates/newWorkspace';
import { ModalService } from './services/modals';

export default angular.module('wdd.core.modals', [])
    .controller('NewWorkspaceController', NewWorkspaceController)
    .service('ModalService', ModalService)
    .name;
