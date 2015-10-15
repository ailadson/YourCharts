/* global React */

$(function(){
  var Route = ReactRouter.Route;
  var Router = ReactRouter.Router;
  var IndexRoute = ReactRouter.IndexRoute;

  var AppNavBar = React.createClass({
    signOut: function(){
      $.ajax({
        url: "/session",
        type: "DELETE",
        success: function(){
          window.location.href = "/";
        }
      });
    },

    render: function(){
      return(
        <nav className="nav-bar nav-logged-in group">
          <div>Your Charts</div>
          <ul className="group">
            <li>Profile</li>
            <li>Upload Data</li>
            <li onClick={this.signOut}>Sign Out</li>
          </ul>
          </nav>
      );
    }
  });

  var GuestNavBar = React.createClass({
    render: function(){
      return(
        <nav className="nav-bar"><div>Your Charts</div></nav>
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
