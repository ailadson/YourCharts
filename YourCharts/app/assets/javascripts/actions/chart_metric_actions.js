/* global AppDispatcher */
/* global ChartMetricsConstants */

var ChartMetricsActions = {
  updateDisplay: function(metric, value){
    AppDispatcher.dispatch({
      actionType: ChartMetricsConstants.UPDATEDISPLAY,
      payload: { metric: metric, value: value}
    });
  },

  reset: function(metrics){
    AppDispatcher.dispatch({
      actionType: ChartMetricsConstants.RESET,
      payload: metrics
    });
  }
};
