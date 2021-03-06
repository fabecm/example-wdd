export class FilterWorkspace {
    constructor ($http, $q, $log, DatasourceService, ClassificationService, WorkspaceService, DetailsService, FilterEntityService) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
        this.$log = $log;
        this.datasourceService = DatasourceService;
        this.classificationService = ClassificationService;
        this.workspaceService = WorkspaceService;
        this.detailsService = DetailsService;
        this.filterEntityService = FilterEntityService;
    }

    updateList (type, search, dipendence, options) {
        let isInitiativeCensus = options.isInitiativeCensus;
        let isBSRLorTCRL = options.isBSRLorTCRL;
        let dfTermId = options.dfTermId;
        let stringSearched;
        if (search) {
            stringSearched = search.replace(new RegExp('%', 'g'), '%25');
        } else {
            stringSearched = search;
        }
        switch (type) {
            case 'workspace':
            case 'description':
            case 'status':
                return this.getFilterWorkspace(type, stringSearched, dipendence).then(res => {
                    res.data.array.unshift({
                        label: 'Tutti',
                        id: -1
                    });
                    return res.data.array;
                });
            case 'processOwner':
                return this.datasourceService.getBootstrap().then(res => {
                    res.data.process_owner.unshift({
                        label: 'Tutti',
                        id: -1
                    });
                    return res.data.process_owner;
                });
            case 'systemOwner':
                return this.datasourceService.getBootstrap().then(res => {
                    res.data.system_owner.unshift({
                        label: 'Tutti',
                        id: -1
                    });
                    return res.data.system_owner;
                });
            case 'entity':
                return this.classificationService.getEntity(dipendence, stringSearched, isBSRLorTCRL ? dfTermId : undefined).then(res => {
                    if (res.data.array) {
                        res.data.array.unshift({
                            label: 'Tutti',
                            id: -1
                        });
                    }
                    return res.data.array;
                });
            case 'entityNoFather':
                return this.classificationService.getEntityNoFather(stringSearched).then(res => res.data.array);
            case 'attribute':
                return this.classificationService.getAttribute(dipendence, stringSearched).then(res => {
                    res.data.array.unshift({
                        label: 'Tutti',
                        id: -1
                    });
                    return res.data.array;
                });
            case 'responsibleUser':
                return this.getResponsibleUser(stringSearched).then(res => res.data.array);
            case 'entityName':
                return this.detailsService.getEntityNameType(dipendence, stringSearched).then(res => res.data.array);
            case 'ENT_TYPE':
            case 'ENT_NAME':
            case 'ENT_DESCR':
            case 'ENT_STATUS':
                return this.filterEntityService.getFilterEntity(type, dipendence).then(res => {
                    res.data.output.unshift({
                        label: 'Tutti',
                        id: -1
                    });
                    return res.data.output;
                });
            case 'newRequestSO':
            case 'newRequestTA':
            case 'newRequestDS':
            case 'newRequestDT':
            case 'newRequestDF':
                return this.workspaceService.getFieldValues(type, stringSearched, dipendence, isInitiativeCensus).then(res => res.data.array);
            default:
                return this.$q.when([]);
        }
    }

    getFilterWorkspace (type, stringSearched, dipendence) {
        let path = '';
        switch (type) {
            case 'workspace':
                path += dipendence[0] !== -1 ? this.checkProperty(dipendence[0], 'description_id') : '';
                path += dipendence[1] !== -1 ? this.checkProperty(dipendence[1], 'status_id') : '';
                path += this.checkProperty(dipendence[2], 'type');
                return this.$http.get(`WDD/filter/workspace?workspaceType=${type}${path}`);

            case 'description':
                path += dipendence[0] !== -1 ? this.checkProperty(dipendence[0], 'workspace_id') : '';
                path += dipendence[1] !== -1 ? this.checkProperty(dipendence[1], 'status_id') : '';
                path += this.checkProperty(dipendence[2], 'type');
                return this.$http.get(`WDD/filter/workspace?workspaceType=${type}${path}`);

            case 'status':
                path += dipendence[0] !== -1 ? this.checkProperty(dipendence[0], 'workspace_id') : '';
                path += dipendence[1] !== -1 ? this.checkProperty(dipendence[1], 'description_id') : '';
                path += this.checkProperty(dipendence[2], 'type');
                return this.$http.get(`WDD/filter/workspace?workspaceType=${type}${path}`);

            default:
                return this.$q.when([]);
        }
    }

    getRelativeFiler (type) {
        return this.$http.get(`WDD/filter/relation?term_type=${type}`);
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

}
