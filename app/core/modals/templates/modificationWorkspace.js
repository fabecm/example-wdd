export class ModificationWorkspaceController {

    workspaceForm = {};
    responsibleUser = {};

    constructor (ModalService, $scope, $log, $uibModalInstance, WDDAlert) {
        'ngInject';
        this.modalService = ModalService;
        this.$log = $log;
        this.$uibModalInstance = $uibModalInstance;
        this.$scope = $scope;
        this.WDDAlert = WDDAlert;

        this.getWorkspaceDetails(this.$scope.$parent.workspaceId);
    }

    getWorkspaceDetails (workspaceId) {
        this.workspaceDetailsPromise = this.modalService.getWorkspaceIdDetails(workspaceId);
        this.workspaceDetailsPromise.then(w => {
            this.workspaceForm.workspace_id = w.data.workspace_id;
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
                this.showSaveBtn = true;

                if (w.data.status === 'Creato') {
                    this.showDeleteBtn = true;
                    this.showSendBtn = true;
                }
            } else {
                this.fieldIsReadonly = true;
            }

            // this.workspaceForm.utenteRichiedente = {};
            this.responsibleUser.value = w.data.responsible_user.id;
            this.originalUtenteRichiedente = angular.copy(w.data.responsible_user.id);

            if (this.responsibleUser.value && this.workspaceForm.stato !== 'Creato') {
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

        if (this.responsibleUser && this.responsibleUser.value !== this.originalUtenteRichiedente) {
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
        // let numChange = 0;
        if (!this.workspaceForm.short_description) {
            numUndefined += 1;
        }
        // if (this.workspaceForm.short_description !== this.originalShortDescription) {
        //     numChange += 1;
        // }

        if (!this.workspaceForm.long_description) {
            numUndefined += 1;
        }
        // if (this.workspaceForm.long_description !== this.originalLongDescription) {
        //     numChange += 1;
        // }

        if (!this.workspaceForm.start_date) {
            numUndefined += 1;
        }
        // if (this.workspaceForm.start_date !== this.originalStartDate) {
        //     numChange += 1;
        // }

        if (!this.workspaceForm.end_date) {
            numUndefined += 1;
        }
        // if (this.workspaceForm.end_date !== this.originalEndDate) {
        //     numChange += 1;
        // }

        if (!this.responsibleUser || !this.responsibleUser.value) {
            numUndefined += 1;
        }
        // if (this.workspaceForm.utenteRichiedente && this.workspaceForm.utenteRichiedente.value !== this.originalUtenteRichiedente) {
        //     numChange += 1;
        // }

        // if (this.workspaceForm.note !== this.originalNote) {
        //     numChange += 1;
        // }

        if (numUndefined > 0) {
            return true;
        }
        // else if (numChange > 0) {
        //     return false;
        // } else if (numChange === 0) {
        //     return true;
        // }
        return false;
    }

    close () {
        if ((this.showSendBtn && !this.isSendDisabled()) || (this.showSaveBtn && !this.isSaveDisabled())) {
            this.modalService.openConfirmationModal(this.modalService.getCancelActionText()).then(res => {
                if (res.choice) {
                    this.$uibModalInstance.dismiss();
                }
            });
        } else {
            this.$uibModalInstance.dismiss();
        }
    }

    saveWorkspace () {
        if (this.responsibleUser && this.responsibleUser.value) {
            this.workspaceForm.responsible_user_id = this.responsibleUser.value;
        }

        this.workspaceForm.send = false;

        this.updateWorkspace(this.workspaceForm, 'save');
    }

    sendWorkspace () {
        if (this.workspaceForm.start_date && this.workspaceForm.end_date && this.responsibleUser.value) {
            this.workspaceForm.responsible_user_id = this.responsibleUser.value;
            this.$log.debug('send', this.workspaceForm);
            this.workspaceForm.send = true;
            this.updateWorkspace(this.workspaceForm, 'send');
        }
    }

    deleteWorkspace () {
        this.modalService.openConfirmationModal(this.modalService.getDeleteActionText()).then(selection => {
            if (selection.choice) {
                this.deleteWorkspacePromise = this.modalService.deleteWorkspace(this.$scope.$parent.workspaceId);
                this.deleteWorkspacePromise.then(res => {
                    if (res.data.result) {
                        this.WDDAlert.showAlert('success', 'OPERAZIONE ESEGUITA CORRETTAMENTE', 'workspace-delete');
                    } else {
                        this.WDDAlert.showAlert('error', 'OPERAZIONE NON ESEGUITA', 'workspace-delete');
                    }
                }).finally(() => {
                    this.$uibModalInstance.close();
                });
            }
        });
    }

    updateWorkspace (workspaceForm, operation) {
        let bodyModal = '';
        if (operation === 'save') {
            bodyModal = this.modalService.getSaveActionText();
        } else if (operation === 'send') {
            bodyModal = this.modalService.getSendActionText();
        }

        this.modalService.openConfirmationModal(bodyModal).then(selection => {
            if (selection.choice) {
                this.createNewWorkspacePromise = this.modalService.createNewWorkspace(workspaceForm);
                this.createNewWorkspacePromise.then(res => {
                    this.$log.debug(res);
                    if (res.data.result) {
                        this.WDDAlert.showAlert('success', 'OPERAZIONE ESEGUITA CORRETTAMENTE', 'workspace-save');
                        this.$uibModalInstance.close();
                    } else if (res.data.message === 'DESC_EXSIST') {
                        this.WDDAlert.showAlert('error', `OPERAZIONE NON ESEGUITA-${res.data.message_type}`, 'workspace-save');
                    } else {
                        this.WDDAlert.showAlert('error', 'OPERAZIONE NON ESEGUITA', 'workspace-save');
                    }
                });
            }
        });
    }
}
