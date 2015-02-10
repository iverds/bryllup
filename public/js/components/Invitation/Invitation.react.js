var React = require('react');
var SmallBall = require('./SmallBall.react');


var Invitation = React.createClass({
  render: function() {
    return(
      <div className="invitation-wrapper">
        <section className="invitation">

          <div className="sneakyTop">&nbsp;</div>
          <SmallBall id="1" />
          <SmallBall id="2" />
          <SmallBall id="3" />
          <SmallBall id="4" />
          <SmallBall id="5" />
          <SmallBall id="6" />
          <SmallBall id="7" />
          <SmallBall id="8" />
          <SmallBall id="9" />
          <SmallBall id="10" />
          <SmallBall id="11" />
          <SmallBall id="12" />
          <div className="skewed">Sammen med være familier</div>
          <div className="rouge">Kine &amp; Iver</div>
          <div className="invite">Inviterer deg til å feire vårt</div>
          <div className="rouge">Bryllup</div>
          <hr className="dotted"></hr>
          <div className="day">FREDAG - SØNDAG</div>
          <div className="rouge">26.06 - 28.06</div>
          <div className="day">10:00</div>
          <section className="answer">
            <div id="check-awesome" className="form-group">
              <input type="radio" name="answer" id="yes" />
              <label htmlFor="yes">
                  <div className="circle"></div>
                  <div className="check"></div>
                  <div className="box"></div>
                  Ja, jeg kommer
              </label>
            </div>

            <div id="check-awesome" className="form-group">
              <input type="radio" name="answer" id="no" />
              <label htmlFor="no">
                  <div className="circle"></div>
                  <div className="check"></div>
                  <div className="box"></div>
                  Nei, jeg kommer dessverre ikke
              </label>
            </div>
          </section>
        </section>
      </div>
    );
  },
});

module.exports = Invitation;
