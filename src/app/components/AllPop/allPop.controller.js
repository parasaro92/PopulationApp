  (function(){
  'use strict';
  
    angular
    .module('populationApp')
    .controller('AllPopController', allPop);

    function allPop(PopulationService){

      var vm = this;

      function init(){
        // Setting default values
        vm.year = '2010';
        vm.country = 'IN';
      }

      vm.getData = function(){
        var rsp = PopulationService.getByYearAndCountry(vm.country,vm.year);
        rsp.then(function(data){
          vm.resultList = data;
        },function(err){
          console.log(err);
        });
        PopulationService.getByYears(vm.country,'2012','2014');
      }

      init();
    }  

  })();
