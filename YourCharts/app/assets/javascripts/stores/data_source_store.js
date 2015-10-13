/* global EventEmitter */
/* global AppDispatcher */
/* global DataSourceConstants */

(function() {
  'use strict';

  var CHANGE = "CHANGE";

  var _dataSources = [];
  var _selectedDataSource = null;

  var addSource = function(dataSource){
    _selectedDataSource = dataSource;
    _dataSources.push(dataSource);
    DataSourceStore.emit(CHANGE);
  };

  var DataSourceStore = window.DataSourceStore = $.extend({}, EventEmitter.prototype, {
    selectedName: function(){
      return _selectedDataSource && _selectedDataSource.name;
    },

    selectedData: function(){
      return _selectedDataSource && _selectedDataSource.data;
    },

    selectedMeasures: function(){
      var measures = [];

      if(_selectedDataSource){
        var source = _selectedDataSource.data[0];

        for(var key in source){
          if(source.hasOwnProperty(key)){
            measures.push(key);
          }
        }
      }

      return measures;
    },

    allNames: function(){
      return _dataSources.map(function(source){ return source.name; });
    },

    guessType: function(val){
      var floated = parseFloat(val);

      //NaN !== NaN || coersion to float would strip letters from val
      if(floated !== floated || (floated + "").length !== (val+"").length){
        return "string";
      } else {
        return "number";
      }
    },

    addChangeHandler: function(cb){
      this.on(CHANGE, cb);
    },

    removeChangeHandler: function(cb){
      this.removeListener(CHANGE, cb);
    },

    dispatchId: AppDispatcher.register(function(action){
      switch(action.actionType){
        case DataSourceConstants.ADD:
          addSource(action.payload);
          break;
      }
    })
  });

}());
