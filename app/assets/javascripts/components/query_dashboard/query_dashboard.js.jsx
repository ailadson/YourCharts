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

    componentDidMount: function(){
      QueryStore.addChangeHandler(this.updateState);
      var query = this.props.location.query;

      if(query.source){
        QueryActions.setFrom(DataSourceStore.findById(parseInt(query.source)));
      }
    },

    componentWillUnmount: function(){
      QueryStore.removeChangeHandler(this.updateState);
    },

    updateState: function(){
      this.setState({
        from: QueryStore.getFrom(),
        joins: QueryStore.getJoins(),
        selections: QueryStore.getSelections()
      });
    },

    render: function(){
      return(
        <div className="query-dashboard">
            <Components.QuerySources query={this.state} />
            <Components.QuerySelections query={this.state} />
        </div>
      );
    }
  });
}());
