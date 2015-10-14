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
        .innerRadius(this.props.innerRadius)
        .outerRadius(this.props.outerRadius)
        .startAngle(this.props.startAngle)
        .endAngle(this.props.endAngle);

      console.log(path());
      // debugger;
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
