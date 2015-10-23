(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.QuerySelections = React.createClass({
    addSelection: function(){
      QueryActions.addSelection();
    },

    updateSelection: function(e){
      var data = e.target.value.split("=>");

      QueryActions.updateSelection({
        idx: parseInt(e.target.name),
        selection: {
          column: data[1],
          name: data[0],
          dataId: DataSourceStore.find(data[0]).id
        }
      });
    },

    updateSelectionAs: function(e){
      QueryActions.updateSelection({
        idx: parseInt(e.target.name),
        selection: {
          as: e.target.value
        }
      });
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
            <select name={i} value={name} onChange={this.updateSelection}>
              <option></option>
              {columnOptions}
            </select> AS <input name={i}
                                value={selection.as}
                                type="text"
                                onChange={this.updateSelectionAs}/>
          </div>
        );
      }.bind(this));
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
