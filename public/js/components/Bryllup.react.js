var React = require('react');
var Navigation = require('./Navigation.react');
var MainContent = require('./MainContent.react')
var SlideStore = require('../stores/SlideStore');
var SlideActions = require('../actions/SlideActions');

function getBryllupState() {
  return {
    allSlides: SlideStore.getAll(),
    allMenuLinks: SlideStore.getMenuLinks()
  }
}

var Bryllup = React.createClass({
  getInitialState: function() {
    return getBryllupState();
  },

  componentDidMount: function() {
    SlideStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SlideStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return(
      <div onWheel={this.handleScroll}>
        <Navigation allMenuLinks={this.state.allMenuLinks} />
        <MainContent allSlides={this.state.allSlides} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getBryllupState());
  },

  handleScroll: function(e) {
    SlideActions.handleScroll(e);
  }
});

module.exports = Bryllup;
