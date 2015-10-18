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

  updateDataSource: function(data){
    $.ajax({
      url: "/api/data_sources/" + data.id,
      data: { data_source: data },
      type: "PATCH",
      success: function(dataSource){
        DataSourceActions.updateSelected(dataSource);
      }
    });
  },

  createChartMetric: function(data){
    $.post('api/chart_metrics', { chart_metric: data }, function(chart_metric){
      console.log(chart_metric);
      ChartMetricsActions.processCreated(chart_metric);
    });
  },

  editChartMetric: function(data){
  },

  fetchDataSources: function(){
    $.get('api/data_sources', {}, function(dataSources){
      var sourcesFetched = 0;
      console.log(dataSources);
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
  },

  fetchChartMetrics: function(){
    $.get('api/chart_metrics', {}, function(metrics){
      ChartMetricsActions.populate(metrics);
    });
  }
};
