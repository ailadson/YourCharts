/* global ChartMetricsStore */
/* global ChartMetricsActions */

(function() {
  'use strict';

  window.Components.DataSeriesMixin = {
    componentWillMount: function(){
      this.attemptReset();
    },

    attemptReset: function(){
      if(AppDispatcher.isDispatching()){
        setTimeout(this.attemptReset.bind(this), 100);
      }else{
        ChartMetricsActions.reset(this.defaultMetrics());
      }
    }
  };
}());
