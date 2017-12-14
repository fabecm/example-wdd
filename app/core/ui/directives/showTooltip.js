export function ShowTooltip () {
    return {
        restrict: 'A',
        link: (scope, element, attrs) => {
            let el = element[0];
            scope.$watch(() => el.scrollWidth, () => {
                el = element[0];
                if (el.offsetWidth < el.scrollWidth) {
                    attrs.tooltipEnable = 'true';
                }
            });
        }
    };
}
