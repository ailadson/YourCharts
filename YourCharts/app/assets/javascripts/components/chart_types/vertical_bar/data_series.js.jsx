/* global React */
/* global d3 */

(function() {
  'use strict';

  window.Components = window.Components || {};
    window.Components.DataSeries =   window.Components.DataSeries || {};

  window.Components.DataSeries.VerticalBar = React.createClass({
    getInitialState: function(){
      return ChartMetricsStore.all();
    },

    defaultMetrics: function(){
      var metrics = $.extend({}, this.props, {
        Y_Maximum: d3.max(this.props.data),
        Bar_Padding: 0.05
      });

      delete metrics.data;

      return metrics;
    },

    componentWillMount: function(){
      ChartMetricsActions.reset(this.defaultMetrics());
      this._updateMetrics();
    },

    componentDidMount: function(){
      ChartMetricsActions.reset(this.defaultMetrics());
      this._updateMetrics();
      ChartMetricsStore.addChangeHandler(this._updateMetrics);
    },

    componentWillUnmount: function(){
      ChartMetricsStore.removeChangeHandler(this._updateMetrics);
    },

    _updateMetrics: function(){
      this.setState(ChartMetricsStore.all());
    },

    render: function(){
      var props = this.props;

      var yScale = d3.scale.linear()
        .domain([0, this.state.Y_Maximum])
        .range([0, this.props.Height]);

      var xScale = d3.scale.ordinal()
        .domain(d3.range(this.props.data.length))
        .rangeRoundBands([0, this.props.Width], this.state.Bar_Padding);

      var bars = this.props.data.map(function(point, i){
        return(
          <Components.Bar height={yScale(point)} width={xScale.rangeBand()}
               offset={xScale(i)} avalableHeight={props.Height}
               color={this.state.Color} key={i} />
        );
      }.bind(this));

      return (
        <g>{bars}</g>
      );
    }
  });

}());
