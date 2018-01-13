import { NewWorkspaceController } from './templates/newWorkspace';
import { CreateEntityController } from './templates/createEntity';
import { ModalService } from './services/modals';

export default angular.module('wdd.core.modals', [])
    .controller('NewWorkspaceController', NewWorkspaceController)
    .controller('CreateEntityController', CreateEntityController)
    .service('ModalService', ModalService)
    .name;
