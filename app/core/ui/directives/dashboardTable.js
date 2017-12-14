import template from './dashboardTable.template.html';

const headers = {
    dateCentric: [
        {
            label: 'Data Field',
            value: 'data_field'
        }, {
            label: 'Data Field Description',
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
            valule: 'system_owner'
        }
    ]
};


export function DashboardTable (WorkspaceService) {
    'ngInject';
    return {
        scope: {
            title: '@',
            bgcolor: '@',
            tableBody: '=',
            headerType: '@'
        },
        template: template,
        link: (scope) => {
            scope.headerArray = headers[scope.headerType];
            WorkspaceService.getData(scope.key).then(res => {
                scope.dataList = res;
            });
        }
    };
}
