/* global React */
/* global ChartMetricsStore */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.DataManager = React.createClass({
    render: function(){
      return(
        <div className="data-manager">
          <Components.DataSourceLoader />
          <Components.ChartSourceLoader chartType={this.props.chartType}/>
          <Components.ChartTypes onClick={this.props.onChartTypeClick} />
          <Components.ChartMetrics metrics={this.props.metrics} />
        </div>
      );
    }
  });
}());
