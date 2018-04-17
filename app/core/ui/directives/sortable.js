import $ from 'jquery';

export function Sortable(WddCacheService, $state) {
    'ngInject';
    return {
        restrict: 'A',
        link: (scope, element, attrs) => {
            if (attrs.sortable === '') {
                if (scope.sortableTable && attrs.sortableTableKey) {
                    console.error('Hello Developer! Seems that you have tried to render a sortable table but you haven\'t provided the sortableTableType attribute to wddTable');
                    console.error('Table: ' + attrs.sortableTableKey); 
                }
                return;
            }
            let sortableColumns = JSON.parse(attrs.sortable);
            let sortableHeaderId = attrs.sortableHeaderId;
            let sortableFilter = JSON.parse(attrs.sortableFilter);
            let sortableKey = `sorting_${$state.$current.name.replace(/\./g, '_')}_${attrs.sortableTableKey}`;
            let savedSorting = WddCacheService.getCachedFilter(sortableKey);
            let sortableBy ;
            let sortableType;
            let sortingIcon = 'icon-espandi-tutto';
            let sortingUnused = 'text-muted';
            
            if (sortableColumns.indexOf(sortableHeaderId) !== -1) {
                if (savedSorting) {
                    sortableBy = savedSorting.order_by;
                    sortableType = savedSorting.order_type;
                    if (sortableBy === sortableHeaderId) {
                        sortingUnused = '';
                        if (sortableType === 'ASC') {
                            sortingIcon = 'icon-up-arrow';
                        } else {
                            sortingIcon = 'icon-down-arrow';
                        }
                    }
                }
                // da migliorare in caso diano conferma: stile per metterlo all'inizio della cella
                $(element).prepend(`<i class="icon icon-sorting-position ${sortingIcon} ${sortingUnused}"></i>`);
                $(element[0]).css('cursor', 'pointer');
                element.on('click', function(event) {
                    // to avoid sorting while clicking to change the column dimension
                    if (!element[0].isSameNode(event.target) && !$(event.target).hasClass('icon')) {
                        return;
                    }
                    if (sortableBy !== sortableHeaderId) {
                        // reset the sort direction if there is not a previous sorting 
                        // or if there is a previous sorting on a different column.
                        sortableType = '';
                    }
                    sortableBy = sortableHeaderId;
                    scope.toggleOrder();
                    sortableFilter.order_by = sortableBy;
                    sortableFilter.order_type = sortableType;
                    WddCacheService.cacheSorting(sortableKey, { order_by: sortableBy, order_type: sortableType });
                    scope.reloadData();
                });
            }

            scope.toggleOrder = () => {
                if (sortableType === 'ASC') {
                    sortableType = 'DESC';
                } else {
                    sortableType = 'ASC';
                }
            }
        }
    }
}