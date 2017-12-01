export class DetailsService {
    constructor ($http, $q) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
    }

    getDataFieldDetails (termId) {
        if(Boolean(true) === true) {
            return getMockedData(this.$q);
        }
        return this.$http.get(`WDD/details/${termId}`);
    }
}

function getMockedData ($q) {
    var deferred = $q.defer();

    deferred.resolve([
        {
            label: 'EDG DD - Data Field',
            status: 'completo',
            attributes: [
                {
                    attribute_name: 'Requirements',
                    attribute_type: 'VARCHAR(512)',
                    frontend_type: 'MULTILINETEXT',
                    is_required: 'N',
                    is_visible: 'N',
                    is_editable: 'N',
                    is_user_attribute: 'N',
                    show_order: 0,
                    show_grid: 'N',
                    domain_value: '',
                    default_value: ''
                },
                {
                    attribute_name: 'Field',
                    attribute_type: 'VARCHAR(255)',
                    frontend_type: 'SINGLELINETEXT',
                    is_required: 'Y',
                    is_visible: 'Y',
                    is_editable: 'Y',
                    is_user_attribute: 'Y',
                    show_order: 1,
                    show_grid: 'N',
                    domain_value: '',
                    default_value: ''
                },
                {
                    attribute_name: 'Importance',
                    attribute_type: 'VARCHAR(255)',
                    frontend_type: 'SINGLESELECTLIST',
                    is_required: 'Y',
                    is_visible: 'Y',
                    is_editable: 'Y',
                    is_user_attribute: 'N',
                    show_order: 10,
                    show_grid: 'Y',
                    domain_value:
            '[\'Critico\',\'Alto\',\'Medio\',\'Basso\',\'Molto\' \'basso\',\'Non specificato\']',
                    default_value: 'Medio'
                },
                {
                    attribute_name: 'Data Type',
                    attribute_type: 'VARCHAR(255)',
                    frontend_type: 'SINGLELINETEXT',
                    is_required: 'Y',
                    is_visible: 'Y',
                    is_editable: 'Y',
                    is_user_attribute: 'Y',
                    show_order: 2,
                    show_grid: 'N',
                    domain_value: '',
                    default_value: ''
                },
                {
                    attribute_name: 'Description',
                    attribute_type: 'VARCHAR(512)',
                    frontend_type: 'MULTILINETEXT',
                    is_required: 'Y',
                    is_visible: 'Y',
                    is_editable: 'Y',
                    is_user_attribute: 'N',
                    show_order: 3,
                    show_grid: 'N',
                    domain_value: '',
                    default_value: ''
                },
                {
                    attribute_name: 'Data Length',
                    attribute_type: 'NUMBER',
                    frontend_type: 'SINGLELINETEXT',
                    is_required: 'N',
                    is_visible: 'Y',
                    is_editable: 'Y',
                    is_user_attribute: 'Y',
                    show_order: 4,
                    show_grid: 'N',
                    domain_value: '',
                    default_value: ''
                },
                {
                    attribute_name: 'Data Layout',
                    attribute_type: 'VARCHAR(255)',
                    frontend_type: 'SINGLELINETEXT',
                    is_required: 'Y',
                    is_visible: 'Y',
                    is_editable: 'Y',
                    is_user_attribute: 'Y',
                    show_order: 5,
                    show_grid: 'N',
                    domain_value: '',
                    default_value: ''
                },
                {
                    attribute_name: 'Data Position',
                    attribute_type: 'NUMBER',
                    frontend_type: 'SINGLELINETEXT',
                    is_required: 'N',
                    is_visible: 'Y',
                    is_editable: 'Y',
                    is_user_attribute: 'Y',
                    show_order: 6,
                    show_grid: 'N',
                    domain_value: '',
                    default_value: ''
                },
                {
                    attribute_name: 'Full Description',
                    attribute_type: 'CLOB',
                    frontend_type: 'VALUETEXT',
                    is_required: 'N',
                    is_visible: 'Y',
                    is_editable: 'Y',
                    is_user_attribute: 'Y',
                    show_order: 7,
                    show_grid: 'N',
                    domain_value: '',
                    default_value: ''
                },
                {
                    attribute_name: 'Master Data',
                    attribute_type: 'BOOLEAN',
                    frontend_type: 'SINGLESELECTLIST',
                    is_required: 'Y',
                    is_visible: 'Y',
                    is_editable: 'Y',
                    is_user_attribute: 'Y',
                    show_order: 8,
                    show_grid: 'Y',
                    domain_value: '[\'TRUE\',\'FALSE\']',
                    default_value: 'FALSE'
                },
                {
                    attribute_name: 'Status',
                    attribute_type: 'VARCHAR(255)',
                    frontend_type: 'SINGLESELECTLIST',
                    is_required: 'Y',
                    is_visible: 'Y',
                    is_editable: 'Y',
                    is_user_attribute: 'N',
                    show_order: 9,
                    show_grid: 'Y',
                    domain_value:
            '[Produzione,Modifica,In sospeso,In fase di revisione,Non specificato]',
                    default_value: 'Modifica'
                }
            ]
        }
    ]);

    return deferred.promise;
}
