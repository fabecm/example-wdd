export function HttpRequestInterceptor ($injector, $q) {
    'ngInject';

    return {
        request: function (config) {
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

            let text = '';
            if (rejection.data && rejection.data.message_type === 'SHOW_ERROR') {
                text = rejection.data.message;
            } else {
                text = `${message} - (${endpoint})`;
            }
            const key = endpoint.substring(1).replace(/\//g, '-');
            $injector.get('WDDAlert').showAlert('error', text, key);
            return $q.reject(rejection);
        }
    };
}
