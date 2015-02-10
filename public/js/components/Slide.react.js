var React = require('react');
var ReactPropTypes = React.PropTypes;
var $ = require('jquery');
var SlideActions = require('../actions/SlideActions')

var Slide = React.createClass({

  proptypes: {
    slide: ReactPropTypes.object.isRequired
  },
  render: function() {
    var slide = this.props.slide;
    return(
      <span>
        <article className={"slide " + slide.id} data-slide={slide.id}>
          <div className="announcement-wrapper">
            <div className="announcement announcement-circle">
              <div className="top">{slide.top}</div>
              <div className="middle center" dangerouslySetInnerHTML={{__html: slide.middle}} />
              <div className="bottom">
                <p dangerouslySetInnerHTML={{__html: slide.bottom}}></p>
              </div>
            </div>
          </div>
        </article>
        <div className="slicer"></div>
        <div className="info-area">
          <div className="container">
            <div className="info-img">
              <div className={"info-circle info-" + slide.id}></div>
            </div>
            <div className="info-text"></div>
            <h1 dangerouslySetInnerHTML={{__html: slide.info_header}}></h1>
            <p className="text" dangerouslySetInnerHTML={{__html: slide.info_text}} ></p>
          </div>
        </div>
        <div className="slicer"></div>
      </span>
    );
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(this.props.slide.scrollTo) {
      SlideActions.scrollFinished();
      $("body").animate({
        scrollTop: $(this.getDOMNode()).offset().top
      }, 2000, function() {

      });
    }
  }
});

module.exports = Slide;
