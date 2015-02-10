var React = require('react');
var ReactPropTypes = React.PropTypes;
var Slide = require('./Slide.react');

var MainContent = React.createClass({
  propTypes: {
    allSlides: ReactPropTypes.object.isRequired
  },
  render: function() {

    var allSlides = this.props.allSlides;
    var slides = [];

    for (var key in allSlides) {
      slides.push(<Slide key={key} slide={allSlides[key]} />);
    }

    return(
      <div className="wrapper">
        {slides}
      </div>
    )
  }
})

module.exports = MainContent;
