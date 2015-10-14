/* global React */
/* global Components */
/* global d3 */

(function() {
  'use strict';

  window.Components = window.Components || {};
    window.Components.DataSeries =   window.Components.DataSeries || {};

  window.Components.DataSeries.PieChart = React.createClass({
    mixins: [Components.DataSeriesMixin],

    defaultMetrics: function(){
      var defaultMetrics = this.props.defaultMetrics;

      var metrics = $.extend({}, {
        data: {
          Category: "age",
          Metric: "population"
        },

        display: {
          Color: defaultMetrics.color,
          Height: defaultMetrics.height,
          Width: defaultMetrics.width,
          Radius: 200,
          Margin_Left: defaultMetrics.margin.left,
          Margin_Right: defaultMetrics.margin.right,
          Margin_Top: defaultMetrics.margin.top,
          Margin_Bottom: defaultMetrics.margin.bottom
        }
      });

      return metrics;
    },

    setArcs: function(){
      this.pie = d3.layout.pie()
        .sort(null)
        .value(function(d){ return d["population"]; });

      this.color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    },

    createArcs: function(){
      var data = this.pie(this.props.data);

      var arcs = data.map(function(d, i){
      console.log(d);
        return(
          <Components.Arc
            outerRadius={this.props.metrics.display.Radius}
            innerRadius={0}
            d={d}
            startAngle={d.startAngle}
            endAngle={d.endAngle}
            fill={this.color(d.data[this.props.metrics.data.Category])}
            text={d.data[this.props.metrics.data.Category]}
            key={i} />
        );
      }.bind(this));

      return arcs;
    },

    render: function(){
      if($.isEmptyObject(this.props.metrics)){
        return(
          <g></g>
        );
      }

      var display = this.props.metrics.display;

      this.setArcs();

      return (
        <g>
          <g transform={
              "translate("+(display.Width/2 + display.Margin_Left)+","+ (display.Height/2 + display.Margin_Top)+")"
            }>
            {this.createArcs()}
          </g>
        </g>
      );
    }
  });

}());
