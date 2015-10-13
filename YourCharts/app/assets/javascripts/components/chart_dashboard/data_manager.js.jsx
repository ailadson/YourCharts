/* global React */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.DataManager = React.createClass({
    render: function(){
      return(
        <div className="data-manager">
          <Components.DataSourceLoader />
          <Components.ChartMetrics />
          <Components.ChartTypes onClick={this.props.onChartTypeClick} />
        </div>
      );
    }
  });
}());
