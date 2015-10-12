/* global AppDispatcher */
/* global ChartMetricsConstants */

var ChartMetricsActions = {
  update: function(metric, value){
    AppDispatcher.dispatch({
      actionType: ChartMetricsConstants.UPDATE,
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
