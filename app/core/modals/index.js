import { NewWorkspaceController } from './templates/newWorkspace';
import { CreateEntityController } from './templates/createEntity';
import { NewWorkspaceRequestsController } from './templates/newWorkspaceRequests';
import { ActionModalController } from './templates/actionModal';
import { ModalService } from './services/modals';

export default angular.module('wdd.core.modals', [])
    .controller('NewWorkspaceController', NewWorkspaceController)
    .controller('CreateEntityController', CreateEntityController)
    .controller('NewWorkspaceRequestsController', NewWorkspaceRequestsController)
    .controller('ActionModalController', ActionModalController)
    .service('ModalService', ModalService)
    .name;
