/* global AppDispatcher */
/* global DataSourceConstants */
/* global ApiUtil */

var DataSourceActions = {
  fetch: function(){
    ApiUtil.fetch();
  },

  populate: function(dataSources){
    AppDispatcher.dispatch({
      actionType: DataSourceConstants.POPULATE,
      payload: dataSources
    });
  },

  add: function(dataSource){
    AppDispatcher.dispatch({
      actionType: DataSourceConstants.ADD,
      payload: dataSource
    });
  },

  create: function(dataSource){
    ApiUtil.createDataSource(dataSource);
  },

  setSelected: function(name){
    AppDispatcher.dispatch({
      actionType: DataSourceConstants.SETSELECTED,
      payload: name
    });
  }
};
