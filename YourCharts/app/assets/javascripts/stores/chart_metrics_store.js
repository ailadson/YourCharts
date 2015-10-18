/* global EventEmitter */
/* global AppDispatcher */
/* global ChartMetricsConstants */
/* global DataSourceConstants */

(function() {
  'use strict';

  var CHANGE = "change";
  var CLEAR = "clear";

  var _metrics = {};
  var _userMetrics = [];
  var _sharedMetrics = [];

  var updateDisplay = function(data){
    _metrics.display[data.metric] = data.value;
    ChartMetricsStore.emit(CHANGE);
  };

  var updateData = function(data){
    _metrics.data[data.metric] = data.value;
    ChartMetricsStore.emit(CHANGE);
  };

  var setMetricsFromUser = function(name){
    var chosenMetrics = _userMetrics.find(function(m){  return m.name === name; });
    _metrics = chosenMetrics.metrics;
    setTypes();
    ChartMetricsStore.emit(CHANGE);
  };

  var setTypes = function(){
    for( var d in _metrics.display){
      if(_metrics.display.hasOwnProperty(d)){
        if(+(_metrics.display[d]) === +(_metrics.display[d])){
          _metrics.display[d] = +(_metrics.display[d]);
        }
      }
    }
  };

  var reset = function(metrics){
    _metrics = metrics;
    ChartMetricsStore.emit(CHANGE);
  };

  var clear = function(){
    _metrics.data = {};
    ChartMetricsStore.emit(CLEAR);
  };

  var parseMetrics = function(metrics){
    metrics.forEach(function(metric){
      metric.metrics = JSON.parse(metric.metrics);
    });
  };

  var resetUserMetrics = function(metrics){
    _userMetrics = metrics;
    ChartMetricsStore.emit(CHANGE);
  };

  var ChartMetricsStore = window.ChartMetricsStore = $.extend({}, EventEmitter.prototype, {
    clear: function(){
      _metrics.data = {};
      _metrics.display = {};
    },

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

    hasMetricForData: function(data_id){
      return _userMetrics.find(function(metric){
        return metric.data_id === data_id;
      });
    },

    selectedName: function(data_id){
      var m = this.hasMetricForData(data_id);
      return (m && m.name);
    },

    userMetrics: function(){
      return _userMetrics.slice();
    },

    addClearHandler: function(cb){
      this.on(CLEAR, cb);
    },

    removeClearHandler: function(cb){
      this.removeListener(CLEAR, cb);
    },

    addChangeHandler: function(cb){
      this.on(CHANGE, cb);
    },

    removeChangeHandler: function(cb){
      this.removeListener(CHANGE, cb);
    },

    dispatchId: AppDispatcher.register(function(action){
      switch(action.actionType){
        case SavedChartConstants.SETACTIVE:
          AppDispatcher.waitFor([DataSourceStore.dispatchId]);
          setMetricsFromUser(action.payload.metric);
          break;
        case ChartMetricsConstants.POPULATE:
          parseMetrics(action.payload);
          resetUserMetrics(action.payload);
          break;
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
        case DataSourceConstants.SETSELECTED:
          clear();
          break;
      }
    })
  });

}());
