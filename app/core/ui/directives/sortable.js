import $ from 'jquery';

export function Sortable (WddCacheService, $state) {
    'ngInject';
    return {
        restrict: 'A',
        link: (scope, element, attrs) => {
            if (attrs.sortable === '') {
                if (scope.sortableTable && attrs.sortableTableKey && !scope.isChild) {
                    console.error('Hello Developer! Seems that you have tried to render a sortable table but you haven\'t provided the sortableTableType attribute to wddTable');
                    console.error('Table: ' + attrs.sortableTableKey);
                }
                return;
            }
            let sortableColumns = JSON.parse(attrs.sortable);
            let sortableHeaderId = attrs.sortableHeaderId;
            let sortableKey = `sorting_${$state.$current.name.replace(/\./g, '_')}_`;
            if (scope.isChild) {
                sortableKey += scope.sortableParentTableKey;
            } else {
                sortableKey += attrs.sortableTableKey;
            }
            let savedSorting = WddCacheService.getCachedFilter(sortableKey);
            let sortableBy;
            let sortableType;
            let innerSortableBy;
            let innerSortableType;
            let sortingIcon = 'icon-espandi-tutto';
            let sortingUnused = 'text-muted';

            scope.getArrow = (type) => {
                if (type === 'ASC') {
                    return 'icon-up-arrow';
                }
                return 'icon-down-arrow';
            };

            scope.toggleOrder = () => {
                if (scope.isChild) {
                    if (innerSortableType === 'ASC') {
                        innerSortableType = 'DESC';
                    } else {
                        innerSortableType = 'ASC';
                    }
                } else {
                    if (sortableType === 'ASC') {
                        sortableType = 'DESC';
                    } else {
                        sortableType = 'ASC';
                    }
                }
            };

            if (sortableColumns.indexOf(sortableHeaderId) !== -1) {
                if (savedSorting) {
                    innerSortableBy = savedSorting.inner_order_by;
                    innerSortableType = savedSorting.inner_order_type;
                    sortableBy = savedSorting.order_by;
                    sortableType = savedSorting.order_type;

                    if (!scope.isChild && sortableBy === sortableHeaderId) {
                        sortingUnused = '';
                        sortingIcon = scope.getArrow(sortableType);
                    }
                    if (scope.isChild && innerSortableBy === sortableHeaderId) {
                        sortingUnused = '';
                        sortingIcon = scope.getArrow(innerSortableType);
                    }
                }
                $(element).prepend(`<i class="icon icon-sorting-position ${sortingIcon} ${sortingUnused}"></i>`);
                $(element[0]).css('cursor', 'pointer');
                element.on('click', function (event) {
                    // to avoid sorting while clicking to change the column dimension
                    if (!element[0].isSameNode(event.target) && !$(event.target).hasClass('icon')) {
                        return;
                    }
                    if (!scope.isChild && sortableBy !== sortableHeaderId) {
                        // reset the sort direction if there is not a previous sorting
                        // or if there is a previous sorting on a different column.
                        sortableType = '';
                    }
                    if (scope.isChild && innerSortableBy !== sortableHeaderId) {
                        // reset the sort direction if there is not a previous sorting
                        // or if there is a previous sorting on a different column.
                        innerSortableType = '';
                    }
                    if (scope.isChild) {
                        innerSortableBy = sortableHeaderId;
                    } else {
                        sortableBy = sortableHeaderId;
                    }

                    scope.toggleOrder();
                    WddCacheService.cacheSorting(sortableKey, { inner_order_by: innerSortableBy, inner_order_type: innerSortableType, order_by: sortableBy, order_type: sortableType });
                    if (scope.isChild) {
                        scope.reloadDataFormChild();
                    } else {
                        scope.reloadData();
                    }
                });
            }
        }
    };
}
