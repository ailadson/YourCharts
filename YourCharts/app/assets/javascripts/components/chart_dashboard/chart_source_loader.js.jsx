/* global React */
/* global DataSourceStore */
/* global DataSourceActions */


(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.ChartSourceLoader = React.createClass({
    getInitialState: function(){
      return { chartName: "", selected: ChartMetricsStore.selectedName() };
    },

    componentDidMount: function(){
      ChartMetricsStore.addChangeHandler(this._updateSelected);
    },

    componentWillUnmount: function(){
      ChartMetricsStore.removeChangeHandler(this._updateSelected);
    },

    changeChartName: function(e){
      this.setState({ chartName: e.target.value });
    },

    _updateSelected: function(){
      this.setState({
        selected : ChartMetricsStore.selectedName(),
        chartName: ChartMetricsStore.selectedName()
      });
    },

    handleChange: function(e){
      ChartMetricsActions.resetByName(e.target.value);
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
      var chartMetricId = ChartMetricsStore.selectedId();

      if(!dataSourceId){
        return(
          <span></span>
        );
      } else if(chartMetricId){
        return (
          <button onClick={this.editMetrics}>Edit Chart</button>
        );
      } else {
        return (
          <button onClick={this.saveMetrics}>Save Chart</button>
        );
      }
    },

    render: function(){
      var dataOptions = [<option value="" key={-2}>New Chart</option>];

      ChartMetricsStore.userMetrics().map(function(metric, i){
        dataOptions.push(
          <option value={metric.name} key={i} >{metric.name.toUpperCase()}</option>
        );
      });

      return(
        <div className="data-manager-panel chart-metric-button">
          <header>Chart Source</header>
          <label>
            Select A Chart:
            <select onChange={this.handleChange} value={this.state.selected}>{dataOptions}</select>
          </label>
          <br/>
          <label>
            Chart Name: <input type="text" value={this.state.chartName} onChange={this.changeChartName}/>
          </label>
          {this.createButton()}
        </div>
      );
    }
  });

}());
