var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SlideConstants = require('../constants/SlideConstants');
var SlideActions = require('../actions/SlideActions');
var assign = require('object-assign');
var $ = require('jquery');

var CHANGE_EVENT = 'change';

var _slides = {
  main: {
    id: "main",
    top: "26.06.15 - 28.06.15",
    middle: "Vi gifter oss!",
    bottom: "K &amp; I",
    info_header: "Vi gifter oss!",
    info_text: "Helgen 26.-28. juni 2015 gifter vi oss etter 10 år som kjærester. Vi håper derfor du/dere vil holde av datoene for en helg på Hadeland for å feire kjærligheten med oss. I tiden fremover vil du kunne finne informasjon om bryllupshelgen her. Vi gleder oss!",
    isActive: false,
    isMenuLink: false,
    menuText: "",
    scrollTo: false
  },
  friday: {
    id: "friday",
    top: "Fredag 26.06.15",
    middle: "Skogstad Gård",
    bottom: "",
    info_header: "Skogstad",
    info_text: "Helgen starter med en uformell samling på familiegården til Iver for å bli litt bedre kjent. Bryggingen av bryllupsølet er allerede i gang, og fint vær er bestilt.",
    isActive: true,
    isMenuLink: true,
    menuText: "Fredag",
    scrollTo: false
  },
  saturday: {
    id: "saturday",
    top: "Lørdag 27.06.15",
    middle: "Kimbu<br> &amp;<br> Helgaker Gård",
    bottom: "",
    info_header: "Kimbu &amp; Helgaker Gård",
    info_text: "Den store dagen starter med vielse på familiehytta til Kine, også kjent som Kimbu. Deretter blir det mottakelse, middag, bryllupsfest og dans til de sene nattetimer på Helgaker Gård.",
    isActive: false,
    isMenuLink: true,
    menuText: "Lørdag",
    scrollTo: false
  },
  sunday: {
    id: "sunday",
    top: "Søndag 28.06.15",
    middle: "Helgaker Gård",
    bottom: "",
    info_header: "Helgaker Gård",
    info_text: "Vi håper dere vil avslutte helga med oss med en sen frokost (lunsj?) på Helgaker Gård. <br> PS: Det vil bli muligheter for å booke overnatting på gården for hele helgen. Mer informasjon om dette kommer.",
    isActive: false,
    isMenuLink: true,
    menuText: "Søndag",
    scrollTo: false
  }
};

function setActive(id) {
  Object.keys(_slides).forEach(function(k) {_slides[k].isActive = false});
  _slides[id].isActive = true;
}

function slideTo(id) {
  Object.keys(_slides).forEach(function(k) {_slides[k].scrollTo = false});
  _slides[id].scrollTo = true;
}

function slideFinished() {
  Object.keys(_slides).forEach(function(k) {_slides[k].scrollTo = false});
}

var SlideStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _slides;
  },

  someIsSliding: function() {
    Object.keys(_slides).forEach(function(k) {
      if(_slides[k].scrollTo) {
        return true;
      }
    });
    return false;
  },

  getMenuLinks: function() {
    return Object.keys(_slides).filter(function(k) {return _slides[k].isMenuLink;}).map(function(k) {return _slides[k];});
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
    case SlideConstants.SLIDE_MOVE:
      if(!SlideStore.someIsSliding()) {
        $.each($(".slide"), function(k,v) {
          if($("body").scrollTop() > $(v).offset().top - $(v).height()/2 && $("body").scrollTop() < $(v).offset().top + $(v).height()/2) {
            setActive($(v).data("slide"));
          }
        });
        SlideStore.emitChange();
      }
      break;

    case SlideConstants.SLIDE_SCROLL_TO:
      if(!SlideStore.someIsSliding()) {
        slideTo(action.id);
        setActive(action.id);
        SlideStore.emitChange();
      }
      break;

    case SlideConstants.SLIDE_SCROLL_FINISHED:
      slideFinished();
      break;

    case SlideConstants.SLIDE_TOGGLE_ACTIVE:
      if(!SlideStore.someIsSliding()) {
        setActive(action.id);
        SlideStore.emitChange();
      }
      break;

    default:
      //no-op
  }
})

module.exports = SlideStore;
