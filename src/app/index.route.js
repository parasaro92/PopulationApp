(function() {
  'use strict';

  angular
    .module('populationApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      }).state('allPop', {
        url: '/allPop',
        templateUrl: 'app/components/AllPop/index.html',
        controller: 'AllPopController',
        controllerAs: 'allPop'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
