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

  vm.getByYearAndCountry = function(country,year){
    var response = vm.resourceObj.query({
      get:'AREA_KM2,NAME,AGE,POP',
      FIPS: country,
      time: year,
      SEX: 0,
      key: '3eebf698ef6c8df04e320bd0f4a6d0eda8e3bd33'
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

  vm.getByYears = function(country,year1,year2){
    var rsp1 = vm.getByYearAndCountry(country,year1);
    var rsp2 = vm.getByYearAndCountry(country,year2);
    $q.all([rsp1,rsp2]).then(function(arrayResult){
      console.log(arrayResult);
    },function(err){
      console.log(err);
    })
  }

  init();
}

})();