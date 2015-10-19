/* global React */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.Chart = React.createClass({
    render: function(){
      return(
        <div className="chart" style={{width: this.props.width, height: this.props.height}}>
          <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
        </div>
      );
    }
  });

}());
