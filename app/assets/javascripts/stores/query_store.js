(function() {
  'use strict';

  var CHANGE = "change";

  var _from = null;
  var _joins = [];

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

  var updateJoin = function(data){
    var join = _joins[data.idx];
    for(var k in data.source){
      if(data.source.hasOwnProperty(k)){
        join[k] = data.source[k];
      }
    }
    QueryStore.emit(CHANGE);
  };

  var QueryStore = window.QueryStore = $.extend({}, EventEmitter.prototype, {
    getFrom: function(){
      return _from;
    },

    getJoins: function(){
      return _joins;
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
      }
    })
  });
}());
