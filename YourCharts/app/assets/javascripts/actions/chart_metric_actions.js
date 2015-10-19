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

  //poor naming. only changes metrics.metrics
  reset: function(metrics){
    AppDispatcher.dispatch({
      actionType: ChartMetricsConstants.RESET,
      payload: metrics
    });
  },

  //while this resets the entire _metrics object
  resetByName: function(name){
    AppDispatcher.dispatch({
      actionType: ChartMetricsConstants.RESETBYNAME,
      payload: name
    });
  },

  fetch: function(){
    ApiUtil.fetchChartMetrics();
  },

  populate: function(metrics){
    AppDispatcher.dispatch({
      actionType: ChartMetricsConstants.POPULATE,
      payload: metrics
    });
  },

  processCreated: function(metric){
    AppDispatcher.dispatch({
      actionType: ChartMetricsConstants.PROCESSCREATED,
      payload: metric
    });
  }
};
