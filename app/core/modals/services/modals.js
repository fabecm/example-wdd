import { NewWorkspaceController } from '../templates/newWorkspace';
import NewWorkspaceTemplate from '../templates/newWorkspace.template.html';
import { ModificationWorkspaceController } from '../templates/modificationWorkspace';
import ModificationWorkspaceTemplate from '../templates/modificationWorkspace.template.html';
import { NewWorkspaceRequestsController } from '../templates/newWorkspaceRequests';
import NewWorkspaceRequestsTemplate from '../templates/newWorkspaceRequests.template.html';

import { ApprovalModalController } from '../templates/approvalModal';
import ApprovalModalTemplate from '../templates/approvalModal.template.html';
import DateApproveTemplate from '../templates/dateApprove.template.html';
import DateRejectTemplate from '../templates/dateReject.template.html';

export class ModalService {
    constructor ($uibModal) {
        'ngInject';
        this.$uibModal = $uibModal;
    }

    openNewWorkspaceModal () {
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: NewWorkspaceTemplate,
            controller: NewWorkspaceController,
            controllerAs: 'vm',
            resolve: {}
        });

        modalInstance.result.then();
    }

    openModificationWorkspace () {
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: ModificationWorkspaceTemplate,
            controller: ModificationWorkspaceController,
            controllerAs: 'vm',
            resolve: {}
        });

        modalInstance.result.then();
    }

    openNewWorkspaceRequests () {
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: NewWorkspaceRequestsTemplate,
            controller: NewWorkspaceRequestsController,
            controllerAs: 'vm',
            resolve: {}
        });

        modalInstance.result.then();
    }

    openApprovalModal () {
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: ApprovalModalTemplate,
            controller: ApprovalModalController,
            controllerAs: 'vm',
            resolve: {}
        });

        modalInstance.result.then();
    }

    openDateApproveModal () {
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: DateApproveTemplate,
            controller: ApprovalModalController,
            controllerAs: 'vm',
            resolve: {}
        });

        modalInstance.result.then();
    }

    openDateApproveModal () {
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: DateApproveTemplate,
            controller: ApprovalModalController,
            controllerAs: 'vm',
            resolve: {}
        });

        modalInstance.result.then();
    }

    openDateRejectModal () {
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: DateRejectTemplate,
            controller: ApprovalModalController,
            controllerAs: 'vm',
            resolve: {}
        });

        modalInstance.result.then();
    }
}
