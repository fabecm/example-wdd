export class DataDetailController {

    listDataDetails = [];

    processes = [{
        label: 'Step 1',
        enabled: true
    }, {
        label: 'Step 2',
        enabled: true
    }, {
        label: 'Step 3',
        enabled: true
    }, {
        label: 'Step 4',
        enabled: true
    }, {
        label: 'Step 5',
        enabled: false
    }, {
        label: 'Step 6',
        enabled: false
    }]

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

    checkObject (obj) {
        return obj.filter(o => o.default_value).length;
    }

    resetChanges (resetAttribute) {
        this.resetAttribute = resetAttribute;
    }

    showAttributeBody (detail) {
        // this.changeAllDetailStatus(false);
        detail.isOpened = !detail.isOpened;
    }

    back () {
        window.history.back();
    }

    checkDetailStatus () {
        return this.visibleDataDetails.filter(e => !e.isOpened).length >= 1;
    }

    changeAllDetailStatus (shouldOpen) {
        this.visibleDataDetails.map(t => {
            t.isOpened = shouldOpen;
            return t;
        });
    }
}
