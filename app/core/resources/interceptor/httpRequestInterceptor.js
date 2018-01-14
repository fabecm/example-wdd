export function HttpRequestInterceptor ($injector, $q) {
    'ngInject';

    return {
        request: function (config) {
            // let path = 'http://mbcl26001510:8080/edd-serviceWeb';
            // let path = 'http://GPLLL0062:8080/edd-serviceWeb';
            if (config.url.indexOf('WDD/') === 0) {
                let url = config.url.slice(3);
                config.url = $injector.get('SessionService').apiEntry + url;
            }

            return config;
        },
        responseError: function (rejection) {
            const message = rejection.statusText ? rejection.statusText: 'ERRORE NEL RECUPERO DEI DATI';
            $injector.get('WDDAlert').showAlert('error', message);
            return $q.reject(rejection);
        }
    };
}
