/* global React */
/* global ChartMetricsStore */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.DataManager = React.createClass({
    getInitialState: function(){
      return { chartName: "" };
    },

    changeChartName: function(e){
      this.setState({ chartName: e.target.value });
    },

    saveMetrics: function(){
      var dataId = DataSourceStore.selectedId();
      if(!dataId || !this.state.chartName){ return; }

      var data = {};
      data.metrics = JSON.stringify(ChartMetricsStore.all());
      data.data_id = dataId;
      data.name = this.state.chartName;
      data.chart_type = this.props.chartType;
      ChartMetricsActions.save(data);
    },


    render: function(){
      return(
        <div className="data-manager">
          <Components.DataSourceLoader />
          <div className="data-manager-panel chart-metric-button">
            <label>
              Chart Name: <input type="text" value={this.state.chartName} onChange={this.changeChartName}/>
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
