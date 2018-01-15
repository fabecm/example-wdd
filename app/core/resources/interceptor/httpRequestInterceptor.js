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
            const url = rejection.config.url;
            const apiBase = $injector.get('SessionService').apiEntry;
            let endpoint = url.substring(url.indexOf(apiBase) + apiBase.length, url.length);
            if (endpoint.indexOf('?') >= 0) {
                endpoint = endpoint.substring(0, endpoint.indexOf('?'));
            }
            const text = `${message} - (${endpoint})`;
            $injector.get('WDDAlert').showAlert('error', text);
            return $q.reject(rejection);
        }
    };
}
