var React = require('react');
var ReactPropTypes = React.PropTypes;
var MenuLink = require('./MenuLink');

var Navigation = React.createClass({

  propTypes: {
    allMenuLinks: ReactPropTypes.array.isRequired
  },

  render: function() {

    var allMenuLinks = this.props.allMenuLinks;
    var menuLinks = [];

    for (var key in allMenuLinks) {
      menuLinks.push(
        <MenuLink key={key} menuLink={allMenuLinks[key]} />);
    }

    return(
      <nav className="menu-wrapper">
        <div className="container">
          <div className="menu">
            {menuLinks}
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Navigation;
