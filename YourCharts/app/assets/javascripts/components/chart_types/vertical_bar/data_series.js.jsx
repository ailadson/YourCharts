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

    componentDidUpdate: function(){
      var yAxis = d3.svg.axis()
      .scale(this.yScale)
      .orient("left");

      var xAxis = d3.svg.axis()
        .scale(this.xScale)
        .orient("bottom");

      var xNode = React.findDOMNode(this.refs.xAxis);
      var yNode = React.findDOMNode(this.refs.yAxis);
      d3.select(xNode).call(xAxis);
      d3.select(yNode).call(yAxis);
    },

    setScales: function(){
      this.yScale = d3.scale.linear()
        .domain([0, this.state.Y_Maximum])
        .range([this.props.Height, 0]);

      this.xScale = d3.scale.ordinal()
        .domain(d3.range(this.props.data.length))
        .rangeRoundBands([0, this.props.Width], this.state.Bar_Padding);
    },

    render: function(){
      var props = this.props;

      this.setScales();

      var bars = this.props.data.map(function(point, i){
        return(
          <Components.Bar
            height={props.Height - this.yScale(point)}
            width={this.xScale.rangeBand()}
            offset={this.xScale(i)}
            avalableHeight={props.Height}
            color={this.state.Color}
            key={i} />
        );
      }.bind(this));

      return (
        <g>
          <g transform={"translate("+this.state.MarginLeft+","+this.state.MarginTop+")"}>
            {bars}
            <g className="x axis" transform={"translate(0,"+ props.Height +")"} ref="xAxis"></g>
            <g className="y axis" ref="yAxis"></g>
          </g>
        </g>
      );
    }
  });

}());
