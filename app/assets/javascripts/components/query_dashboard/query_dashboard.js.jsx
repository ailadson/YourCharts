/* global React */
/* global Components */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.QueryDashboard = React.createClass({
    getInitialState: function(){
      return { sources: [] };
    },

    render: function(){
      return(
        <div className="query-dashboard">
          // <form>
            <Components.QuerySources onChange={this.dataSourceChange} />
            // <Components.QuerySelections />
            // <Components.QueryFilters />
          // </form>
        </div>
      );
    }
  });
}());
