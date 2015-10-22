(function() {
  'use strict';

  var CHANGE = "change";

  var _from = null;
  var _joins = [];
  var _selections = [];

  var setFrom = function(source){
    _from = source;
    QueryStore.emit(CHANGE);
  };

  var addJoin = function(){
    _joins.push({
      dataId: null,
      name: null,
      onSelf: null,
      onFrom: null
    });
    QueryStore.emit(CHANGE);
  };

  var addSelection = function(){
    _selections.push({
      name: null,
      column: null,
      as: null
    });
    QueryStore.emit(CHANGE);
  };

  var updateJoin = function(data){
    var join = _joins[data.idx];
    for(var k in data.source){
      if(data.source.hasOwnProperty(k)){
        join[k] = data.source[k];
      }
    }
    QueryStore.emit(CHANGE);
  };

  var updateSelection = function(data){
    var selection = _selections[data.idx];
    for(var k in data.selection){
      if(data.selection.hasOwnProperty(k)){
        selection[k] = data.selection[k];
      }
    }
    QueryStore.emit(CHANGE);
  };

  var QueryStore = window.QueryStore = $.extend({}, EventEmitter.prototype, {
    getQuery: function(){
      return {
        from: _from.name,
        joins: _joins,
        selections: _selections
      };
    },

    getFrom: function(){
      return _from;
    },

    getJoins: function(){
      return _joins;
    },

    getSelections: function(){
      return _selections;
    },

    getAllColumns: function(){
      var columns = [];

      //from data
      if(_from){
        var measures = DataSourceStore.getMeasuresById(_from.id);

        measures.forEach(function(measure){
          columns.push({
              table: _from.name,
              column: measure
          });
        });
      }

      _joins.forEach(function(join){
        var measures = DataSourceStore.getMeasuresById(join.dataId);

        measures.forEach(function(measure){
          columns.push({
              table: join.name,
              column: measure
          });
        });
      });

      return columns;
    },

    addChangeHandler: function(cb){
      this.on(CHANGE, cb);
    },

    removeChangeHandler: function(cb){
      this.removeListener(CHANGE, cb);
    },

    dispatchId: AppDispatcher.register(function(action){
      switch(action.actionType){
        case QueryConstants.SETFROM:
          setFrom(action.payload);
          break;
        case QueryConstants.ADDJOIN:
          addJoin();
          break;
        case QueryConstants.UPDATEJOIN:
          updateJoin(action.payload);
          break;
        case QueryConstants.ADDSELECTION:
          addSelection();
          break;
        case QueryConstants.UPDATESELECTION:
          updateSelection(action.payload);
          break;
      }
    })
  });
}());
