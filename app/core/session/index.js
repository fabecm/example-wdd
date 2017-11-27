import {SessionService} from './services/session.js';

export default angular.module('wdd.core.session', [])
    .service('SessionService', SessionService)
    .name;
