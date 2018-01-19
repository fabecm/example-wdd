import { NewWorkspaceController } from './templates/newWorkspace';
import { CreateEntityController } from './templates/createEntity';
import { NewWorkspaceRequestsController } from './templates/newWorkspaceRequests';
import { ActionModalController } from './templates/actionModal';
import { ApprovalModalController } from './templates/approvalModal';
import { DateApproveController } from './templates/dateApprove';
import { ModalService } from './services/modals';

export default angular.module('wdd.core.modals', [])
    .controller('NewWorkspaceController', NewWorkspaceController)
    .controller('CreateEntityController', CreateEntityController)
    .controller('NewWorkspaceRequestsController', NewWorkspaceRequestsController)
    .controller('ApprovalModalController', ApprovalModalController)
    .controller('DateApproveController', DateApproveController)
    .controller('ActionModalController', ActionModalController)
    .service('ModalService', ModalService)
    .name;
