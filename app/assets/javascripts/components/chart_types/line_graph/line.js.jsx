(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.Line = React.createClass({
    render: function(){
      var path = this.props.line(this.props.data);

      return(
        <path style={{stroke: this.props.color, fill: "none"}}
              d={path} />
      );
    }
  });

}());
