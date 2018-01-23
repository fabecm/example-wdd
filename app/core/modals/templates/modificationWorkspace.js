export class ModificationWorkspaceController {

    workspaceForm = {};

    constructor (ModalService, $scope, $log, $uibModalInstance) {
        'ngInject';
        this.modalService = ModalService;
        this.$log = $log;
        this.$uibModalInstance = $uibModalInstance;

        this.getWorkspaceDetails($scope.$parent.workspaceId);
    }

    getWorkspaceDetails (workspaceId) {
        this.workspaceDetailsPromise = this.modalService.getWorkspaceIdDetails(workspaceId);
        this.workspaceDetailsPromise.then(w => {
            this.workspaceForm.short_description = w.data.short_description;
            this.originalShortDescription = angular.copy(w.data.short_description);
            this.workspaceForm.long_description = w.data.long_description;
            this.originalLongDescription = angular.copy(w.data.long_description);
            this.workspaceForm.start_date = w.data.start_date;
            this.originalStartDate = angular.copy(w.data.start_date);
            this.workspaceForm.end_date = w.data.end_date;
            this.originalEndDate = angular.copy(w.data.end_date);
            this.workspaceForm.stato = w.data.status;

            if (w.data.status === 'Creato' || w.data.status === 'Nuovo') {
                this.showDeleteBtn = true;
                this.showSaveBtn = true;

                if (w.data.status === 'Creato') {
                    this.showSendBtn = true;
                }
            } else {
                this.fieldIsReadonly = true;
            }

            this.workspaceForm.utenteRichiedente = {};
            this.workspaceForm.utenteRichiedente.value = w.data.responsible_user.id;
            this.originalUtenteRichiedente = angular.copy(w.data.responsible_user.id);

            if (this.workspaceForm.utenteRichiedente.value && this.workspaceForm.stato !== 'Creato') {
                this.lockUtenteRichiedente = true;
            }

            this.workspaceForm.note = w.data.note;
            this.originalNote = angular.copy(w.data.note);
        });
    }

    // true: disabled
    // false: not disabled
    isSaveDisabled () {
        let numUndefined = 0;
        let numChange = 0;
        if (!this.workspaceForm.short_description) {
            numUndefined += 1;
        }
        if (this.workspaceForm.short_description !== this.originalShortDescription) {
            numChange += 1;
        }

        if (!this.workspaceForm.long_description) {
            numUndefined += 1;
        }
        if (this.workspaceForm.long_description !== this.originalLongDescription) {
            numChange += 1;
        }

        if (!this.workspaceForm.start_date) {
            numUndefined += 1;
        }
        if (this.workspaceForm.start_date !== this.originalStartDate) {
            numChange += 1;
        }

        if (!this.workspaceForm.end_date) {
            numUndefined += 1;
        }
        if (this.workspaceForm.end_date !== this.originalEndDate) {
            numChange += 1;
        }

        if (this.workspaceForm.utenteRichiedente && this.workspaceForm.utenteRichiedente.value !== this.originalUtenteRichiedente) {
            numChange += 1;
        }

        if (this.workspaceForm.note !== this.originalNote) {
            numChange += 1;
        }

        if (numUndefined > 0) {
            return true;
        } else if (numChange > 0) {
            return false;
        } else if (numChange === 0) {
            return true;
        }
        return false;
    }

    isSendDisabled () {
        let numUndefined = 0;
        let numChange = 0;
        if (!this.workspaceForm.short_description) {
            numUndefined += 1;
        }
        if (this.workspaceForm.short_description !== this.originalShortDescription) {
            numChange += 1;
        }

        if (!this.workspaceForm.long_description) {
            numUndefined += 1;
        }
        if (this.workspaceForm.long_description !== this.originalLongDescription) {
            numChange += 1;
        }

        if (!this.workspaceForm.start_date) {
            numUndefined += 1;
        }
        if (this.workspaceForm.start_date !== this.originalStartDate) {
            numChange += 1;
        }

        if (!this.workspaceForm.end_date) {
            numUndefined += 1;
        }
        if (this.workspaceForm.end_date !== this.originalEndDate) {
            numChange += 1;
        }

        if (!this.workspaceForm.utenteRichiedente || !this.workspaceForm.utenteRichiedente.value) {
            numUndefined += 1;
        }
        if (this.workspaceForm.utenteRichiedente && this.workspaceForm.utenteRichiedente.value !== this.originalUtenteRichiedente) {
            numChange += 1;
        }

        if (this.workspaceForm.note !== this.originalNote) {
            numChange += 1;
        }

        if (numUndefined > 0) {
            return true;
        } else if (numChange > 0) {
            return false;
        } else if (numChange === 0) {
            return true;
        }
        return false;
    }

    close () {
        this.$uibModalInstance.dismiss();
    }

    saveWorkspace () {
        if (this.responsibleUser && this.responsibleUser.value) {
            this.workspaceForm.responsible_user_id = this.responsibleUser.value;
        }

        this.workspaceForm.send = false;

        this.updateWorkspace(this.workspaceForm);
    }

    sendWorkspace () {
        if (this.workspaceForm.start_date && this.workspaceForm.end_date && this.workspaceForm.utenteRichiedente.value) {
            this.$log.debug('send', this.workspaceForm);
            this.workspaceForm.send = true;
            this.updateWorkspace(this.workspaceForm);
        }
    }

    updateWorkspace (workspaceForm) {
        this.createNewWorkspacePromise = this.modalService.createNewWorkspace(workspaceForm);
        this.createNewWorkspacePromise.then(res => {
            this.$log.debug(res);
        }).finally(() => {
            this.$uibModalInstance.close();
        });
    }
}
