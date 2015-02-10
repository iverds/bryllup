var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SlideConstants = require('../constants/SlideConstants');
var SlideActions = require('../actions/SlideActions');
var assign = require('object-assign');
var $ = require('jquery');

var CHANGE_EVENT = 'scroll';

_scrollStatus = {
  shouldScroll: false
  }

var ScrollStore = assign({}, EventEmitter.prototype, {

  getScrollStatus: function() {
    return _scrollStatus;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case SlideConstants.SCROLL_MOVE:
      break;

    default:
      //no-op

  }
});

module.exports = ScrollStore;
