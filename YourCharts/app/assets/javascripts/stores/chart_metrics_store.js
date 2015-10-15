/* global EventEmitter */
/* global AppDispatcher */
/* global ChartMetricsConstants */

(function() {
  'use strict';

  var CHANGE = "change";

  var _metrics = {};


  var updateDisplay = function(data){
    _metrics.display[data.metric] = data.value;
    ChartMetricsStore.emit(CHANGE);
  };

  var updateData = function(data){
    _metrics.data[data.metric] = data.value;
    ChartMetricsStore.emit(CHANGE);
  };

  var reset = function(metrics){
    _metrics = metrics;
    ChartMetricsStore.emit(CHANGE);
  };

  var clear = function(){
    _metrics.data = {};
    ChartMetricsStore.emit(CHANGE);
  };

  var ChartMetricsStore = window.ChartMetricsStore = $.extend({}, EventEmitter.prototype, {
    all: function(){
      var copy = {};
      for(var m in _metrics){
        if(_metrics.hasOwnProperty(m)){
          copy[m] = _metrics[m];
        }
      }
      return copy;
    },

    get: function(metric){
      for(var m in _metrics.display){
        if(_metrics.display.hasOwnProperty(m) && m === metric){
          return _metrics.display[m];
        }
      }

      for(var met in _metrics.data){
        if(_metrics.data.hasOwnProperty(m) && met === metric){
          return _metrics.data[m];
        }
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
        case ChartMetricsConstants.UPDATEDISPLAY:
          updateDisplay(action.payload);
          break;
        case ChartMetricsConstants.UPDATEDATA:
          updateData(action.payload);
          break;
        case ChartMetricsConstants.RESET:
          reset(action.payload);
          break;
        case DataSourceConstants.ADD:
          clear();
          break;
      }
    })
  });

}());
