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
        controllerAs: 'main',
      }).state('populationDistribution', {
        url: '/populationDistribution',
        templateUrl: 'app/components/PopulationDistribution/index.html',
        controller: 'PopulationDistributionController',
        controllerAs: 'ctrl'
      }).state('ageDistribution', {
        url: '/ageDistribution',
        templateUrl: 'app/components/AgeDistribution/index.html',
        controller: 'AgeDistributionController',
        controllerAs: 'ctrl'
      }).state('genderDistribution', {
        url: '/genderDistribution',
        templateUrl: 'app/components/GenderDistribution/index.html',
        controller: 'GenderDistributionController',
        controllerAs: 'ctrl'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
