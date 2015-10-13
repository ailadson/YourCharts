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

      margin.top = parseInt(ChartMetricsStore.get("Margin_Top"));
      margin.bottom = parseInt(ChartMetricsStore.get("Margin_Bottom"));
      margin.left = parseInt(ChartMetricsStore.get("Margin_Left"));
      margin.right = parseInt(ChartMetricsStore.get("Margin_Right"));

      this.setState({
        width: parseInt(ChartMetricsStore.get("Width")),
        height: parseInt(ChartMetricsStore.get("Height")),
        margin: margin
      });
    },

    render: function(){

      var DataSeries = Components.DataSeries[this.props.chartType];
      var displayMetrics = {
        color: this.props.color,
        height: this.state.height,
        width: this.state.width,
        margin: this.state.margin
      };

      return(
        <div className="chart-viewer">
          <Components.Chart width={this.state.width + this.state.margin.left + this.state.margin.right}
                            height={this.state.height + this.state.margin.top + this.state.margin.bottom}>
            <DataSeries data={this.props.data}
                        displayMetrics={displayMetrics} />
          </Components.Chart>
        </div>
      );
    }
  });
}());
