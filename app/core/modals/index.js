import { NewWorkspaceController } from './templates/newWorkspace';
import { CreateEntityController } from './templates/createEntity';
import { NewWorkspaceRequestsController } from './templates/newWorkspaceRequests';
import { ApprovalModalController } from './templates/approvalModal';
import { DateApproveController } from './templates/dateApprove';
import { ModalService } from './services/modals';

export default angular.module('wdd.core.modals', [])
    .controller('NewWorkspaceController', NewWorkspaceController)
    .controller('CreateEntityController', CreateEntityController)
    .controller('NewWorkspaceRequestsController', NewWorkspaceRequestsController)
    .controller('ApprovalModalController', ApprovalModalController)
    .controller('DateApproveController', DateApproveController)
    .service('ModalService', ModalService)
    .name;
