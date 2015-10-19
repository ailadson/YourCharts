var SavedChartActions = {
  setActiveChart: function(data){
    console.log(data);
    AppDispatcher.dispatch({
      actionType: SavedChartConstants.SETACTIVE,
      payload: data
    });
  }
};
