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
      var defaultMetrics = this.props.defaultMetrics;

      var metrics = $.extend({}, {
        display: {
          Color: defaultMetrics.color,
          Height: defaultMetrics.height,
          Width: defaultMetrics.width,
          Y_Maximum: 500,//d3.max(this.props.data),
          Bar_Padding: 0.05,
          Margin_Left: defaultMetrics.margin.left,
          Margin_Right: defaultMetrics.margin.right,
          Margin_Top: defaultMetrics.margin.top,
          Margin_Bottom: defaultMetrics.margin.bottom
        },

        data: {
          X_Metric: "letter",
          Y_Metric: "frequency"
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
        .range([this.props.metrics.display.Height, 0])
        .domain([0, this.props.metrics.display.Y_Maximum]);

      var xMetric;
      if(this.props.metrics.data.X_Metric){
        xMetric = this.props.data.map(function(d) { return d[this.props.metrics.data.X_Metric]; }.bind(this));
      } else {
        xMetric = d3.range(this.props.data.length);
      }

      this.xScale = d3.scale.ordinal()
        .rangeRoundBands([0, this.props.metrics.display.Width], this.props.metrics.display.Bar_Padding)
        .domain(xMetric);
    },

    render: function(){
      if($.isEmptyObject(this.props.metrics)){
        return(
          <g></g>
        );
      }

      this.setScales();

      var bars = this.props.data.map(function(d, i){
        var xMetric = (this.props.metrics.data.X_Metric) ? d[this.props.metrics.data.X_Metric] : i;
        // console.log(this.xScale(xMetric))
        return(
          <Components.Bar
            height={this.props.metrics.display.Height - this.yScale(d[this.props.metrics.data.Y_Metric])}
            width={this.xScale.rangeBand()}
            offset={this.xScale(xMetric)}
            avalableHeight={this.props.metrics.display.Height}
            color={this.props.metrics.display.Color}
            key={i} />
        );
      }.bind(this));

      return (
        <g>
          <g transform={"translate("+this.props.metrics.display.Margin_Left+","+this.props.metrics.display.Margin_Top+")"}>
            {bars}
            <g className="x axis" transform={"translate(0,"+ this.props.metrics.display.Height +")"} ref="xAxis"></g>
            <g className="y axis" ref="yAxis"></g>
          </g>
        </g>
      );
    }
  });

}());
