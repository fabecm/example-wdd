export class DetailsService {
    constructor ($http, $q) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
    }

    getDataFieldDetails (termId, isDraft) {
        // if(Boolean(true) === true) {
        //     return getMockedData(this.$q);
        // }
        // termId = 1136820;
        return this.$http.get(`WDD/details/${termId}?draft=${isDraft}`);
        // return this.$http.get(`WDD/details/D64?draft=true`);
    }

    saveEntity (entity) {
        return this.$http.post('WDD/save/entity', entity);
    }
}

// function getMockedData ($q) {
//     var deferred = $q.defer();

//     deferred.resolve({
//         data: [
//             {
//                 term: {
//                     termtype: 'DATA FIELD',
//                     name: 'DD - DF - MOTIVO_STATO_ENTE - R_MONETICA.BD_TSEC67'
//                 },
//                 attributes: [
//                     {
//                         name: 'Data Length',
//                         values: [{ ftype: 'SINGLELINETEXT' }],
//                         ftype: 'SINGLELINETEXT',
//                         position: '4'
//                     },
//                     {
//                         name: 'Data Type',
//                         values: [{ ftype: 'SINGLELINETEXT' }],
//                         ftype: 'SINGLELINETEXT',
//                         position: '2'
//                     },
//                     {
//                         name: 'Data Layout',
//                         values: [{ ftype: 'SINGLELINETEXT' }],
//                         ftype: 'SINGLELINETEXT',
//                         position: '5'
//                     },
//                     {
//                         name: 'Data Position',
//                         values: [{ ftype: 'SINGLELINETEXT' }],
//                         ftype: 'SINGLELINETEXT',
//                         position: '6'
//                     },
//                     {
//                         name: 'Field',
//                         values: [{ ftype: 'SINGLELINETEXT' }],
//                         ftype: 'SINGLELINETEXT',
//                         position: '1'
//                     },
//                     {
//                         name: 'Description',
//                         values: [
//                             {
//                                 value:
//                         'identifica il motivo dello stato presente sul dispositivo sul processor',
//                                 ftype: 'MULTILINETEXT'
//                             }
//                         ],
//                         ftype: 'MULTILINETEXT',
//                         position: '3'
//                     },
//                     {
//                         name: 'Status',
//                         values: [{ value: 'Produzione', ftype: 'SINGLESELECTLIST' }],
//                         domain_values: [
//                     { label: 'Produzione' },
//                     { label: 'Modifica' },
//                     { label: 'In sospeso' },
//                     { label: 'In fase di revisione' },
//                     { label: 'Non specificato' }
//                         ],
//                         ftype: 'SINGLESELECTLIST',
//                         position: '9'
//                     },
//                     {
//                         name: 'Master Data',
//                         values: [{ value: 'N', ftype: 'SINGLESELECTLIST' }],
//                         domain_values: [{ label: 'TRUE' }, { label: 'FALSE' }],
//                         ftype: 'FLAG',
//                         position: '8'
//                     },
//                     {
//                         name: 'Importance',
//                         values: [{ value: 'Molto basso', ftype: 'SINGLESELECTLIST' }],
//                         domain_values: [
//                     { label: 'Critico' },
//                     { label: 'Alto' },
//                     { label: 'Medio' },
//                     { label: 'Basso' },
//                     { label: 'Molto basso' },
//                     { label: 'Non specificato' }
//                         ],
//                         ftype: 'SINGLESELECTLIST',
//                         position: '10'
//                     },
//                     {
//                         name: 'Full Description',
//                         values: [{ ftype: 'VALUETEXT' }],
//                         ftype: 'VALUETEXT',
//                         position: '7'
//                     },
//                     {
//                         name: 'Attach',
//                         ftype: 'FILE',
//                         domainValue: [],
//                         position: '11'
//                     }
//                 ],
//                 status: 'completo'
//             },
//             {
//                 term: {
//                     termtype: 'DATA TABLE',
//                     name: 'DD - DT - BD_TSEC67 - R_MONETICA'
//                 },
//                 attributes: [
//                     {
//                         name: 'Description',
//                         values: [
//                             {
//                                 value: 'Anagrafica Carte - dispositivo reale Carta Libra',
//                                 ftype: 'MULTILINETEXT'
//                             }
//                         ],
//                         ftype: 'MULTILINETEXT',
//                         position: '2'
//                     },
//                     {
//                         name: 'Status',
//                         values: [{ value: 'Produzione', ftype: 'SINGLESELECTLIST' }],
//                         domain_values: [
//                     { label: 'Produzione' },
//                     { label: 'Modifica' },
//                     { label: 'In sospeso' },
//                     { label: 'In fase di revisione' },
//                     { label: 'Non specificato' }
//                         ],
//                         ftype: 'SINGLESELECTLIST',
//                         position: '4'
//                     },
//                     {
//                         name: 'Importance',
//                         values: [{ value: 'Molto basso', ftype: 'SINGLESELECTLIST' }],
//                         domain_values: [
//                     { label: 'Critico' },
//                     { label: 'Alto' },
//                     { label: 'Medio' },
//                     { label: 'Basso' },
//                     { label: 'Molto basso' },
//                     { label: 'Non specificato' }
//                         ],
//                         ftype: 'SINGLESELECTLIST',
//                         position: '5'
//                     },
//                     {
//                         name: 'Table',
//                         values: [{ ftype: 'SINGLELINETEXT' }],
//                         ftype: 'SINGLELINETEXT',
//                         position: '1'
//                     },
//                     {
//                         name: 'Full Description',
//                         values: [
//                             {
//                                 value: 'Anagrafica Carte - dispositivo reale Carta Libra',
//                                 ftype: 'VALUETEXT'
//                             }
//                         ],
//                         ftype: 'VALUETEXT',
//                         position: '3'
//                     }
//                 ],
//                 status: 'completo'
//             },
//             {
//                 term: { termtype: 'DATA SOURCE', name: 'DD - DS - R_MONETICA' },
//                 attributes: [
//                     {
//                         name: 'Group Legal Entities',
//                         values: [{ ftype: 'MULTILINETEXT' }],
//                         ftype: 'MULTILINETEXT',
//                         position: '5'
//                     },
//                     {
//                         name: 'Data Source',
//                         values: [{ ftype: 'SINGLELINETEXT' }],
//                         ftype: 'SINGLELINETEXT',
//                         position: '1'
//                     },
//                     {
//                         name: 'Data Source Type',
//                         values: [{ value: 'Database', ftype: 'SINGLESELECTLIST' }],
//                         domain_values: [
//                     { label: 'Database' },
//                     { label: 'Flow' },
//                     { label: 'Routine' },
//                     { label: 'Web Service' },
//                     { label: 'External File' },
//                     { label: 'Data Entry' },
//                     { label: 'Report' },
//                     { label: 'Other' }
//                         ],
//                         ftype: 'SINGLESELECTLIST',
//                         position: '2'
//                     },
//                     {
//                         name: 'Description',
//                         values: [
//                     { value: 'Database monetica - BIGDATA', ftype: 'MULTILINETEXT' }
//                         ],
//                         ftype: 'MULTILINETEXT',
//                         position: '3'
//                     },
//                     {
//                         name: 'Status',
//                         values: [{ value: 'Produzione', ftype: 'SINGLESELECTLIST' }],
//                         domain_values: [
//                     { label: 'Produzione' },
//                     { label: 'Modifica' },
//                     { label: 'In sospeso' },
//                     { label: 'In fase di revisione' },
//                     { label: 'Non specificato' }
//                         ],
//                         ftype: 'SINGLESELECTLIST',
//                         position: '6'
//                     },
//                     {
//                         name: 'Importance',
//                         values: [{ value: 'Molto basso', ftype: 'SINGLESELECTLIST' }],
//                         domain_values: [
//                     { label: 'Critico' },
//                     { label: 'Alto' },
//                     { label: 'Medio' },
//                     { label: 'Basso' },
//                     { label: 'Molto basso' },
//                     { label: 'Non specificato' }
//                         ],
//                         ftype: 'SINGLESELECTLIST',
//                         position: '7'
//                     },
//                     {
//                         name: 'Full Description',
//                         values: [{ ftype: 'VALUETEXT' }],
//                         ftype: 'VALUETEXT',
//                         position: '4'
//                     }
//                 ],
//                 status: 'completo'
//             },
//             {
//                 term: { termtype: 'TECHNICAL APPLICATION', name: 'DD - TA - BIG' },
//                 attributes: [
//                     {
//                         name: 'Status',
//                         values: [{ value: 'Produzione', ftype: 'SINGLESELECTLIST' }],
//                         domain_values: [
//                     { label: 'Produzione' },
//                     { label: 'Modifica' },
//                     { label: 'In sospeso' },
//                     { label: 'In fase di revisione' },
//                     { label: 'Non specificato' }
//                         ],
//                         ftype: 'SINGLESELECTLIST',
//                         position: '3'
//                     },
//                     {
//                         name: 'Importance',
//                         values: [{ value: 'Molto basso', ftype: 'SINGLESELECTLIST' }],
//                         domain_values: [
//                     { label: 'Critico' },
//                     { label: 'Alto' },
//                     { label: 'Medio' },
//                     { label: 'Basso' },
//                     { label: 'Molto basso' },
//                     { label: 'Non specificato' }
//                         ],
//                         ftype: 'SINGLESELECTLIST',
//                         position: '4'
//                     },
//                     {
//                         name: 'Full Description',
//                         values: [{ ftype: 'VALUETEXT' }],
//                         ftype: 'VALUETEXT',
//                         position: '2'
//                     },
//                     {
//                         name: 'Description',
//                         values: [
//                     { value: 'BIG DATA E ANALYTICS\r', ftype: 'MULTILINETEXT' }
//                         ],
//                         ftype: 'MULTILINETEXT',
//                         position: '1'
//                     }
//                 ],
//                 status: 'completo'
//             },
//             {
//                 term: {
//                     termtype: 'TECHNICAL RULE',
//                     name: 'DD - TR - MOTIVO_STATO_ENTE - R_MONETICA.BD_TSEC67'
//                 },
//                 attributes: [
//                     {
//                         name: 'Status',
//                         values: [{ value: 'Produzione', ftype: 'SINGLESELECTLIST' }],
//                         domain_values: [
//                     { label: 'Produzione' },
//                     { label: 'Modifica' },
//                     { label: 'In sospeso' },
//                     { label: 'In fase di revisione' },
//                     { label: 'Non specificato' }
//                         ],
//                         ftype: 'SINGLESELECTLIST',
//                         position: '4'
//                     },
//                     {
//                         name: 'Description',
//                         values: [
//                             {
//                                 value:
//                         'Regola tecnica implementata per la copia del dato MOTIVO_STATO_ENTE (tabella DSEC.TSEC67)',
//                                 ftype: 'MULTILINETEXT'
//                             }
//                         ],
//                         ftype: 'MULTILINETEXT',
//                         position: '1'
//                     },
//                     {
//                         name: 'Importance',
//                         values: [{ value: 'Molto basso', ftype: 'SINGLESELECTLIST' }],
//                         domain_values: [
//                     { label: 'Critico' },
//                     { label: 'Alto' },
//                     { label: 'Medio' },
//                     { label: 'Basso' },
//                     { label: 'Molto basso' },
//                     { label: 'Non specificato' }
//                         ],
//                         ftype: 'SINGLESELECTLIST',
//                         position: '5'
//                     },
//                     {
//                         name: 'Rule',
//                         values: [
//                             {
//                                 value:
//                         'Muovi il valore contenuto nel campo MOTIVO_STATO_ENTE (tabella DSEC.TSEC67) nel corrispondente campo di destinazione',
//                                 ftype: 'VALUETEXT'
//                             }
//                         ],
//                         ftype: 'VALUETEXT',
//                         position: '2'
//                     },
//                     {
//                         name: 'Data Source field input',
//                         values: [
//                             {
//                                 value: 'DD - DF - MOTIVO_STATO_ENTE - DSEC.TSEC67',
//                                 ftype: 'MULTILINETEXT'
//                             }
//                         ],
//                         ftype: 'MULTILINETEXT',
//                         position: '5'
//                     },
//                     {
//                         name: 'Data Source field output',
//                         values: [
//                             {
//                                 value: 'DD - DF - MOTIVO_STATO_ENTE - R_MONETICA.BD_TSEC67',
//                                 ftype: 'MULTILINETEXT'
//                             }
//                         ],
//                         ftype: 'MULTILINETEXT',
//                         position: '6'
//                     }
//                 ],
//                 status: 'completo'
//             }
//         ]
//     });

//     return deferred.promise;
// }
