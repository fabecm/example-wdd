import { NewWorkspaceController } from '../templates/newWorkspace';
import NewWorkspaceTemplate from '../templates/newWorkspace.template.html';
import { ModificationWorkspaceController } from '../templates/modificationWorkspace';
import ModificationWorkspaceTemplate from '../templates/modificationWorkspace.template.html';
import { NewWorkspaceRequestsController } from '../templates/newWorkspaceRequests';
import NewWorkspaceRequestsTemplate from '../templates/newWorkspaceRequests.template.html';

import { ActionModalController } from '../templates/actionModal';
import ActionModalTemplate from '../templates/actionModal.template.html';

import { ErrorActionModalController } from '../templates/errorActionModal';
import ErrorActionModalTemplate from '../templates/errorActionModal.template.html';

import { ProcessHistoryController } from '../templates/processHistory';
import ProcessHistoryTemplate from '../templates/processHistory.template.html';

import { MassiveManagmentModalController } from '../templates/massiveManagmentModal';
import MassiveManagmentTemplate from '../templates/massiveManagmentModal.template.html';

import { CreateEntityController } from '../templates/createEntity';
import CreateEntityTemplate from '../templates/createEntity.template.html';

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

    saveRequestDocumentationData (data) {
        return this.$http.post('WDD/newdata/save', data);
    }

    doAction (data) {
        return this.$http.post('WDD/action/continueProcess', data);
    }

    getProcessHistory (termId) {
        return this.$http.get(`WDD/process/history/${termId}`);
    }

    openCreateEntity (entityType, dataDetails) {
        let modalInstance = this.$uibModal.open({
            template: CreateEntityTemplate,
            controller: CreateEntityController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            scope: angular.extend(this.$rootScope, {
                entityType: entityType,
                dataDetails: dataDetails
            }),
            resolve: {}
        });

        return modalInstance.result;
    }

    openMassiveManagmentModal () {
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: MassiveManagmentTemplate,
            controller: MassiveManagmentModalController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
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
            keyboard: false,
            resolve: {}
        });

        return modalInstance.result;
    }

    openModificationWorkspace (workspaceId) {
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: ModificationWorkspaceTemplate,
            controller: ModificationWorkspaceController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            scope: angular.extend(this.$rootScope, {
                test: 'parentScope',
                workspaceId: workspaceId
            }),
            resolve: {}
        });

        return modalInstance.result;
    }

    openNewWorkspaceRequests (workspaceId) {
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: NewWorkspaceRequestsTemplate,
            controller: NewWorkspaceRequestsController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            scope: angular.extend(this.$rootScope, {
                workspaceId: workspaceId
            }),
            resolve: {}
        });

        return modalInstance.result;
    }

    openProcessHistoryModal (termId) {
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: ProcessHistoryTemplate,
            controller: ProcessHistoryController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            size: 'md',
            scope: angular.extend(this.$rootScope, {
                termId: termId
            }),
            resolve: {}
        });

        return modalInstance.result;
    }

    openErrorActionModal (param) {
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: ErrorActionModalTemplate,
            controller: ErrorActionModalController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            scope: angular.extend(this.$rootScope, {
                infoParam: param
            }),
            resolve: {}
        });

        return modalInstance.result;
    }

    openActionModal (param) {
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: ActionModalTemplate,
            controller: ActionModalController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            scope: angular.extend(this.$rootScope, {
                actionParam: param
            }),
            resolve: {}
        });

        return modalInstance.result;
    }

    getApproveText () {
        let text = {
            title: 'Approvazione Dati',
            body: 'confermando verranno inviate in produzione le modifiche apportate ai dati selezionati. Vuoi procedere?'
        };
        return text;
    }

    getRejectText () {
        let text = {
            title: 'Rifiuto Approvazione Dati',
            body: 'confermando verranno rifiutate le modifiche apportate ai dati selezionati. Il dato verrà inoltrato al System Owner per ulteriori approfondimenti. Vuoi procedere?'
        };
        return text;
    }

    getTakeChargeText () {
        let text = {
            title: 'Presa in carico',
            body: 'confermando verranno presi in carico i dati selezionati. Vuoi procedere?'
        };
        return text;
    }

    getTakeChargeModifyText () {
        let text = {
            title: 'Presa in modifica',
            body: 'confermando verranno presi in modifica i dati selezionati. Vuoi procedere?'
        };
        return text;
    }

    getForwardText () {
        let text = {
            title: 'Inoltra selezionati',
            body: 'confermando verranno inoltrati i dati selezionati. Vuoi procedere?'
        };
        return text;
    }

    getNotOfCompetenceText () {
        let text = {
            title: 'Non di competenza',
            body: 'confermando i dati selezionati verranno segnalati come non di competenza. Vuoi procedere?'
        };
        return text;
    }
}
