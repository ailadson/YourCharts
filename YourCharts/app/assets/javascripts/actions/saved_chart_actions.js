var SavedChartActions = {
  setActiveChart: function(data){
    AppDispatcher.dispatch({
      actionType: SavedChartConstants.SETACTIVE,
      payload: data
    });
  }
};
