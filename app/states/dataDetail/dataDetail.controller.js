export class DataDetailController {

    listDataDetails = [];
    visibleDataDetails = [];

    constructor (DetailsService, $stateParams, ModalService, WDDAlert, $log, $scope, $uibModalInstance) {
        'ngInject';
        this.detailsService = DetailsService;
        this.$stateParams = $stateParams;
        this.$scope = $scope;
        this.modalService = ModalService;
        this.WDDAlert = WDDAlert;
        this.$log = $log;
        this.$uibModalInstance = $uibModalInstance;

        this.params = {
            id: this.$stateParams.id ? this.$stateParams.id : this.$scope.$parent.id,
            isDraft: this.$stateParams.isDraft ? this.$stateParams.isDraft : this.$scope.$parent.isDraft,
            workspaceId: this.$stateParams.workspaceId ? this.$stateParams.workspaceId : this.$scope.$parent.workspaceId
        };

        this.isDraft = JSON.parse(this.params.isDraft);

        if (this.isDraft) {
            this.workspaceId = JSON.parse(this.params.workspaceId);
        } else {
            this.workspaceId = 1;
        }

        this.initDataDetails();
    }

    initDataDetails () {
        this.getDataFieldDetailsPromise = this.detailsService.getDataFieldDetails(this.params.id, this.params.isDraft);
        this.getDataFieldDetailsPromise.then(res => {
            this.listDataDetails = res.data.array;
            this.visibleDataDetails = res.data.array.map(data => {
                data.isOpened = true;
                data.isLock = true;
                if (data.attributes) {
                    data.attributes = data.attributes.map(attribute => {
                        attribute.origin_value = undefined;
                        if (attribute.values && attribute.values.length > 0) {
                            attribute.origin_value = angular.copy(attribute.values[0].value);
                            return attribute;
                        }
                        return attribute;
                    });
                } else {
                    data.toAdd = true;
                }
                return data;
            });
            this.processes = res.data.steps;
            this.currentProcess = res.data.currentStep;
        });
    }

    showProcessHistory () {
        this.modalService.openProcessHistoryModal(this.params.id);
    }

    checkIfSuspendedModification (thisDetail) {
        const filtered = this.visibleDataDetails.find(e => {
            return (e.term.termtype !== thisDetail.term.termtype) && !e.isLock;
        });
        return !!filtered;
    }

    createEtity (termtype) {
        this.modalService.openCreateEntity(termtype, this.visibleDataDetails, this.workspaceId, this.isDraft).then(() => {
            this.initDataDetails();
        });
    }

    close () {
        this.$uibModalInstance.dismiss();
    }

    unlockAction (index) {
        this.visibleDataDetails[index].isLock = false;
    }

    checkObject (obj) {
        if (!obj) {
            return true;
        }
        return obj.filter(o => o.default_value).length;
    }

    resetChanges (resetAttribute) {
        this.resetAttribute = resetAttribute;
    }

    saveChanges (detail) {
        let numSaveAbled = 0;
        angular.forEach(this.visibleDataDetails, d => {
            if (!d.isLock) {
                numSaveAbled++;
            }
        });

        if (numSaveAbled > 1) {
            this.modalService.openConfirmationModal(this.modalService.getAlertSaveActionText()).then(selection => {
                if (selection.choice) {
                    this.confirmSaveChanges(detail);
                }
            });
        } else {
            this.modalService.openConfirmationModal(this.modalService.getSaveActionText()).then(selection => {
                if (selection.choice) {
                    this.confirmSaveChanges(detail);
                }
            });
        }
    }

    confirmSaveChanges (detail) {
        let entityToSave = {};

        if (!this.isDraft) {
            entityToSave.createProcess = true;

            if (detail.term.termtype !== 'DATA_FIELD') {
                entityToSave.onlyEntity = true;
            } else {
                entityToSave.onlyEntity = false;
            }
        } else {
            entityToSave.createProcess = false;
        }

        entityToSave.term = detail.term;
        entityToSave.attributes = detail.attributes.map(att => {
            return {
                name: att.name,
                values: att.values
            };
        });

        entityToSave.relations = [];
        for (let i = 0; i < this.visibleDataDetails.length; i++) {
            // if (this.visibleDataDetails[i].term && this.visibleDataDetails[i].term.termId && detail.term.termId !== this.visibleDataDetails[i].term.termId) {
            if (this.visibleDataDetails[i] && this.visibleDataDetails[i].term &&
                ((this.visibleDataDetails[i].term.termId && detail.term.termId !== this.visibleDataDetails[i].term.termId) ||
                (this.visibleDataDetails[i].term.tempTermId && detail.tempTermId !== this.visibleDataDetails[i].term.tempTermId))) {
                entityToSave.relations.push({
                    termtype: this.visibleDataDetails[i].term.termtype,
                    name: this.visibleDataDetails[i].term.name,
                    termId: this.visibleDataDetails[i].term.termId,
                    tempTermId: this.visibleDataDetails[i].term.tempTermId,
                    draft: this.visibleDataDetails[i].term.draft,
                    workspaceId: this.workspaceId
                });
            }
        }

        this.saveEntityPromise = this.detailsService.saveEntity(entityToSave);
        this.saveEntityPromise.then(res => {
            if (res.data.result) {
                this.WDDAlert.showAlert('success', 'OPERAZIONE EFFETTUATA CON SUCCESSO', 'save-entity');
                this.initDataDetails();
                detail.isLock = true;
            } else if (res.data.message_type === 'SHOW_ERROR') {
                this.WDDAlert.showAlert('error', `OPERAZIONE NON ESEGUITA-${res.data.message}`, 'save-entity');
            } else {
                this.WDDAlert.showAlert('error', 'SI E\' VERIFICATO UN ERRORE', 'save-entity');
            }
        });
    }

    deleteChanges (detail) {
        this.modalService.openConfirmationModal(this.modalService.getCancelActionText()).then(selection => {
            if (selection.choice) {
                detail.isLock = true;
                detail.attributes.map(attribute => {
                    attribute.values[0].value = angular.copy(attribute.origin_value);
                });
            }
        });
    }

    deleteDraft (detail) {
        this.modalService.openConfirmationModal(this.modalService.getDeleteDraftDataDetailText()).then(selection => {
            if (selection.choice) {
                this.confirmDeleteDraft(detail);
            }
        });
    }

    confirmDeleteDraft (detail) {
        this.$log.debug(detail);
        let deleteDraft = {};
        deleteDraft.temp_term_id = detail.term.tempTermId;

        let dataField;
        this.visibleDataDetails.forEach(element => {
            if (element.term.termtype === 'DATA_FIELD') {
                dataField = element.term;
            }
        });
        deleteDraft.data_field_temp_term_id = dataField.tempTermId;

        this.deleteEntityDraftPromise = this.detailsService.deleteEntityDraft(deleteDraft);
        this.deleteEntityDraftPromise.then(res => {
            if (res.data.result) {
                if (detail.term.termtype === 'DATA_FIELD') {
                    this.close();
                } else {
                    this.initDataDetails();
                }
                this.WDDAlert.showAlert('success', 'OPERAZIONE EFFETTUATA CON SUCCESSO', 'delete-draft');
            } else {
                this.WDDAlert.showAlert('error', 'OPERAZIONE NON EFFETTUATA', 'delete-draft');
            }
        });
    }

    deleteEntity (detail) {
        this.modalService.openConfirmationModal(this.modalService.getDeleteDataDetailText()).then(selection => {
            if (selection.choice) {
                this.confirmDeleteEntity(detail);
            }
        });
    }

    confirmDeleteEntity (detail) {
        let deleteParam = {};
        if (detail.term && detail.term.termId) {
            deleteParam.term_id = detail.term.termId;
        }
        if (detail.term && detail.term.tempTermId) {
            deleteParam.temp_term_id = detail.term.tempTermId;
        }

        let dataField;
        this.visibleDataDetails.forEach(element => {
            if (element.term.termtype === 'DATA_FIELD') {
                dataField = element.term;
            }
        });

        if (dataField) {
            if (dataField.termId) {
                deleteParam.data_field_term_id = dataField.termId;
            }
            if (dataField.tempTermId) {
                deleteParam.data_field_temp_term_id = dataField.tempTermId;
            }
        }

        this.deleteEntityPromise = this.detailsService.deleteEntity(deleteParam);
        this.deleteEntityPromise.then(res => {
            if (res.data.result) {
                this.initDataDetails();
                this.WDDAlert.showAlert('success', 'OPERAZIONE EFFETTUATA CON SUCCESSO', 'delete-entity');
            } else {
                this.WDDAlert.showAlert('error', 'OPERAZIONE NON EFFETTUATA', 'delete-entity');
            }
        });
    }

    addEntity () {
        let techRule = this.visibleDataDetails.filter(data => data.term.termtype === 'TECHNICAL_RULE')[0];
        this.modalService.openNewWorkspaceRequests(this.workspaceId, techRule.term).then(() => {
            this.initDataDetails();
        });
    }

    showAttributeBody (detail) {
        // this.changeAllDetailStatus(false);
        detail.isOpened = !detail.isOpened;
    }

    back () {
        window.history.back();
    }

    checkDetailStatus () {
        if (!this.visibleDataDetails) {
            return false;
        }
        return this.visibleDataDetails.filter(e => !e.isOpened).length >= 1;
    }

    changeAllDetailStatus (shouldOpen) {
        this.visibleDataDetails.map(t => {
            t.isOpened = shouldOpen;
            return t;
        });
    }

    openEntityHistoryModal (termDetail) {
        this.modalService.openEntityHistoryModal(termDetail);
    }
}
