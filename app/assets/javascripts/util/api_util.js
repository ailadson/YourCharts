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
      ChartMetricsActions.processCreated(chart_metric);
    });
  },

  editChartMetric: function(data){
    $.ajax({
      url: "/api/chart_metrics/" + data.id,
      data: { chart_metric: data },
      type: "PATCH",
      success: function(chartMetric){
        ChartMetricsActions.processUpdated(chartMetric);
      }
    });
  },

  fetchDataSources: function(){
    $.get('api/data_sources', {}, function(dataSources){
      var sourcesFetched = 0;

      dataSources.forEach(function(dataSource){
        if(dataSource.url){
          $.get(dataSource.url, {}, function(file){
            sourcesFetched += 1;
            dataSource.data = file;

            if(sourcesFetched === dataSources.length){
              DataSourceActions.populate(dataSources);
            }
          });
        } else{
          sourcesFetched += 1;
          if(sourcesFetched === dataSources.length){
            DataSourceActions.populate(dataSources);
          }
        }
      });

    });
  },

  fetchChartMetrics: function(){
    $.get('api/chart_metrics', {}, function(metrics){
      ChartMetricsActions.populate(metrics);
    });
  },

  createDataTable: function(data){
    $.post('api/data_tables', data, function(dataTable){
      DataTableActions.processCreated(dataTable);
    });
  },

  runQuery: function(data){
    $.post('api/query', { query: data }, function(dataSource){
      console.log(dataSource);
    });
  }
};
