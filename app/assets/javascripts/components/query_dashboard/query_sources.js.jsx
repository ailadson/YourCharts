/* global React */
/* global Components */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.QuerySources = React.createClass({
    getInitialState: function(){

    },
    
    render: function(){
      return(
        <div className="query-sources">
          <div>
            <h2>Data Sources</h2>
          </div>
          <div className="add-one">

          </div>
        </div>
      );
    }
  });
}());
