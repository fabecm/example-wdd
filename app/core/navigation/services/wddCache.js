export class WddCacheService {

    filterCached = {};

    constructor () {

    }

    cacheFilter (key, filterApplied) {
        this.filterCached[key] = filterApplied;
        console.log('FILTER_CACHED', this.filterCached);
    }

    getCachedFilter (key) {
        return this.filterCached[key];
    }
}
