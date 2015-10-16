/* global React */
/* global ChartMetricsStore */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.DataManager = React.createClass({
    getInitialState: function(){
      return { metricName: "" };
    },

    changeMetricName: function(e){
      this.setState({ metricName: e.target.value });
    },

    saveMetrics: function(){
      if(!DataSourceStore.selectedData()){ return; }

      var data = {};
      data.metrics = JSON.stringify(ChartMetricsStore.all());
      data.data_id = DataSourceStore.selectedData().id;
      console.log(data);
    },


    render: function(){
      return(
        <div className="data-manager">
          <Components.DataSourceLoader />
          <div className="data-manager-panel chart-metric-button">
            <label>
              Chart Name: <input type="text" value={this.state.metricName} onChange={this.changeMetricName}/>
            </label>
            <button onClick={this.saveMetrics}>Save Chart</button>
          </div>
          <Components.ChartTypes onClick={this.props.onChartTypeClick} />
          <Components.ChartMetrics metrics={this.props.metrics} />
        </div>
      );
    }
  });
}());
