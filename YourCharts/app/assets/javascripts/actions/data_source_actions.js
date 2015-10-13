/* global AppDispatcher */
/* global DataSourceConstants */

var DataSourceActions = {
  add: function(dataSource){
    AppDispatcher.dispatch({
      actionType: DataSourceConstants.ADD,
      payload: dataSource
    });
  }
};
