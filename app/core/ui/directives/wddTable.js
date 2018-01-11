import template from './wddTable.template.html';

export function WddTable ($log, $timeout, $state, ModalService, TableService) {
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
            isToSas: '@',
            hasInfoBtn: '@',
            hasPrimaryLabel: '@',
            actionPrimaryLabel: '&',
            hasSecondaryLabel: '@',
            actionSecondaryLabel: '&',
            hasCreationBtn: '@',
            reloadData: '=',
            tableKey: '@'
        },
        template: template,
        link: (scope) => {
            scope.pages = [];
            scope.rawData = [];
            scope.currentPage = 1;
            scope.isSelectAll = {};
            scope.filterApplied = {};
            scope.checkedElements = [];

            scope.reloadData = (filter) => {
                // $log.debug('filter', filter);
                if (filter && filter.filterSetted) {
                    scope.filterApplied = filter.filterSetted;
                }

                if (filter && filter.filterSetted && filter.filterSetted.resetPage) {
                    scope.currentPage = 1;
                }

                TableService.getTableData(scope.tableKey, scope.filterApplied, scope.currentPage).then(data => {
                    scope.serviceResponse = data.dataTable;
                    scope.pageNumber = data.pages;
                    scope.pages = [...Array((scope.pageNumber ? scope.pageNumber: 1) + 1).keys()].slice(1, scope.pageNumber + 1);
                    scope.pages = scope.pages.map(pag => {
                        let isVisible = false;

                        if (scope.currentPage === 1 && pag < 4) {
                            isVisible = true;
                        } else if (scope.currentPage === scope.pageNumber && pag > (scope.pageNumber - 3)) {
                            isVisible = true;
                        } else if (scope.currentPage === pag) {
                            isVisible = true;
                        } else if (pag === (scope.currentPage + 1) || pag === (scope.currentPage - 1)) {
                            isVisible = true;
                        }

                        return({
                            num: pag,
                            isVisible: isVisible
                        });
                    });

                    initData(scope);
                });
            };

            scope.sliceDataToShow = () => {
                let startIndex = (Number(scope.currentPage) - 1) * Number(scope.pageSize);
                let endIndex = startIndex + scope.pageSize;
                let dataVisiblePage = scope.rawData.slice(startIndex, endIndex);

                return dataVisiblePage.map(elem => {
                    elem.isChecked = scope.isSelectAll.value;
                    return elem;
                });
            };

            scope.changingPage = (page) => {
                scope.currentPage = page;
                scope.serviceResponse = undefined;
                if (scope.isChild) {
                    scope.sliceDataToShow();
                } else {
                    scope.reloadData();
                }
            };

            scope.backwards = () => {
                if (scope.currentPage === 1) {
                    return;
                }

                scope.currentPage -= 1;
                scope.serviceResponse = undefined;
                if (scope.isChild) {
                    scope.sliceDataToShow();
                } else {
                    scope.reloadData();
                }
            };

            scope.forward = () => {
                if (scope.currentPage === scope.pageNumber) {
                    return;
                }

                scope.currentPage += 1;
                scope.serviceResponse = undefined;
                if (scope.isChild) {
                    scope.sliceDataToShow();
                } else {
                    scope.reloadData();
                }
            };

            if (scope.hasPrimaryNavigationBtn || scope.hasSecondaryNavigationBtn || scope.hasInfoBtn || scope.hasCreationBtn) {
                scope.hasIcon = true;
            }

            scope.iconNumber = Number(!!scope.hasPrimaryNavigationBtn) + Number(!!scope.hasSecondaryNavigationBtn);

            if (scope.hasPrimaryLabel || scope.hasSecondaryLabel) {
                scope.hasUnderTable = true;
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

            scope.rowAction = (row) => {
                if (row.action === 'collapse') {
                    scope.serviceResponse[row.key].workspace.collapse = !scope.serviceResponse[row.key].workspace.collapse;
                } else if (row.action === 'primaryNavigation') {
                    $state.go(scope.pathPrimaryNavigation, {id: scope.serviceResponse[row.key].id_field});
                } else if (row.action === 'secondaryNavigation') {
                    $state.go(scope.pathSecondaryNavigation, {id: scope.serviceResponse[row.key].id_field});
                } else if (row.action === 'info') {
                    // To add the id to send to the modal
                    ModalService.openModificationWorkspace();
                } else if (row.action === 'creation') {
                    // To add the id to send to the modal
                    ModalService.openNewWorkspaceRequests();
                }
            };

            scope.secondaryAction = () => {
                scope.actionSecondaryLabel();
            };

            scope.primaryAction = () => {
                scope.actionPrimaryLabel();
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

                if (scope.isChild && scope.serviceResponse[0]) {
                    const startRes = scope.serviceResponse[0];
                    scope.serviceResponse = [];
                    for (let i = 0; i < Array(25).length; i++) {
                        scope.serviceResponse.push(startRes);
                    }
                }
            } catch (error) {
                $log.debug(error);
            }

            if (scope.isChild) {
                initData(scope);

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
        }
    };
}

function initData (scope) {
    if (scope.expandable) {
        scope.serviceResponse = scope.serviceResponse.map(elem => {
            elem.workspace.collapse = true;
            elem.isChecked = Boolean(scope.checkedElements.find(el => el === elem.id));
            // elem.isChecked = scope.isSelectAll.value;
            return elem;
        });
    }
}
