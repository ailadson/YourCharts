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

  fetch: function(){
    $.get('api/data_sources', {}, function(dataSources){
      var sourcesFetched = 0;

      dataSources.forEach(function(dataSource){
        $.get(dataSource.url, {}, function(file){
          sourcesFetched += 1;
          dataSource.data = file;

          if(sourcesFetched === dataSources.length){
            DataSourceActions.populate(dataSources);
          }
        })
      });

    });
  }
};
