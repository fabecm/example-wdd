export class DatasourceService {
    constructor ($http, $q) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
    }

    getBootstrap () {
        // return this.$http.get('WDD/filter/datasource/bootstrap');
        let defer = this.$q.defer();
        defer.resolve(getBootstrapMock());
        return defer.promise;
    }
}

function getBootstrapMock () {
    return {
        data: {
            process_owner: [
                {
                    label: 'DD - PO - CRO',
                    id: 1090369
                },
                {
                    label: 'DD - PO - CFO',
                    id: 1090372
                }
            ],
            system_owner: [
                {
                    label: 'DD - SO - UBIS-REGULATORY & ACCOUNTING APPLICATIONS',
                    id: 1075521
                },
                {
                    label: 'DD - SO - UBIS-HR & PERFORMANCE MANAGEMENT APPLICATIONS',
                    id: 1075505
                },
                {
                    label: 'DD - SO - UBIS-RISK & AML APPLICATIONS',
                    id: 1075515
                },
                {
                    label: 'DD - SO - UBIS-PRICING & SALES APPLICATIONS',
                    id: 1075497
                },
                {
                    label: 'DD - SO - UBIS-PAYMENT CARDS & E-MONEY APPLICATIONS',
                    id: 1075517
                },
                {
                    label: 'DD - SO - UBIS-CRM & MARKETING APPLICATIONS',
                    id: 1075511
                },
                {
                    label: 'DD - SO - UBIS-ACCOUNTS & COLLECTIONS APPLICATIONS',
                    id: 1075499
                },
                {
                    label: 'DD - SO - UBIS-LOANS APPLICATIONS',
                    id: 1075513
                },
                {
                    label: 'DD - SO - UBIS-MAINFRAME SYSTEMS',
                    id: 1090253
                },
                {
                    label: 'DD - SO - UBIS-ASSET MANAGEMENT & INSURANCE APPLICATIONS',
                    id: 1075525
                },
                {
                    label: 'DD - SO - UBIS-BIG DATA & ANALYTICS',
                    id: 1090355
                },
                {
                    label: 'DD - SO - UBIS-LENDING COMPANIES APPLICATIONS',
                    id: 1075507
                },
                {
                    label: 'DD - SO - UBIS-FOREIGN TRANSACTIONS & PAYMENTS APPLICATIONS',
                    id: 1075523
                },
                {
                    label: 'DD - SO - UBIS-LENDING & MONITORING APPLICATIONS',
                    id: 1075519
                },
                {
                    label: 'DD - SO - UBIS-FRONT OFFICE & PROPRIETARY TRADING APPLICATIONS',
                    id: 1075501
                },
                {
                    label: 'DD - SO - UBIS-ONLINE BANKING & REMOTE SELLING APPLICATIONS',
                    id: 1075509
                },
                {
                    label: 'DD - SO - UBIS-FINANCIAL ADVISORY & ADMINISTRATION APPLICATIONS',
                    id: 1075503
                }
            ]
        }
    };
}
