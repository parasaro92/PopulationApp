(function(){
  'use strict';
  angular.module('populationApp')
  .controller('GenderDistributionController',genderDistributionController);

  function genderDistributionController(PopulationService){
    var vm = this;

    function init(){
        // Setting default values
        vm.year = '2010';
        vm.country = 'IN';
    }

    vm.getData = function(){
      var rsp = PopulationService.getGenderData(vm.country,vm.year);
      rsp.then(function(rspData){
        vm.resultList = rspData;
        vm.chartConfig = {
          options: {
            chart: {
              type: 'line'
            }
          },
          series: [{
            name: 'Male',
            data: rspData[0]
          },{
            name:'Female',
            data: rspData[1] 
          }],
          yAxis: {
            title: {text: 'Population'},
          },
          xAxis: {
            title: {text: 'Age'},
          },            
          title: {
            text: 'Gender distribution over age'
          },

          loading: false
        }

      },function(err){
        console.log('Error retrieving data');
      })
      
    }

    init();
  }

})();