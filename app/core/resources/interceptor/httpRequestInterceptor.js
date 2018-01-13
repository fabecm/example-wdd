export function HttpRequestInterceptor () {
    return {
        request: function (config) {
            // let path = 'http://mbcl26001510:8080/edd-serviceWeb';
            // let path = 'http://GPLLL0062:8080/edd-serviceWeb';
            // let path = 'http://ITPC001179:8080/edd-serviceWeb';
            let path = 'http://10.238.9.61:8080/edd-serviceWeb';
            // let path = 'http://10.230.146.57:7001/edd-serviceAppl';
            // let path = 'http://itam.hbl.local/jeddws/vip-serviceAppl';
            if (config.url.indexOf('WDD/') === 0) {
                let url = config.url.slice(3);
                config.url = path + url;
            }

            return config;
        }
    };
}
