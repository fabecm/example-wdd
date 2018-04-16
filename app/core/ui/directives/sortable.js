import $ from 'jquery';

export function Sortable() {
    return {
        restrict: 'A',
        link: (scope, element, attrs) => {
            if (attrs.sortable === '') {
                if (scope.sortableTable) {
                    console.error('Hello Developer! Seems that you have tried to render a sortable table but you haven\'t provided the sortableTableType attribute to wddTable');
                }
                return;
            }
            let sortableColumns = JSON.parse(attrs.sortable);
            let sortableHeaderId = attrs.sortableHeaderId;
            let sortableBy = attrs.sortableBy;
            let sortableType = attrs.sortableType;
            let sortableFilter = JSON.parse(attrs.sortableFilter);
            
            if (sortableColumns.indexOf(sortableHeaderId) !== -1) {
                $(element[0]).css('cursor', 'pointer');
                element.on('click', function(event) {
                    // to avoid sorting while clicking to change the column dimension
                    if (!element[0].isSameNode(event.target) && !$(event.target).hasClass('icon')) {
                        return;
                    }
                    sortableBy = sortableHeaderId;
                    scope.toggleOrder();
                    console.log(sortableFilter);
                    sortableFilter.order_by = sortableBy;
                    sortableFilter.order_type = sortableType;
                    
                    scope.reloadData({filterSetted: sortableFilter});
                });
               
                if (sortableBy !== '' && sortableType !== '' && sortableBy === sortableHeaderId) {
                    if (sortableType === 'ASC') {
                        $(element).prepend('<i class="icon icon-up-arrow"></i>');
                    } else {
                        $(element).prepend('<i class="icon icon-down-arrow"></i>');
                    }
                    
                } else {
                    // da migliorare in caso diano conferma: stile per metterlo all'inzio della cella
                    $(element).prepend('<i class="icon icon-filter"></i>');
                }
                

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