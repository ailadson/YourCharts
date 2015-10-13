/* global React */
/* global d3 */

(function() {
  'use strict';

  window.Components = window.Components || {};
    window.Components.DataSeries =   window.Components.DataSeries || {};

  window.Components.DataSeries.VerticalBar = React.createClass({
    mixins: [Components.DataSeriesMixin],

    getInitialState: function(){
      return ChartMetricsStore.all();
    },

    defaultMetrics: function(){
      var displayMetrics = this.props.displayMetrics;

      var metrics = $.extend({}, {
        display: {
          Color: displayMetrics.color,
          Height: displayMetrics.height,
          Width: displayMetrics.width,
          Y_Maximum: d3.max(this.props.data),
          Bar_Padding: 0.05,
          Margin_Left: displayMetrics.margin.left,
          Margin_Right: displayMetrics.margin.right,
          Margin_Top: displayMetrics.margin.top,
          Margin_Bottom: displayMetrics.margin.bottom
        }
      });

      return metrics;
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
        .domain([0, this.state.display.Y_Maximum])
        .range([this.state.display.Height, 0]);

      this.xScale = d3.scale.ordinal()
        .domain(d3.range(this.props.data.length))
        .rangeRoundBands([0, this.state.display.Width], this.state.display.Bar_Padding);
    },

    render: function(){
      this.setScales();

      var bars = this.props.data.map(function(point, i){
        return(
          <Components.Bar
            height={this.state.display.Height - this.yScale(point)}
            width={this.xScale.rangeBand()}
            offset={this.xScale(i)}
            avalableHeight={this.state.display.Height}
            color={this.state.display.Color}
            key={i} />
        );
      }.bind(this));

      return (
        <g>
          <g transform={"translate("+this.state.display.Margin_Left+","+this.state.display.Margin_Top+")"}>
            {bars}
            <g className="x axis" transform={"translate(0,"+ this.state.display.Height +")"} ref="xAxis"></g>
            <g className="y axis" ref="yAxis"></g>
          </g>
        </g>
      );
    }
  });

}());
