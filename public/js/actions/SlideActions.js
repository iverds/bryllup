var AppDispatcher = require('../dispatcher/AppDispatcher');
var SlideConstants = require('../constants/SlideConstants');

var SlideActions = {

  setActive: function(id) {
    AppDispatcher.dispatch({
      actionType: SlideConstants.SLIDE_TOGGLE_ACTIVE,
      id: id
    });
  },

  scrollTo: function(id) {
    AppDispatcher.dispatch({
      actionType: SlideConstants.SLIDE_SCROLL_TO,
      id: id
    })
  },

  scrollFinished: function() {
    AppDispatcher.dispatch({
      actionType: SlideConstants.SLIDE_SCROLL_FINISHED
    })
  },

  handleScroll: function(e) {
    AppDispatcher.dispatch({
      actionType: SlideConstants.SLIDE_MOVE,
      e: e
    });
  }
};

module.exports = SlideActions;
