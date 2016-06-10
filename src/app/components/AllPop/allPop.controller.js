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
        rsp.then(function(responseData){
          vm.resultList = responseData;
          vm.chartConfig = {
            options: {
              chart: {
                type: 'line'
              }
            },
            series: [{
              data: responseData
            }],
            title: {
              text: 'Population distribution over age'
            },

            loading: false
          }
        },function(err){
          console.log(err);
        });
        PopulationService.getByYears(vm.country,'2012','2014');
      }

      init();
    }  

  })();
