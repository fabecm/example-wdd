export class NewWorkspaceController {

    workspaceForm = {};
    responsibleUser = {};

    constructor ($log, $uibModalInstance, ModalService, WDDAlert) {
        'ngInject';
        this.$log = $log;
        this.$uibModalInstance = $uibModalInstance;
        this.modalService = ModalService;
        this.WDDAlert = WDDAlert;
    }

    saveWorkspace () {
        if (this.responsibleUser && this.responsibleUser.value) {
            this.workspaceForm.responsible_user_id = this.responsibleUser.value;
        }

        this.workspaceForm.send = false;

        this.createNewWorkspace(this.workspaceForm, 'save');
    }

    isSaveDisabled () {
        return (!this.workspaceForm.short_description
                || !this.workspaceForm.long_description
                || !this.workspaceForm.start_date
                || !this.workspaceForm.end_date);
    }

    isSendDisabled () {
        return (!this.workspaceForm.short_description
            || !this.workspaceForm.long_description
            || !this.workspaceForm.start_date
            || !this.workspaceForm.end_date
            || !(this.responsibleUser && this.responsibleUser.value));
    }

    close () {
        this.modalService.openConfirmationModal(this.modalService.getCancelActionText()).then(res => {
            if (res.choice) {
                this.$uibModalInstance.dismiss();
            }
        });
    }

    sendWorkspace () {
        if (this.workspaceForm.start_date && this.workspaceForm.end_date && this.responsibleUser && this.responsibleUser.value) {
            this.workspaceForm.responsible_user_id = this.responsibleUser.value;
            this.workspaceForm.send = true;
            this.createNewWorkspace(this.workspaceForm, 'send');
        }
    }

    createNewWorkspace (workspaceForm, operation) {
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
                    if (res.data.result) {
                        this.WDDAlert.showAlert('success', 'OPERAZIONE ESEGUITA CORRETTAMENTE', 'workspace');
                        this.$uibModalInstance.close();
                    } else if (res.data.message === 'DESC_EXSIST') {
                        this.WDDAlert.showAlert('error', `OPERAZIONE NON ESEGUITA-${res.data.message_type}`, 'workspace');
                    } else {
                        this.WDDAlert.showAlert('error', 'OPERAZIONE NON ESEGUITA', 'workspace');
                    }
                });
            }
        });
    }
}
