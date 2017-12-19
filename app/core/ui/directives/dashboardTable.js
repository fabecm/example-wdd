import template from './dashboardTable.template.html';

const headers = {
    dateCentric: [
        {
            label: 'Data Field',
            value: 'data_field'
        }, {
            label: 'Descrizione Data Field',
            value: 'data_field_description'
        }, {
            label: 'Data Table',
            value: 'data_table'
        }, {
            label: 'Data Source',
            value: 'data_source'
        }, {
            label: 'Technical Application',
            value: 'tech_application'
        }
    ],
    workspaceCentric: [
        {
            label: 'Workspace',
            value: 'workspace'
        }, {
            label: 'Data Field',
            value: 'data_field'
        }, {
            label: 'Data Table',
            value: 'data_table'
        }, {
            label: 'Data Source',
            value: 'data_source'
        }, {
            label: 'Technical Application',
            value: 'tech_application'
        }, {
            label: 'System Owner',
            value: 'system_owner'
        }
    ]
};


export function DashboardTable (WorkspaceService, $log, $state) {
    'ngInject';
    return {
        scope: {
            tableTitle: '@',
            bgcolor: '@',
            tableBody: '=',
            headerType: '@',
            childPage: '@'
        },
        template: template,
        link: (scope) => {
            scope.headerArray = headers[scope.headerType];
            $log.debug(WorkspaceService);
            scope.goToChildPage = () => {
                $state.go(scope.childPage);
            };
        }
    };
}
