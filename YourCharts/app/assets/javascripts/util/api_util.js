/* global DataSourceActions */

var ApiUtil = {
  createDataSource: function(data){
    $.post('/api/data_sources', { data_source: data }, function(dataSource){
      $.get(dataSource.url, {}, function(file){
          dataSource.data = file;
          DataSourceActions.add(dataSource);
      });
    });
  },

  createChartMetric: function(data){
    $.post('api/chart_metrics', { chart_metric: data}, function(chart_metric){
      console.log("");
      console.log("~~Successfully saved metric~~");
      console.log(chart_metric);
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log("");
    });
  },

  fetchDataSources: function(){
    $.get('api/data_sources', {}, function(dataSources){
      var sourcesFetched = 0;

      dataSources.forEach(function(dataSource){
        $.get(dataSource.url, {}, function(file){
          sourcesFetched += 1;
          dataSource.data = file;

          if(sourcesFetched === dataSources.length){
            DataSourceActions.populate(dataSources);
          }
        });
      });

    });
  }
};
