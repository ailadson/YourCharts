/* global React */

$(function(){
  var root = document.getElementById("app");
  var Route = ReactRouter.Route;
  var Router = ReactRouter.Router;
  var IndexRoute = ReactRouter.IndexRoute;

  var App = React.createClass({
    render: function(){
      return (
        <div className="main">
          <header><h2>Your Charts</h2></header>
          { this.props.children }
        </div>
      );
    }
  });

  var routes = (
    <Route path="/" component={App}>
      <IndexRoute component={Components.PoductPreview}/>
      <Route path="dashboard" component={Components.ChartDashboard}/>
    </Route>
  );

  React.render(<Router>{routes}</Router>, root);
});
