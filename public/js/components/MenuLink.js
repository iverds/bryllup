var React = require('react');
var ReactPropTypes = React.PropTypes;
var SlideActions = require('../actions/SlideActions');

var MenuLink = React.createClass({
  propTypes: {
    menuLink: ReactPropTypes.object.isRequired
  },

  handleClick: function(e) {
    SlideActions.scrollTo(this.props.menuLink.id);
  },

  render: function() {
    var menuLink = this.props.menuLink;
    return(<div><a onClick={this.handleClick} className={(menuLink.isActive ? "active " : "") + "menu-link"}>{menuLink.menuText}</a></div>)
  }
});

module.exports = MenuLink;
