export class UserService {

    user = {};

    constructor ($http, $q) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
    }

    getUser () {
        if(Boolean(false) === true) {
            return getMockedData(this.$q).then(res => {
                this.user = res.data;
            });
        }
        return this.$http.get('WDD/security/user').then(res => {
            this.user = res.data;
        });
    }

    getSystemOwnerId () {
        return this.user.webSealUser.systemOwnerTermId;
    }

    getLevel () {
        return this.user.credentials.livello;
    }

    getAutorities () {
        let authorities = [];
        this.user.credentials.authorities.map(e => authorities.push(e.authority));
        return authorities;
    }

    getGroup () {
        return this.user.credentials.groups;
    }

    getOfficeCode () {
        return this.user.credentials.officeCode;
    }
}

const userJson = {
    authorities: [{ authority: 'ROLE_USER' }],
    details: null,
    authenticated: true,
    webSealUser: {
        password: '',
        username: 'U99020555',
        authorities: [{ authority: 'ROLE_USER' }],
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        enabled: true,
        groups: 'G_VIS_ADMIN',
        bankCode: '3111',
        officeCode: '6900',
        officeName: 'TBU NAPOLI',
        name: 'Mario',
        surname: 'Rossi',
        livello: 800
    },
    principal: 'U99020555',
    credentials: {
        password: '',
        username: 'U99020555',
        authorities: [{ authority: 'ROLE_USER' }],
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        enabled: true,
        groups: 'G_VIS_ADMIN',
        bankCode: '3111',
        officeCode: '6900',
        officeName: 'TBU NAPOLI',
        name: 'Mario',
        surname: 'Rossi',
        livello: 800
    },
    name: 'U99020555'
};

function getMockedData ($q) {
    var deferred = $q.defer();

    deferred.resolve({
        data: userJson
    });

    return deferred.promise;
}
