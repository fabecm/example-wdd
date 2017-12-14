import template from './wddTable.template.html';

export function WddTable ($timeout, $state) {
    'ngInject';
    return {
        scope: {
            serviceResponseObj: '@',
            headerArrayObj: '@',
            paginationBool: '@',
            pageSizeNum: '@',
            expandableBool: '@',
            headerArrayExpandableObj: '@',
            isChildCheckedBool: '@',
            isChild: '@',
            isCheckedBool: '@',
            hasPrimaryNavigationBtn: '@',
            pathPrimaryNavigation: '@',
            pathSecondaryNavigation: '@',
            hasSecondaryNavigationBtn: '@',
            hasInfoBtn: '@',
            hasPrimaryLabel: '@',
            hasSecondaryLabel: '@',
            hasCreationBtn: '@'
        },
        template: template,
        link: (scope) => {
            scope.pages = [];
            scope.rawData = [];
            scope.currentPage = 1;

            if (scope.hasPrimaryNavigationBtn || scope.hasSecondaryNavigationBtn || scope.hasInfoBtn || scope.hasCreationBtn) {
                scope.hasIcon = true;
            }

            scope.iconNumber = Number(!!scope.hasPrimaryNavigationBtn) + Number(!!scope.hasSecondaryNavigationBtn);

            if (scope.hasPrimaryLabel || scope.hasSecondaryLabel) {
                scope.hasUnderTable = true;
            }

            scope.sliceDataToShow = () => {
                let startIndex = (Number(scope.currentPage) - 1) * Number(scope.pageSize);
                let endIndex = startIndex + scope.pageSize;
                let dataVisiblePage = scope.rawData.slice(startIndex, endIndex);

                return dataVisiblePage;
            };

            try {
                if (scope.serviceResponseObj) {
                    scope.serviceResponse = JSON.parse(scope.serviceResponseObj).array;
                }
                if (scope.headerArrayObj) {
                    scope.headerArray = JSON.parse(scope.headerArrayObj).array;
                }
                if (scope.headerArrayExpandableObj) {
                    scope.headerArrayExpandable = JSON.parse(scope.headerArrayExpandableObj).array;
                }
                if (scope.paginationBool) {
                    scope.pagination = JSON.parse(scope.paginationBool).boolean;
                }
                if (scope.expandableBool) {
                    scope.expandable = JSON.parse(scope.expandableBool).boolean;
                }
                if (scope.pageSizeNum) {
                    scope.pageSize = JSON.parse(scope.pageSizeNum).number;
                }
                if (scope.isCheckedBool) {
                    scope.isChecked = JSON.parse(scope.isCheckedBool).boolean;
                }
                if (scope.isChildCheckedBool) {
                    scope.isChildChecked = JSON.parse(scope.isChildCheckedBool);
                }
                if (scope.hasPrimaryNavigationBtn) {
                    scope.primaryNavigation = JSON.parse(scope.hasPrimaryNavigationBtn);
                }
                if (scope.hasSecondaryNavigationBtn) {
                    scope.secondaryNavigation = JSON.parse(scope.hasSecondaryNavigationBtn);
                }
                if (scope.hasInfoBtn) {
                    scope.info = JSON.parse(scope.hasInfoBtn);
                }
                if (scope.hasCreationBtn) {
                    scope.hasCreation = JSON.parse(scope.hasCreationBtn);
                }

                initTable(scope);
            } catch (error) {
                console.log(error);
            }

            scope.childCollspan = () => {
                let numColl = 0;

                numColl += scope.headerArray.length;

                if (scope.expandable || scope.isChecked) {
                    numColl += 1;
                }

                if (scope.hasIcon) {
                    numColl += 1;
                }

                return numColl;
            };


            scope.changingPage = (obj) => {
                scope.currentPage = obj;

                scope.serviceResponse = undefined;

                $timeout(() => {
                    scope.serviceResponse = scope.sliceDataToShow();
                });
            };

            scope.changingPageToFirst = () => {
                scope.currentPage = 1;

                scope.serviceResponse = undefined;

                $timeout(() => {
                    scope.serviceResponse = scope.sliceDataToShow();
                });
            };

            scope.changingPageToLast = () => {
                scope.currentPage = scope.pages.length;

                scope.serviceResponse = undefined;

                $timeout(() => {
                    scope.serviceResponse = scope.sliceDataToShow();
                });
            };

            scope.rowAction = (row) => {
                if (row.action === 'collapse') {
                    scope.serviceResponse[row.key].workspace.collapse = !scope.serviceResponse[row.key].workspace.collapse;
                } else if (row.action === 'primaryNavigation') {
                    $state.go(scope.pathPrimaryNavigation, {id: scope.serviceResponse[row.key].id});
                } else if (row.action === 'secondaryNavigation') {
                    $state.go(scope.pathSecondaryNavigation, {id: scope.serviceResponse[row.key].id});
                }
            };
        }
    };
}

function initTable (scope) {
    if (scope.expandable) {
        scope.serviceResponse = scope.serviceResponse.map(elem => {
            elem.workspace.collapse = true;
            return elem;
        });
    }

    scope.rawData = angular.copy(scope.serviceResponse);

    if (!scope.pageSize) {
        scope.pageSize = 10;
    }

    if(scope.serviceResponse && scope.serviceResponse.length && scope.pagination && scope.pageSize && scope.pageSize > 0) {
        let numPages = Math.ceil(scope.serviceResponse.length / scope.pageSize);
        scope.serviceResponse = scope.sliceDataToShow();
        scope.pages = [...Array(numPages + 1).keys()].slice(1, numPages + 1);
    }
}
