(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.QuerySelections = React.createClass({
    addSelection: function(){
      QueryActions.addSelection();
    },

    createSelections: function(){
      var selections = this.props.query.selections;
      var query = this.props.query;
      var columnInfo = QueryStore.getAllColumns();

      var columnOptions = columnInfo.map(function(info, i){
        var val = info.table+"=>"+info.column;
        return <option key={i} value={val}>{val}</option>;
      });

      return selections.map(function(selection, i){
        var name = selection.name + "=>" + selection.column;
        return(
          <div>
            <select name={i} value={name}>
              <option></option>
              {columnOptions}
            </select> AS <input value={selection.as} type="text"/>
          </div>
        );
      });
    },

    render: function(){
      var query = this.props.query;

      return(
        <div className="query-sources">
          <div className="query-selection query-section">
            <h2>Selection</h2>
            <button onClick={this.addSelection}>Add +</button>
            {this.createSelections()}
          </div>
        </div>
      );
    }
  });

}());
