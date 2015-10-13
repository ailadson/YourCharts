(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.Dot = React.createClass({
    getDefaultProps: function(){
      return{
        width: 0,
        height: 0,
        offset: 0
      }
    },

    render: function(){
      return(
        <circle fill={this.props.fill}
          cx={this.props.cx} cy={this.props.cy}
          r={this.props.r}/>
      );
    }
  });

}());
