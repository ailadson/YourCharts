/* global EventEmitter */
/* global AppDispatcher */
/* global DataSourceConstants */
/* global d3 */

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

  var parseDatum = function(dataSource){
    var extension = dataSource.url.split('.').pop().toLowerCase();

    switch(extension){
      case "csv":
        dataSource.data = d3.csv.parse(dataSource.data);
        break;
      // case "json":
      //   dataSource.data = JSON.parse(dataSource.data);
      //   break;
      case "tsv":
        dataSource.data = d3.tsv.parse(dataSource.data);
        break;
    }
  };

  var parseData = function(dataSources){
    dataSources.forEach(function(dataSource){
      parseDatum(dataSource);
    });
  };

  var reset = function(dataSources){
    _dataSources = dataSources;
    DataSourceStore.emit(CHANGE);
  };

  var setSelected = function(name){
    _selectedDataSource = DataSourceStore.find(name);
    DataSourceStore.emit(CHANGE);
  };

  var DataSourceStore = window.DataSourceStore = $.extend({}, EventEmitter.prototype, {
    selectedName: function(){
      return _selectedDataSource && _selectedDataSource.name;
    },

    selectedId: function(){
      return _selectedDataSource && _selectedDataSource.id;
    },

    find: function(name){
      return _dataSources.find(function(source){ return source.name === name; });
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
          parseDatum(action.payload);
          addSource(action.payload);
          break;
        case DataSourceConstants.SETSELECTED:
          setSelected(action.payload);
          break;
        case DataSourceConstants.POPULATE:
          parseData(action.payload);
          reset(action.payload);
          break;
      }
    })
  });

}());
