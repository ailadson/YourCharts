(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.Arc = React.createClass({
    getDefaultProps: function(){
      return{
        width: 0,
        height: 0,
        offset: 0
      }
    },

    render: function(){
      var path = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(this.props.radius)
        .startAngle(this.props.d.startAngle)
        .endAngle(this.props.d.endAngle);

      return(
        <g>
          <path fill={this.props.fill} d={path()} stroke={"#000"}/>
          <text transform={"translate("+ path.centroid(this.props.d) + ")"}
                dy={".35em"}
                textAnchor={"middle"}>
              {this.props.text}
          </text>
        </g>
      );
    }
  });

}());
