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
        chartType: "VerticalBar",
        dataSource: DataSourceStore.selectedData(),
        metrics: ChartMetricsStore.all()
       };
    },

    componentWillMount: function(){
      ChartMetricsStore.addChangeHandler(this.updateMetrics);
      DataSourceStore.addChangeHandler(this.updateDataSource);
    },

    componentDidMount: function(){
      if(this.props.location.query.metric){
        this.state.chartType = this.props.location.query.type;
        SavedChartActions.setActiveChart(this.props.location.query);
      }
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
      ChartMetricsStore.clear(); //BAD ANTHONY!! BUT I NEED IT TO HAPPEN IMMEDIATELY
      this.setState({chartType: type, metrics: ChartMetricsStore.all() });
    },

    setChartType: function(type){
      this.state.chartType = type;
    },

    render: function(){

      return(
        <div className="chart-dashboard">
          <Components.DataManager metrics={this.state.metrics}
                                  chartType={this.state.chartType}
                                  setChartType={this.setChartType}
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
