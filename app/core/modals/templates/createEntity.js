export class CreateEntityController {

    lockButtonSave = true;

    constructor ($uibModalInstance, $scope, $timeout, DetailsService, WDDAlert, ModalService) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.detailsService = DetailsService;
        this.WDDAlert = WDDAlert;
        this.modalService = ModalService;

        this.entityType = this.$scope.$parent.entityType;
        this.dataDetails = this.$scope.$parent.dataDetails;
        this.isDraft = JSON.parse(this.$scope.$parent.isDraft);

        if (this.isDraft) {
            this.workspaceId = JSON.parse(this.$scope.$parent.workspaceId);
        } else {
            this.workspaceId = 1;
        }
    }

    saveEntity () {
        this.modalService.openConfirmationModal(this.modalService.getSaveActionText()).then(selection => {
            if (selection.choice) {
                this.$timeout(() => {
                    let termName;
                    let termId;
                    if (!this.entityName) {
                        termName = this.getNewvalue();
                    } else {
                        termId = this.entityName;
                    }

                    let entityToSave = {};
                    entityToSave.term = {};

                    if (termName) {
                        entityToSave.term.name = termName;
                    } else if (termId) {
                        entityToSave.term.termId = termId;
                    }
                    entityToSave.term.termtype = this.entityType;
                    entityToSave.attributes = [];

                    entityToSave.relations = [];
                    for (let i = 0; i < this.dataDetails.length; i++) {
                        if (this.dataDetails[i].term.termId && this.entityType !== this.dataDetails[i].term.termtype) {
                            entityToSave.relations.push({
                                termtype: this.dataDetails[i].term.termtype,
                                name: this.dataDetails[i].term.name,
                                termId: this.dataDetails[i].term.termId,
                                draft: this.dataDetails[i].term.draft,
                                workspaceId: this.workspaceId
                            });
                        }
                    }
                    this.saveEntityPromise = this.detailsService.saveEntity(entityToSave);
                    this.saveEntityPromise.then(res => {
                        if (res.data.result) {
                            this.WDDAlert.showAlert('success', 'OPERAZIONE ESEGUITA CON SUCCESSO', 'save-entity-done');
                        } else {
                            this.WDDAlert.showAlert('error', 'OPERAZIONE NON ESEGUITA', 'save-entity-error');
                        }
                    });
                }).then(() => {
                    this.$uibModalInstance.close();
                });
            }
        });
    }

    close () {
        this.modalService.openConfirmationModal(this.modalService.getCancelActionText()).then(res => {
            if (res.choice) {
                this.$uibModalInstance.dismiss();
            }
        });
    }
}
