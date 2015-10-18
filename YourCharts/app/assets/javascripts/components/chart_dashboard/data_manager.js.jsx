/* global React */
/* global ChartMetricsStore */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.DataManager = React.createClass({
    getInitialState: function(){
      return {
        chartName: ChartMetricsStore.selectedName() || DataSourceStore.selectedName()
      };
    },

    componentDidMount: function(){
      DataSourceStore.addChangeHandler(this._updateName);
    },

    componentWillUnmount: function(){
      DataSourceStore.removeChangeHandler(this._updateName);
    },

    _updateName: function(){
      this.setState({
        chartName: ChartMetricsStore.selectedName() || DataSourceStore.selectedName()
      });
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

    createButton: function(){
      var dataSourceId = DataSourceStore.selectedId();

      if(!dataSourceId){
        <span></span>
      } else if(ChartMetricsStore.hasMetricForData(dataSourceId)){
        return (
          <button onClick={this.saveMetrics}>Edit Chart</button>
        );
      } else {
        return (
          <button onClick={this.editMetrics}>Save Chart</button>
        );
      }
    },


    render: function(){
      return(
        <div className="data-manager">
          <Components.DataSourceLoader />
          <div className="data-manager-panel chart-metric-button">
            <label>
              Chart Name: <input type="text" value={this.state.chartName} onChange={this.changeChartName}/>
            </label>
            {this.createButton()}
          </div>
          <Components.ChartTypes onClick={this.props.onChartTypeClick} />
          <Components.ChartMetrics metrics={this.props.metrics} />
        </div>
      );
    }
  });
}());
