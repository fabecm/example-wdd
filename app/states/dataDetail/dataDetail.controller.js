export class DataDetailController {

    listDataDetails = [];
    visibleDataDetails = [];

    constructor (DetailsService, $stateParams, ModalService, WDDAlert) {
        'ngInject';
        this.detailsService = DetailsService;
        this.$stateParams = $stateParams;
        this.modalService = ModalService;
        this.WDDAlert = WDDAlert;

        this.isDraft = JSON.parse(this.$stateParams.isDraft);

        if (this.isDraft) {
            this.workspaceId = JSON.parse(this.$stateParams.workspaceId);
        } else {
            this.workspaceId = 1;
        }

        this.initDataDetails();
    }

    initDataDetails () {
        this.getDataFieldDetailsPromise = this.detailsService.getDataFieldDetails(this.$stateParams.id, this.$stateParams.isDraft);
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
        this.modalService.openProcessHistoryModal(this.$stateParams.id);
    }

    createEtity (termtype) {
        this.modalService.openCreateEntity(termtype, this.visibleDataDetails, this.workspaceId, this.isDraft).then(() => {
            this.initDataDetails();
        });
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
        let entityToSave = {};

        entityToSave.term = detail.term;
        entityToSave.attributes = detail.attributes.map(att => {
            return {
                name: att.name,
                values: att.values
            };
        });

        entityToSave.relations = [];
        for (let i = 0; i < this.visibleDataDetails.length; i++) {
            if (this.visibleDataDetails[i].term.termId && detail.term.termId !== this.visibleDataDetails[i].term.termId) {
                entityToSave.relations.push({
                    termtype: this.visibleDataDetails[i].term.termtype,
                    name: this.visibleDataDetails[i].term.name,
                    termId: this.visibleDataDetails[i].term.termId,
                    draft: this.visibleDataDetails[i].term.draft,
                    workspaceId: this.workspaceId
                });
            }
        }

        this.saveEntityPromise = this.detailsService.saveEntity(entityToSave);
        this.saveEntityPromise.then(res => {
            if (res.data.result) {
                this.WDDAlert.showAlert('success', 'OPERAZIONE EFFETTUATA CON SUCCESSO', 'save-entity-done');
            } else {
                this.WDDAlert.showAlert('error', 'OPERAZIONE NON EFFETTUATA', 'save-entity-error');
            }
        });
        detail.isLock = true;
    }

    deleteChanges (detail) {
        detail.isLock = true;
        detail.attributes.map(attribute => {
            attribute.values[0].value = angular.copy(attribute.origin_value);
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
}
