/* global React */
/* global ChartMetricsActions */
/* global DataSourceStore */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.ChartMetrics = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function(){
      var dataMetrics = this.props.metrics.data || {};
      return dataMetrics;
    },

    changeDisplayMetric: function(e){
      var metric = e.target.name;
      var value = e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
      ChartMetricsActions.updateDisplay(metric, value);
    },

    changeDataMetric: function(e){
      var value = e.target.value;
      var metric = e.target.name;
      ChartMetricsActions.updateData(metric, value);
    },

    displayMetrics: function(){
      var inputs = [];
      var metrics = this.props.metrics.display;

      for(var m in metrics ){
        if(metrics.hasOwnProperty(m)){
          inputs.push(
            <div  key={"display"+m} className="chart-display-metric-input">
              {m}
              <br/>
              <input type="text" name={m} onChange={this.changeDisplayMetric} value={metrics[m] }/>
            </div>
          );
        }
      }
      return inputs;
    },

    dataMetrics: function(){
      var inputs = [];
      var metrics = this.props.metrics.data;
      var measures = DataSourceStore.selectedMeasures();

      var getOptions = function(measure, i){
        return( <option value={measure} key={measure}>{measure}</option>);
      };

      for(var m in metrics ){
        if(metrics.hasOwnProperty(m)){
          var datetime = (m === "DateTime_Format");

          inputs.push(
            <div key={"data"+m} className="chart-data-metric-input">
              {m}
              <br/>
              {
                datetime ?
                  <div>
                    <a href="https://github.com/mbostock/d3/wiki/Time-Formatting"
                       target="_blank">
                      Formatting info.
                    </a>
                    <br/>
                    <input name={m}
                           onChange={this.changeDataMetric}/>
                  </div>
                :
                  <select name={m} onChange={this.changeDataMetric}>
                    <option value={null}></option>
                    {
                      measures.map(getOptions)
                    }
                  </select>
              }
            </div>
          );
        }
      }
      return inputs;
    },

    render: function(){
      return(
        <div className="data-manager-panel group">
          <div className="chart-display-metrics">
            <header>Display Parameters</header>
            {this.displayMetrics()}
          </div>
          <div className="chart-data-metrics">
            <header className="chart-metrics-header">Data Parameters</header>
            {this.dataMetrics()}
          </div>
        </div>
      );
    }
  });

}());
