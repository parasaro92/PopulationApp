(function(){
'use strict';

angular.module('populationApp')
.service('PopulationService',populationService);

function populationService($resource,$q){
  var vm = this;
  function init(){
    var baseURL = 'http://api.census.gov/data/timeseries/idb/1year';
    vm.resourceObj = $resource(baseURL);
  }

  vm.getAllByYearCountry = function(year,country){
    var response = vm.resourceObj.query({
      get:'AREA_KM2,NAME,AGE,POP',
      FIPS: country,
      time: year,
      SEX: 0
    });
    var deferred = $q.defer();
    response.$promise.then(function(data){
      data.splice(0,1);
      deferred.resolve(data);
    },function(err){
      deferred.reject(err);
    });
    return deferred.promise;
  }

  init();
}

})();