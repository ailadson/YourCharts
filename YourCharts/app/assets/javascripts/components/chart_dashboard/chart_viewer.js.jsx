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
      var height = parseInt(ChartMetricsStore.get("Height")) || this.state.height;
      var width = parseInt(ChartMetricsStore.get("Width")) || this.state.width;

      margin.top = parseInt(ChartMetricsStore.get("Margin_Top")) || this.state.margin.top;
      margin.bottom = parseInt(ChartMetricsStore.get("Margin_Bottom")) || this.state.margin.bottom;
      margin.left = parseInt(ChartMetricsStore.get("Margin_Left")) || this.state.margin.left;
      margin.right = parseInt(ChartMetricsStore.get("Margin_Right")) || this.state.margin.right;


      this.setState({
        width: width,
        height: height,
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
        // color: this.props.color,
        height: parseInt(this.state.height),
        width: parseInt(this.state.width),
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
