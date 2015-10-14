/* global React */
/* global Components */
/* global d3 */

(function() {
  'use strict';

  window.Components = window.Components || {};
    window.Components.DataSeries =   window.Components.DataSeries || {};

  window.Components.DataSeries.LineGraph = React.createClass({
    mixins: [Components.DataSeriesMixin],

    defaultMetrics: function(){
      var defaultMetrics = this.props.defaultMetrics;

      var metrics = $.extend({}, {
        data: {
          Time_Metric: "",
          DateTime_Format: "__datetime_format__",
          Y_Metric: ""
        },

        display: {
          Color: defaultMetrics.color,
          Height: defaultMetrics.height,
          Width: defaultMetrics.width,
          Bar_Padding: 0.05,
          Margin_Left: defaultMetrics.margin.left,
          Margin_Right: defaultMetrics.margin.right,
          Margin_Top: defaultMetrics.margin.top,
          Margin_Bottom: defaultMetrics.margin.bottom
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

    formatData: function(){
      var dataMetrics = this.props.metrics.data;

      this.parseDate = d3.time
        .format(this.props.metrics.data.DateTime_Format)
        .parse;

      this.formattedData = [];

      this.props.data.forEach(function(d){
        var data = {};
        data[dataMetrics.Time_Metric] = this.parseDate(d[dataMetrics.Time_Metric]);
        data[dataMetrics.Y_Metric] = +d[dataMetrics.Y_Metric] || 1;

        this.formattedData.push(data);
      }.bind(this));
    },

    setScales: function(){
      var timeMetric = this.props.metrics.data.Time_Metric;
      var yMetric = this.props.metrics.data.Y_Metric;

      this.xScale = d3.time.scale()
        .range([0, this.props.metrics.display.Width])
        .domain(d3.extent(this.formattedData, function(d) { return d[timeMetric]; }));

      this.yScale = d3.scale.linear()
        .range([this.props.metrics.display.Height, 0])
        .domain(d3.extent(this.formattedData, function(d) { return d[yMetric]; }));

    },

    createLine: function(){
      var Time_Metric = this.props.metrics.data.Time_Metric;
      var Y_Metric = this.props.metrics.data.Y_Metric;

      var line = d3.svg.line()
        .x(function(d){ return this.xScale(d[Time_Metric]); }.bind(this))
        .y(function(d){ return this.yScale(d[Y_Metric]); }.bind(this));

      return(
        <Components.Line
          line={line}
          data={this.formattedData}
          color={this.props.metrics.display.Color} />
      );
    },

    render: function(){
      if($.isEmptyObject(this.props.metrics) ||
         !this.props.metrics.data.Time_Metric ||
         !this.props.metrics.data.Y_Metric){
        return(
          <g></g>
        );
      }

      this.formatData();
      this.setScales();

      return (
        <g>
          <g transform={"translate("+this.props.metrics.display.Margin_Left+","+this.props.metrics.display.Margin_Top+")"}>
            {this.createLine()}
            {this.createAxis()}
          </g>
        </g>
      );
    }
  });

}());
