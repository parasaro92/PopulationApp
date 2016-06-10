  (function(){
  'use strict';
  
    angular
    .module('populationApp')
    .controller('PopulationDistributionController', populationDistributionController);

    function populationDistributionController(PopulationService){

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
                type: 'column'
              }
            },
            series: [{
              name: '',
              data: responseData
            }],
            yAxis: {
              title: {text: 'Population'},
            },
            xAxis: {
              title: {text: 'Age'},
            },            
            title: {
              text: 'Population distribution over age of '+vm.country
              +' for the year '+vm.year
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
