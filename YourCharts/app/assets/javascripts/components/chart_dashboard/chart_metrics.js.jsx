/* global React */
/* global ChartMetricsActions */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.ChartMetrics = React.createClass({
    changeDisplayMetric: function(e){
      var metric = e.target.name;
      var value = e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
      ChartMetricsActions.updateDisplay(metric, value);
    },

    displayMetrics: function(){
      var inputs = [];
      var metrics = this.props.metrics;

      for(var m in metrics.display ){
        if(metrics.display.hasOwnProperty(m)){
          inputs.push(
            <div className="chart-metric-input">
              {m}
              <br/>
              <input type="text" name={m} onChange={this.changeDisplayMetric} value={metrics.display[m] }/>
            </div>
          );
        }
      }
      return inputs;
    },

    dataMetrics: function(){
      // var inputs = [];
      // var metrics = DataSourceStore.metrics();
      // metrics.forEach(function(metric){
      //   inputs.push(
      //     <div className="chart-data-metric-input">
      //       {metric}
      //       <br/>
      //       <input type=
      //     </div>
      //   );
      // });
      // return inputs;
    },

    render: function(){
      return(
        <div className="chart-metrics">
          <header className="chart-metrics-header">Metrics</header>
          {this.displayMetrics()}
        </div>
      );
    }
  });

}());
