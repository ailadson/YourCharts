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
          Group_By: "",
          Attribute: ""
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

    formatData: function(){
      var dataMetrics = this.props.metrics.data;
      var dataSums = {};
      this.formattedData = [];

      this.props.data.forEach(function(d){
        var category = d[dataMetrics.Group_By];
        var metric = parseFloat(d[dataMetrics.Attribute]);

        if(metric !== metric){ metric = 1; } //check for NaN

        if(dataSums[category]){
          dataSums[category].m += metric;
          dataSums[category].c += 1;
        } else {
          dataSums[category] = { m: metric, c: 1 };
        }
      }.bind(this));

      for(var cat in dataSums){
        if(dataSums.hasOwnProperty(cat)){
          var d = {};
          d[dataMetrics.Group_By] = cat;
          d[dataMetrics.Attribute] = (dataSums[cat].m / dataSums[cat].c);

          this.formattedData.push(d);
        }
      }
    },

    setArcs: function(){
      this.pie = d3.layout.pie()
        .sort(null)
        .value(function(d){ return d[this.props.metrics.data.Attribute]; }.bind(this));

      this.color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    },

    createArcs: function(){
      var data = this.pie(this.formattedData);

      var arcs = data.map(function(d, i){
        return(
          <Components.Arc
            radius={this.props.metrics.display.Radius}
            d={d}
            fill={this.color(d.data[this.props.metrics.data.Group_By])}
            text={d.data[this.props.metrics.data.Group_By]}
            key={i} />
        );
      }.bind(this));

      return arcs;
    },

    render: function(){
      if($.isEmptyObject(this.props.metrics) ||
         !this.props.metrics.data.Group_By ||
         !this.props.metrics.display.Radius ||
         !this.props.metrics.data.Attribute){
        return(
          <g></g>
        );
      }

      var display = this.props.metrics.display;

      this.formatData();
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
