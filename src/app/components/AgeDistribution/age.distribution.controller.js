(function(){
  'use strict';

  angular.module('populationApp')
  .controller('AgeDistributionController',ageDistributionController);

  function ageDistributionController(PopulationService){
    var vm = this;

    function init(){
        // Setting default values
        vm.year1 = '2010';
        vm.year2 = '2014';
        vm.country = 'IN';
    }

    vm.getData = function(){
      var rsp = PopulationService.getByYears(vm.country,vm.year1,vm.year2);
      rsp.then(function(respData){
        vm.resultList = respData;
        vm.chartConfig = {
          options: {
            chart: {
              type: 'line'
            }
          },
          series: [{
            name: 'Percent Change',
            data: respData
          }],
          yAxis: {
            title: {text: 'Population Change Percent'},
          },
          xAxis: {
            title: {text: 'Age'},
          },            
          title: {
            text: 'Population change over age'
          },

          loading: false
        }
      },function(err){
        console.log(err);
      });
    }

    init();
  }
})();