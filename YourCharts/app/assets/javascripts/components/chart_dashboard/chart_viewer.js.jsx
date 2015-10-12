/* global React */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.ChartViewer = React.createClass({
    getInitialState: function(){
      var top = 20,
          right = 30,
          bottom = 30,
          left = 40;

      return {
        width: 500 - left - right,
        height: 500 - top - bottom,
        margin: {
          top: top,
          right: right,
          bottom: bottom,
          left: left
        }
      };
    },

    componentDidMount: function(){
      ChartMetricsStore.addChangeHandler(this._updateSize);
    },

    componentWillUnmount: function(){
      ChartMetricsStore.removeChangeHandler(this._updateSize);
    },

    _updateSize: function(){
      var margin = {};

      margin.top = parseInt(ChartMetricsStore.get("MarginTop"));
      margin.bottom = parseInt(ChartMetricsStore.get("MarginBottom"));
      margin.left = parseInt(ChartMetricsStore.get("MarginLeft"));
      margin.right = parseInt(ChartMetricsStore.get("MarginRight"));

      this.setState({
        width: parseInt(ChartMetricsStore.get("Width")),
        height: parseInt(ChartMetricsStore.get("Height")),
        margin: margin
      });
    },

    render: function(){

      var DataSeries = Components.DataSeries[this.props.chartType];
      var margin = this.state.margin;

      return(
        <div className="chart-viewer">
          <Components.Chart width={this.state.width + margin.left + margin.right}
                            height={this.state.height + margin.top + margin.bottom}>
            <DataSeries data={this.props.data}
                        Width={this.state.width}
                        Height={this.state.height}
                        Color={this.props.color}
                        MarginTop={margin.top}
                        MarginBottom={margin.bottom}
                        MarginLeft={margin.left}
                        MarginRight={margin.right} />
          </Components.Chart>
        </div>
      );
    }
  });
}());
