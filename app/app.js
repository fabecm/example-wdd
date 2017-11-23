document.body.innerHTML += '<ui-view></ui-view>';

import './styles/style.scss';

import core from './core';
import states from './states';

angular.module('wdd', [
  core,
  states
]);

angular.bootstrap(document.body, ['wdd'], {
  //strictDi: true
});