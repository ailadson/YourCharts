/* global ChartMetricsStore */
/* global ChartMetricsActions */
/* global AppDispatcher */
/* global React */

(function() {
  'use strict';

  window.Components.DataSeriesMixin = {
    componentWillMount: function(){
      this.attemptReset();
      ChartMetricsStore.addClearHandler(this.attemptReset); //needed for data source change
    },

    conponentWillUnmount: function(){
      ChartMetricsStore.removeClearHandler(this.attemptReset);
    },

    attemptReset: function(){
      if(AppDispatcher.isDispatching()){
        setTimeout(this.attemptReset.bind(this), 100);
      }else{
        var dMetrics = this.defaultMetrics();
        var pMetrics = this.props.metrics;
        var resetMetrics = {};
        resetMetrics.data = $.extend({}, dMetrics.data, pMetrics.data);
        resetMetrics.display = $.extend({}, dMetrics.display, pMetrics.display);

        ChartMetricsActions.reset(resetMetrics);
      }
    },

    createAxis: function(){
      var display = this.props.metrics.display;

      return(
        <g>
          <g className="x axis"
            transform={"translate(0,"+ display.Height +")"}
            ref="xAxis">
            <text className="label"
                  x={this.props.metrics.display.Width}
                  y={15}>
              {this.props.metrics.data.X_Metric}
            </text>
          </g>

          <g className="y axis"
             ref="yAxis">
             <text className="label"
                   transform={"rotate(-90)"}
                   y={6}
                   dy={".71em"}
                   textAnchor={"end"}>
               {this.props.metrics.data.Y_Metric}
             </text>
          </g>
        </g>
      );
    }
  };
}());
