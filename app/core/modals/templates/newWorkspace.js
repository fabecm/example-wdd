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
        this.$log.debug('save', this.workspaceForm);

        this.createNewWorkspace(this.workspaceForm);
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
        this.$uibModalInstance.dismiss();
    }

    sendWorkspace () {
        if (this.workspaceForm.start_date && this.workspaceForm.end_date && this.responsibleUser && this.responsibleUser.value) {
            this.workspaceForm.responsible_user_id = this.responsibleUser.value;
            this.workspaceForm.send = true;
            this.$log.debug('send', this.workspaceForm);
            this.createNewWorkspace(this.workspaceForm);
        }
    }

    createNewWorkspace (workspaceForm) {
        this.createNewWorkspacePromise = this.modalService.createNewWorkspace(workspaceForm);
        this.createNewWorkspacePromise.then(res => {
            this.$log.debug(res);
            if (res.data.result) {
                this.WDDAlert.showAlert('success', 'OPERAZIONE ESEGUITA CORRETTAMENTE', 'create-workspace-done');
            } else {
                this.WDDAlert.showAlert('error', 'OPERAZIONE NON ESEGUITA', 'create-workspace-error');
            }
        }).finally(() => {
            this.$uibModalInstance.close();
        });
    }
}
