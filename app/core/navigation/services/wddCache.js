export class WddCacheService {

    filterCached = {};

    constructor () {

    }

    cacheFilter (key, filterApplied) {
        this.filterCached[key] = filterApplied;
    }

    cachePage (key, page) {
        if (!this.filterCached[key]) {
            this.filterCached[key] = {};
        }
        this.filterCached[key].page = page;
    }

    getCachedFilter (key) {
        return this.filterCached[key];
    }

    getMapDashboardFilter (key) {
        let filterMapped = {};
        let filter = this.getCachedFilter(key);

        if (filter.workspaceSelected && filter.workspaceSelected.value !== -1) {
            filterMapped.workspaceSelected = filter.workspaceSelected.value;
        }
        if (filter.descriptionSelected && filter.descriptionSelected.value !== -1) {
            filterMapped.descriptionSelected = filter.descriptionSelected.value;
        }
        if (filter.statusSelected && filter.statusSelected.value !== -1) {
            filterMapped.status = filter.statusSelected.value;
        }
        if (filter.startDate !== 'GG/MM/AAAA') {
            filterMapped.startDate = filter.startDate;
        }
        if (filter.endDate !== 'GG/MM/AAAA') {
            filterMapped.endDate = filter.endDate;
        }

        return filterMapped;
    }

    unCacheFilter (key) {
        this.filterCached[key] = undefined;
    }

    clearAllCache () {
        this.filterCached = undefined;
        this.filterCached = {};
    }
}
