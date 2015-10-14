/* global React */
/* global Components */
/* global d3 */

(function() {
  'use strict';

  window.Components = window.Components || {};
    window.Components.DataSeries =   window.Components.DataSeries || {};

  window.Components.DataSeries.VerticalBar = React.createClass({
    mixins: [Components.DataSeriesMixin],

    defaultMetrics: function(){
      var defaultMetrics = this.props.defaultMetrics;

      var metrics = $.extend({}, {
        data: {
          X_Metric: "",
          Y_Metric: ""
        },

        display: {
          Color: defaultMetrics.color,
          Height: defaultMetrics.height,
          Width: defaultMetrics.width,
          Y_Maximum: this.computeDefaultYMax(),
          Bar_Padding: 0.05,
          Margin_Left: defaultMetrics.margin.left,
          Margin_Right: defaultMetrics.margin.right,
          Margin_Top: defaultMetrics.margin.top,
          Margin_Bottom: defaultMetrics.margin.bottom
        }
      });

      return metrics;
    },

    computeDefaultYMax: function(){
      var max = 0;
      this.props.data.forEach(function(d){
        for(var prop in d){
          if(d.hasOwnProperty(prop)){
            var dMax = parseFloat(d[prop]);
            if(dMax > max){ max = dMax; }
          }
        }
      });
      return max;
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

    createBars: function(){
      var X_Metric = this.props.metrics.data.X_Metric;
      var Y_Metric = this.props.metrics.data.Y_Metric;
      var yAvgValues = {};

      var bars = this.props.data.map(function(d, i){
        var xMetric = X_Metric ? d[X_Metric] : i;

        //find the avergae value of for the given metrics, instead of just showing the last value
        var yAvgValue = yAvgValues[xMetric] || (function(){
          var sum = 0, count = 0;
          this.props.data.forEach(function(el){
            if(el[X_Metric] === xMetric){
              sum += parseFloat(el[Y_Metric]);
              count += 1;
            }
          });
          yAvgValues[xMetric] = sum/count;
          return sum/count;
        }.bind(this)());

        return(
          <Components.Bar
            height={this.props.metrics.display.Height - this.yScale(yAvgValue)}
            width={this.xScale.rangeBand()}
            offset={this.xScale(xMetric)}
            avalableHeight={this.props.metrics.display.Height}
            color={this.props.metrics.display.Color}
            key={i} />
        );
      }.bind(this));

      return bars;
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
            {this.createBars()}
            {this.createAxis()}
          </g>
        </g>
      );
    }
  });

}());
