(function() {
  'use strict';

  window.Components = window.Components || {};
  window.Components.ProfileContent = window.Components.ProfileContent || {};

  window.Components.ProfileContent.SavedCharts = React.createClass({
    mixins: [ReactRouter.History],

    showChart: function(metric){
      this.history.pushState(null, "/", {
        metric: metric.name,
        type: metric.chart_type,
        data: metric.data_id
      });
    },

    getUserCharts: function(){
      var metrics = ChartMetricsStore.userMetrics();

      return (
        <ul>
          {
            metrics.map(function(metric){
              return(
                <li onClick={this.showChart.bind(null, metric)}>
                  {metric.name}
                </li>
              );
            }.bind(this))
          }
        </ul>
      );
    },

    render: function(){
      return(
        <div className="saved-charts">
          <div className="user-charts">
            {this.getUserCharts()}
          </div>
          <div className="shared-charts">

          </div>
        </div>
      );
    }
  });
}());
