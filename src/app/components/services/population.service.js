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

  vm.getByYearAndCountry = function(country,year,gender){
    if (!gender){
      gender = 0;
    }
    var response = vm.resourceObj.query({
      get:'AREA_KM2,NAME,AGE,POP',
      FIPS: country,
      time: year,
      SEX: gender,
      key: '3eebf698ef6c8df04e320bd0f4a6d0eda8e3bd33'
    });
    var deferred = $q.defer();
    response.$promise.then(function(data){
      data.splice(0,1);
      // Create a new Array to just hold the population
      var formattedArray = getFormattedArray(data);
      deferred.resolve(formattedArray);
    },function(err){
      deferred.reject(err);
    });
    return deferred.promise;
  }

  vm.getByYears = function(country,year1,year2){
    var rsp1 = vm.getByYearAndCountry(country,year1);
    var rsp2 = vm.getByYearAndCountry(country,year2);
    var deferred = $q.defer();
    $q.all([rsp1,rsp2]).then(function(arrayResult){
      var formattedArray = calculatePercentDiff(arrayResult[0],arrayResult[1]);
      deferred.resolve(formattedArray);
    },function(err){
      console.log(err);
      deferred.reject(err);
    });
    return deferred.promise;
  }

  vm.getGenderData = function(country,year){
    var rsp1 = vm.getByYearAndCountry(country,year,1);
    var rsp2 = vm.getByYearAndCountry(country,year,2);
    var deferred = $q.defer();
    $q.all([rsp1,rsp2]).then(function(arrayResult){
      deferred.resolve(arrayResult);
    },function(err){
      console.log(err);
      deferred.reject(err);
    });
    return deferred.promise;
  }

  function calculatePercentDiff(array1,array2){
    var len = array1.length;
    var outputArray = [];
    for(var i = 0; i < len; i++){
      var percentDiff = ((array2[i] - array1[i])/array1[i])*100;
      outputArray.push(percentDiff) 
    }
    return outputArray;
  }

  function getFormattedArray(inputArray){
    var outputArray = [];
    angular.forEach(inputArray,function(element){
      outputArray.push(parseInt(element[3]));
    })
    return outputArray;
  }

  init();
}

})();