/* global React */

$(function(){
  var Route = ReactRouter.Route;
  var Router = ReactRouter.Router;
  var IndexRoute = ReactRouter.IndexRoute;

  var AppNavBar = React.createClass({
    render: function(){
      return(
        <nav><h2>Your Charts</h2></nav>
      );
    }
  });

  var GuestNavBar = React.createClass({
    render: function(){
      return(
        <nav><h2>Login Your Charts</h2></nav>
      );
    }
  });

  var App = React.createClass({
    render: function(){
      return (
        <div className="main">
          { this.props.children.Header }
          <div className="main-content">
            { this.props.children.Content }
          </div>
        </div>
      );
    }
  });

  var appRoutes = (
    <Route path="/" component={App}>
      <IndexRoute component={{Header: AppNavBar, Content: Components.ChartDashboard}}/>
    </Route>
  );

  var guestRoutes = (
    <Route path="/" component={App}>
      <IndexRoute component={{Header: GuestNavBar, Content: Components.PoductPreview}}/>
    </Route>
  );


  window.runApp = function(){
    var root = document.getElementById("app");

    React.render(<Router>{appRoutes}</Router>, root);
  };

  window.runGuest = function(){
    var root = document.getElementById("app");

    React.render(<Router>{guestRoutes}</Router>, root);
  };


});
