/* global React */
/* global Components */
/* global ChartMetricsStore */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.ChartViewer = React.createClass({
    getInitialState: function(){
      var margin = {top: 20, right: 30, bottom: 30, left: 40};

      return {
        width: 500 - margin.left - margin.right,
        height: 500 - margin.top - margin.bottom,
        margin: margin
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

      if(!this.props.data){
        return(
          <div>Please Select A Data Source</div>
        );
      }

      var DataSeries = Components.DataSeries[this.props.chartType];
      var defaultMetrics = {
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
                        metrics={this.props.metrics}
                        defaultMetrics={defaultMetrics} />
          </Components.Chart>
        </div>
      );
    }
  });
}());
