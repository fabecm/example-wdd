export class SearchController {

    filterBootstrap = {};
    filterStatus = [{
        label: 'Tutti'
    }, {
        label: 'Bozza'
    }, {
        label: 'System Owner'
    }];

    constructor (DataService, DatasourceService) {
        'ngInject';
        this.datasourceService = DatasourceService;

        DataService.getData();
        this.getBootstrap();
    }

    filterChanged (arrayFilter) {
        console.log(arrayFilter);
    }

    getBootstrap () {
        this.datasourceService.getBootstrap().then(res => {
            this.filterBootstrap = {
                processOwner: res.process_owner,
                systemOwner: res.system_owner
            };
        });
    }
}
