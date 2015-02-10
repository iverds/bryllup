var React = require('react');
var ReactPropTypes = React.PropTypes;

var SmallBall = React.createClass({
  propTypes: {
    id: ReactPropTypes.string.isRequired
  },

  render: function() {
    var id = this.props.id
    return(
      <div className="smallBallWrapper">
        <div className={"smallBall smallBall" + id}></div>
      </div>
    );
  }
});

module.exports = SmallBall;
