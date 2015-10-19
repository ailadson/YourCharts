/* global EventEmitter */
/* global AppDispatcher */
/* global ChartMetricsConstants */
/* global DataSourceConstants */

(function() {
  'use strict';

  var CHANGE = "change";
  var CLEAR = "clear";

  var _metrics = { metrics:{} };
  var _userMetrics = [];
  var _sharedMetrics = [];

  var updateDisplay = function(data){
    _metrics.metrics.display[data.metric] = data.value;
    ChartMetricsStore.emit(CHANGE);
  };

  var resetMetricsByName = function(name){
    var chosenMetric = _userMetrics.find(function(metric){
      return metric.name === name;
    });

    chosenMetric = chosenMetric || { metrics:{} };
    _metrics = chosenMetric;
    ChartMetricsStore.emit(CHANGE);
  };

  var updateData = function(data){
    _metrics.metrics.data[data.metric] = data.value;
    ChartMetricsStore.emit(CHANGE);
  };

  var setMetricsFromUser = function(name){
    var chosenMetrics = _userMetrics.find(function(m){  return m.name === name; });
    _metrics = chosenMetrics;
    fixIntegers();
    ChartMetricsStore.emit(CHANGE);
  };

  var fixIntegers = function(){
    for( var d in _metrics.metrics.display){
      if(_metrics.metrics.display.hasOwnProperty(d)){
        if(+(_metrics.metrics.display[d]) === +(_metrics.metrics.display[d])){
          _metrics.metrics.display[d] = +(_metrics.metrics.display[d]);
        }
      }
    }
  };

  var resetMetricsData = function(metrics){
    _metrics.metrics = metrics;
    ChartMetricsStore.emit(CHANGE);
  };

  var setMetric = function(metrics){
    _metrics.name = metrics.name;
  };

  var clear = function(){
    _metrics = { metrics:{} };
    ChartMetricsStore.emit(CLEAR);
  };

  var parseMetric = function(metric){
    metric.metrics = JSON.parse(metric.metrics);
  };

  var parseMetrics = function(metrics){
    metrics.forEach(function(metric){
      parseMetric(metric);
    });
  };

  var resetUserMetrics = function(metrics){
    _userMetrics = metrics;
    ChartMetricsStore.emit(CHANGE);
  };

  var addCreatedMetric = function(metric){
    _userMetrics.push(metric);
    _metrics = metric;
    ChartMetricsStore.emit(CHANGE);
  };

  var ChartMetricsStore = window.ChartMetricsStore = $.extend({}, EventEmitter.prototype, {
    clear: function(){
      _metrics.metrics.data = {};
      _metrics.metrics.display = {};
    },

    all: function(){
      var copy = {};
      for(var m in _metrics.metrics){
        if(_metrics.metrics.hasOwnProperty(m)){
          copy[m] = _metrics.metrics[m];
        }
      }
      return copy;
    },

    getMetricByName: function(name){
      return _userMetrics.find(function(metric){
        return metric.name === name;
      });
    },

    get: function(metric){
      for(var m in _metrics.metrics.display){
        if(_metrics.metrics.display.hasOwnProperty(m) && m === metric){
          return _metrics.metrics.display[m];
        }
      }

      for(var met in _metrics.metrics.data){
        if(_metrics.metrics.data.hasOwnProperty(m) && met === metric){
          return _metrics.metrics.data[m];
        }
      }
    },

    hasMetricForData: function(data_id){
      return _userMetrics.find(function(metric){
        return metric.data_id === data_id;
      });
    },

    selectedName: function(){
      return (_metrics && _metrics.name) || "";
    },

    selectedId: function(){
      return _metrics && _metrics.id;
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
          resetMetricsData(action.payload);
          break;
        // case ChartMetricsConstants.RESETBYNAME:
        //   resetMetricsByName(action.payload);
        //   break;
        case ChartMetricsConstants.PROCESSCREATED:
          parseMetric(action.payload);
          addCreatedMetric(action.payload);
          break;
        case DataSourceConstants.ADD:
        case DataSourceConstants.SETSELECTED:
          clear();
          break;
      }
    })
  });

}());
