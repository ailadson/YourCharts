(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.ChartTypes = React.createClass({
    render: function(){
      return(
        <ul className="chart-types">
          <li className="chart-types-items" onClick={this.props.onClick.bind(null,"VerticalBar")}>
            <svg version="1.1"
                 id="Layer_1"
                 x="0px"
                 y="0px"
                 width="30px"
                 height="30px"
                 viewBox="0 0 512 512"
                 enable-background="new 0 0 512 512">
              <path d="M512,480v32H32H0v-32V0h32v96h32v32H32v64h32v32H32v64h32v32H32v64h32v32H32v64H512z M160,0H96v448h64V0z M256,96h-64v352  h64V96z M352,192h-64v256h64V192z M448,288h-64v160h64V288z"/>
            </svg>
          </li>
        </ul>
      );
    }
  });
}());
