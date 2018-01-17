import { NewWorkspaceController } from './templates/newWorkspace';
import { CreateEntityController } from './templates/createEntity';
import { NewWorkspaceRequestsController } from './templates/newWorkspaceRequests';
import { ModalService } from './services/modals';

export default angular.module('wdd.core.modals', [])
    .controller('NewWorkspaceController', NewWorkspaceController)
    .controller('CreateEntityController', CreateEntityController)
    .controller('NewWorkspaceRequestsController', NewWorkspaceRequestsController)
    .service('ModalService', ModalService)
    .name;
