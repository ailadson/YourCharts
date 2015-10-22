/* global React */
/* global Components */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.QueryDashboard = React.createClass({
    getInitialState: function(){
      return {
        from: QueryStore.getFrom(),
        joins: QueryStore.getJoins(),
        selections: QueryStore.getSelections()
      };
    },

    respondToChange: function () {
      this.forceUpdate();
    },

    componentDidMount: function(){
      DataSourceStore.addChangeHandler(this.respondToChange);
      QueryStore.addChangeHandler(this.updateState);
      var query = this.props.location.query;

      if(query.source){
        QueryActions.setFrom(DataSourceStore.findById(parseInt(query.source)));
      }
    },

    componentWillUnmount: function(){
      DataSourceStore.removeChangeHandler(this.respondToChange);
      QueryStore.removeChangeHandler(this.updateState);
    },

    updateState: function(){
      this.setState({
        from: QueryStore.getFrom(),
        joins: QueryStore.getJoins(),
        selections: QueryStore.getSelections()
      });
    },

    runQuery: function(){
      var query = QueryStore.getQuery();
      QueryActions.runQuery(query);
    },

    render: function(){
      return(
        <div className="query-dashboard">
            <Components.QuerySources query={this.state} />
            <Components.QuerySelections query={this.state} />
            <div className="query-run-button">
              <button onClick={this.runQuery}>Run Query</button>
            </div>
        </div>
      );
    }
  });
}());
