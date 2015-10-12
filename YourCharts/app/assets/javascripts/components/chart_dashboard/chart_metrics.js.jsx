/* global React */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.ChartMetrics = React.createClass({
    getInitialState: function(){
      return ChartMetricsStore.all();
    },

    componentDidMount: function(){
      ChartMetricsStore.addChangeHandler(this._updateMetrics);
      this._updateMetrics();
    },

    componentWillUnmount: function(){
      ChartMetricsStore.removeChangeHandler(this._updateMetrics);
    },

    _updateMetrics: function(){
      this.setState(ChartMetricsStore.all());
    },

    changeMetric: function(e){
      var metric = e.target.name;
      var value = e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
      ChartMetricsActions.update(metric, value);
    },

    inputObjects: function(){
      var inputs = [];
      for(var m in this.state ){
        if(this.state.hasOwnProperty(m)){
          inputs.push(
            <div className="chart-metric-input">
              {m+": "}<input type="text" name={m} onChange={this.changeMetric} value={this.state[m] }/>
            </div>
          );
        }
      }
      return inputs;
    },

    render: function(){
      return(
        <div className="chart-metrics">
          {this.inputObjects()}
        </div>
      );
    }
  });

}());
