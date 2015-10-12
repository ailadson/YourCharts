/* global EventEmitter */
/* global AppDispatcher */
/* global ChartMetricsConstants */

(function() {
  'use strict';

  var CHANGE = "change";

  var _metrics = {};


  var update = function(data){
    _metrics[data.metric] = data.value;
    ChartMetricsStore.emit(CHANGE);
  };

  var reset = function(metrics){
    _metrics = metrics;
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
      for(var m in _metrics){
        if(_metrics.hasOwnProperty(m) && m === metric){
          return _metrics[m];
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
        case ChartMetricsConstants.UPDATE:
          update(action.payload);
          break;
        case ChartMetricsConstants.RESET:
          reset(action.payload);
          break;
      }
    })
  });

}());
