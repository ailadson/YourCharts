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

    allNames: function(){
      return _dataSources.map(function(source){ return source.name; });
    },

    metrics: function(){
      var source = _selectedDataSource.data[0];
      var m = [];

      for(var metric in source){
        if(source.hasOwnProperty(metric)){
          m.push({
            metric: metric,
            type: this.guessType(source[metric])
          });
        }
      }

      return m;
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
