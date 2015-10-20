DataTableActions = {
  process: function(data){
    ApiUtil.createDataTable(data);
  },

  processCreated: function(table){
    AppDispatcher.dispatch({
      actionType: DataTableConstants.PROCESSCREATED,
      payload: table
    });
  }
};
