export class DataService {
    constructor ($http, $q) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
    }

    getData (pageNumber, pageLength, params = {}) {
        return this.$http.post(`WDD/search/fulltext?pageNumber=${pageNumber}&pageLength=${pageLength}`, params);
    }

    getEntityData (pageNumber, pageLength, params = {}) {
        return this.$http.post(`WDD/search/fulltext/entity?pageNumber=${pageNumber}&pageLength=${pageLength}`, params);
    }

    getSystemOwnerTodoList (pageNumber, pageLength, params = {}) {
        return this.$http.post(`WDD/search/systemowner/todo?pageNumber=${pageNumber}&pageLength=${pageLength}`, params);
    }

    getSystemOwnerInitiativeCensuses (pageNumber, pageLength, params = {}) {
        return this.$http.post(`WDD/search/systemowner/initiative?pageNumber=${pageNumber}&pageLength=${pageLength}`, params);
    }

    getSystemOwnerEntityCensuses (pageNumber, pageLength, params = {}) {
        return this.$http.post(`WDD/search/systemowner/entityapproval?pageNumber=${pageNumber}&pageLength=${pageLength}`, params);
    }

    getDQApprovalRequest (pageNumber, pageLength, params = {}) {
        return this.$http.post(`WDD/search/dataquality/approval?pageNumber=${pageNumber}&pageLength=${pageLength}`, params);
    }

    getDQAutomaticEvents (pageNumber, pageLength, params = {}) {
        return this.$http.post(`WDD/search/dataquality/event?pageNumber=${pageNumber}&pageLength=${pageLength}`, params);
    }

    getDQEntityApprovalRequest (pageNumber, pageLength, params = {}) {
        if (params.order_by && params.order_type) {
            let oBy = encodeURIComponent(params.order_by);
            let oType = encodeURIComponent(params.order_type);
            delete params.order_by;
            delete params.order_type;
            return this.$http.post(`WDD/search/dataquality/entityapproval?pageNumber=${pageNumber}&pageLength=${pageLength}&order_by=${oBy}&order_type=${oType}`, params);
        }
        return this.$http.post(`WDD/search/dataquality/entityapproval?pageNumber=${pageNumber}&pageLength=${pageLength}`, params);
    }

    getRelationModal (pageNumber, pageLength, params = {}) {
        return this.$http.post(`WDD/search/relation?pageNumber=${pageNumber}&pageLength=${pageLength}`, params);
    }
}
