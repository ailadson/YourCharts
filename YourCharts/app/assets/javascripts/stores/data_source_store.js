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
