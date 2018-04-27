import $ from 'jquery';
import template from './wddTable.template.html';

export function WddTable ($log, $timeout, $state, ModalService, TableService, WDDAlert, SessionService, WddCacheService) {
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
            stateToAbleChildCheck: '@',
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
            ableStatusPrimaryLabel: '@',
            hasSecondaryLabel: '@',
            actionSecondaryLabel: '&',
            disabledSecondaryLabelWithEmptyResponse: '@',
            ableStatusSecondaryLabel: '@',
            hasTertiaryLabel: '@',
            actionTertiaryLabel: '&',
            disabledTertiaryLabelWithEmptyResponse: '@',
            ableStatusTertiaryLabel: '@',
            hasCreationBtn: '@',
            statusToDisabledCreation: '@',
            reloadData: '=',
            reloadDataFormChild: '&',
            tableKey: '@',
            promise: '=?',
            textSpinner: '@?',
            tableIsEmpty: '=?',
            hasRelationModal: '@?',
            dontResize: '@?',
            navigationInPopover: '@',
            allowedColumnsDataLineage: '=?',
            sortableTable: '@?',
            sortableTableType: '@',
            sortableChildren: '@?',
            sortableParentSelected: '@?',
            sortableChildrenTableType: '@?'
        },
        template: template,
        link: (scope) => {
            scope.pages = [];
            scope.rawData = [];
            scope.checkableChild = [];
            scope.currentPage = 1;
            scope.isSelectAll = {};
            scope.filterApplied = {};
            scope.checkedElements = [];
            scope.cacheKey = `filter_${$state.$current.name.replace(/\./g, '_')}`;
            scope.sortCacheKey = `sorting_${$state.$current.name.replace(/\./g, '_')}_${scope.tableKey}`;
            scope.navigationInPopover = (scope.navigationInPopover !== 'true') ? false : true;
            scope.sortableTable = (scope.sortableTable !== 'true') ? false : true;
            scope.sortableChildren = (scope.sortableChildren !== 'true') ? false : true;
            if (!scope.sortableChildren) {
                scope.sortableParentSelected = `sorting_${$state.$current.name.replace(/\./g, '_')}_${scope.tableKey}`;
            }
            scope.sortableColumns = {
                data: ['workspace',
                    'data_field',
                    'data_table',
                    'data_source',
                    'technical_application',
                    'system_owner',
                    'status',
                    'workspace_end_date',
                    'data_scadenza',
                    'data_source_table',
                    'data_event',
                    'event'],
                dataView: ['workspace',
                    'data_field',
                    'data_table',
                    'data_source',
                    'technical_application',
                    'system_owner',
                    'status',
                    'workspace_end_date',
                    'process_owner'],
                business: [
                    'business_data',
                    'data_field',
                    'data_table',
                    'data_source',
                    'technical_application',
                    'business_glossary',
                    'responsible_user',
                    'system_owner',
                    'process_owner'],
                entity: ['term_type',
                    'term_name',
                    'description',
                    'status',
                    'modified_date'],
                relation: ['term_type',
                    'term_name',
                    'description',
                    'status',
                    'date'],
                workspace: ['workspace',
                    'description',
                    'start_date',
                    'end_date',
                    'status']
            };
            scope.reloadData = (filter) => {
                // $log.debug('filter', filter);
                if (filter && filter.filterSetted) {
                    scope.filterApplied = filter.filterSetted;
                }
                if (WddCacheService.getCachedFilter(scope.sortCacheKey)) {
                    scope.filterApplied.order_by = WddCacheService.getCachedFilter(scope.sortCacheKey).order_by;
                    scope.filterApplied.order_type = WddCacheService.getCachedFilter(scope.sortCacheKey).order_type;
                } else {
                    delete scope.filterApplied.order_by;
                    delete scope.filterApplied.order_type;
                }

                if (filter && filter.filterSetted && (filter.filterSetted.resetPage || filter.filterSetted.term_id)) {
                    scope.currentPage = 1;
                } else if (filter && filter.filterSetted && !filter.filterSetted.resetPage && WddCacheService.getCachedFilter(scope.cacheKey)) {
                    scope.currentPage = WddCacheService.getCachedFilter(scope.cacheKey).page;
                }

                const getTableDataPromise = TableService.getTableData(scope.tableKey, scope.filterApplied, scope.currentPage);
                scope.promise = getTableDataPromise;
                WddCacheService.cachePage(scope.cacheKey, scope.currentPage);
                getTableDataPromise.then(data => {
                    scope.serviceResponse = data.dataTable;
                    scope.isErrored = false;
                    scope.checkedElements = [];

                    if (scope.serviceResponse !== null && scope.serviceResponse !== undefined && scope.serviceResponse.length === 0) {
                        WDDAlert.showAlert('warning', 'NESSUN DATO DA VISUALIZZARE', 'empty-table');
                        scope.tableIsEmpty = true;
                    } else {
                        WDDAlert.removeEmptyTableAlert();
                    }

                    if (!scope.isChild && scope.serviceResponse && scope.serviceResponse.length > 0) {
                        scope.serviceResponse.map(e => {
                            // if ((scope.ableStatusPrimaryLabel && scope.ableStatusPrimaryLabel === e.status.label) ||
                            //     (scope.ableStatusSecondaryLabel && scope.ableStatusSecondaryLabel === e.status.label) ||
                            //     (scope.ableStatusTertiaryLabel && scope.ableStatusTertiaryLabel === e.status.label)) {
                            //     e.ableCheck = true;
                            // }
                            if ((scope.arrayStatusPrimaryLabel && scope.checkStatus(scope.arrayStatusPrimaryLabel, e.status.label)) ||
                                (scope.arrayStatusSecondaryLabel && scope.checkStatus(scope.arrayStatusSecondaryLabel, e.status.label)) ||
                                (scope.arrayStatusTertiaryLabel && scope.checkStatus(scope.arrayStatusTertiaryLabel, e.status.label))) {
                                e.ableCheck = true;
                            }
                            return e;
                        });
                    }

                    if (scope.expandable && scope.serviceResponse && scope.serviceResponse.length > 0) {
                        scope.serviceResponse.map(e => {
                            if (e.data_fields && e.data_fields.length > 0) {
                                let hasCheckableChild = false;
                                e.data_fields = e.data_fields.map(field => {
                                    field.workspace = {
                                        id: e.workspace.id
                                    };
                                    if (field.status && field.status.label === scope.stateToAbleChildCheck) {
                                        field.ableCheck = true;
                                        hasCheckableChild = true;
                                    } else {
                                        field.ableCheck = false;
                                    }
                                    return field;
                                });
                                e.hasCheckableChild = hasCheckableChild;
                            }
                            return e;
                        });
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

                    if (!scope.dontResize) {
                        setTimeout(function () {
                            let tableLength = $(window).width() - 100;
                            if (scope.tableKey === 'processHistory') {
                                if ($(window).width() === 1024) {
                                    tableLength -= 50;
                                } else if ($(window).width() === 1280) {
                                    tableLength -= 300;
                                } else if ($(window).width() > 1280) {
                                    tableLength -= 1000;
                                }
                            }
                            scope.thLength = (tableLength - scope.sumDefaultWidths()) / scope.numWithoutDefaultWidth();
                        });
                    }
                }).catch((err) => {
                    $log.error(err);
                    scope.isErrored = true;
                });
            };

            scope.sumDefaultWidths = () => {
                let sum = 0;
                scope.headerArray.forEach(function (element) {
                    if ('width' in element) {
                        sum += parseInt(element.width, 10);
                    }
                });
                return sum;
            };

            scope.numWithoutDefaultWidth = () => {
                let num = scope.childCollspan();
                for (let i = 0; i < scope.headerArray.length; i++) {
                    if (scope.checkColumnDefaultWidth(i)) {
                        num--;
                    }
                }
                return num;
            };

            scope.checkColumnDefaultWidth = (index, column) => {
                // checks if there is a default width or a user specified width of the column
                let localStorageColumn = window.localStorage.getItem($state.current.name + '.' + scope.tableKey + '.' + column);
                if ((index !== undefined && scope.headerArray[index] !== undefined && 'width' in scope.headerArray[index]) || localStorageColumn !== null) {
                    return true;
                }
                return false;
            };

            scope.getColumnWidth = (index, column) => {
                let localStorageColumn = window.localStorage.getItem($state.current.name + '.' + scope.tableKey + '.' + column);
                if (localStorageColumn !== null) {
                    return localStorageColumn + 'px';
                }
                return scope.headerArray[index].width + 'px';
            };

            scope.setColumnWidth = (column, width) => {
                let table = scope.tableKey;
                let key = $state.current.name + '.' + table + '.' + column;
                let localStorageColumn = window.localStorage.getItem(key);
                if (localStorageColumn !== null) {
                    window.localStorage.removeItem(key);
                }
                window.localStorage.setItem(key, width);
            };

            scope.$on('angular-resizable.resizeEnd', function (event, args) {
                scope.setColumnWidth(event.targetScope.$parent.item.value, args.width);
            });

            scope.checkRowsSelection = () => {
                if (scope.isChild) {
                    if (scope.isSelectAll.value) {
                        scope.checkedElements = scope.checkableChild.map(e => e.id_field);
                    } else {
                        scope.checkedElements = [];
                    }
                    scope.serviceResponse = scope.sliceDataToShow();
                } else {
                    if (scope.isSelectAll.value) {
                        scope.checkedElements = scope.serviceResponse.filter(e => e.ableCheck).map(e => e.id_field);
                    } else {
                        scope.checkedElements = [];
                        scope.serviceResponse.map(e => {
                            // if ((scope.ableStatusPrimaryLabel && scope.ableStatusPrimaryLabel === e.status.label) ||
                            //     (scope.ableStatusSecondaryLabel && scope.ableStatusSecondaryLabel === e.status.label) ||
                            //     (scope.ableStatusTertiaryLabel && scope.ableStatusTertiaryLabel === e.status.label)) {
                            //     e.ableCheck = true;
                            // }
                            if ((scope.arrayStatusPrimaryLabel && scope.checkStatus(scope.arrayStatusPrimaryLabel, e.status.label)) ||
                            (scope.arrayStatusSecondaryLabel && scope.checkStatus(scope.arrayStatusSecondaryLabel, e.status.label)) ||
                            (scope.arrayStatusTertiaryLabel && scope.checkStatus(scope.arrayStatusTertiaryLabel, e.status.label))) {
                                e.ableCheck = true;
                            }
                            return e;
                        });
                    }

                    scope.serviceResponse.map(elem => {
                        // console.log(elem);
                        const index = scope.checkedElements.findIndex((row_data) => row_data.id === elem.id_field.id);
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
                    if (row.data.isChecked && (scope.checkedElements.length + 1) === scope.checkableChild.length) {
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
                    if (scope.serviceResponse && scope.serviceResponse.length > 0) {
                        scope.serviceResponse.map(e => {
                            if (row.data.status.label !== e.status.label) {
                                e.ableCheck = false;
                            }
                            return e;
                        });
                    }

                    if (scope.isSelectAll.value) {
                        scope.isSelectAll.value = false;
                    }
                    if (row.data.isChecked && (scope.checkedElements.length + 1) === scope.serviceResponse.filter(e => e.ableCheck).length) {
                        scope.isSelectAll.value = true;
                    }
                    if (row.data.isChecked) {
                        scope.checkedElements.push(row.data);
                    } else {
                        const index = scope.checkedElements.findIndex((raw) => raw.id_field === row.data.id_field);
                        if (index >= 0) {
                            scope.checkedElements.splice(index, 1);
                        }
                        if (scope.checkedElements.length === 0) {
                            scope.serviceResponse.map(e => {
                                // if ((scope.ableStatusPrimaryLabel && scope.ableStatusPrimaryLabel === e.status.label) ||
                                //     (scope.ableStatusSecondaryLabel && scope.ableStatusSecondaryLabel === e.status.label) ||
                                //     (scope.ableStatusTertiaryLabel && scope.ableStatusTertiaryLabel === e.status.label)) {
                                //     e.ableCheck = true;
                                // }
                                if ((scope.arrayStatusPrimaryLabel && scope.checkStatus(scope.arrayStatusPrimaryLabel, e.status.label)) ||
                                (scope.arrayStatusSecondaryLabel && scope.checkStatus(scope.arrayStatusSecondaryLabel, e.status.label)) ||
                                (scope.arrayStatusTertiaryLabel && scope.checkStatus(scope.arrayStatusTertiaryLabel, e.status.label))) {
                                    e.ableCheck = true;
                                }
                                return e;
                            });
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
                    const index = scope.checkedElements.findIndex((row_data) => {
                        return row_data === elem.id_field;
                    });
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
                    $timeout(() => {
                        scope.serviceResponse = scope.sliceDataToShow();
                    });
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
                    $timeout(() => {
                        scope.serviceResponse = scope.sliceDataToShow();
                    });
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
                    $timeout(() => {
                        scope.serviceResponse = scope.sliceDataToShow();
                    });
                } else {
                    scope.reloadData();
                }
            };
            if (scope.hasPrimaryNavigationBtn || scope.hasSecondaryNavigationBtn || scope.hasInfoBtn || scope.hasCreationBtn || scope.hasRelationModal) {
                scope.hasIcon = true;
            }

            scope.iconNumber = Number(!!scope.hasPrimaryNavigationBtn) + Number((!!scope.hasSecondaryNavigationBtn) || !!scope.hasRelationModal) + Number(!!scope.hasTernaryNavigationBtn);

            if (scope.hasPrimaryLabel || scope.hasSecondaryLabel) {
                scope.hasUnderTable = true;
            }

            scope.childCollspan = () => {
                let numColl = 0;

                numColl += scope.headerArray.length;

                if (scope.expandable || scope.isChecked) {
                    numColl += 1;
                }

                if (scope.hasIcon && !scope.navigationInPopover) {
                    numColl += 1;
                }

                return numColl;
            };

            scope.getFieldDraft = (service, row) => {
                if (typeof row.cell !== 'undefined' && typeof row.cell.draft !== 'undefined') {
                    return row.cell.draft;
                }
                return service[row.key].draft;
            };

            scope.getFieldId = (service, row) => {
                if (row.cell) {
                    return row.cell.id;
                }
                if (scope.isChild) {
                    return service[row.key].id_field;
                }
                if (service[row.key].id_field) {
                    return service[row.key].id_field.id;
                }
                return undefined;
            };

            scope.getFieldLabel = (service, row) => {
                if (row.cell) {
                    return row.cell.label;
                }
                return service[row.key].label;
            };
            scope.getTermType = (service, row) => {
                if (row.cell) {
                    return row.cell.term_type.id;
                }
                return service[row.key].term_type.id;
            };

            scope.getTermName = (service, row) => {
                if (row.cell) {
                    return row.cell.term_name.label;
                }
                return service[row.key].term_name.label;
            };

            scope.rowAction = (row) => {
                let workspaceId;
                if (scope.serviceResponse[row.key].workspace && scope.serviceResponse[row.key].workspace.id) {
                    workspaceId = scope.serviceResponse[row.key].workspace.id;
                }
                let isDraft = scope.getFieldDraft(scope.serviceResponse, row);
                let fieldId = scope.getFieldId(scope.serviceResponse, row);

                if (row.action === 'collapse') {
                    scope.serviceResponse[row.key].workspace.collapse = !scope.serviceResponse[row.key].workspace.collapse;
                } else if (row.action === 'primaryNavigation') {
                    if (scope.pathPrimaryNavigation === 'tab.dataDetail') {
                        ModalService.openMDDataDetail(fieldId, isDraft, workspaceId);
                        return;
                    }
                    $state.go(scope.pathPrimaryNavigation, {
                        id: fieldId,
                        isDraft: isDraft,
                        workspaceId: workspaceId
                    });
                } else if (row.action === 'secondaryNavigation') {
                    let options = {
                        id: fieldId,
                        type: 'F',
                        isDraft: isDraft,
                        workspaceId: workspaceId
                    };
                    if (row.cell && row.cell.term_type.id === 'TECHNICAL_RULE') {
                        options.type = 'R';
                    }
                    $state.go(scope.pathSecondaryNavigation, options);
                } else if (row.action === 'info') {
                    ModalService.openModificationWorkspace(workspaceId).then(() => {
                        scope.reloadData();
                    });
                } else if (row.action === 'creation') {
                    ModalService.openNewWorkspaceRequests(workspaceId).then(() => {
                        scope.reloadData();
                    });
                } else if (row.action === 'ternaryNavigation') {
                    let pathSas = [`${SessionService.endPointSas}`,
                        `#subjectName=${encodeURI(scope.getFieldLabel(scope.serviceResponse, row))}`,
                        '&module=relationships&subjectType=6003&viewName=Governance&subjectID=',
                        `${SessionService.objectIdSas}`,
                        `${fieldId}`];
                    window.open(pathSas.join(''), '_blank');
                } else if (row.action === 'showRelation') {
                    let termType = scope.getTermType(scope.serviceResponse, row);
                    let termName = scope.getTermName(scope.serviceResponse, row);

                    ModalService.openRelationsModal(fieldId, termType, termName).then(() => {
                        scope.relationModalOpen = true;
                        scope.reloadData();
                    });
                }
            };

            scope.secondaryAction = () => {
                let idChecked;
                if (scope.checkedElements && scope.checkedElements.length > 0) {
                    idChecked = scope.checkedElements.map(e => {
                        return ({
                            id_field: e.id_field.id
                        });
                    });
                }
                scope.actionSecondaryLabel({selectedItems: idChecked});
            };

            scope.primaryAction = () => {
                let idChecked;
                if (scope.checkedElements && scope.checkedElements.length > 0) {
                    idChecked = scope.checkedElements.map(e => {
                        return ({
                            id_field: e.id_field.id
                        });
                    });
                }
                scope.actionPrimaryLabel({selectedItems: idChecked});
            };

            scope.tertiaryAction = () => {
                let idChecked;
                if (scope.checkedElements && scope.checkedElements.length > 0) {
                    idChecked = scope.checkedElements.map(e => {
                        return ({
                            id_field: e.id_field.id
                        });
                    });
                }
                scope.actionTertiaryLabel({selectedItems: idChecked});
            };

            scope.forwardCheckedItems = () => {
                let idChecked = scope.checkedElements.map(e => {
                    return ({
                        id_field: e
                    });
                });
                let param = {
                    selectedItems: idChecked,
                    action: 'FORWARD',
                    text: ModalService.getForwardText()
                };
                ModalService.openActionModal(param).then(() => {
                    $timeout(() => {
                        scope.reloadDataFormChild();
                    });
                });
            };

            scope.checkStatus = (array, label) => {
                if (array.length > 0) {
                    return array.filter(e => e === label).length > 0;
                }
                return false;
            };

            scope.disabledPrimaryLabel = () => {
                if (!scope.ableStatusPrimaryLabel) {
                    return false;
                }
                if (scope.disabledPrimaryLabelWithEmptyResponse && scope.serviceResponse.length === 0) {
                    return true;
                }
                if (scope.checkedElements.length === 0) {
                    return true;
                }
                // if (scope.checkedElements.length > 0 && scope.serviceResponse.filter(e => e.ableCheck)[0].status.label !== scope.ableStatusPrimaryLabel) {
                if (scope.checkedElements.length > 0 && !scope.checkStatus(scope.arrayStatusPrimaryLabel, scope.serviceResponse.filter(e => e.ableCheck)[0].status.label)) {
                    return true;
                }
                return false;
            };

            scope.disabledSecondaryLabel = () => {
                if (!scope.ableStatusSecondaryLabel) {
                    return false;
                }
                if (scope.disabledSecondaryLabelWithEmptyResponse && scope.serviceResponse.length === 0) {
                    return true;
                }
                if (scope.checkedElements.length === 0) {
                    return true;
                }
                // if (scope.checkedElements.length > 0 && scope.serviceResponse.filter(e => e.ableCheck)[0].status.label !== scope.ableStatusSecondaryLabel) {
                if (scope.checkedElements.length > 0 && !scope.checkStatus(scope.arrayStatusSecondaryLabel, scope.serviceResponse.filter(e => e.ableCheck)[0].status.label)) {
                    return true;
                }
                return false;
            };

            scope.disabledTertiaryLabel = () => {
                if (!scope.ableStatusTertiaryLabel) {
                    return false;
                }
                if (scope.disabledTertiaryLabelWithEmptyResponse && scope.serviceResponse.length === 0) {
                    return true;
                }
                if (scope.checkedElements.length === 0) {
                    return true;
                }
                // if (scope.checkedElements.length > 0 && scope.serviceResponse.filter(e => e.ableCheck)[0].status.label !== scope.ableStatusTertiaryLabel) {
                if (scope.checkedElements.length > 0 && !scope.checkStatus(scope.arrayStatusTertiaryLabel, scope.serviceResponse.filter(e => e.ableCheck)[0].status.label)) {
                    return true;
                }
                return false;
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
                if (scope.ableStatusPrimaryLabel) {
                    scope.arrayStatusPrimaryLabel = JSON.parse(scope.ableStatusPrimaryLabel);
                }
                if (scope.ableStatusSecondaryLabel) {
                    scope.arrayStatusSecondaryLabel = JSON.parse(scope.ableStatusSecondaryLabel);
                }
                if (scope.ableStatusTertiaryLabel) {
                    scope.arrayStatusTertiaryLabel = JSON.parse(scope.ableStatusTertiaryLabel);
                }
            } catch (error) {
                $log.debug(error);
            }

            if (scope.isChild) {
                initData(scope);

                scope.rawData = angular.copy(scope.serviceResponse);
                scope.checkableChild = angular.copy(scope.rawData).filter(e => e.ableCheck);

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
