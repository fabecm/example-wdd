export class FilterWorkspace {
    constructor ($http, $q, $log, DatasourceService, ClassificationService, WorkspaceService) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
        this.$log = $log;
        this.datasourceService = DatasourceService;
        this.classificationService = ClassificationService;
        this.workspaceService = WorkspaceService;
    }

    updateList (type, stringSearched, dipendence) {
        switch (type) {
            case 'workspace':
            case 'description':
            case 'status':
                return this.getFilterWorkspace(type, stringSearched, dipendence).then(res => res.data.array);
            case 'processOwner':
                return this.datasourceService.getBootstrap().then(res => res.data.process_owner);
            case 'systemOwner':
                return this.datasourceService.getBootstrap().then(res => res.data.system_owner);
            case 'entity':
                return this.classificationService.getEntity(dipendence, stringSearched).then(res => res.data.array);
            case 'attribute':
                return this.classificationService.getAttribute(dipendence, stringSearched).then(res => res.data.array);
            case 'responsibleUser':
                return this.getResponsibleUser(stringSearched).then(res => res.data.array);
            case 'entityName':
                return this.$q.when([]);
            case 'newRequestSO':
            case 'newRequestTA':
            case 'newRequestDS':
            case 'newRequestDT':
            case 'newRequestDF':
                return this.workspaceService.getFieldValues(type, stringSearched, dipendence).then(res => res.data.array);
            default:
                return this.$q.when([]);
        }
    }

    getFilterWorkspace (type, stringSearched, dipendence) {
        let path = '';
        switch (type) {
            case 'workspace':
                path += this.checkProperty(dipendence[0], 'description_id');
                path += this.checkProperty(dipendence[1], 'status_id');
                return this.$http.get(`WDD/filter/workspace?workspaceType=${type}${path}`);

            case 'description':
                path += this.checkProperty(dipendence[0], 'workspace_id');
                path += this.checkProperty(dipendence[1], 'status_id');
                return this.$http.get(`WDD/filter/workspace?workspaceType=${type}${path}`);

            case 'status':
                path += this.checkProperty(dipendence[0], 'workspace_id');
                path += this.checkProperty(dipendence[1], 'description_id');
                return this.$http.get(`WDD/filter/workspace?workspaceType=${type}${path}`);

            default:
                return this.$q.when([]);
        }
    }

    checkProperty (property, label) {
        if (property) {
            return `&${label}=${property}`;
        }
        return '';
    }

    getResponsibleUser (stringSearched) {
        this.$log.debug(stringSearched);
        return this.$http.get('WDD/filter/responsibleUser');
    }

    // getDescription (stringSearched) {
    //     this.$log.debug(stringSearched);
    //     return getMockedDescription(this.$q);
    // }
}

// function getMockedDescription ($q) {
//     var deferred = $q.defer();

//     var x = Date.now();

//     if (x % 2 === 0) {
//         deferred.resolve([{
//             label: 'd5',
//             value: 5
//         }, {
//             label: 'd6',
//             value: 6
//         }, {
//             label: 'd7',
//             value: 7
//         }]);
//     } else {
//         deferred.resolve([{
//             label: 'd8',
//             value: 8
//         }, {
//             label: 'd9',
//             value: 9
//         }, {
//             label: 'd0',
//             value: 0
//         }]);
//     }

//     return deferred.promise;
// }

// function getMockedWorkspace ($q) {
//     var deferred = $q.defer();

//     var x = Date.now();

//     if (x % 2 === 0) {
//         deferred.resolve([{
//             label: 'w5',
//             value: 5
//         }, {
//             label: 'w6',
//             value: 6
//         }, {
//             label: 'w7',
//             value: 7
//         }]);
//     } else {
//         deferred.resolve([{
//             label: 'w8',
//             value: 8
//         }, {
//             label: 'w9',
//             value: 9
//         }, {
//             label: 'w0',
//             value: 0
//         }]);
//     }

//     return deferred.promise;
// }
