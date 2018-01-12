import { NewWorkspaceController } from '../templates/newWorkspace';
import NewWorkspaceTemplate from '../templates/newWorkspace.template.html';
import { ModificationWorkspace } from '../templates/modificationWorkspace';
import ModificationWorkspaceTemplate from '../templates/modificationWorkspace.template.html';
import { NewWorkspaceRequestsController } from '../templates/newWorkspaceRequests';
import NewWorkspaceRequestsTemplate from '../templates/newWorkspaceRequests.template.html';

import { ApprovalModalController } from '../templates/approvalModal';
import ApprovalModalTemplate from '../templates/approvalModal.template.html';
import DateApproveTemplate from '../templates/dateApprove.template.html';
import DateRejectTemplate from '../templates/dateReject.template.html';

import { MassiveManagmentModalController } from '../templates/massiveManagmentModal';
import MassiveManagmentTemplate from '../templates/massiveManagmentModal.template.html';

export class ModalService {
    constructor ($uibModal, $rootScope, $http) {
        'ngInject';
        this.$uibModal = $uibModal;
        this.$rootScope = $rootScope;
        this.$http = $http;
    }

    createNewWorkspace (configuration) {
        return this.$http.post('WDD/workspace/save', configuration);
    }

    getWorkspaceIdDetails (workspaceId) {
        return this.$http.get(`WDD/details/workspace/${workspaceId}`);
    }

    openMassiveManagmentModal () {
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: MassiveManagmentTemplate,
            controller: MassiveManagmentModalController,
            controllerAs: 'vm',
            resolve: {}
        });

        return modalInstance.result;
    }

    openNewWorkspaceModal () {
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: NewWorkspaceTemplate,
            controller: NewWorkspaceController,
            controllerAs: 'vm',
            backdrop: 'static',
            resolve: {}
        });

        return modalInstance.result;
    }

    openModificationWorkspace (workspaceId) {
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: ModificationWorkspaceTemplate,
            controller: ModificationWorkspace,
            controllerAs: 'vm',
            backdrop: 'static',
            scope: angular.extend(this.$rootScope, {
                test: 'parentScope',
                workspaceId: workspaceId
            }),
            resolve: {}
        });

        return modalInstance.result;
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

        return modalInstance.result;
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

        return modalInstance.result;
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

        return modalInstance.result;
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

        return modalInstance.result;
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

        return modalInstance.result;
    }
}
