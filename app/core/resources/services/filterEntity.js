export class FilterEntityService {
    constructor ($http) {
        'ngInject';
        this.$http = $http;
    }

    getFilterEntity (type, dipendence) {
        let bodyParam;
        switch (type) {
            case 'ENT_TYPE':
                bodyParam = {
                    term_name: dipendence[1] !== -1 ? dipendence[1] : null,
                    description: dipendence[2] !== -1 ? dipendence[2] : null,
                    status_id: dipendence[3] !== -1 ? dipendence[3] : null
                };
                break;
            case 'ENT_NAME':
                bodyParam = {
                    term_type: dipendence[1] !== -1 ? dipendence[1] : null,
                    description: dipendence[2] !== -1 ? dipendence[2] : null,
                    status_id: dipendence[3] !== -1 ? dipendence[3] : null
                };
                break;
            case 'ENT_DESCR':
                bodyParam = {
                    term_type: dipendence[1] !== -1 ? dipendence[1] : null,
                    term_name: dipendence[2] !== -1 ? dipendence[2] : null,
                    status_id: dipendence[3] !== -1 ? dipendence[3] : null
                };
                break;
            case 'ENT_STATUS':
                bodyParam = {
                    term_type: dipendence[1] !== -1 ? dipendence[1] : null,
                    term_name: dipendence[2] !== -1 ? dipendence[2] : null,
                    description: dipendence[3] !== -1 ? dipendence[3] : null
                };
                break;
            default:
                break;
        }
        return this.$http.post(`WDD/filter/entityapproval/${dipendence[0]}/?filtertype=${type}`, bodyParam);
    }

    checkProperty (property, label) {
        if (property) {
            return `&${label}=${property}`;
        }
        return '';
    }
}
