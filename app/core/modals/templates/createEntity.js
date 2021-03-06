export class CreateEntityController {

    lockButtonSave = true;
    entityName = {};

    constructor ($uibModalInstance, $scope, $timeout, DetailsService, WDDAlert, ModalService) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.detailsService = DetailsService;
        this.WDDAlert = WDDAlert;
        this.modalService = ModalService;

        // console.log(this.$scope.$parent);

        this.entityType = this.$scope.$parent.entityType;
        this.dataDetails = this.$scope.$parent.dataDetails;
        this.dataFieldDetails = this.dataDetails.filter(data => {
            return data.term.termtype === 'DATA_FIELD';
        });
        this.isDraft = JSON.parse(this.$scope.$parent.isDraft);

        if (this.isDraft) {
            this.workspaceId = JSON.parse(this.$scope.$parent.workspaceId);
        } else {
            this.workspaceId = 1;
        }

        if (this.entityType === 'BUSINESS_RULE' || this.entityType === 'TECHNICAL_RULE') {
            this.isAutomaticSave = true;
            $scope.$watch(() => this.entityName.value, () => {
                if (this.entityName.value) {
                    this.saveEntity(true);
                }
            });
        }
    }

    saveEntity (isAutomaticSave) {
        this.modalService.openConfirmationModal(
                isAutomaticSave ? this.modalService.getAutomaticSaveActionText() : this.modalService.getSaveActionText()
            ).then(selection => {
                if (selection.choice) {
                    let termName;
                    let termId;
                    let tempTermId;

                    if (parseInt(this.entityName.value, 10)) {
                        termId = this.entityName.value;
                    } else {
                        let checkDraftId = this.entityName.value.substr(0, 1);
                        let checkIntDraftId = this.entityName.value.substr(1);

                        if (checkDraftId === 'D' && parseInt(checkIntDraftId, 10)) {
                            tempTermId = this.entityName.value;
                        } else {
                            termName = this.entityName.value;
                        }
                    }

                    let entityToSave = {};
                    entityToSave.term = {};
                    entityToSave.addNewEntityToRelation = true;

                    if (termName) {
                    // entityToSave.term.draft = true;
                        entityToSave.term.name = termName;
                    } else if (termId) {
                        entityToSave.term.draft = false;
                        entityToSave.term.termId = termId;
                    } else if (tempTermId) {
                        entityToSave.term.draft = true;
                        entityToSave.term.tempTermId = tempTermId;
                    }
                    entityToSave.term.termtype = this.entityType;
                    entityToSave.attributes = [];

                    entityToSave.relations = [];
                    for (let i = 0; i < this.dataDetails.length; i++) {
                        if ((this.dataDetails[i].term.termId || this.dataDetails[i].term.tempTermId) && this.entityType !== this.dataDetails[i].term.termtype) {
                            entityToSave.relations.push({
                                termtype: this.dataDetails[i].term.termtype,
                                name: this.dataDetails[i].term.name,
                                termId: this.dataDetails[i].term.termId,
                                tempTermId: this.dataDetails[i].term.tempTermId,
                                draft: this.dataDetails[i].term.draft,
                                workspaceId: this.workspaceId
                            });
                        }
                    }
                    this.saveEntityPromise = this.detailsService.saveEntity(entityToSave);
                    this.saveEntityPromise.then(res => {
                        if (res.data.result) {
                            this.WDDAlert.showAlert('success', 'OPERAZIONE ESEGUITA CON SUCCESSO', 'save-entity');
                            this.$uibModalInstance.close();
                        } else if (res.data.message_type === 'SHOW_ERROR') {
                            this.WDDAlert.showAlert('error', `OPERAZIONE NON ESEGUITA-${res.data.message}`, 'save-entity');
                        } else {
                            this.WDDAlert.showAlert('error', 'SI E\' VERIFICATO UN ERRORE', 'save-entity');
                        }
                    }).finally(() => {
                        this.$uibModalInstance.close();
                    });
                }
            });
    }

    close () {
        if (this.entityName && this.entityName.value) {
            this.modalService.openConfirmationModal(this.modalService.getCancelActionText()).then(res => {
                if (res.choice) {
                    this.$uibModalInstance.dismiss();
                }
            });
        } else {
            this.$uibModalInstance.dismiss();
        }
    }
}
