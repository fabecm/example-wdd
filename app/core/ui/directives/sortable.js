import $ from 'jquery';

export function Sortable(WddCacheService, $state) {
    'ngInject';
    return {
        restrict: 'A',
        link: (scope, element, attrs) => {
            if (attrs.sortable === '') {
                if (scope.sortableTable && attrs.sortableTableKey && !scope.sortableChildren) {
                    console.error('Hello Developer! Seems that you have tried to render a sortable table but you haven\'t provided the sortableTableType attribute to wddTable');
                    console.error('Table: ' + attrs.sortableTableKey); 
                }
                return;
            }
            let sortableColumns = JSON.parse(attrs.sortable);
            let sortableHeaderId = attrs.sortableHeaderId;
            let sortableKey = `sorting_${$state.$current.name.replace(/\./g, '_')}_${attrs.sortableTableKey}`;
            let savedSorting = WddCacheService.getCachedFilter(sortableKey);
            let sortableBy;
            let sortableType;
            let sortingIcon = 'icon-espandi-tutto';
            let sortingUnused = 'text-muted';

            scope.getArrow = (type) => {
                if (type === 'ASC') {
                    return 'icon-up-arrow';
                }
                return 'icon-down-arrow';
            };

            scope.toggleOrder = () => {
                if (sortableType === 'ASC') {
                    sortableType = 'DESC';
                } else {
                    sortableType = 'ASC';
                }
            };
            
            if (scope.sortableChildren) {
                let parentSavedSorting = WddCacheService.getCachedFilter(scope.sortableParentSelected);
                if (parentSavedSorting) {
                    if (parentSavedSorting.order_by === sortableHeaderId) {
                        sortingIcon = scope.getArrow(parentSavedSorting.order_type);
                        $(element).prepend(`<i class="icon icon-sorting-position ${sortingIcon}"></i>`);
                    }
                }
            }
            
            if (!scope.sortableChildren && sortableColumns.indexOf(sortableHeaderId) !== -1) {
                if (savedSorting) {
                    sortableBy = savedSorting.order_by;
                    sortableType = savedSorting.order_type;
                    if (sortableBy === sortableHeaderId) {
                        sortingUnused = '';
                        sortingIcon = scope.getArrow(sortableType);
                    }
                }
                $(element).prepend(`<i class="icon icon-sorting-position ${sortingIcon} ${sortingUnused}"></i>`);
                $(element[0]).css('cursor', 'pointer');
                element.on('click', function (event) {
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
                    WddCacheService.cacheSorting(sortableKey, { order_by: sortableBy, order_type: sortableType });
                    scope.reloadData();
                });
            }
        }
    }
}