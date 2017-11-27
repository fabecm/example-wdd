export class UserService {

    user = {};

    constructor ($http) {
        'ngInject';
        this.$http = $http;
    }

    getUser () {
        return this.$http.get('http://MBCL26001510:8080/edd-serviceWeb/users').then(res => {
            this.user = res.data;
        });
    }

    getLevel () {
        return this.user.credentials.livello;
    }

    getGroup () {
        return this.user.credentials.groups;
    }

    getOfficeCode () {
        return this.user.credentials.officeCode;
    }
}
