/* global React */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.ChartDashboard = React.createClass({
    getInitialState: function(){
      return {
        chartType: "VerticalBar",
        metrics: ChartMetricsStore.all()
       };
    },

    componentWillMount: function(){
      ChartMetricsStore.addChangeHandler(this.updateMetrics);
    },

    componentDidUnmount: function(){
      ChartMetricsStore.removeChangeHandler(this.updateMetrics);
    },

    updateMetrics: function(){
      this.setState({ metrics: ChartMetricsStore.all() });
    },

    handleChartTypeChange: function(type){
      this.setState({chartType: type});
    },

    render: function(){
      return(
        <div className="chart-dashboard">
          <Components.DataManager metrics={this.state.metrics}
                                  onChartTypeClick={this.handleChartTypeChange}/>

          <Components.ChartViewer data={[30, 10, 5, 8, 15, 10, 13, 35, 231]}
                                  color={"black"}
                                  chartType={this.state.chartType}
                                  metrics={this.state.metrics}/>
        </div>
      );
    }
  });
}());
