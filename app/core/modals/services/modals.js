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

import { ConfirmationModalController } from '../templates/confirmationModal';
import ConfirmationModalTemplate from '../templates/confirmationModal.template.html';

import { EntityHistoryController } from '../templates/entityHistory';
import EntityHistoryTemplate from '../templates/entityHistory.template.html';

import { NewEntityController } from '../templates/newEntity';
import NewEntityTemplate from '../templates/newEntity.template.html';

import { RelationsModalController } from '../templates/relationsModal';
import RelationModalTemplate from '../templates/relationsModal.template.html';

import { DataDetailController } from '../../../states/dataDetail/dataDetail.controller';
import DataDetailTemplate from '../templates/dataDetailModal.template.html';
import ExcelTemplate from '../../../public/CaricamentoMassivo_V1.xlsx';
import { saveAs } from 'file-saver';

import { CheckboxesModalController } from '../templates/checkboxesModal';
import CheckboxesModalTemplate from '../templates/checkboxesModal.template.html';

export class ModalService {
    constructor ($uibModal, $rootScope, $http) {
        'ngInject';
        this.$uibModal = $uibModal;
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.initOpenModals();
    }

    initOpenModals () {
        let modals = [
            'Relations',
            'CreateEntity',
            'NewEntity',
            'MDDataDetail',
            'MassiveManagment',
            'NewWorkspace',
            'ModificationWorkspace',
            'NewWorkspaceRequests',
            'ProcessHistory',
            'EntityHistory',
            'ErrorAction',
            'Confirmation',
            'Action',
            'Checkboxes'
        ];
        this.openModals = {};
        for (let i = 0; i < modals.length; i++) {
            this.openModals[modals[i]] = null;
        }
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

    addTechnicalRuleData (data) {
        return this.$http.post('WDD/technicalRule/addData', data);
    }

    doAction (data) {
        return this.$http.post('WDD/action/continueProcess', data);
    }

    deleteWorkspace (workspaceId) {
        return this.$http.get(`WDD/workspace/delete/${workspaceId}`);
    }

    getProcessHistory (termId) {
        return this.$http.get(`WDD/process/history/${termId}`);
    }

    openCreateEntity (entityType, dataDetails, workspaceId, isDraft) {
        let name = 'CreateEntity';
        this.manageOpenModals(name);
        let modalInstance = this.$uibModal.open({
            template: CreateEntityTemplate,
            controller: CreateEntityController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            scope: angular.extend(this.$rootScope, {
                entityType: entityType,
                dataDetails: dataDetails,
                workspaceId: workspaceId,
                isDraft: isDraft
            }),
            resolve: {}
        });
        this.openModals[name] = modalInstance;
        return modalInstance.result;
    }

    openNewEntity () {
        let name = 'NewEntity';
        this.manageOpenModals(name);
        let modalInstance = this.$uibModal.open({
            template: NewEntityTemplate,
            controller: NewEntityController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            // scope: angular.extend(this.$rootScope, {
            //     entityType: entityType,
            //     dataDetails: dataDetails,
            //     workspaceId: workspaceId,
            //     isDraft: isDraft
            // }),
            resolve: {}
        });
        this.openModals[name] = modalInstance;
        return modalInstance.result;
    }

    openMDDataDetail (id, isDraft, workspaceId) {
        let name = 'MDDataDetail';
        this.manageOpenModals(name);
        let modalInstance = this.$uibModal.open({
            template: DataDetailTemplate,
            controller: DataDetailController,
            controllerAs: 'vm',
            backdrop: 'static',
            windowClass: 'dataDetailWindow',
            size: '90',
            keyboard: false,
            scope: angular.extend(this.$rootScope, {
                id: id,
                isDraft: isDraft,
                workspaceId: workspaceId
            }),
            resolve: {}
        });
        this.openModals[name] = modalInstance;
        return modalInstance.result;
    }

    openRelationsModal (termId, termType, termName) {
        let name = 'Relations';
        this.manageOpenModals(name);
        let modalInstance = this.$uibModal.open({
            template: RelationModalTemplate,
            controller: RelationsModalController,
            controllerAs: 'vm',
            size: '90',
            backdrop: 'static',
            keyboard: false,
            scope: angular.extend(this.$rootScope, {
                termId: termId,
                termType: termType,
                termName: termName
            }),
            resolve: {}
        });
        this.openModals[name] = modalInstance;
        return modalInstance.result;
    }

    openMassiveManagmentModal () {
        let name = 'MassiveManagment';
        this.manageOpenModals(name);
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
        this.openModals[name] = modalInstance;
        return modalInstance.result;
    }

    getExcelByteArray () {
        return this.$http({
            method: 'GET',
            url: ExcelTemplate,
            responseType: 'arraybuffer'
        });
    }

    downloadExcelTemplate () {
        this.getExcelByteArray().then((res) => {
            let data = res.data;
            let contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            let urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;

            if (urlCreator) {
                try {
                    let file = new File([data], 'CaricamentoMassivo_V1.xlsx', { type: contentType });
                    saveAs(file);
                } catch (err) {
                    let fileBlob = new Blob([data], { type: contentType });
                    window.navigator.msSaveBlob(fileBlob, 'CaricamentoMassivo_V1.xlsx');
                }
            }
        });
    }

    openNewWorkspaceModal () {
        let name = 'NewWorkspace';
        this.manageOpenModals(name);
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: NewWorkspaceTemplate,
            controller: NewWorkspaceController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            size: 'md',
            resolve: {}
        });
        this.openModals[name] = modalInstance;
        return modalInstance.result;
    }

    openModificationWorkspace (workspaceId) {
        let name = 'ModificationWorkspace';
        this.manageOpenModals(name);
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: ModificationWorkspaceTemplate,
            controller: ModificationWorkspaceController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            size: 'md',
            scope: angular.extend(this.$rootScope, {
                test: 'parentScope',
                workspaceId: workspaceId
            }),
            resolve: {}
        });
        this.openModals[name] = modalInstance;
        return modalInstance.result;
    }

    openNewWorkspaceRequests (workspaceId, termTechRule, isInitiativeCensus) {
        let name = 'NewWorkspaceRequests';
        this.manageOpenModals(name);
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: NewWorkspaceRequestsTemplate,
            controller: NewWorkspaceRequestsController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            scope: angular.extend(this.$rootScope, {
                workspaceId: workspaceId,
                termTechRule: termTechRule,
                isInitiativeCensus: isInitiativeCensus
            }),
            resolve: {}
        });
        this.openModals[name] = modalInstance;
        return modalInstance.result;
    }

    openProcessHistoryModal (termId) {
        let name = 'ProcessHistory';
        this.manageOpenModals(name);
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: ProcessHistoryTemplate,
            controller: ProcessHistoryController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            scope: angular.extend(this.$rootScope, {
                termId: termId
            }),
            resolve: {}
        });
        this.openModals[name] = modalInstance;
        return modalInstance.result;
    }

    openEntityHistoryModal (termDetail) {
        let name = 'EntityHistory';
        this.manageOpenModals(name);
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: EntityHistoryTemplate,
            controller: EntityHistoryController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            scope: angular.extend(this.$rootScope, {
                termDetail: termDetail
            }),
            resolve: {}
        });
        this.openModals[name] = modalInstance;
        return modalInstance.result;
    }

    openErrorActionModal (param, text) {
        let name = 'ErrorAction';
        this.manageOpenModals(name);
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: ErrorActionModalTemplate,
            controller: ErrorActionModalController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            scope: angular.extend(this.$rootScope, {
                infoParam: param,
                text: text
            }),
            resolve: {}
        });
        this.openModals[name] = modalInstance;
        return modalInstance.result;
    }

    openConfirmationModal (param) {
        let name = 'Confirmation';
        this.manageOpenModals(name);
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: ConfirmationModalTemplate,
            controller: ConfirmationModalController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            scope: angular.extend(this.$rootScope, {
                param: param
            }),
            resolve: {}
        });
        this.openModals[name] = modalInstance;
        return modalInstance.result;
    }

    openActionModal (param) {
        let name = 'Action';
        this.manageOpenModals(name);
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
        this.openModals[name] = modalInstance;
        return modalInstance.result;
    }

    openCheckboxesModal () {
        let name = 'Checkboxes';
        this.manageOpenModals(name);
        let modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: CheckboxesModalTemplate,
            controller: CheckboxesModalController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            resolve: {}
        });
        this.openModals[name] = modalInstance;
        return modalInstance.result;
    }

    getNavigationAlertText () {
        let text = {
            body: 'Risultano modifiche non salvate, proseguendo andranno perse. Continuare?'
        };
        return text;
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

    getDeleteActionText () {
        let text = {
            body: 'Si desidera eliminare il workspace?'
        };
        return text;
    }

    getAutomaticSaveActionText () {
        let text = {
            body: 'Si desidera salvare le modifiche apportate?'
        };
        return text;
    }

    getSaveActionText () {
        let text = {
            body: 'Si desidera salvare le modifiche apportate?'
        };
        return text;
    }

    getAlertSaveActionText () {
        let text = {
            body: 'Risultano più entità modificate, solo l\'entità corrente verrà salvata per le altre si perderanno le modifiche. Continuare con il salvataggio?'
        };
        return text;
    }

    getNewActionText () {
        let text = {
            body: 'Si desidera salvare le modifiche apportate?'
        };
        return text;
    }

    getCancelActionText () {
        let text = {
            body: 'Si desidera annullare le modifiche apportate?'
        };
        return text;
    }

    getConfirmActionText () {
        let text = {
            body: 'Si desidera confermare le modifiche apportate?'
        };
        return text;
    }

    getSendActionText () {
        let text = {
            body: 'Si desidera salvare le modifiche apportate ed inviare il workspace?'
        };
        return text;
    }

    getDeleteDataDetailText () {
        let text = {
            body: 'Si desidera eliminare l\'entità ?'
        };
        return text;
    }

    getDeleteDraftDataDetailText () {
        let text = {
            body: 'Si desidera eliminare la bozza dell\'entità?'
        };
        return text;
    }

    manageOpenModals (modal, closeOlder = true) {
        if (this.openModals[modal] !== null && closeOlder) {
            this.openModals[modal].dismiss();
        }
    }
}
