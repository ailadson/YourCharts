/* global React */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.ChartViewer = React.createClass({
    render: function(){

      var DataSeries = Components.DataSeries[this.props.chartType];

      return(
        <div className="chart-viewer">
          <Components.Chart width={this.props.width}
                            height={this.props.height}>
            <DataSeries data={this.props.data}
                        Width={this.props.width}
                        Height={this.props.height}
                        Color={this.props.color} />
          </Components.Chart>
        </div>
      );
    }
  });
}());
