export class DataDetailController {

    listDataDetails = [];

    constructor (DetailsService, $stateParams) {
        'ngInject';
        this.detailsService = DetailsService;
        this.$stateParams = $stateParams;

        this.initDataDetails();
    }

    initDataDetails () {
        this.detailsService.getDataFieldDetails(this.$stateParams.id).then(res => {
            this.listDataDetails = res.data;
            this.visibleDataDetails = res.data.map(data => {
                data.isOpened = true;
                data.attributes = data.attributes.map(attribute => {
                    attribute.origin_value = attribute.default_value;
                    return attribute;
                });
                return data;
            });
        });
    }

    resetChanges (resetAttribute) {
        this.resetAttribute = resetAttribute;
    }

    showAttributeBody (detail) {
        // this.changeAllDetailStatus(false);
        detail.isOpened = !detail.isOpened;
    }


    changeAllDetailStatus (shouldOpen) {
        this.visibleDataDetails.map(t => {
            t.isOpened = shouldOpen;
            return t;
        });
    }
}
