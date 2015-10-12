/* global React */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.ChartDashboard = React.createClass({
    getInitialState: function(){
      return { chartType: "VerticalBar" };
    },

    handleChartTypeChange: function(type){
      this.setState({chartType: type});
    },

    render: function(){
      return(
        <div className="chart-dashboard">
          <Components.DataManager onChartTypeClick={this.handleChartTypeChange}/>
          <Components.ChartViewer data={[30, 10, 5, 8, 15, 10, 13, 35, 231]}
                                  width={600}
                                  height={300}
                                  color={"red"}
                                  chartType={this.state.chartType}/>
        </div>
      );
    }
  });
}());
