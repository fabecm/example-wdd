export class NewWorkspaceRequestsController {

    constructor ($uibModalInstance, $scope, ModalService, WDDAlert) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.modalService = ModalService;
        this.WDDAlert = WDDAlert;

        this.workspaceId = $scope.$parent.workspaceId;
    }

    inputChanged (type) {
        switch (type) {
            // case 'ALL':
            //     this.systemOwnerSelected = undefined;
            //     this.technicalApplication = undefined;
            //     this.dataSource = undefined;
            //     this.dataTable = undefined;
            //     this.dataField = undefined;
            //     break;
            case 'SO':
                this.technicalApplication = undefined;
                this.dataSource = undefined;
                this.dataTable = undefined;
                this.dataField = undefined;
                break;
            case 'TA':
                this.dataSource = undefined;
                this.dataTable = undefined;
                this.dataField = undefined;
                break;
            case 'DS':
                this.dataTable = undefined;
                this.dataField = undefined;
                break;
            default:
                break;
        }
    }

    isTechApplEditable () {
        return !(this.systemOwnerSelected && this.systemOwnerSelected.value);
    }

    isDataSourceEditable () {
        return !(this.technicalApplication && this.technicalApplication.value);
    }

    areDataTableFieldEditable () {
        return !(this.dataSource && this.dataSource.value);
    }

    close () {
        this.modalService.openConfirmationModal(this.modalService.getCancelActionText()).then(res => {
            if (res.choice) {
                this.$uibModalInstance.dismiss();
            }
        });
    }

    saveRequestDocumentationData (operation) {
        let bodyModal = '';
        if (operation === 'save') {
            bodyModal = this.modalService.getSaveActionText();
        } else if (operation === 'new') {
            bodyModal = this.modalService.getNewActionText();
        }

        this.modalService.openConfirmationModal(bodyModal).then(selection => {
            if (selection.choice) {
                if (this.systemOwnerSelected && this.systemOwnerSelected.value
                    && this.technicalApplication && this.technicalApplication.value
                    && this.dataSource.value && this.dataSource.value
                    && this.dataField && this.dataField.value) {
                    let data = {
                        workspace_id: this.workspaceId,
                        system_owner_id: this.systemOwnerSelected.value,
                        techapp_id: this.technicalApplication.value,
                        datasource_id: this.dataSource.value,
                        datafield_id: this.dataField.value
                    };

                    if (this.rilevanzaBusiness && this.rilevanzaBusiness.value) {
                        data.business_field = true;
                    } else {
                        data.business_field = false;
                    }

                    if (this.dataTable && this.dataTable.value) {
                        data.datatable_id = this.dataTable.value;
                    }

                    this.saveRequestDocumentationDataPromise = this.modalService.saveRequestDocumentationData(data);
                    this.saveRequestDocumentationDataPromise.then(res => {
                        if (res.data.result) {
                            this.WDDAlert.showAlert('success', 'OPERAZIONE EFFETTUATA CON SUCCESSO', 'newdata-save');
                            if (operation === 'save') {
                                this.$uibModalInstance.close();
                            } else if (operation === 'new') {
                                this.$uibModalInstance.close();
                                this.modalService.openNewWorkspaceRequests();
                            }
                        } else {
                            this.WDDAlert.showAlert('error', 'SI E\' VERIFICATO UN ERRORE', 'newdata-save');
                        }
                    });
                }
            }
        });
    }

}
