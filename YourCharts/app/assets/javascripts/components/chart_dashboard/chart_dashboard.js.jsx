/* global React */
/* global Components */
/* global ChartMetricsStore */
/* global DataSourceStore */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.ChartDashboard = React.createClass({
    getInitialState: function(){
      return {
        chartType: "LineGraph",
        dataSource: DataSourceStore.selectedData(),
        metrics: ChartMetricsStore.all()
       };
    },

    componentWillMount: function(){
      ChartMetricsStore.addChangeHandler(this.updateMetrics);
      DataSourceStore.addChangeHandler(this.updateDataSource);
    },

    componentDidUnmount: function(){
      ChartMetricsStore.removeChangeHandler(this.updateMetrics);
      DataSourceStore.removeChangeHandler(this.updateDataSource);
    },

    updateMetrics: function(){
      this.setState({ metrics: ChartMetricsStore.all() });
    },

    updateDataSource: function(){
      this.setState({ dataSource: DataSourceStore.selectedData() });
    },

    handleChartTypeChange: function(type){
      this.setState({chartType: type});
    },

    render: function(){

      return(
        <div className="chart-dashboard">
          <Components.DataManager metrics={this.state.metrics}
                                  onChartTypeClick={this.handleChartTypeChange}/>

                                <Components.ChartViewer data={this.state.dataSource}
                                  color={"black"}
                                  chartType={this.state.chartType}
                                  metrics={this.state.metrics}/>
        </div>
      );
    }
  });
}());
