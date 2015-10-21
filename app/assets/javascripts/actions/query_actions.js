var QueryActions = {
  setFrom: function(source){
    AppDispatcher.dispatch({
      actionType: QueryConstants.SETFROM,
      payload: source
    });
  },

  addJoin: function(){
    AppDispatcher.dispatch({
      actionType: QueryConstants.ADDJOIN
    });
  },

  updateJoin: function(data){
    AppDispatcher.dispatch({
      actionType: QueryConstants.UPDATEJOIN,
      payload: data
    });
  }
};
