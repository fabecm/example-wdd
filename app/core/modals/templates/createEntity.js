export class CreateEntityController {

    lockButtonSave = true;

    constructor ($uibModalInstance, $scope, $timeout, DetailsService, WDDAlert) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.detailsService = DetailsService;
        this.WDDAlert = WDDAlert;

        this.entityType = this.$scope.$parent.entityType;
        this.dataDetails = this.$scope.$parent.dataDetails;
    }

    saveEntity () {
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
                        isDraft: this.dataDetails[i].term.isDraft
                    });
                }
            }
            // console.log(entityToSave);
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

    close () {
        this.$uibModalInstance.dismiss();
    }

    // ableSaveButton () {
    //     return this.$timeout(() => {
    //         let newValue = this.getNewvalue();
    //         console.log('condition', !this.entityName && !newValue);
    //         if (!this.entityName && !newValue) {
    //             return true;
    //         }

    //         return false;
    //     }).then((res) => {
    //         console.log('res', res);
    //         return res;
    //     });
    // }
}
