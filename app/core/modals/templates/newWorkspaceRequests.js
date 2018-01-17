export class NewWorkspaceRequestsController {

    constructor () {

    }

    inputChanged (type) {
        switch (type) {
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
        if (this.systemOwnerSelected && this.systemOwnerSelected.value) {
            return false;
        }

        return true;
    }

    isDataSourceEditable () {
        if (this.technicalApplication && this.technicalApplication.value) {
            return false;
        }

        return true;
    }

    areDataTableFieldEditable () {
        if (this.dataSource && this.dataSource.value) {
            return false;
        }

        return true;
    }

}
