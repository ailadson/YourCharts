/* global ChartMetricsStore */
/* global ChartMetricsActions */

(function() {
  'use strict';

  window.Components.DataSeriesMixin = {
    componentWillMount: function(){
      ChartMetricsActions.reset(this.defaultMetrics());
      this._updateMetrics();
    },

    componentDidMount: function(){
      ChartMetricsActions.reset(this.defaultMetrics());
      this._updateMetrics();
      ChartMetricsStore.addChangeHandler(this._updateMetrics);
    },

    componentWillUnmount: function(){
      ChartMetricsStore.removeChangeHandler(this._updateMetrics);
    },

    _updateMetrics: function(){
      this.setState(ChartMetricsStore.all());
    }
  };
}());
