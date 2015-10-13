/* global React */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.ChartTypes = React.createClass({
    render: function(){
      return(
        <div className="data-manager-panel">
          <header>Chart Type</header>
          <ul className="chart-types group">

            <li className="chart-types-item" onClick={this.props.onClick.bind(null,"VerticalBar")}>
              <img src="imgs/bar-chart-icon.png"></img>
            </li>

            <li className="chart-types-item" onClick={this.props.onClick.bind(null,"ScatterPlot")}>
              <img src="imgs/scatter-plot-icon.png"></img>
            </li>

            <li className="chart-types-item">
              <img src="imgs/pie-chart-icon.png"></img>
            </li>

            <li className="chart-types-item">
              <img src="imgs/line-chart-icon.png"></img>
            </li>

          </ul>
        </div>
      );
    }
  });
}());
