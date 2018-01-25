import template from './wddTable.template.html';

export function WddTable ($log, $timeout, $state, ModalService, TableService, WDDAlert, SessionService) {
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
            pathTernaryNavigation: '@',
            hasTernaryNavigationBtn: '@',
            isToSas: '@',
            hasInfoBtn: '@',
            hasPrimaryLabel: '@',
            actionPrimaryLabel: '&',
            disabledPrimaryLabelWithEmptyResponse: '@',
            hasSecondaryLabel: '@',
            actionSecondaryLabel: '&',
            disabledSecondaryLabelWithEmptyResponse: '@',
            hasTertiaryLabel: '@',
            actionTertiaryLabel: '&',
            disabledTertiaryLabelWithEmptyResponse: '@',
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

                const getTableDataPromise = TableService.getTableData(scope.tableKey, scope.filterApplied, scope.currentPage);
                scope.promise = getTableDataPromise;

                getTableDataPromise.then(data => {
                    scope.serviceResponse = data.dataTable;
                    scope.isErrored = false;

                    if (scope.serviceResponse !== null && scope.serviceResponse !== undefined && scope.serviceResponse.length === 0) {
                        WDDAlert.showAlert('warning', 'NESSUN DATO DA VISUALIZZARE', 'empty-table');
                    }

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
                }).catch(() => {
                    scope.isErrored = true;
                });
            };

            scope.checkRowsSelection = () => {
                if (scope.isChild) {
                    if (scope.isSelectAll.value) {
                        scope.checkedElements = scope.rawData.map(e => e.data_fields);
                    } else {
                        scope.checkedElements = [];
                    }
                    scope.serviceResponse = scope.sliceDataToShow();
                } else {
                    if (!scope.isSelectAll.value) {
                        scope.checkedElements = [];
                    }

                    scope.serviceResponse.map(elem => {
                        // console.log(elem);
                        const index = scope.checkedElements.findIndex((row_data) => row_data.id === elem.data_fields.id);
                        if (index >= 0) {
                            elem.isChecked = true;
                        } else {
                            elem.isChecked = false;
                        }

                        return elem;
                    });
                }
            };

            scope.checkValueChange = (row) => {
                if (scope.isChild) {
                    if (scope.isSelectAll.value) {
                        scope.isSelectAll.value = false;
                    }
                    if (row.data.isChecked && (scope.checkedElements.length + 1) === scope.rawData.length) {
                        scope.isSelectAll.value = true;
                    }
                    if (row.data.isChecked) {
                        scope.checkedElements.push(row.data.id_field);
                    } else {
                        const index = scope.checkedElements.findIndex((row_data) => row_data.id === row.data.id_field.id);
                        if (index >= 0) {
                            scope.checkedElements.splice(index, 1);
                        }
                    }
                } else {
                    if (scope.isSelectAll.value) {
                        scope.isSelectAll.value = false;
                    }
                    if (row.data.isChecked) {
                        scope.checkedElements.push(row.data);
                    } else {
                        const index = scope.checkedElements.findIndex((raw) => raw.id_field === row.data.id_field);
                        if (index >= 0) {
                            scope.checkedElements.splice(index, 1);
                        }
                    }
                }
            };

            scope.printRecordSelected = () => {
                scope.selectedFilename = 'Export.csv';
                scope.selectedColmnOrder = scope.headerArray.map(e => {
                    return (e.value);
                });
                scope.selectedHeader = scope.headerArray.map(e => {
                    return (e.label);
                });
                return scope.getDataToExport();
            };

            scope.getDataToExport = () => {
                const getTableDataPromise = TableService.getTableData(scope.tableKey, scope.filterApplied, 1, 5000);
                scope.promise = getTableDataPromise;
                return getTableDataPromise.then(data => {
                    let dataToExport = data.dataTable.map(record => {
                        for (const e in record) {
                            if (record[e].label) {
                                record[e] = record[e].label;
                            } else {
                                record[e] = record[e].date;
                            }
                        }
                        return record;
                    });
                    return dataToExport;
                });
            };

            scope.sliceDataToShow = () => {
                let startIndex = (Number(scope.currentPage) - 1) * Number(scope.pageSize);
                let endIndex = startIndex + scope.pageSize;
                let dataVisiblePage = scope.rawData.slice(startIndex, endIndex);

                return dataVisiblePage.map(elem => {
                    const index = scope.checkedElements.findIndex((row_data) => row_data.id === elem.data_fields.id);
                    if (index >= 0) {
                        elem.isChecked = true;
                    } else {
                        elem.isChecked = false;
                    }

                    return elem;
                });
            };

            scope.changingPage = (page) => {
                scope.currentPage = page;
                scope.serviceResponse = undefined;
                if (scope.isChild) {
                    scope.serviceResponse = scope.sliceDataToShow();
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
                    scope.serviceResponse = scope.sliceDataToShow();
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
                    scope.serviceResponse = scope.sliceDataToShow();
                } else {
                    scope.reloadData();
                }
            };

            if (scope.hasPrimaryNavigationBtn || scope.hasSecondaryNavigationBtn || scope.hasInfoBtn || scope.hasCreationBtn) {
                scope.hasIcon = true;
            }

            scope.iconNumber = Number(!!scope.hasPrimaryNavigationBtn) + Number(!!scope.hasSecondaryNavigationBtn) + Number(!!scope.hasTernaryNavigationBtn);

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
                    $state.go(scope.pathPrimaryNavigation, {id: scope.serviceResponse[row.key].id_field.id, isDraft: scope.serviceResponse[row.key].draft});
                } else if (row.action === 'secondaryNavigation') {
                    $state.go(scope.pathSecondaryNavigation, {id: scope.serviceResponse[row.key].id_field.id, type: 'F', isDraft: scope.serviceResponse[row.key].draft});
                } else if (row.action === 'info') {
                    ModalService.openModificationWorkspace(scope.serviceResponse[row.key].workspace.id);
                } else if (row.action === 'creation') {
                    ModalService.openNewWorkspaceRequests(scope.serviceResponse[row.key].workspace.id);
                } else if (row.action === 'ternaryNavigation') {
                    let pathSas = [`${SessionService.endPointSas}`,
                        `#subjectName=${encodeURI(scope.serviceResponse[row.key].id_field.label)}`,
                        '&module=relationships&subjectType=6003&viewName=Governance&subjectID=',
                        `${SessionService.objectIdSas}`,
                        `${scope.serviceResponse[row.key].id_field.id}`];
                    window.open(pathSas.join(''), '_blank');
                }
            };

            scope.secondaryAction = () => {
                scope.actionSecondaryLabel({selectedItems: scope.checkedElements});
            };

            scope.primaryAction = () => {
                scope.actionPrimaryLabel({selectedItems: scope.checkedElements});
            };

            scope.tertiaryAction = () => {
                scope.actionTertiaryLabel({selectedItems: scope.checkedElements});
            };

            scope.forwardCheckedItems = () => {
                scope.checkedElements = scope.checkedElements.map(e => {
                    return ({
                        id_field: e
                    });
                });
                let param = {
                    selectedItems: scope.checkedElements,
                    action: 'FORWARD',
                    text: ModalService.getForwardText()
                };
                ModalService.openActionModal(param);
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
                if (scope.hasTernaryNavigationBtn) {
                    scope.ternaryNavigation = JSON.parse(scope.hasTernaryNavigationBtn);
                }
                if (scope.hasInfoBtn) {
                    scope.info = JSON.parse(scope.hasInfoBtn);
                }
                if (scope.hasCreationBtn) {
                    scope.hasCreation = JSON.parse(scope.hasCreationBtn);
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

                if(scope.isChild && scope.serviceResponse && scope.serviceResponse.length && scope.pagination && scope.pageSize && scope.pageSize > 0) {
                    let numPages = Math.ceil(scope.serviceResponse.length / scope.pageSize);
                    scope.serviceResponse = scope.sliceDataToShow();
                    scope.pages = [...Array(numPages + 1).keys()].slice(1, numPages + 1);
                    scope.pageNumber = numPages;
                    scope.pages = scope.pages.map(pag => {
                        return({
                            num: pag,
                            isVisible: true
                        });
                    });
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
