var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Bryllup = require('./components/Bryllup.react');
var Invitation = require('./components/Invitation/Invitation.react');
var Admin = require('./components/Admin/Admin.react');



var App = React.createClass({
  render: function() {
    return(
      <div>
        <Link to="invitation">Invitation</Link>
        <RouteHandler />
      </div>
    )
  }
})
/*React.render(
  <Bryllup />,
  document.getElementById('bryllup')
);*/



var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="invitation" handler={Invitation}/>
    <Route name="bryllup" handler={Bryllup}/>
    <Route name="admin" handler={Admin} />
    <DefaultRoute handler={Bryllup}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('bryllup'));
});
