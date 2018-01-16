import 'babel-polyfill';

import 'angular';
import '@uirouter/angularjs';
import 'angular-i18n/angular-locale_it';
import 'angular-ui-bootstrap';
import 'angular-sanitize';
import 'ng-csv';
import 'angular-resizable';

export default angular.module('wdd.core.libraries', [
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'ngCsv',
    'angularResizable'
])
.name;
