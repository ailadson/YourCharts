/* global EventEmitter */
/* global AppDispatcher */
/* global DataSourceConstants */
/* global d3 */

(function() {
  'use strict';

  var CHANGE = "CHANGE";
  var PROCESSED = "PROCESSED";

  var _dataSources = [];
  var _selectedDataSource = null;

  var addSource = function(dataSource){
    _selectedDataSource = dataSource;
    _dataSources.push(dataSource);
    DataSourceStore.emit(CHANGE);
  };

  var parseDatum = function(dataSource){
    if(dataSource.url){
      var extension = dataSource.url.split('.').pop().toLowerCase();

      switch(extension){
        case "csv":
          dataSource.data = d3.csv.parse(dataSource.data);
          break;
        case "tsv":
          dataSource.data = d3.tsv.parse(dataSource.data);
          break;
      }

    } else {
      dataSource.data = JSON.parse(dataSource.data);
    }

    dataSource.data.forEach(function(dataS){
      for(var d in dataS){
        if(dataS.hasOwnProperty(d)){
          if(+(dataS[d]) === +(dataS[d])){ //check if NaN
            dataS[d] = +(dataS[d]);
          }
        }
      }
    });
  };

  var parseData = function(dataSources){
    dataSources.forEach(function(dataSource){
      parseDatum(dataSource);
    });
  };

  var changeSelectedName = function(name){
    _selectedDataSource.name = name;
    DataSourceStore.emit(CHANGE);
  };

  var reset = function(dataSources){
    _dataSources = dataSources;
    DataSourceStore.emit(CHANGE);
  };

  var setSelected = function(name){
    _selectedDataSource = DataSourceStore.find(name);
    DataSourceStore.emit(CHANGE);
  };

  var updateProcessed = function(id){
    var processedSource = _dataSources.find(function(source){
      return source.id === id;
    });

    processedSource.processed = true;
    DataSourceStore.emit(PROCESSED);
  };

  var DataSourceStore = window.DataSourceStore = $.extend({}, EventEmitter.prototype, {
    selectedName: function(){
      return (_selectedDataSource && _selectedDataSource.name) || "";
    },

    selectedId: function(){
      return _selectedDataSource && _selectedDataSource.id;
    },

    find: function(name){
      return _dataSources.find(function(source){ return source.name === name; });
    },

    findById: function(id){
      return _dataSources.find(function(dSource){ return dSource.id === id; });
    },

    findNameById: function(id){
      return this.findById(parseInt(id)).name;
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

    getMeasuresById: function(id){
      var source = _dataSources.find(function(source){
        return source.id === id;
      });

      var measures = [];

      if(source){
        var sample = source.data[0];

        for(var key in sample){
          if(sample.hasOwnProperty(key)){
            measures.push(key);
          }
        }
      }

      return measures;
    },

    allNames: function(){
      return _dataSources.map(function(source){ return source.name; });
    },

    processedDataSources: function(){
      return _dataSources.filter(function(source){
        return source.processed;
      });
    },

    unprocessedDataSources: function(){
      return _dataSources.filter(function(source){
        return !source.processed;
      });
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

    addProcessedHandler: function(cb){
      this.on(PROCESSED, cb);
    },

    removeProcessedHandler: function(cb){
      this.removeListener(PROCESSED, cb);
    },

    dispatchId: AppDispatcher.register(function(action){
      switch(action.actionType){
        case DataSourceConstants.UPDATESELECTED:
          changeSelectedName(action.payload.name);
          break;
        case SavedChartConstants.SETACTIVE:
          var sourceName = DataSourceStore.findNameById(action.payload.data);
          setSelected(sourceName);
          break;
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
        case DataTableConstants.PROCESSCREATED:
          updateProcessed(action.payload.data_id);
          break;
      }
    })
  });

}());
