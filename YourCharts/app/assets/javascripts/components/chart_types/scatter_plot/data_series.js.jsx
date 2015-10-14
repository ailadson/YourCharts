/* global React */
/* global Components */
/* global d3 */

(function() {
  'use strict';

  window.Components = window.Components || {};
    window.Components.DataSeries =   window.Components.DataSeries || {};

  window.Components.DataSeries.ScatterPlot = React.createClass({
    mixins: [Components.DataSeriesMixin],

    defaultMetrics: function(){
      var defaultMetrics = this.props.defaultMetrics;
      var maxValue = this.computeDefaultMax();
      var minValue = this.computeDefaultMin();

      var metrics = $.extend({}, {
        data: {
          X_Metric: "",
          Y_Metric: "",
          Color_Metric: ""
        },

        display: {
          Height: defaultMetrics.height,
          Width: defaultMetrics.width,
          Dot_Radius: 3.5,
          Y_Maximum: maxValue,
          Y_Minimum: minValue,
          X_Maximum: maxValue,
          X_Minimum: minValue,
          Margin_Left: defaultMetrics.margin.left,
          Margin_Right: defaultMetrics.margin.right,
          Margin_Top: defaultMetrics.margin.top,
          Margin_Bottom: defaultMetrics.margin.bottom
        }
      });

      return metrics;
    },

    computeDefault: function(cb){
      var max;
      this.props.data.forEach(function(d){
        for(var prop in d){
          if(d.hasOwnProperty(prop)){
            var dMax = parseFloat(d[prop]);
            if(!max || cb(dMax,max)){ max = dMax; }
          }
        }
      });
      return max;
    },

    computeDefaultMax: function(){
      return this.computeDefault(function(dMax, max){
        return dMax > max;
      });
    },

    computeDefaultMin: function(){
      return this.computeDefault(function(dMin, min){
        return dMin < min;
      });
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
      var display = this.props.metrics.display;

      this.xScale = d3.scale.linear()
        .range([0, display.Width])
        .domain([display.X_Minimum, display.X_Maximum]);

      this.yScale = d3.scale.linear()
        .range([this.props.metrics.display.Height, 0])
        .domain([display.Y_Minimum, display.Y_Maximum]);

      this.colorScale = d3.scale.category10();
    },

    createLegend: function(){
      var display = this.props.metrics.display;

      var legend = this.colorScale.domain().map(function(d, i){
        return(
          <g key={i} transform={"translate(0," + i * 20 + ")"}>
            <rect x={display.Width - 18}
                  width={18}
                  height={18}
                  fill={this.colorScale(d)}>
            </rect>
            <text x={display.Width - 24}
                  y={9}
                  dy={".35em"}
                  textAnchor={"end"}>
                {d}
            </text>
          </g>
        );
      }.bind(this));

      return legend;
    },

    createDots: function(){
      var X_Metric = this.props.metrics.data.X_Metric;
      var Y_Metric = this.props.metrics.data.Y_Metric;
      var Color_Metric = this.props.metrics.data.Color_Metric;

      var dots = this.props.data.map(function(d, i){
        var xMetric = X_Metric ? d[X_Metric] : i;
        var yMetric = Y_Metric ? d[Y_Metric] : i;
        var colorMetric = Y_Metric ? d[Color_Metric] : i;

        return(
          <Components.Dot
            r={this.props.metrics.display.Dot_Radius}
            cy={this.yScale(yMetric)}
            cx={this.xScale(xMetric)}
            fill={this.colorScale(colorMetric)}
            key={i} />
        );
      }.bind(this));

      return dots;
    },

    render: function(){
      if($.isEmptyObject(this.props.metrics)){
        return(
          <g></g>
        );
      }

      this.setScales();

      return (
        <g>
          <g transform={"translate("+this.props.metrics.display.Margin_Left+","+this.props.metrics.display.Margin_Top+")"}>
            {this.createDots()}
            {this.createAxis()}
            {this.createLegend()}
          </g>
        </g>
      );
    }
  });

}());
