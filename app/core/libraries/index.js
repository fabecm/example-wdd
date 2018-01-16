import 'babel-polyfill';

import 'angular';
import '@uirouter/angularjs';
import 'angular-i18n/angular-locale_it';
import 'angular-ui-bootstrap';
import 'angular-sanitize';
import 'ng-csv';

export default angular.module('wdd.core.libraries', [
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'ngCsv'
])
.name;
