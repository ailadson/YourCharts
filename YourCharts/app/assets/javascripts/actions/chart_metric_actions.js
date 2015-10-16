/* global AppDispatcher */
/* global ApiUtil */
/* global ChartMetricsConstants */

var ChartMetricsActions = {
  updateDisplay: function(metric, value){
    AppDispatcher.dispatch({
      actionType: ChartMetricsConstants.UPDATEDISPLAY,
      payload: { metric: metric, value: value}
    });
  },

  updateData: function(metric, value){
    AppDispatcher.dispatch({
      actionType: ChartMetricsConstants.UPDATEDATA,
      payload: { metric: metric, value: value}
    });
  },

  save: function(data){
    ApiUtil.createChartMetric(data);
  },

  reset: function(metrics){
    AppDispatcher.dispatch({
      actionType: ChartMetricsConstants.RESET,
      payload: metrics
    });
  }
};
