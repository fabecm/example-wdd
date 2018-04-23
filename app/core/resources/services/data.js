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

    getBusinessData(pageNumber, pageLength, params = {}) {
        return this.$http.post(`WDD/search/fulltext/business?pageNumber=${pageNumber}&pageLength=${pageLength}`, params);
    }

    getSystemOwnerTodoList (pageNumber, pageLength, params = {}) {
        return this.$http.post(`WDD/search/systemowner/todo?pageNumber=${pageNumber}&pageLength=${pageLength}`, params);
    }

    getSystemOwnerInitiativeCensuses (pageNumber, pageLength, params = {}) {
        return this.$http.post(`WDD/search/systemowner/initiative?pageNumber=${pageNumber}&pageLength=${pageLength}`, params);
    }

    getSystemOwnerEntityCensuses (pageNumber, pageLength, params = {}) {
        if (params.order_by && params.order_type) {
            params.inner_order_by = params.order_by;
            params.inner_order_type = params.order_type;
        }
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
            params.inner_order_by = params.order_by;
            params.inner_order_type = params.order_type;
        }
        return this.$http.post(`WDD/search/dataquality/entityapproval?pageNumber=${pageNumber}&pageLength=${pageLength}`, params);
    }

    getRelationModal (pageNumber, pageLength, params = {}) {
        return this.$http.post(`WDD/search/relation?pageNumber=${pageNumber}&pageLength=${pageLength}`, params);
    }
}
