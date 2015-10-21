/* global React */
/* global Components */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.QuerySources = React.createClass({
    changeFrom: function(e){
      QueryActions.setFrom(e.target.value);
    },

    updateJoins: function(e){
      var idx = parseInt(e.target.name);
      var joinSource = DataSourceStore.findById(parseInt(e.target.value));

      QueryActions.updateJoin({
        idx: idx,
        source: {
          dataId: joinSource.id,
          name: joinSource.name
        }
      });
    },

    addJoin: function(){
      QueryActions.addJoin();
    },

    removeJoin: function(){
    },

    processedOptions: function(value, text){
      return DataSourceStore.processedDataSources().map(function(source, i){
        return <option key={i} value={source[value]}>{source[text]}</option>;
      });
    },

    createJoins: function(){
      var joins = this.props.query.joins;
      var query = this.props.query;

      if(query.from){
        var fromMeasures = DataSourceStore.getMeasuresById(query.from.id);
        var fromOptions = fromMeasures.map(function(measure, k){
          return (
            <option key={k} value={measure}>
              {query.from.name + " => " + measure}
            </option>
          );
        });
      }

      return joins.map(function(join, i){
        var measures = DataSourceStore.getMeasuresById(join.dataId);

        return(
          <div className="query-join" key={i}>

            Join:<br/>
          <select name={i} value={join.dataId} onChange={this.updateJoins}>
              <option></option>
              { this.processedOptions("id", "name")}
            </select>
            <br/>
            On:<br/>
            <select>
              <option key={-1}></option>
              {
                measures.map(function(measure, j){
                  return <option key={j} value={measure}>{join.name+" => "+measure}</option>
                })
              }
            </select>
            =
            <select>
              <option></option>
              {fromOptions}
            </select>
          </div>
        );
      }.bind(this));
    },

    render: function(){
      var query = this.props.query;

      return(
        <div className="query-sources">
          <div className="query-section query-from">
            <h2>Data Source</h2>
            From:
            <select name="from"
                    onChange={this.changeFrom}
                    value={(query.from && query.from.id)}>
              {this.processedOptions("id", "name")}
            </select>
          </div>

          <div className="query-section">
            <h2>Joins</h2>
            <button onClick={this.addJoin}>Add +</button>
            {this.createJoins()}
          </div>
        </div>
      );
    }
  });
}());
